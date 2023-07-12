from django.db import models
from core.models import Equipment
from employees.models import Employee
from users.models import CustomUser
from django.conf import settings

class Ticket(models.Model):
    serial_number = models.OneToOneField(Equipment, on_delete=models.CASCADE)
    equipment = models.CharField( max_length=30)
    title = models.CharField(max_length=30)
    status = models.CharField(max_length=30) #completed, ongoing, pending
    description = models.CharField(max_length=30)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='completed_tickets', null=True, blank=True)
    completed = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self):
        return self.title