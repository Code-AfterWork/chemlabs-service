from clients.models import Ticket
from rest_framework import serializers

class  TicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "serial_number","equipment", "title","description", "created_by"
