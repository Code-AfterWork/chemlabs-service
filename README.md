## Required Features
1. Query a list of all equipments
    - Should have option to filter by searched equipment
    - Have ability to edit specific equipment
2. Query a list of all active or inactive equipments (search on equipments queried)
3. Customer Login and can create tickets/tickets
4. Employee login, can create jobcards, ticket and handle an ticket
5. Query all uncompleted, on process and completed jobcards


## Endpoints
/user/register <br>
/user/login <br>
/usertoken/tokenrefresh <br>
/user/logout <br>
/user/profile <br>
/user/profile/avatar <br>


/employee/tickets/assign <--- For head engineer to assign tickets <br>
/employee/tickets/complete <---- for other engineers to complete tickets <br>

/client/tickets <--- for clients to create tickets <br>

/equipments <br>
/institutions <br>
/jobcards <br>

## How to run
### Backend
```
cd backend
source venv/bin/activate
pip install django djangorestfraework
python manage.py runserver
```
### Frontend
```
cd frontreact
npm install
npm start
```

How to authorize a particular group 

```
from rest_framework.permissions import BasePermission, IsAdminUser

## This will authorize users in employee group and admin ONLY 

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