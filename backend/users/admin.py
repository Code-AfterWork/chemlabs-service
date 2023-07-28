from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import CustomUser, Employee, Manager, Client

# Re-register the CustomUser model with the updated CustomUserAdmin
admin.site.register(CustomUser)


# Register other models as before
admin.site.register(Employee)
admin.site.register(Manager)
admin.site.register(Client)



