from django.shortcuts import render
# from core.serializers import *
from rest_framework import generics, status
from core.models import *
from .serializers import TicketCreateSerializer, ErrorLogSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.permissions import BasePermission, IsAdminUser

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Sum
from django.http import JsonResponse
from django.views import View

from datetime import timedelta
import datetime
import dateutil


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

    

class AverageTurnaroundTimeView(APIView):

    def get(self, request):
        # Get all tickets that are marked as completed
        completed_tickets = Ticket.objects.filter(status=True)

        # Get the total number of completed tickets
        total_tickets = completed_tickets.count()

        # Get the total turnaround time for all completed tickets
        total_turnaround_time = completed_tickets.aggregate(Sum('turn_around'))['turn_around__sum']

        # Calculate the average turnaround time
        average_turnaround_time = total_turnaround_time / total_tickets

        # Format the average turnaround time
        formatted_average_turnaround_time = str(average_turnaround_time)

        return Response({'average_turnaround_time': formatted_average_turnaround_time})
      
    
class  TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class =  TicketCreateSerializer
    # permission_classes = [IsAuthenticated, IsAdminOrClient]



class ErrorLogAPIView(APIView):
    authentication_classes = []  # Disable authentication
    permission_classes = []  # Disable permission checks

    def get(self, request, format=None):
        # Retrieve all error logs from the database
        error_logs = ErrorLog.objects.all()
        serializer = ErrorLogSerializer(error_logs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = ErrorLogSerializer(data=request.data)
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED) 