from django.urls import path
from .views import *

app_name = "jobcards"

urlpatterns = [
    path('tickets/',  TicketListCreateView.as_view(), name='ticket-list'),
    path('tickets/<str:pk>/',  TicketDetailView.as_view(), name='ticket-detail'),

    path('errors/', ErrorLogAPIView.as_view(), name='error-log'),

    path('get_average_turn_around/', AverageTurnaroundTimeView.as_view(), name='get_average_turn_around'),
]
