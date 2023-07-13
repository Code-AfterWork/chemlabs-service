from django.shortcuts import render
from rest_framework import generics
from clients.models import Ticket
from .serializers import TicketAssignserializer, TicketCompletedserializer
# from .serializers import JobCardSerializer,  EquipmentListSerializer, InstitutionListSerializer, TicketAssignserializer
from rest_framework.permissions import AllowAny



# API to get and edit tickets for head engineer
# this endpoint is only visible to head engineer or who assigns tickets
class  TicketAssignView(generics.ListCreateAPIView):
    queryset = Ticket.objects.values("serial_number","equipment", "title","description", "created_by", "assigned_to")
    serializer_class =  TicketAssignserializer

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.id
        return super().create(request, *args, **kwargs)
    
class  TicketAssignDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.values("serial_number","equipment", "title","description", "created_by", "assigned_to")
    serializer_class =  TicketAssignserializer

# API to get and edit tickets for other engineer
# this endpoint is only visible to engineer who's assigned the task
class  TicketCompletedView(generics.ListCreateAPIView):
    queryset = Ticket.objects.values("serial_number","equipment", "title","description", "created_by", "assigned_to", "completed")
    serializer_class =  TicketCompletedserializer

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.id
        return super().create(request, *args, **kwargs)
    
class  TicketCompletedDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.values("serial_number","equipment", "title","description", "created_by", "assigned_to", "completed")
    serializer_class =  TicketCompletedserializer
