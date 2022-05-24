from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# create a router instance
router = DefaultRouter()

# add in the views sets that will manage resource actions
router.register("stock-list", StockListViewSet, basename="stock-list")
router.register("notes", NoteViewSet, basename="notes")

urlpatterns = [
    path("", include(router.urls)),
    path("reddit_api/", reddit_post, name='reddit_api'),
    path("finnhub_api/", stock_quote, name='finnhub_api')
]
