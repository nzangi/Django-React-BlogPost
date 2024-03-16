from django.urls import path
from comments.views import post_to_comment,view_all_comments,comment_to_delete,comment_to_update

urlpatterns = [
    path('post/<int:post_id>/all_comments/',view_all_comments,name='view_all_comments'),
    path('post/<int:post_id>/post_to_comment/',post_to_comment,name='post_to_comment'),
    path('<int:comment_id>/comment_to_update/',comment_to_update,name='comment_to_update'),
    path('<int:comment_id>/comment_to_delete/',comment_to_delete,name='comment_to_delete'),
]
