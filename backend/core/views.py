from rest_framework import generics
from rest_framework.permissions import BasePermission, IsAdminUser
from .models import JobCard, Equipment,Institution
from clients.models import Ticket
from .serializers import JobCardSerializer,  EquipmentListSerializer, InstitutionListSerializer
from employees.serializers import TicketAssignserializer
from rest_framework.permissions import AllowAny, IsAuthenticated

class IsAdminOrEmployee(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.groups.filter(name="employees").exists() or request.user.is_staff:
                return True
        return False

# API to get list of institutions and edit institutions
class InstitutionList(generics.ListCreateAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionListSerializer
    permission_classes = [IsAuthenticated, IsAdminOrEmployee]

class InstitutionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionListSerializer
    permission_classes = [IsAuthenticated, IsAdminOrEmployee]
    # permission_classes = [AllowAny]


# API to get list of equipments and edit equipments
class EquipmentList(generics.ListCreateAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentListSerializer
    # permission_classes = [AllowAny]

class EquipmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentListSerializer
    # permission_classes = [AllowAny]

# List to get and edit job cards
class JobCardListCreateView(generics.ListCreateAPIView):
    queryset = JobCard.objects.all()
    serializer_class = JobCardSerializer

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.id
        return super().create(request, *args, **kwargs)

class JobCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobCard.objects.all()
    serializer_class = JobCardSerializer


