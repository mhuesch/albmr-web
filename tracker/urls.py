from django.conf.urls import patterns, include, url
from rest_framework.urlpatterns import format_suffix_patterns
from tracker.views import UserList, UserDetail, GroupList, GroupDetail, ArtistList, ArtistDetail, AlbumList, AlbumDetail, AlbumHoldingList, AlbumHoldingDetail, artist_album_list, user_holder_list, ArtistAutocompleteList

urlpatterns = patterns('',
    url(r'^user/$', UserList.as_view(), name='user-list'),
    url(r'^user/(?P<pk>\d+)/$', UserDetail.as_view(), name='user-detail'),
    url(r'^group/$', GroupList.as_view(), name='group-list'),
    url(r'^group/(?P<pk>\d+)/$', GroupDetail.as_view(), name='group-detail'),
    url(r'^artist/$', ArtistList.as_view(), name='artist-list'),
    url(r'^artist/(?P<pk>\d+)/$', ArtistDetail.as_view(), name='artist-detail'),
    url(r'^album/$', AlbumList.as_view(), name='album-list'),
    url(r'^album/(?P<pk>\d+)/$', AlbumDetail.as_view(), name='album-detail'),
    url(r'^albumholding/$', AlbumHoldingList.as_view(), name='albumholding-list'),
    url(r'^albumholding/(?P<pk>\d+)/$', AlbumHoldingDetail.as_view(), name='albumholding-detail'),

    # Autocomplete views
    url(r'^autocomplete/artist/$', ArtistAutocompleteList.as_view(), name='artist-autocomplete'),

    # Filtered views
    url(r'^artist/(?P<pk>\d+)/albums/$', artist_album_list),
    url(r'^user/(?P<pk>\d+)/holders/$', user_holder_list),
)

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'api'])

# Default login/logout views
urlpatterns += patterns('',
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)