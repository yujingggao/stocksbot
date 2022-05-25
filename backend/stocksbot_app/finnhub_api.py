import finnhub
import re



# get stock quote from Finnhub API
def get_stock_quote(stock, key): 
    try: 
        if stock:
            finnhub_client = finnhub.Client(api_key=key)
            quote = finnhub_client.quote(stock)
             # move it to stock_price_list
            return quote
    except: pass

