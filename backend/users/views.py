from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from users.serializers import RegisterUserSerializer,LoginUserSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


# Server
#AlwaysData
# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        registerUserSerializer = RegisterUserSerializer(data=request.data)
        if registerUserSerializer.is_valid():
            with transaction.atomic():
                registerUserSerializer.save()
            return Response({'message':'Account was created successfully!'},status=status.HTTP_200_OK)
        else:
            return Response({'error':'Something went wrong. Try again!'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    if request.method == 'POST':
        # Get Username and passowrd
        username = request.data.get('username')
        password = request.data.get('password')
        # Login in user with the passord nad username
        user = authenticate(request,username=username,password=password)

        # if user exists in db, assign token else show error message
        if user is not None:
            token,_ = Token.objects.get_or_create(user=user)
            return Response({'message':'You have sucessfully logged in !','username':username,'token':token.key},status=status.HTTP_200_OK)
        else:
            return Response({'error':'Invlaid log in credentials'},status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    if request.method == 'POST':
        # delete the looged user auth token
        try:
            request.user.auth_token.delete()
            return Response({'message':'You have sucessfully logged out!'})
        except Exception as e:
            return Response({'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

        
        






