from django.shortcuts import render
# from core.serializers import *
from rest_framework import generics
from .models import *
from .serializers import TicketCreateSerializer

# API to get and edit tickets for clients
# this endpoint is only visible to clients and ticket creator
class  TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.values("serial_number","equipment", "title","description", "created_by")
    serializer_class =  TicketCreateSerializer

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.id
        return super().create(request, *args, **kwargs)
    
class  TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.values("serial_number","equipment", "title","description", "created_by")
    serializer_class =  TicketCreateSerializer