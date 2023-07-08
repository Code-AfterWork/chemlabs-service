from django.contrib import admin
from core.models import Equipments, Institution, Employees, jobCards, Issues


from oauth2_provider.admin import ApplicationAdmin
from .models import OAuth2Application


admin.site.register(Equipments)
admin.site.register(Institution)
admin.site.register( Employees)
admin.site.register( jobCards)
admin.site.register( Issues)

admin.site.register(OAuth2Application, ApplicationAdmin)
