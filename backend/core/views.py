from rest_framework import generics
from .models import jobCards, Issues
from .serializers import JobCardSerializer, IssueSerializer
from core.permissions import IsAuthorOrReadOnly
from rest_framework.permissions import AllowAny, IsAuthenticated

# from django.contrib.auth.decorators import user_passes_test


class JobCardListCreateView(generics.ListCreateAPIView):
    queryset = jobCards.objects.all()
    serializer_class = JobCardSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]
    # permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.id
        return super().create(request, *args, **kwargs)

class JobCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = jobCards.objects.all()
    serializer_class = JobCardSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]
    # permission_classes = [AllowAny]

# @user_passes_test(lambda user: user.groups.filter(name='clients').exists())
class IssueListCreateView(generics.ListCreateAPIView):
    queryset = Issues.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]
    # permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.id
        return super().create(request, *args, **kwargs)
    
class IssueDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issues.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]    


# from rest_framework import generics, permissions
# from rest_framework_jwt.authentication import JSONWebTokenAuthentication
# from .models import jobCards
# from .serializers import JobCardSerializer

# class JobCardListCreateView(generics.ListCreateAPIView):
#     queryset = jobCards.objects.all()
#     serializer_class = JobCardSerializer
#     authentication_classes = [JSONWebTokenAuthentication]
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save()  # Optional: If you want to perform additional actions on create

# class JobCardDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = jobCards.objects.all()
#     serializer_class = JobCardSerializer
#     authentication_classes = [JSONWebTokenAuthentication]
#     permission_classes = [permissions.IsAuthenticated]
