from rest_framework import serializers
from jobs.models import Drinking, VendorInfo

class VendorInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorInfo
        fields = '__all__'

class DrinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drinking
        fields = '__all__'