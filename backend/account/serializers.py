from account.models import Profile
from rest_framework import serializers
from django.contrib.auth.models import User


class ProfileSerializer(serializers.ModelSerializer):
    '''Profile User Fields'''
    username = serializers.CharField(source='profile_user.username')
    email = serializers.CharField(source='profile_user.email')

    # username = serializers.SerializerMethodField()
    # email = serializers.SerializerMethodField()

    # def get_username(self, account):
    #     return account.profile_user.username


    # def get_email(self, account):
    #         return account.profile_user.email

    class Meta:
        model = Profile
        # Get the profile_user currently Logged In User
        fields = ['username', 'email', 'title', 'description', 'image']

    def create(self, validated_data):
        # Extract user data if available
        user_data = validated_data.pop('profile_user', {})
        
        # Get the existing user or create a new one if not exists
        user = self.context['request'].user
        
        if not user.username and 'username' in user_data:
            user.username = user_data['username']
        if not user.email and 'email' in user_data:
            user.email = user_data['email']
        user.save()
        
        # Create the profile associated with the existing user
        profile = Profile.objects.create(profile_user=user, **validated_data)
        return profile


    def update(self, instance, validated_data):
        # Update Profile Details
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.image = validated_data.get('image', instance.image)

        # Update User Details
        # Extract user data if available
        user_data = validated_data.pop('profile_user', {})
        user = instance.profile_user
        user.username = user_data.get('username', user.username)
        user.email = user_data.get('email', user.email)

        # Save Profile and User
        instance.save()
        user.save()

        return instance
