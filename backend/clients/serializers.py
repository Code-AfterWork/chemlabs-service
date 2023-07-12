from clients.models import Ticket
from rest_framework import serializers

class  TicketCreateSerializer(serializers.ModelSerializer):
    status = serializers.CharField(read_only=True)
    class Meta:
        model = Ticket
        fields = '__all__'