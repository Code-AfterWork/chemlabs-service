from core.models import Equipments, Institution, Employees, jobCards, Issues
from rest_framework import serializers

class JobCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = jobCards
        fields= '__all__'

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issues
        fields = '__all__'