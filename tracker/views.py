from django.shortcuts import render
from django.contrib.auth.models import User, Group
from tracker.models import Album, Artist, AlbumHolding
from tracker.serializers import UserSerializer, GroupSerializer, AlbumSerializer, ArtistSerializer, AlbumHoldingSerializer, HolderSerializer, ArtistAutocompleteSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from tracker.permissions import IsOwner, OwnsHolders

# Index view loads angular app
def index(request):
    return render(request, 'index.html', {})

class UserList(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of users.
    """
    model = User
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single user.
    """
    model = User
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)

class GroupList(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of groups.
    """
    model = Group
    serializer_class = GroupSerializer
    permission_classes = (permissions.IsAdminUser,)

class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single group.
    """
    model = Group
    serializer_class = GroupSerializer
    permission_classes = (permissions.IsAdminUser,)

class ArtistList(generics.ListCreateAPIView):
    model = Artist
    serializer_class = ArtistSerializer

class ArtistDetail(generics.RetrieveAPIView):
    model = Artist
    serializer_class = ArtistSerializer

class AlbumList(generics.ListCreateAPIView):
    model = Album
    serializer_class = AlbumSerializer

class AlbumDetail(generics.RetrieveAPIView):
    model = Album
    serializer_class = AlbumSerializer

class AlbumHoldingList(generics.ListCreateAPIView):
    model = AlbumHolding
    serializer_class = AlbumHoldingSerializer

    def pre_save(self, obj):
        obj.user = self.request.user

class AlbumHoldingDetail(generics.RetrieveUpdateDestroyAPIView):
    model = AlbumHolding
    serializer_class = AlbumHoldingSerializer
    permission_classes = (IsOwner,)

    def pre_save(self, obj):
        obj.user = self.request.user

# Autocomplete views
class ArtistAutocompleteList(generics.ListAPIView):
    model = Artist
    serializer_class = ArtistAutocompleteSerializer


# API view for Albums of an Artist
@api_view(['GET'])
def artist_album_list(request, pk):
    if request.method == 'GET':
        albums = Album.objects.filter(artist_id=pk)
        serializer = AlbumSerializer(albums)
        return Response(serializer.data)

# API view for Holders of a User
@api_view(['GET'])
@permission_classes((OwnsHolders, ))
def user_holder_list(request, pk):
    if request.method == 'GET':
        albumholdings = AlbumHolding.objects.filter(user=pk)
        serializer = HolderSerializer(albumholdings)
        return Response(serializer.data)





