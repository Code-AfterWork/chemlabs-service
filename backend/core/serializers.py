from core.models import Equipment, Institution, JobCard, Ticket
from rest_framework import serializers
# from clients.models import  Ticket


class InstitutionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'

class EquipmentListSerializer(serializers.ModelSerializer):
    # institution = InstitutionListSerializer()
    class Meta:
        model = Equipment
        fields = '__all__'



class JobCardSerializer(serializers.ModelSerializer):
    # institution = InstitutionListSerializer()
    class Meta:
        model = JobCard
        fields= '__all__'
