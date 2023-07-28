from django.db import models
from users.models import CustomUser
from clients.models import Ticket
from django.utils import timezone
from django.conf import settings

class Institution(models.Model):
    _id = models.AutoField(primary_key=True) # might decide to get the code form Sage
    region = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    email = models.EmailField()
    phone = models.IntegerField(null=True)
    contact_person = models.TextField(blank=True) # or lab in charge

    def __str__(self):
        return self.name

class Equipment(models.Model):
    # _id=models.AutoField()
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='equipments')
    equipment_name = models.CharField(max_length=30)
    serial_number = models.CharField(max_length=50, primary_key=True, unique=True)
    install_date = models.DateField()
    contract_end = models.DateField()
    status = models.BooleanField()
    first_serv = models.DateField(null=True, blank=True)
    validation = models.BooleanField(null=True, blank=True)
    second_serv = models.DateField(null=True, blank=True)
    validation = models.BooleanField(null=True, blank=True)
    contract_type = models.CharField(max_length=30)
     # Month when the last contract was renewed dynamic data/ counts down 1 year from that, frontend will handle
    contract_renewal_month = models.DateField(blank=True)
    # last time service was done, counts down 6 months from then/ frontend will handle the countdown
    last_service = models.DateField(blank=True) 

    def __str__(self):
        return self.serial_number

class JobCard(models.Model):
    CONTRACT_TYPE_CHOICES = (
        ('comprehensive', 'Comprehensive'),
        ('on_call', 'On-Call'), # essentialy no agreement, just call me whenever you need me
        ('reagent', 'Reagent'),
        ('standard', 'Standard'),
        ('warranty', 'Warranty'),
        ('break_down', 'Break Down'),
    )

    JOBCARD_TYPE_CHOICES = (
    ('application', 'Application'),
    ('service', 'Service'),
    )

    jobcard_id = models.AutoField(primary_key=True) # like normal id field, autoincrements
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    received_by = models.CharField(max_length=30)
    requested_by = models.CharField(max_length=30)
    ok_checklist = models.CharField(max_length=30, null=True)
    faulty_checklist = models.CharField(max_length=30, null=True)
    spare_used = models.CharField(max_length=30)
    labor_charge = models.CharField(max_length=30)
    total_cost = models.CharField(max_length=30)
    jobcard_created_at = models.DateTimeField(default=timezone.now)
    uploaded_media = models.FileField(upload_to='jobcards/', null=True, blank=True)
    contract_type = models.CharField(choices=CONTRACT_TYPE_CHOICES, default='',  max_length=30)
    jobcard_type=models.CharField(choices=JOBCARD_TYPE_CHOICES, default='service',  max_length=30)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    root_cause = models.TextField(blank=True)
    comments = models.TextField(blank=True)
    # commenting this before migrating solves the circular imports error
    created_by = models.ForeignKey(
        CustomUser,
        related_name="engineer_jobcards",
        null=True,
        on_delete=models.SET_NULL
    )

    class Meta:
        ordering = ("-jobcard_created_at",)

    # def __str__(self):
    #     return int(self.jobcard_id)
