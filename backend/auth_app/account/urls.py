from django.urls import path, include
from rest_framework import routers
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = []
