from rest_framework import generics,permissions
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST
from .serializers import ItemDetailSerializer,ProfileSerializer,UserSerializer,RegisterSerializer,LoginSerializer,ItemSerializer,OrderSerializer,OrderItemsSerializer
from .models import Item,Order,OrderItem,Profile
from django.shortcuts import render,get_object_or_404,redirect
from django.utils import timezone
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
import requests
from requests.auth import HTTPBasicAuth
import json
from . mpesa_credentials import MpesaAccessToken, LipanaMpesaPpassword
from rest_framework.views import APIView
from rest_framework import filters


#####MPESA INTERHA
def getAccessToken(request):
    consumer_key = "xRnXI6CzMc4fmJMYnsybUVYtgQ8ndtUo"
    consumer_secret  = "ffYXfx8Yz9EKnBVk"
    api_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    r = requests.get(api_URL,auth=HTTPBasicAuth(consumer_key,consumer_secret))
    mpesa_access_token = json.loads(r.text)
    validated_mpesa_access_token = mpesa_access_token['access_token']
    return HttpResponse(validated_mpesa_access_token)
###requests
class MpesaPay(generics.GenericAPIView):
    serializer_class = OrderSerializer
    def post(self,request,*args,**kwargs):
        user = self.request.user
        print(user)
        print(request.data)
        # print(request.data['phone_no'])
        # print(*args,**kwargs)
        phone_no = request.data['phone_no']
        total = request.data['total']
        dest = request.data['dest']
        # print(int("254{0}".format(phone_no)))
        access_token = MpesaAccessToken.validated_mpesa_access_token
        api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        headers = {"Authorization":"Bearer %s" %access_token}
        request = {
            "BusinessShortCode":LipanaMpesaPpassword.Business_short_code,
            "Password": LipanaMpesaPpassword.decode_password,
            "Timestamp": LipanaMpesaPpassword.lipa_time,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": f'{total}',
            "PartyA": f'{phone_no}',  # replace with your phone number to get stk push
            "PartyB": LipanaMpesaPpassword.Business_short_code,
            "PhoneNumber": f'{phone_no}',  # replace with your phone number to get stk push
            "CallBackURL": "https://sandbox.safaricom.co.ke/mpesa/",
            "AccountReference": f'{self.request.user.username}',
            "TransactionDesc": "Payment of goods"
        }
        response = requests.post(api_url,json=request,headers=headers)
        print(request)
        return HttpResponse({"hey"})
def lipa_na_mpesa_online(request):
    access_token = MpesaAccessToken.validated_mpesa_access_token
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers = {"Authorization":"Bearer %s" %access_token}
    request = {
        "BusinessShortCode":LipanaMpesaPpassword.Business_short_code,
         "Password": LipanaMpesaPpassword.decode_password,
        "Timestamp": LipanaMpesaPpassword.lipa_time,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": 1,
        "PartyA": 254740415950,  # replace with your phone number to get stk push
        "PartyB": LipanaMpesaPpassword.Business_short_code,
        "PhoneNumber": 254740415950,  # replace with your phone number to get stk push
        "CallBackURL": "https://sandbox.safaricom.co.ke/mpesa/",
        "AccountReference": "Manulangat",
        "TransactionDesc": "Testing stk push"
    }
    response = requests.post(api_url,json=request,headers=headers)
    print(request)
    return HttpResponse('success')
##Register APi
class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    # queryset = Profile.objects.all()
    def get_queryset(self,request, *args, **kwargs):
        # return 
        print(request,self,*args,**kwargs)
        # user = get_object_or_404(User, pk=kwargs['id'])
        return Profile.objects.filter(user=request.pk).first()
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context()).data,
            "token":AuthToken.objects.create(user)[1]
        })

##login APi
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context()).data,
            "token":AuthToken.objects.create(user)[1]
        })
#user api
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
class ItemListView(generics.ListAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class ItemDetailView(generics.RetrieveAPIView):
    serializer_class = ItemDetailSerializer
    queryset = Item.objects.all()
    # look
    lookup_field = 'slug'
class AddToCartView(APIView):
    def post(self,request,*args,**kwargs):
        slug = request.data.get('slug',None)
        if not slug:
            return Response({"message":"Invalid Request"},status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Item,slug=slug)
        order_item,created = OrderItem.objects.get_or_create(item=item,user=request.user,ordered=False)
        order_qs = Order.objects.filter(user=request.user,ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if order.items.filter(item__slug=item.slug).exists():
                order_item.quantity += 1
                order_item.save()
                return Response(status=HTTP_200_OK)
        
            else:
        
                order.items.add(order_item)
                return Response(status=HTTP_200_OK)
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(user=request.user,ordered_date=ordered_date)
            order.items.add(order_item)
    
        # return redirect("core:product",slug= slug)
        return Response(status=HTTP_200_OK)
class OrderView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get_object(self):
        # return 
        try:
            order =Order.objects.get(user=self.request.user,ordered=False)
            return order
        except ObjectDoesNotExist:
            return Respose({"message":"incad"},status=HTTP_400_BAD_REQUEST)
class CategoryView(generics.ListAPIView):
    serializer_class = ItemSerializer
    def get_queryset(self,*args,**kwargs):
        return Item.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['=category', 'title']
class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderItemsSerializer
    # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
    queryset = OrderItem.objects.all()
    # def get_objects(self):
    #     # return
    #     try:
    #         order = Order.objects.get(user=self.request.user,ordered=False)
    #         context = {
    #             'object':order
    #         }
    #         return order
    #     except ObjectDoesNotExist:
    #         return Response({"message":"You do not have any order"},status=HTTP_400_BAD_REQUEST)
