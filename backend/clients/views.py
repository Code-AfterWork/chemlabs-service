from django.shortcuts import render
# from core.serializers import *
from rest_framework import generics
from .models import *
from .serializers import TicketCreateSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.permissions import BasePermission, IsAdminUser


class IsAdminOrClient(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if (
                request.user.groups.filter(name="employees").exists()
                or request.user.groups.filter(name="clients").exists()
                or request.user.groups.filter(name="headengineer").exists()
                or request.user.is_staff
            ):
                return True
        return False

# API to get and edit tickets for clients
# this endpoint is only visible to clients and ticket creator
class  TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class =  TicketCreateSerializer
    # permission_classes = [IsAuthenticated, IsAdminOrClient]

    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
class  TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class =  TicketCreateSerializer
    # permission_classes = [IsAuthenticated, IsAdminOrClient]