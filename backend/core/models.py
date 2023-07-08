from django.db import models
from django.utils import timezone
from oauth2_provider.models import AbstractApplication
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from users.models import CustomUser

# o auth2 not active for now
class OAuth2Application(AbstractApplication):
    # Add any additional fields you require for your OAuth2 application
    pass


# opting to have all database definition code in one file
# CREATE 4 TABLES
# 1. EQUIPMENTS
# 2. INSTITUTION
# 3. CHEM-LABS STAFF
# 4. JOB_CARDS


class Equipments(models.Model):
    # id = models.CharField(max_length=30) #maps id from sage 300
    region = models.CharField(max_length=30)
    inst_name = models.CharField(max_length=30)
    equipment = models.CharField(max_length=30)
    serial_number = models.CharField(max_length=30, primary_key=True)
    install_date = models.DateField()
    contract_end = models.DateField()
    status = models.BooleanField()
    first_serv = models.DateField()
    validation = models.BooleanField()
    second_serv = models.DateField()
    validation = models.BooleanField()
    contract_type = models.CharField(max_length=30)

    
    def __str__(self):
        return self.serial_number

class Institution(models.Model): 
    inst_id = models.CharField(max_length=30, primary_key=True) #maps id from sage 300
    region = models.CharField(max_length=30,)
    inst_name = models.CharField(max_length=30)
    equipment = models.CharField(max_length=30)
    serial_number = models.ForeignKey(Equipments, on_delete=models.CASCADE)
    install_date = models.DateField()
    error_reported = models.CharField(max_length=30) 
    engineer = models.CharField(max_length=30)   

class Employees(models.Model):
    eng_id= models.CharField(max_length=30,  primary_key=True)
    serial_number = models.ForeignKey(Equipments, on_delete=models.CASCADE)
    region = models.CharField(max_length=30)
    inst_name = models.CharField(max_length=30)
    equipment = models.CharField(max_length=30)
    eng_name = models.CharField(max_length=30,)
    issue = models.CharField(max_length=30) 
    comment = models.CharField(max_length=30)

class jobCards(models.Model):
    jobcard_id = models.CharField(max_length=30, primary_key=True)
    region = models.CharField(max_length=30)
    inst_name = models.CharField(max_length=30)
    equipment = models.CharField(max_length=30)
    serial_number = models.ForeignKey(Equipments, on_delete=models.CASCADE)
    received_by = models.CharField(max_length=30)
    job_start_date = models.DateField()
    job_end_date = models.DateField()
    requested_by = models.CharField(max_length=30)
    ok_checklist = models.CharField(max_length=30, null=True)
    faulty_checklist = models.CharField(max_length=30, null=True)
    spare_used = models.CharField(max_length=30)
    labor_charge = models.CharField(max_length=30,)
    total_cost = models.CharField(max_length=30)
    jobcard_created_at = models.DateTimeField(default=timezone.now)
    uploaded_media = models.FileField(upload_to='jobcards/', null=True)
    #data on who created the jobcard
    created_by = models.ForeignKey(
        CustomUser,
        related_name="Engineer",
        null=True,
        on_delete=models.SET_NULL,
    )

    
    class Meta:
        ordering = ("-jobcard_created_at",)

    def __str__(self):
        return f"{self.jobcard_id} by {self.created_by}"    



# after job card is field, frontend will populate this data
class GeneratedJobCards(models.Model):
    jobcardcard_id = models.CharField(max_length=30, primary_key=True)
    inst_name = models.CharField(max_length=30)
    equipment = models.CharField(max_length=30)
    serial_number = models.ForeignKey(Equipments, on_delete=models.CASCADE)
    uploaded_media = models.FileField(upload_to='jobcards/')

# clients are the only users who can access this model
class Issues(models.Model):
    equipment = models.CharField(max_length=30)
    title=models.CharField(max_length=30)
    status= models.CharField(max_length=30)
    serial_number = models.ForeignKey(Equipments, on_delete=models.CASCADE)
    description = models.CharField(max_length=30)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(Employees, on_delete=models.CASCADE, related_name='completed_issues', null=True, blank=True)
    completed = models.BooleanField(default=False)




