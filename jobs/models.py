from django.db import models

# Create your models here.
class Drinking(models.Model):
    name = models.CharField(max_length=50)
    temperature_flg = models.CharField(max_length=1)

    def __str__(self):
        return self.name

class VendorInfo(models.Model):
    address = models.CharField(max_length=200)
    longitude = models.DecimalField(max_digits=11, decimal_places=8)
    latitude = models.DecimalField(max_digits=11, decimal_places=8)
    created_at = models.DateField(auto_now_add=True)
    Drinkings = models.ManyToManyField(Drinking)
    
    def __str__(self):
        return self.address
