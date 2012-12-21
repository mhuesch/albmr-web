from django.db import models
from django.contrib.auth.models import User


class Artist(models.Model):
    name = models.CharField(max_length=200)

    def __unicode__(self):
        return u'%s' % self.name

class Album(models.Model):
    name = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, related_name='albums')

    def __unicode__(self):
        return u'%s: %s' % (self.artist.name, self.name)

class AlbumHolding(models.Model):
    album = models.ForeignKey(Album, related_name='holdings')
    active = models.BooleanField(default=False)
    change_date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User)

    def __unicode__(self):
        return u'%s - %s' % (self.user.username, self.album.name)



