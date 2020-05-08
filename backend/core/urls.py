from django.urls import path

from . import views

urlpatterns = [
    path('', views.SecretListView.as_view(), name='index'),
]
