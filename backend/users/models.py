from django.db import models
from django.contrib.auth.base_user import BaseUserManager
# from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_("Users must have an email address"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_employee(self, email, password, employee_code, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", False)
        custom_user = self.create_user(email, password, **extra_fields)
        employee = Employee.objects.create(custom_user=custom_user, employee_code=employee_code)
        return custom_user

    def create_manager(self, email, password, employee_code, department, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", False)
        custom_user = self.create_user(email, password, **extra_fields)
        manager = Manager.objects.create(custom_user=custom_user, employee_code=employee_code, department=department)
        return custom_user

    def create_client(self, email, password, address, lab_in_charge, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        custom_user = self.create_user(email, password, **extra_fields)
        client = Client.objects.create(custom_user=custom_user, address=address, lab_in_charge=lab_in_charge)
        return custom_user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(("email address"), unique=True)
    phone = models.CharField(max_length=30)
    phone2 = models.CharField(max_length=30, blank=True)
   # dding the field below throws a circular dependency error 
   # institution = models.ForeignKey('core.Institution', on_delete=models.CASCADE, null=True, related_name='users')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Manager(models.Model):
    custom_user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    employee_code = models.CharField(max_length=30)
    department = models.CharField(max_length=30)

class Employee(models.Model):
    custom_user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    employee_code = models.CharField(max_length=30)

class Client(models.Model):
    custom_user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    address = models.TextField()
    lab_in_charge = models.CharField(max_length=30)



