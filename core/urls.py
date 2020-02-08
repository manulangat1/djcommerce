from django.urls import path,include
from .views import OrderSummaryView,item_list,HomeView,ProductDetailView,add_to_cart,remove_from_cart
app_name = "core"
from .api import ItemDetailView,lipa_na_mpesa_online,getAccessToken,ProfileView,RegisterAPI,LoginAPI,UserAPI,ItemListView,AddToCartView,OrderView,OrderDetailView
from knox import views as knox_views
urlpatterns = [
    path('',item_list,name='item-list'),
    ##mpesa api
    path('mpesa-api/',getAccessToken,name='mpesa-api'),
    path('online/lipa', lipa_na_mpesa_online, name='lipa_na_mpesa'),
    path('api/auth',include('knox.urls')),
    path('register/',RegisterAPI.as_view(),name='register'),
    path('profile/<pk>/',ProfileView.as_view(),name='profile'),
    path('login/',LoginAPI.as_view(),name='login'),
    path('logout/',knox_views.LogoutView.as_view(),name='logout'),
    path('products/',ItemListView.as_view(),name='products'),
    path('product/<slug>/',ItemDetailView.as_view(),name='products_detail'),
    path('add_to_cart/',AddToCartView.as_view(),name='add_to_cart'),
    path('get_cart_items/',OrderView.as_view(),name='get_cart_items'),
    path('get_cart/',OrderDetailView.as_view(),name='get_cart'),
    path('user/',UserAPI.as_view(),name='user'),
    path('home/',HomeView.as_view(),name='home'),
    path('order-summary/',OrderSummaryView.as_view(),name='order-summary'),
    # path('product/<slug>/',ProductDetailView.as_view(),name='product'),
    path('add_to_cart/<slug>/',add_to_cart,name='add_to_cart'),
    path('remove_from_cart/<slug>/',remove_from_cart,name='remove_from_cart'),
]