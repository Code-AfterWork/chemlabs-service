from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import CustomUser, Employee, Manager, Client


admin.site.register(CustomUser)

admin.site.register(Employee)
admin.site.register(Manager)
admin.site.register(Client)



