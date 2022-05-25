from django.db import models
from datetime import datetime

# Create your models here.
class StockList(models.Model):
    name = models.CharField(max_length=25, unique=True)
    # notes

    def __str__(self):
        return f"LIST: {self.name}"

class Note(models.Model):
    stock = models.ForeignKey(StockList, on_delete=models.CASCADE, related_name="stocklists", null=True, default=None)
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=600, blank=False)
    created_date = models.DateField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return f"TITLE: {self.title}"