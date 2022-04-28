from rest_framework import generics
from jobs.api.serializers import DrinksSerializer, VendorInfoSerializer
from jobs.models import VendorInfo, Drinking

# Create your views here.
class ListView(generics.ListCreateAPIView):
    queryset = VendorInfo.objects.all().order_by('-id')
    serializer_class = VendorInfoSerializer

class DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = VendorInfo.objects.all()
    serializer_class = VendorInfoSerializer

class DrinksList(generics.ListCreateAPIView):
    queryset = Drinking.objects.all().order_by('-id')
    serializer_class = DrinksSerializer

class DrinksDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Drinking.objects.all()
    serializer_class = DrinksSerializer