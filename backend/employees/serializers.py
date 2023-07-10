
from rest_framework import serializers
from clients.models import  Ticket


class TicketAssignserializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "serial_number","equipment", "title","description", "created_by", "assigned_to"


class TicketCompletedserializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "serial_number","equipment", "title","description", "created_by", "assigned_to", "completed"       