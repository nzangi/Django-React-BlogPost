from django.db import models
from django.contrib.auth.models import User
from blog.models import Post
from django.utils import timezone

# Create your models here.

class Comments(models.Model):
    commented_post = models.ForeignKey(Post,on_delete=models.CASCADE)
    comment_author = models.ForeignKey(User,on_delete=models.CASCADE)
    comment_text = models.TextField()
    commented_date = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-commented_date']

    def __str__(self):
        return self.comment_text
