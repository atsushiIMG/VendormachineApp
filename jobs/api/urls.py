from django.urls import path
from .. import views

urlpatterns = [
    path('vendors', views.ListView.as_view(), name='list'),
    path('vendors/<int:pk>', views.DetailView.as_view(), name='detail'),
    path('drinks', views.DrinksList.as_view(), name='drinkList'),
    path('drinks/<int:pk>', views.DrinksList.as_view(), name='detail'),
]