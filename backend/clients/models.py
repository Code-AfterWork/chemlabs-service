from django.db import models
# from core.models import Equipment
from django.conf import settings
from users.models import CustomUser

from core.models import Equipment

class Ticket(models.Model):

    TICKET_STATUS_CHOICES = (
    ('pending', 'Pending'),
    ('assigned', 'Assigned'),
    ('in-progress', 'In-Progress'),
    ('completed', 'Completed'),
    )

    TICKET_TYPE_CHOICES = (
    ('application', 'Application'),
    ('service', 'Service'),
    )

    _id= models.AutoField(primary_key=True) # not a fun of working with django's hidden fields
    serial_number = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name='tickets')
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=30)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_tickets')
    jobcard_type=models.CharField(choices=TICKET_TYPE_CHOICES, default='service', max_length=30)
    assigned_to = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='assigned_tickets',
        null=True,
        blank=True,
        to_field='email',  # Only accept Manager and Employee users
        limit_choices_to={'is_employee': True}  # Additional constraint to restrict to employees
    )
    status = models.CharField(choices=TICKET_STATUS_CHOICES, default='pending',  max_length=30)

    def __str__(self):
        return self.title

# stores errors received
class ErrorLog(models.Model):
    facility = models.CharField(max_length=100)
    error = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.facility} - {self.error}"       