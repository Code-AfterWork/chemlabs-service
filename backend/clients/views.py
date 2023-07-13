from django.shortcuts import render
# from core.serializers import *
from rest_framework import generics
from .models import *
from .serializers import TicketCreateSerializer

# API to get and edit tickets for clients
# this endpoint is only visible to clients and ticket creator
class  TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class =  TicketCreateSerializer

    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
class  TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class =  TicketCreateSerializer