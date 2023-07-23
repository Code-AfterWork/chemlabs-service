# from django.db import models
# from core.models import Institution
# from django.conf import settings

# class Employee(models.Model):
#     id = models.CharField(max_length=30, primary_key=True)
#     email = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default="2")
#     institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
#     name = models.CharField(max_length=30)


#     def __str__(self):
#         return self.name