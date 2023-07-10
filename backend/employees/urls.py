from django.urls import path
from .views import *

app_name = "tickets-employee"

urlpatterns = [
    path('tickets/assign/',  TicketAssignView.as_view(), name='ticket-list'),
    path('tickets/assign/<str:pk>/', TicketAssignDetailView.as_view(), name='ticket-detail'),
    path('tickets/complete/',  TicketCompletedView.as_view(), name='ticket-list'),
    path('tickets/complete/<str:pk>/',  TicketCompletedDetailView.as_view(), name='ticket-detail'),
  
]

