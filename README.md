## Required Features
1. Query a list of all equipments
    - Should have option to filter by searched equipment
    - Have ability to edit specific equipment
2. Query a list of all active or inactive equipments (search on equipments queried)
3. Customer Login and can create tickets/tickets
4. Employee login, can create jobcards, ticket and handle an ticket
5. Query all uncompleted, on process and completed jobcards


## Endpoints
/user/register 
/user/login
/usertoken/tokenrefresh
/user/logout
/user/profile
/user/profile/avatar


/employee/tickets/assign <--- For head engineer to assign tickets
/employee/tickets/complete <---- for other engineers to complete tickets

/client/tickets <--- for clients to create tickets

/equipments
/institutions
/jobcards


How to authorize a particular group 

```
from rest_framework.permissions import BasePermission, IsAdminUser

class IsAdminOrEmployee(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.groups.filter(name="employees").exists() or request.user.is_staff:
                return True
        return False

# API to get list of institutions and edit institutions
class InstitutionList(generics.ListCreateAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionListSerializer
    permission_classes = [IsAuthenticated, IsAdminOrEmployee]

class InstitutionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionListSerializer
    permission_classes = [IsAuthenticated, IsAdminOrEmployee]

```    