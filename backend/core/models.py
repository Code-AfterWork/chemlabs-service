from django.db import models
from django.utils import timezone
from django.conf import settings
from users.models import CustomUser


class Institution(models.Model):
    region = models.CharField(max_length=30)
    name = models.CharField(max_length=30, primary_key=True)
    email_address = models.EmailField(max_length=254)
    phone = models.CharField(max_length=30)
    address = models.CharField(max_length=60)


    def __str__(self):
        return self.name


class Equipment(models.Model):
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    equipment = models.CharField(max_length=30)
    serial_number = models.CharField(max_length=30, primary_key=True)
    # serial_number = models.CharField(max_length=30)
    install_date = models.DateField()
    contract_end = models.DateField()
    status = models.BooleanField()
    first_serv = models.DateField(null=True, blank=True)
    validation = models.BooleanField(null=True, blank=True)
    second_serv = models.DateField(null=True, blank=True)
    validation2 = models.BooleanField(null=True, blank=True)
    contract_type = models.CharField(max_length=30)

    def __str__(self):
        return self.serial_number        

class Ticket(models.Model):
    serial_number = models.ForeignKey(Equipment, on_delete=models.CASCADE, null=True, blank=True)
    equipment = models.CharField(max_length=30)
    title = models.CharField(max_length=30)
    status = models.BooleanField(default=False)
    description = models.TextField()
    upload = models.FileField(upload_to="ticket_photos/%Y/%m/%d/", null=True, blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_tickets'
    )
    assigned_to = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='assigned_tickets',
        null=True,
        blank=True
    )

    assigned_updated_at = models.DateTimeField(null=True, blank=True)
    marked_complete_at = models.DateTimeField(null=True, blank=True)
    time_taken = models.DurationField(null=True, blank=True) 
    turn_around = models.DurationField(null=True, blank=True)
    created_at = models.DateTimeField(null=True, blank=True) 

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.id:
            old_ticket = Ticket.objects.get(id=self.id)
            if self.assigned_to != old_ticket.assigned_to:
                self.assigned_updated_at = timezone.now()

        # If the status is being changed to 'completed', update the marked_complete_at field
        if self.status and self.marked_complete_at is None:
            self.marked_complete_at = timezone.now()
        elif not self.status:
            self.marked_complete_at = None  # Reset marked_complete_at if status is not 'completed'

        # Calculate time_taken if both assigned_updated_at and marked_complete_at are set
        if self.assigned_updated_at and self.marked_complete_at:
            self.time_taken = self.marked_complete_at - self.assigned_updated_at
        else:
            self.time_taken = None

        # Calculate turn_around if both created_at and marked_complete_at are set
        if self.created_at and self.marked_complete_at:
            self.turn_around = self.marked_complete_at - self.created_at
        else:
            self.turn_around = None    

        super(Ticket, self).save(*args, **kwargs)



class JobCard(models.Model):
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    serial_number = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    received_by = models.CharField(max_length=30, null=True, blank=True)
    requested_by = models.CharField(max_length=30, null=True, blank=True)
    ok_checklist = models.CharField(max_length=30, null=True)
    faulty_checklist = models.CharField(max_length=30, null=True)
    spare_used = models.CharField(max_length=30, null=True, blank=True)
    labor_charge = models.CharField(max_length=30, null=True, blank=True)
    total_cost = models.CharField(max_length=30, null=True, blank=True)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, null=True, blank=True)
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

    def __str__(self):
        return int(self.id)




# stores errors received
class ErrorLog(models.Model):
    facility = models.CharField(max_length=100)
    error = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.facility} - {self.error}"               
