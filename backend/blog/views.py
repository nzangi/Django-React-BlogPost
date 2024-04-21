from django.shortcuts import render
from rest_framework.response import Response
from blog.serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.db import transaction
from rest_framework.decorators import permission_classes,api_view
from blog.models import Post
from django.contrib.auth.models import User
from rest_framework import status

# Create your views here.
# Get All the Posts
@api_view(['GET']) # Decorator to define allowed HTTP methods for this view
@permission_classes([AllowAny])
def view_posts(request):
    if request.method =='GET':
        posts = Post.objects.all()
        postSerializer = PostSerializer(posts,many=True)
        return Response({'data':postSerializer.data},status=status.HTTP_200_OK)
    
# Post a  Post

@api_view(['POST']) # Decorator to define allowed HTTP methods for this view
@permission_classes([IsAuthenticated])  # Decorator to define allowed HTTP methods for this view
def post_post(request):
    # Check if the request method is POST
    if request.method == 'POST': 
        # Create a serializer instance with the data from the request
        postSerializer = PostSerializer(data=request.data)
        # Check if the data provided in the request is valid according to serializer's validation rules
        if postSerializer.is_valid():
            # Start a transaction to ensure data integrity
            with transaction.atomic():
                # Save the post data to the database with the current user as the author
                postSerializer.save(author=request.user)
            # Return the serialized data of the created post with status 201 Created
            return Response(postSerializer.data,status=status.HTTP_201_CREATED)
        # Return errors if data is not valid with status 400 Bad Request
        return Response(postSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# update  a  Post
@api_view(['GET','POST','PUT']) # Decorator to define allowed HTTP methods for this view
@permission_classes([IsAuthenticated])
def update_post(request,post_id):
    # get the id of post to update
    try:
        post_to_update = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return Response({'message':'The blog post doesnot exists'},status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        # Creating a serializer instance for the post to be updated
        post = PostSerializer(post_to_update)
        # Returning the post data in the response
        return Response(post.data,status=status.HTTP_200_OK)
    # update the post
    elif request.method == 'PUT':
        # Creating a serializer instance for the post to be updated
        post = PostSerializer(post_to_update)
        # Creating another serializer instance for the post to be updated with the data received in the request
        post_serializer = PostSerializer(post_to_update,data=request.data)
        # Checking if the data provided in the request is valid according to the serializer's validation rules
        if post_serializer.is_valid():
            # Checking if the author of the post to be updated matches the current user
            if post_to_update.author == request.user:
                # If the author matches, saving the updated data to the database
                post_serializer.save()
                # Returning the updated post data in the response
                return Response(post_serializer.data)
            else:
                # If the author does not match, returning an unauthorized response
                return Response({'error':'You cannot update this post'},status=status.HTTP_401_UNAUTHORIZED)
        else:
            # If the data provided in the request is not valid, returning a bad request response with error details
            return Response(post_serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST','DELETE']) # Decorator to define allowed HTTP methods for this view
@permission_classes([IsAuthenticated])  # Decorator to specify required permissions for this view 
def delete_post(request,post_id):
    # Retrieve the post to delete based on the provided post_id    t
    try:
        post_to_delete = Post.objects.get(pk=post_id)
        # Check if the request method is either POST or DELETE
        if request.method == "POST" or request.method == "DELETE":
            # Check if the author of the post matches the current user
            if post_to_delete.author == request.user:
                # If the author matches, delete the post
                post_to_delete.delete()
                # Return a success message in the response
                return Response({'message':'The post was deleted sucessfully!'})
            else:
                # If the author doesn't match, return an error message indicating the user cannot delete the post
                return Response({'message':'You cannot delete this post. You are not the author'})
    except Post.DoesNotExist:
        # If the post with the provided post_id does not exist, return an error message
        return Response({'message':'The post doesnot exists'})
    

    





 
