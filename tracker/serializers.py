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
    id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Artist
        fields = ('id', 'name',)

class ArtistAutocompleteSerializer(serializers.HyperlinkedModelSerializer):
    label = serializers.CharField(source='name', read_only=True)
    value = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Artist
        fields = ('label', 'value')

class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Album
        fields = ('id', 'name',)

class AlbumHoldingSerializer(serializers.HyperlinkedModelSerializer):
    album_id = serializers.PrimaryKeyRelatedField(source='album')
    change_date = serializers.CharField(source='change_date', read_only=True)

    class Meta:
        model = AlbumHolding
        fields = ('album_id', 'active', 'change_date',)

class AlbumArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        depth = 1

class HolderSerializer(serializers.ModelSerializer):
    album = AlbumArtistSerializer()

    class Meta:
        model = AlbumHolding
        exclude = ('user',)
        depth = 2


