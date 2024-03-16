from django.shortcuts import render
from rest_framework.response import Response
from blog.serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.db import transaction
from rest_framework.decorators import permission_classes,api_view
from blog.models import Post
from django.contrib.auth.models import User
from rest_framework import status
from django.http import HttpResponse

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def view_posts(request):
    if request.method =='GET':
        posts = Post.objects.all()
        postSerializer = PostSerializer(posts,many=True)
        return Response({'data':postSerializer.data},status=status.HTTP_200_OK)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_post(request):
    if request.method == 'POST':
        postSerializer = PostSerializer(data=request.data)
        if postSerializer.is_valid():
            with transaction.atomic():
                postSerializer.save(author=request.user)
            return Response(postSerializer.data,status=status.HTTP_201_CREATED)
        return Response(postSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','POST','PUT'])
@permission_classes([IsAuthenticated])
def update_post(request,post_id):
    try:
        post_to_update = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return Response({'message':'The blog post doesnot exists'},status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        post = PostSerializer(post_to_update)
        return Response(post.data,status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        post = PostSerializer(post_to_update)
        post_serializer = PostSerializer(post_to_update,data=request.data)
        if post_serializer.is_valid():
            if post_to_update.author == request.user:
                post_serializer.save()
                return Response(post_serializer.data)
            else:
                return Response({'message':'You cannot update this post'},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(post_serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST','DELETE'])
@permission_classes([IsAuthenticated])   
def delete_post(request,post_id):
    try:
        post_to_delete = Post.objects.get(pk=post_id)
        
        if request.method == "POST" or request.method == "DELETE":
            if post_to_delete.author == request.user:
                post_to_delete.delete()
                return Response({'message':'The post was deleted sucessfully!'})
            else:
                return Response({'message':'You cannot delete this post. You are not the author'})
    except Post.DoesNotExist:
        return Response({'message':'The post doesnot exists'})
    

    





 
