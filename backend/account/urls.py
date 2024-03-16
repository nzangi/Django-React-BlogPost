from django.urls import path
from account.views import create_user_profile,update_profile
urlpatterns = [
    path('create_profile/',create_user_profile,name='create_profile'),
    path('update_profile/',update_profile,name='update_profile'),
]
