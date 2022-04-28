from ctypes import addressof
from multiprocessing import context
from rest_framework import serializers
from jobs.models import Drinking, VendorInfo


class DrinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drinking
        fields = '__all__'

class VendorInfoSerializer(serializers.ModelSerializer):
    Drinkings = DrinksSerializer(many=True)
    class Meta:
        model = VendorInfo
        fields = '__all__'

    def create(self, validated_data):
        newVendor = VendorInfo.objects.create(
            address = validated_data["address"],
            latitude = validated_data["latitude"],
            longitude = validated_data["longitude"],
            # Drinkings = validated_data["Drinkings"],
        )
        newVendor.save()

        for drink in validated_data["Drinkings"]:
            drinkObj = Drinking.objects.get(
                name = drink["name"], 
                temperature_flg = drink["temperature_flg"])
            newVendor.Drinkings.add(drinkObj)

        return newVendor

    def update(self, instance, validated_data):
        instance.address = validated_data["address"]
        instance.latitude = validated_data["latitude"]
        instance.longitude = validated_data["longitude"]
        instance.save()

        vendor = VendorInfo.objects.get(id=instance.id)
        vendor.Drinkings.clear()

        for drink in validated_data["Drinkings"]:
            drinkObj = Drinking.objects.get(
                name = drink["name"], 
                temperature_flg = drink["temperature_flg"])
            instance.Drinkings.add(drinkObj)
            
        return instance

            
