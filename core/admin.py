from django.contrib import admin
from .models import Item,OrderItem,Order,Profile
# Register your models here.
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Item)
admin.site.register(Profile)
