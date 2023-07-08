from rest_framework import permissions
from rest_framework.permissions import BasePermission

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated is True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.created_by == request.user or request.user.has_perm('jobcard.jobcard_view')
        # return obj.created_by == request.user



class CanAccessEquipmentList(BasePermission):
    def has_permission(self, request, view):
        # Check if the user belongs to the group with necessary permissions
        return request.user.groups.filter(name='employees').exists()
