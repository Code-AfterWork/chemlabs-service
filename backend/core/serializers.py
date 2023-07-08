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

class EquipmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipments
        fields = '__all__'        

        

class InstitutionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'               