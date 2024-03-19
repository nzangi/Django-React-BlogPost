from rest_framework import serializers
from blog.models import Post
from account.models import Profile

# from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()



    # def get_author(self, user):
    #     return user.author.username
    def get_author(self, post):
        return post.author.username
    
    def get_image(self,post):
        try:
            return post.author.profile.image.url
        except Profile.DoesNotExist:
            # Handle the case where Profile does not exist for the User
            return None  # or return a default image  
    
    class Meta:
        model = Post
        fields =['id','title','content','date_posted','author','image']

    
