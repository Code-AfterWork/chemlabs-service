from django.db import models
from django.utils import timezone
from django.conf import settings
from users.models import CustomUser

# from oauth2_provider.models import AbstractApplication
# from django.utils.translation import gettext_lazy as _

# opting to have all database definition code in one file
# CREATE 4 TABLES
# 1. EQUIPMENT
# 2. INSTITUTION
# 3. CHEM-LABS STAFF
# 4. JOB_CARD

class Institution(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    region = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    email_address = models.EmailField()
    phone = models.IntegerField()

    def __str__(self):
        return self.name

class Equipment(models.Model):
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='equipments')
    equipment = models.CharField(max_length=30)
    serial_number = models.CharField(max_length=30, primary_key=True)
    install_date = models.DateField()
    contract_end = models.DateField()
    status = models.BooleanField()
    first_serv = models.DateField(null=True, blank=True)
    validation = models.BooleanField(null=True, blank=True)
    second_serv = models.DateField(null=True, blank=True)
    validation = models.BooleanField(null=True, blank=True)
    contract_type = models.CharField(max_length=30)

    def __str__(self):
        return self.serial_number

# TODO
# use ForeignKey for received by and requested by

class JobCard(models.Model):
    jobcard_id = models.AutoField(primary_key=True)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    received_by = models.CharField(max_length=30)
    job_start_date = models.DateField()
    job_end_date = models.DateField()
    requested_by = models.CharField(max_length=30)
    ok_checklist = models.CharField(max_length=30, null=True)
    faulty_checklist = models.CharField(max_length=30, null=True)
    spare_used = models.CharField(max_length=30)
    labor_charge = models.CharField(max_length=30)
    total_cost = models.CharField(max_length=30)
    jobcard_created_at = models.DateTimeField(default=timezone.now)
    uploaded_media = models.FileField(upload_to='jobcards/', null=True, blank=True)
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
