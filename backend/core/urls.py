from django.urls import path
from .views import JobCardListCreateView, JobCardDetailView, IssueListCreateView, IssueDetailView

app_name = "jobcards"

urlpatterns = [
    path('jobcards/', JobCardListCreateView.as_view(), name='jobcard-list'),
    path('jobcards/<str:pk>/', JobCardDetailView.as_view(), name='jobcard-detail'),
    path('issues/', IssueListCreateView.as_view(), name='issue-list'),
    path('issues/<str:pk>/', IssueDetailView.as_view(), name='issue-detail'),
]

