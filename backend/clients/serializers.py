from clients.models import Ticket, ErrorLog
from rest_framework import serializers

class  TicketCreateSerializer(serializers.ModelSerializer):
    status = serializers.CharField(read_only=True)
    class Meta:
        model = Ticket
        fields = '__all__'


# for error logs
class ErrorLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ErrorLog
        fields = '__all__'        