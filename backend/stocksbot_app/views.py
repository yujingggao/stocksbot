from .serializers import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.http import JsonResponse
from .api_response_test import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .finnhub_api import *
from .keys import stock_data_key
import json


from .reddit_api import comments, join_stock_data

# Create your views here.

def reddit_post(request):
    comment_data = comments()
    stock_data = join_stock_data()
    data = { "comments": comment_data,
             "stock_data": stock_data}

    # temp
    # data = {
    #         "comments": res['comments'],
    #         "stock_data": res['stock_data']
    #         }
             
    return JsonResponse(data)

@csrf_exempt
# @api_view(["POST"])
def stock_quote(request):
    try:
        post_data = json.loads(request.body) #json(axios convert dict to json) convert to python
        if post_data:
            stock = post_data.get("stock")

            print("stock: ", stock)
            quote_data = get_stock_quote(stock, stock_data_key)
            data = { "quote": quote_data}
            return JsonResponse(data)
        else:
            return JsonResponse({"error": "no data"})
    except: 
        return JsonResponse({"error": "show"})
    # quote_data = join_stock_data()
    

    # temp
    # data = {
    #         "quote": res['quote_data'],
    #         }
             
    

class StockListViewSet(ModelViewSet):
    queryset = StockList.objects.all()
    serializer_class = StockListSerializer

    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user)
    #     return super().perform_create(serializer)

class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer