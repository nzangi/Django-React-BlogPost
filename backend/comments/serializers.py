from rest_framework import serializers
from comments.models import Comments
from blog.serializers import PostSerializer


class CommentSerializer(serializers.ModelSerializer):
    comment_author = serializers.SerializerMethodField()
    # commented_post = PostSerializer()

    def get_comment_author(self, user):
        return user.comment_author.username
    
    class Meta:
        model = Comments
        fields = ['id','comment_text','comment_author','commented_date']