from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view, obj=None):
        # Skip the check unless this is an object-level test
        if obj is None:
            return True

        # Write permissions are only allowed to the owner of the object
        return obj.user == request.user

class OwnsHolders(permissions.BasePermission):

    def has_permission(self, request, view, obj=None):
        path_list = request.path.split("/")

        if (len(path_list) != 7):
            return False

        try:
            request_user_id = int(path_list[4])
            return request_user_id == request.user.id
        except ValueError:
            return False