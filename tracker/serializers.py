from django.contrib.auth.models import User, Group, Permission
from rest_framework import serializers
from tracker.models import Artist, Album, AlbumHolding

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    permissions = serializers.ManySlugRelatedField(
        slug_field='codename',
        queryset=Permission.objects.all()
    )

    class Meta:
        model = Group
        fields = ('url', 'name', 'permissions')

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artist
        fields = ('name',)

class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    artist_id = serializers.PrimaryKeyRelatedField(source='artist')

    class Meta:
        model = Album
        fields = ('name', 'artist_id')

class AlbumHoldingSerializer(serializers.HyperlinkedModelSerializer):
    album_id = serializers.PrimaryKeyRelatedField(source='album')
    user_id = serializers.PrimaryKeyRelatedField(source='user')

    class Meta:
        model = AlbumHolding
        fields = ('album_id', 'active', 'change_date', 'user_id')

class AlbumArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        exclude = ('id',)
        depth = 1

class HolderSerializer(serializers.ModelSerializer):
    album = AlbumArtistSerializer()

    class Meta:
        model = AlbumHolding
        exclude = ('id', 'user',)
        depth = 2


