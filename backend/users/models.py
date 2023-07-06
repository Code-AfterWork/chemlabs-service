from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
import os
from django.conf import settings
from django.template.defaultfilters import slugify





class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_("Users must have an email address"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)

# class Group(models.Model):
#     name = models.CharField(max_length=150, unique=True)

class CustomUser(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    # groups=models.ManyToManyField(Group, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email    
    


# user profiles
def get_image_filename(instance, filename):
    name = instance.product.name
    slug = slugify(name)
    return f"products/{slug}-{filename}"

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to=get_image_filename, blank=True)
    bio = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.user.email

    @property
    def filename(self):
        return os.path.basename(self.image.name)    
    