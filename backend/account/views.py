from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from .models import Profile
from django.shortcuts import get_object_or_404
from django.db import IntegrityError

# Create your views here.

@api_view(['POST','PATCH'])
@permission_classes([IsAuthenticated])
def create_user_profile(request):
    if request.method == 'POST':
        profile_serializer = ProfileSerializer(data=request.data,context={'request': request})
        print(profile_serializer)
        print(request.user)
        
        if profile_serializer.is_valid():
            profile_serializer.save(profile_user=request.user)
            
            return Response({'message':'Profile was sucessfully created','profile_serializer':profile_serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Profile was not created sucessfully.'},status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['GET','POST','PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user_profile = get_object_or_404(Profile,profile_user=request.user)

    if request.method == 'GET':
        profile_serializer = ProfileSerializer(user_profile)
        return Response(profile_serializer.data)
    
    if request.method == 'PUT':
        profile_serializer = ProfileSerializer(user_profile,data=request.data)
        if profile_serializer.is_valid():
            try:
                profile_serializer.save()
                return Response({'message':'Account details updated sucessfully','account':profile_serializer.data},status=status.HTTP_200_OK)
            except IntegrityError:
                return Response({'error': 'Username or email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(profile_serializer.errors,status=status.HTTP_400_BAD_REQUEST)


