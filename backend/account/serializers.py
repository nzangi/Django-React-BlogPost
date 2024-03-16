from account.models import Profile
from rest_framework import serializers
from django.contrib.auth.models import User


class ProfileSerializer(serializers.ModelSerializer):
    '''Profile User Fields'''
    username = serializers.CharField(source='profile_user.username')
    email = serializers.CharField(source='profile_user.email')
   

    class Meta:
        model = Profile
        # Get the profile_user currently Logged In User
        fields = ['username','email','title','description','image']

    def update(self,instance,validated_data):
        #Update Profile Details
        instance.title = validated_data.get('title',instance.title)
        instance.description = validated_data.get('description',instance.description)
        instance.image = validated_data.get('image',instance.image)

        #Update User Details
        user_data = validated_data.pop('profile_user', {})  # Extract user data if available
        user = instance.profile_user
        user.username = user_data.get('username',user.username)
        user.email = user_data.get('email',user.email)

        #Save Profile and User
        instance.save()
        user.save()


        return instance
