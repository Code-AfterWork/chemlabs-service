
from rest_framework import serializers
from clients.models import  Ticket


class TicketAssignserializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

# class EmployeesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Employee
#         fields = '__all__'



class TicketCompletedserializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'