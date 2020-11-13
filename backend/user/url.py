from django.urls import path, include
from django.contrib.auth import views as auth_views
from user import views

urlpatterns = [path("login/", views.login, name="login"), ]
