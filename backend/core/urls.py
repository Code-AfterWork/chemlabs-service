from django.urls import path
from .views import *

app_name = "jobcards"

urlpatterns = [
    path('equipments/', EquipmentList.as_view(), name='equipments-list'),
    path('equipments/<str:pk>/', EquipmentDetailView.as_view(), name='equipments-detail'),
    path('institutions/', InstitutionList.as_view(), name='institution-list'),
    path('institutions/<str:pk>/', InstitutionDetailView.as_view(), name='institutions-detail'),
]

