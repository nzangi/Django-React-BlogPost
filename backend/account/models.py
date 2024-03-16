from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    profile_user = models.OneToOneField(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=100,blank=True,null=True)
    description = models.CharField(max_length=300,blank=True,null=True)
    image = models.ImageField(upload_to='media',blank=True,null=True)

    def __str__(self) -> str:
        return f'{self.profile_user.username} profile'