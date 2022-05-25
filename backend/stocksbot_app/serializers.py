from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *

class StockListSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockList
        fields = ["id", "name"]

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "stock", "title", "content", "created_date"]