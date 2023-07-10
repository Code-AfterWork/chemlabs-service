from core.models import Equipment, Institution, JobCard
from rest_framework import serializers
from clients.models import  Ticket


class JobCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCard
        fields= '__all__'


class EquipmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'        


class InstitutionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'               