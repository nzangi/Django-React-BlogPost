from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from comments.models import Comments
from blog.serializers import PostSerializer
from blog.models import Post
from comments.serializers import CommentSerializer
from rest_framework.decorators import permission_classes,api_view
from rest_framework import status

# Create your views here.

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def view_all_comments(request,post_id):
    try:
        post_posted = Post.objects.get(pk=post_id)
        all_comments = Comments.objects.filter(commented_post=post_posted)
    except post_posted.DoesNotExist:
        return Response({'message':'There is no such post'},status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        post_comments = CommentSerializer(all_comments,many=True)
        postSerializer = PostSerializer(post_posted)
        return Response({'post':postSerializer.data,'comments':post_comments.data},status=status.HTTP_200_OK)
    return Response({'errors':post_comments.errors},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def post_to_comment(request,post_id):
    try:
        post_posted = Post.objects.get(pk=post_id)
    except post_posted.DoesNotExist:
        return Response({'message':'There is no such post'},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        comment_serializer = CommentSerializer(data=request.data)
        all_comments = Comments.objects.filter(commented_post=post_posted)
        
        postSerializer = PostSerializer(post_posted)
        if comment_serializer.is_valid():
            comment_serializer.save(commented_post=post_posted,comment_author=request.user)
            all_comments_serializer = CommentSerializer(all_comments,many=True)
            # return Response({'message':'comment successfully saved!'},status=status.HTTP_201_CREATED)
            return Response({'message':'comment successfully saved!','post':postSerializer.data,'your comment':comment_serializer.data,'all_comments':all_comments_serializer.data},status=status.HTTP_201_CREATED)
    return Response({'errors':comment_serializer.errors},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST','PUT'])
@permission_classes([IsAuthenticated])
def comment_to_update(request,comment_id):
    try:
        comment_to_update = Comments.objects.get(pk=comment_id)
    except comment_to_update.DoesNotExist:
        return Response({'message':'There is no such comment'},status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        # Creating a serializer instance for the post to be updated
        # postSerializer = PostSerializer()

        comment = CommentSerializer(comment_to_update)
        # Returning the post data in the response
        return Response(comment.data,status=status.HTTP_200_OK)
    
    if request.method == 'PUT':
        comment_serializer =CommentSerializer(comment_to_update,data=request.data)
        if comment_serializer.is_valid():
            if comment_to_update.comment_author== request.user:
                comment_serializer.save()
                return Response({'message':'comment updated sucessfully','comment update':comment_serializer.data},status=status.HTTP_200_OK)
            else:
                return Response({'message':'You cannot update this comment'},status=status.HTTP_401_UNAUTHORIZED)

        return Response({'error':comment_serializer._errors},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','DELETE'])
@permission_classes([IsAuthenticated])
def comment_to_delete(request,comment_id):
    try:
        comment_id = Comments.objects.get(pk=comment_id)
    except comment_id.DoesNotExist:
        return Response({'message':'There is no such comment'},status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        comment_id.delete()
        return Response({'message':'comment sucessfully deleted'},status=status.HTTP_200_OK)
    return Response({'message':comment_id.errors},status=status.HTTP_400_BAD_REQUEST)





