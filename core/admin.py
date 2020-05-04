from django.contrib import admin
from .models import Variation,ItemVariation,Item,OrderItem,Order,Profile
# Register your models here.

class ItemVariationAdmin(admin.ModelAdmin):
    list_display = [
        'variation',
        'value',
        'attachment'
    ]
    list_filter = ['variation','variation__item']
    search_fields = ['value']
class ItemVariationInlineAdmin(admin.TabularInline):
    model = ItemVariation
    extra = 1
class VariationAdmin(admin.ModelAdmin):
    list_display = [
        'item',
        'name'
    ]
    list_filter = ['item']
    search_fields = ['name']
    inlines = [ItemVariationInlineAdmin]
admin.site.register(ItemVariation,ItemVariationAdmin)
admin.site.register(Variation,VariationAdmin)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Item)
admin.site.register(Profile)
