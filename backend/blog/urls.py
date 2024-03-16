from django.urls import path
from blog.views import view_posts,post_post,update_post,delete_post
urlpatterns = [
    path('',view_posts,name='view_post'),
    path('post/',post_post,name='post'),
    path('update_post/<int:post_id>/',update_post,name='update_post'),
    path('delete_post/<int:post_id>/',delete_post,name='delete_post'),

]
