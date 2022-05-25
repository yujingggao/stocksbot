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

    return tickers, a_comments

stock_all_comments = stock_comments('wallstreetbets')

# return value
def tickers(n): 
    # tickers = stock_comments_test[0]
    tickers = stock_all_comments[0]
    sorted_tickers = dict(sorted(tickers.items(), key=lambda item: item[1], reverse = True))
    first_n_tickers = dict(list(test_dict.items())[0: n]) 

    return sorted_tickers

sorted_tickers = tickers(15)
print(sorted_tickers)