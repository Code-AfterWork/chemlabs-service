from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
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
        return self.create_user(email, password, employee_code=employee_code, **extra_fields)

    def create_manager(self, email, password, employee_code, department, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", False)
        return self.create_user(email, password, employee_code=employee_code, department=department, **extra_fields)

    def create_client(self, email, password, address, lab_in_charge, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self.create_user(email, password, address=address, lab_in_charge=lab_in_charge, **extra_fields)

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
    email = models.EmailField(_("email address"), unique=True)
    phone = models.CharField(max_length=30)
    phone2 = models.CharField(max_length=30, blank=True)
    institution = models.ForeignKey('core.Institution', on_delete=models.CASCADE, null=True, related_name='users')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email    

class Manager(CustomUser):
    employee_code = models.CharField(max_length=30)
    department = models.CharField(max_length=30)

class Employee(CustomUser):
    employee_code = models.CharField(max_length=30)

class Client(CustomUser):
    address = models.TextField()
    lab_in_charge = models.CharField(max_length=30)




    # def create_manager(self, email, password, **extra_fields):
    #     extra_fields.setdefault("is_staff", True)
    #     extra_fields.setdefault("is_superuser", True)
    #     extra_fields.setdefault("is_active", True)

    #     if extra_fields.get("is_staff") is not True:
    #         raise ValueError(_("Superuser must have is_staff=True."))
    #     if extra_fields.get("is_superuser") is not True:
    #         raise ValueError(_("Superuser must have is_superuser=True."))
    #     return self.create_user(email, password, **extra_fields)

    # def create_employee(self, email, password, **extra_fields):
    #     return self.create_user(email, password, **extra_fields)
    
    # def create_client(self, email, password, **extra_fields):
    #     return self.create_user(email, password, **extra_fields)
            