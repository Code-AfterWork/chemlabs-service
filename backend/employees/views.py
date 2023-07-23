from django.shortcuts import render
from rest_framework import generics
from clients.models import Ticket
from .serializers import TicketAssignserializer, TicketCompletedserializer
# from .serializers import JobCardSerializer,  EquipmentListSerializer, InstitutionListSerializer, TicketAssignserializer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import BasePermission, IsAdminUser
from rest_framework.permissions import AllowAny, IsAuthenticated



    
## ==========================================================================
## ==========================================================================
# user has to be in headengineer group t o access this view
class IsAdminOrHeadEngineer(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.groups.filter(name="headengineer").exists() or request.user.is_staff:
                return True
        return False

# API to get and edit tickets for head engineer
# this endpoint is only visible to head engineer or who assigns tickets
class  TicketAssignView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class =  TicketAssignserializer
    # permission_classes = [IsAuthenticated, IsAdminOrHeadEngineer]

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.id
        return super().create(request, *args, **kwargs)
    
class  TicketAssignDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class =  TicketAssignserializer
    # permission_classes = [IsAuthenticated, IsAdminOrHeadEngineer]

## ==========================================================================
## ==========================================================================



# class  EmployeesView(generics.ListCreateAPIView):
#     queryset = Employee.objects.all()
#     serializer_class =  EmployeesSerializer

#     def create(self, request, *args, **kwargs):
#         request.data['created_by'] = request.user.id
#         return super().create(request, *args, **kwargs)
    
# class  EmployeesDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Employee.objects.all()
#     serializer_class =  EmployeesSerializer



## ==========================================================================
## ==========================================================================
# user has to be in headengineer group t o access this view
class IsAdminOrEmployee(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.groups.filter(name="employees").exists() or request.user.is_staff:
                return True
        return False


# API to get and edit tickets for other engineer
# this endpoint is only visible to engineer who's assigned the task
class  TicketCompletedView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class =  TicketCompletedserializer
    # permission_classes = [IsAuthenticated, IsAdminOrEmployee]

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.id
        return super().create(request, *args, **kwargs)
    
class  TicketCompletedDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class =  TicketCompletedserializer
    # permission_classes = [IsAuthenticated, IsAdminOrEmployee]

