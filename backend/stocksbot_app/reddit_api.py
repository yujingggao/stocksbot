# testing
# from keys import client_id, client_secret, stock_data_key
# from data import *

from .keys import client_id, client_secret, stock_data_key
from .data import *
import praw
from .finnhub_api import *
import time
import pandas as pd
# import nltk
# nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer

start_time = time.time()
'''############################################################################'''
# set the program parameters
upvoteRatio = 0.70         # upvote ratio for post to be considered, 0.70 = 70%
ups = 20       # define # of upvotes, post is considered if upvotes exceed this #
limit = 10      # define the limit, comments 'replace more' limit
upvotes = 2     # define # of upvotes, comment is considered if upvotes exceed this #
stock_counter, c_analyzed, tickers, a_comments = 0, 0, {}, {}
'''############################################################################'''
# helper function - remove emoji in comments
def remove_emoji(string):
    emoji_pattern = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
        u"\U00002702-\U000027B0"
        u"\U000024C2-\U0001F251"
        "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', string)

# Connect with Reddit API
def connect_reddit(id, secret):
    reddit = praw.Reddit(
        user_agent="Comment Extraction",
        client_id=id,
        client_secret=secret
    )
    return reddit

def stock_comments(sub_reddit):
    global stock_counter
    # connect with Reddit API
    reddit = connect_reddit(client_id, client_secret)

    # define subreddit and sort
    subreddit = reddit.subreddit(sub_reddit)
    hot_python = subreddit.hot(limit=limit) # sorting posts by hot

    # loop through all the submissions and comments
    for submission in hot_python:
        # checking: post upvote ratio # of upvotes and author 
        if submission.upvote_ratio >= upvoteRatio and submission.ups > ups:    
            # submission.comment_sort = 'new'     
            comments = submission.comments
            # posts += 1
            submission.comments.replace_more(limit=0)  
            for comment in comments:
                if comment.score > upvotes:
                    split = comment.body.split(" ")
                    for word in split:
                        if word.isupper() and word in us and word not in blacklist:
                            # counting tickers
                            if word in tickers:
                                tickers[word] += 1
                                a_comments[word].append(comment.body)
                            else:                               
                                tickers[word] = 1
                                a_comments[word] = [comment.body]
                                stock_counter += 1   

    return tickers, a_comments

stock_all_comments = stock_comments('wallstreetbets')

# return value
def tickers(): 
    # tickers = stock_comments_test[0]
    tickers = stock_all_comments[0]
    sorted_tickers = dict(sorted(tickers.items(), key=lambda item: item[1], reverse = True))
    return sorted_tickers

sorted_tickers = tickers()
    
def comments():
    # a_comments = stock_comments_test[1]
    a_comments = stock_all_comments[1]
    sorted_comments = dict(a_comments.items())
    return sorted_comments

# Applying Sentiment Analysis
def sentiment_score():
    scores = {}
    vader = SentimentIntensityAnalyzer()

    # adding custom words from data.py 
    vader.lexicon.update(new_words)
    
    tickers = sorted_tickers
    picks_sentiment = list(tickers)
    for pick in picks_sentiment:
        a_comments = comments()
        stock_comments = a_comments[pick]

        for comment in stock_comments:
            comment = remove_emoji(comment)
            score = vader.polarity_scores(comment)

            if pick in scores:
                for key, _ in score.items():
                    scores[pick][key] += score[key]
            else:
                scores[pick] = score
    return scores
    
def join_stock_data():
    # convert tickers into df
    stock_count_df = pd.DataFrame(sorted_tickers.items(), columns=['Stock', 'Count'])

    # convert scores into df
    scores = sentiment_score()
    scores_df = pd.DataFrame(scores).T
    scores_df.reset_index(inplace=True)
    scores_df.columns = ['Stock','Bearish', 'Neutral', 'Bullish', 'Total/Compound']

    # convert stock_price_list into df
    # stock_price = stock_price_info(sorted_tickers, stock_data_key) 
    # stock_price_df = pd.DataFrame(stock_price)

    # join scores into tickers
    stock_info = stock_count_df.merge(scores_df,on='Stock').round(2)
    # format percent_change
    # stock_info['Percent_Change'] = stock_info['Percent_Change'].astype(float).multiply(0.01).map("{:.2%}".format)
    # convert to json
    stock_info_json = stock_info.to_dict('records')
    return stock_info_json

# print("join_stock_data(): ", join_stock_data())


            
