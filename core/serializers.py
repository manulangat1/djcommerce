from rest_framework import serializers

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Item,Order,OrderItem,Profile

##User Serializer
class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self,value):
        return value
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email')
###Reggister Seria;
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password','email',)
        extra_kwargs = {'password':{'write_only':True}}

        def create(self,validated_data):
            user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
            return user
##Login Serial
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password =  serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incoreect Validations")
class ItemSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    label = serializers.SerializerMethodField()
    class Meta:
        model = Item
        fields =(
            'id',
            'title',
            'price',
            'pic',
            'discount_price',
            'category',
            'label',
            'slug',
            'description',
        )
    def get_category(self,obj):
        return obj.get_category_display()
    def get_label(self,obj):
        return obj.get_label_display()
class OrderItemsSerializer(serializers.ModelSerializer):
    item = StringSerializer()
    final_price = serializers.SerializerMethodField()
    item_obj = serializers.SerializerMethodField()
    class Meta:
        model = OrderItem
        fields =(
            'id',
            'item',
            'item_obj',
            'final_price',
            'quantity'
        )
    def get_item_obj(self,obj):
        return ItemSerializer(obj.item).data
    def get_final_price(self,obj):
        return obj.get_final_price()
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields =(
            'id',
            'items',
            'total',
            'orderItems',
        )
    def get_orderItems(self,obj):
        return OrderItemsSerializer(obj.items.all(),many=True).data
    def get_total(self,obj):
        return obj.get_total()
class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = (
            'user',
            'bio',
        )
    def get_user(self,obj):
        return UserSerializer(obj.profile.all()).data
        # user = User.objects.filter(username=self.request.user.username).all()
        # return user