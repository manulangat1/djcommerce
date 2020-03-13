from django.conf import settings
from django.db import models
from django.shortcuts import reverse
from django.contrib.auth.models import User
# Create your models here.
CATEGORY_CHOICES = (
    ('S','Shirt'),
    ('Sw','Sport wear'),
    ('Ow','Outwear'),
)
LABEL_CHOICES = (
    ('P','primary'),
    ('S','secondary'),
    ('D','danger'),
)
class Item(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField(blank=True,null=True)
    pic = models.ImageField(upload_to='articles/',null=True,blank=True)
    pic1 = models.ImageField(upload_to='articles/',null=True,blank=True)
    pic2 = models.ImageField(upload_to='articles/',null=True,blank=True)
    discount_price = models.FloatField(blank=True,null=True)
    slug = models.SlugField(blank=True,null=True)
    category = models.CharField(choices=CATEGORY_CHOICES,max_length=10,blank=True,null=True)
    label = models.CharField(choices=LABEL_CHOICES,max_length=10,blank=True,null=True)
    
    def __str__(self):
        return self.title
    def get_absolute_url(self):
        return reverse("core:product",kwargs={
            'slug': self.slug
        })
    def get_add_to_cart_url(self):
        return reverse("core:add_to_cart",kwargs={
            'slug': self.slug
        })
    def get_remove_from_cart_url(self):
        return reverse("core:remove_from_cart",kwargs={
            'slug': self.slug
        })

    
class Variation(models.Model):
    item = models.ForeignKey(Item,on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    class Meta:
        unique_together = (
            ('item','name'),
        )

    def __str__(self):
        return self.name
    
class ItemVariation(models.Model):
    variation = models.ForeignKey(Variation,on_delete=models.CASCADE)
    value = models.CharField(max_length=50) # S,M,L
    attachment = models.ImageField(upload_to='variations/')

    class Meta:
        unique_together = (
            ('variation','value'),
        )
    def __str__(self):
        return self.value
class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,blank=True,null=True)
    ordered = models.BooleanField(default=False,blank=True,null=True)
    item = models.ForeignKey(Item,on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1,blank=True,null=True)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"
    def get_total_item_price(self):
        return self.quantity * self.item.price
    def get_total_discount_item_price(self):
        return self.quantity * self.item.discount_price
    def get_amount_saved(self):
        return self.get_total_item_price() - self.get_total_discount_item_price()
    def get_final_price(self):
        if self.item.discount_price:
            return self.get_total_discount_item_price()
        return self.get_total_item_price()
class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    def __str__(self):
        return self.user.username
    def get_total(self):
        total = 0 
        for order_item in self.items.all():
            total += order_item.get_final_price()
        return total
class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=True,blank=True)
    bio = models.TextField()

    # def __str__(self):
    #     return self.user.username
    def __str__(self):
        print(self.user.username)
        # return self.user.username