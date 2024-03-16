from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterUserSerializer(serializers.ModelSerializer):
    confirm_passowrd = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields =['username','email','password','confirm_passowrd']
        extra_kwargs ={
            'username':{'required':True},
            'email':{'required':True},
            'password':{'write_only': True},

        }
    
    def validate(self,data):
        if data['password'] != data['confirm_passowrd']:
            raise serializers.ValidationError("Passwords don't match")
        return data
    def create(self,validated_data):
        validated_data.pop('confirm_passowrd')
        user = User.objects.create(**validated_data)
        return user
    
class LoginUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type':'password'})

    class Meta:
        model = User
        fields = ['username','password']
    
    