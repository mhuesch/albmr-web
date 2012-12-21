from django.contrib.auth.models import User, Group
from rest_framework import generics
from tracker.models import Album, Artist, AlbumHolding
from tracker.serializers import UserSerializer, GroupSerializer, AlbumSerializer, ArtistSerializer, AlbumHoldingSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view


class UserList(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of users.
    """
    model = User
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single user.
    """
    model = User
    serializer_class = UserSerializer

class GroupList(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of groups.
    """
    model = Group
    serializer_class = GroupSerializer

class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single group.
    """
    model = Group
    serializer_class = GroupSerializer

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

class AlbumHoldingDetail(generics.RetrieveUpdateDestroyAPIView):
    model = AlbumHolding
    serializer_class = AlbumHoldingSerializer

# API view for AlbumHoldings of a User
@api_view(['GET'])
def user_albumholding_list(request, pk):
    if request.method == 'GET':
        albumholdings = AlbumHolding.objects.filter(user=pk)
        serializer = AlbumHoldingSerializer(albumholdings)
        return Response(serializer.data)



