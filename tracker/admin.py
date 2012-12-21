from django.contrib import admin
from tracker.models import Artist, Album, AlbumHolding

admin.site.register(Artist)
admin.site.register(Album)
admin.site.register(AlbumHolding)