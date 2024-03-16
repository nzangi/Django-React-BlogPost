from django.urls import path
from users.views import login_user,logout_user,register_user
urlpatterns = [
    path('register/',register_user,name='register'),
    path('login/',login_user,name='login'),
    path('logout/',logout_user,name='logout'),

]
