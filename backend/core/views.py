from rest_framework import generics
from .models import jobCards, Issues, Equipments,Institution
from .serializers import JobCardSerializer, IssueSerializer, EquipmentListSerializer, InstitutionListSerializer
from core.permissions import IsAuthorOrReadOnly, CanAccessEquipmentList
from rest_framework.permissions import AllowAny, IsAuthenticated

# API to get list of institutions and edit institutions
class InstitutionList(generics.ListCreateAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionListSerializer
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]

class InstitutionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionListSerializer
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]


# API to get list of equipments and edit equipments
class EquipmentList(generics.ListCreateAPIView):
    queryset = Equipments.objects.all()
    serializer_class = EquipmentListSerializer
    # permission_classes = [IsAuthenticated, CanAccessEquipmentList]
    permission_classes = [AllowAny]

class EquipmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Equipments.objects.all()
    serializer_class = EquipmentListSerializer
    permission_classes = [IsAuthenticated, CanAccessEquipmentList]
    # permission_classes = [AllowAny]

# List to get and edit job cards
class JobCardListCreateView(generics.ListCreateAPIView):
    queryset = jobCards.objects.all()
    serializer_class = JobCardSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.id
        return super().create(request, *args, **kwargs)

class JobCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = jobCards.objects.all()
    serializer_class = JobCardSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

# API to get and edit Issues
class IssueListCreateView(generics.ListCreateAPIView):
    queryset = Issues.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.id
        return super().create(request, *args, **kwargs)
    
class IssueDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issues.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]    

