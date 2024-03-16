from rest_framework import serializers
from blog.models import Post
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    def get_author(self, user):
        return user.author.username
    
    class Meta:
        model = Post
        fields =['id','title','content','date_posted','author']

    
