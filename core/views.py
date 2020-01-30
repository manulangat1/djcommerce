from django.shortcuts import render,get_object_or_404,redirect
from django.views.generic import ListView,DetailView
from .models import Item,OrderItem,Order
from django.utils import timezone
from django.contrib import messages 


# Create your views here.
def item_list(request):
    context = {
        "items": Item.objects.all()
    }
    return render(request,"home-page.html",context)
class HomeView(ListView):
    model = Item
    template_name = "products.html"
    paginate_by= 4
class OrderSummaryView(ListView):
    def get(self,*args,**kwargs):
        return render(self.request,'order_summary.html')
class ProductDetailView(DetailView):
    model = Item
    template_name = "product.html"
def add_to_cart(request,slug):
    item = get_object_or_404(Item,slug=slug)
    order_item,created = OrderItem.objects.get_or_create(item=item,user=request.user,ordered=False)
    order_qs = Order.objects.filter(user=request.user,ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__slug=item.slug).exists():
            order_item.quantity += 1
            order_item.save()
            messages.info(request,"item added to cart")
        else:
            messages.info(request,"item added to cart")
            order.items.add(order_item)
    else:
        ordered_date = timezone.now()
        order = Order.objects.create(user=request.user,ordered_date=ordered_date)
        order.items.add(order_item)
        messages.info(request,"item added to cart")
    return redirect("core:product",slug= slug)
def remove_from_cart(request,slug):
    item = get_object_or_404(Item,slug=slug)
    order_qs = Order.objects.filter(
        user=request.user,
        ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__slug=item.slug).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
                )[0]
            order.items.remove(order_item)
            messages.info(request,"item removed from cart")
        else:
            messages.info(request,"item does not exist")
            return redirect("core:product",slug=slug)   
    else:
        messages.info(request,"item does not exist")
        return redirect("core:product",slug=slug)
    return redirect("core:product",slug=slug)