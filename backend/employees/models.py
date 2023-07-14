from django.db import models
from core.models import Institution

class Employee(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    # id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)


    def __str__(self):
        return self.name