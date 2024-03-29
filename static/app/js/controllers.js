'use strict';

/* Controllers */


function WelcomeCtrl() {}
WelcomeCtrl.$inject = [];

function HoldersCtrl($scope, $routeParams, $location, Holders, AlbumHolding) {
    $scope.userId = $routeParams.userId;
    var holders = $scope.holders = null;

    var holdersPromise = Holders.query($routeParams.userId);
    holdersPromise.then(function(response) {
        holders = $scope.holders = response.data;
    });

    $scope.holder_expanded = null;

    $scope.$watch( 'routeParams.display', function( type ) {
        $scope.display_type = ($routeParams.display == 'inactive') ?
          'inactive' : ($routeParams.display == 'all') ?
            'all' : 'active';
        $scope.route_path = $location.path();
        $scope.activeFilter = ($routeParams.display == 'inactive') ?
          { active: false } : ($routeParams.display == 'all') ?
            null : { active: true };
    });

    $scope.toggleExpand = function ( holder ) {
        if ($scope.holder_expanded == holder) {
            $scope.holder_expanded = null;
        } else {
            $scope.holder_expanded = holder;
        }
    };

    $scope.removeHolder = function ( holder ) {
        var answer = confirm("Are you sure you want to remove this album?");
        if (answer) {
            var albumHoldingPromise = AlbumHolding.delete(holder.id);
            albumHoldingPromise.then(
                // If server delete successful, remove from holder-list
                function(response) {
                    $scope.spliceHolder(holder);
                },
                // If server delete unsuccessful, notify user.
                function() {
                    alert("Delete failed");
                }
            );
        }
    };

    $scope.spliceHolder = function ( holder ) {
        holders.splice(holders.indexOf(holder), 1);
    };

    $scope.getToggleLabel = function ( active ) {
        if (active) {
            return "drop";
        } else {
            return "bump";
        }
    };

    $scope.toggleHolder = function ( holder ) {
        var obj_albumHolding = { album_id: holder.album.id, active: !holder.active };
        var albumHoldingPromise = AlbumHolding.put(holder.id, obj_albumHolding);
        albumHoldingPromise.then(
            // PUT was successful, toggle the holders active property
            function(response) {
                holder.active = !holder.active;
            },
            // PUT was unsuccessful. Notify user
            function(response) {
                alert("Toggle failed");
            }
        );
    };
}

function AddCtrl($scope, $routeParams, Artist, Album, AlbumHolding) {
    $scope.userId = $routeParams.userId;

    $scope.artistSelectedId = null;
    $scope.albumSelectedId = null;
    $scope.activeAlbum = true;

    $scope.availableArtists = [];
    $scope.availableAlbums = [];

    var artistAutocompletePromise = Artist.query_autocomplete();
    artistAutocompletePromise.then(function(response) {
        $scope.availableArtists = response.data;
    });

    $scope.fetchArtistAlbums = function ( id ) {
        var albumAutocompletePromise = Album.artist_query_autocomplete(id);
        albumAutocompletePromise.then(function(response) {
            $scope.availableAlbums = response.data;
        });
    }

    $scope.toggleActive = function ( $event ) {
        var checkbox = $event.target;
        $scope.activeAlbum = checkbox.checked;
    }

    $scope.addAlbumHolding = function ( album_id, active ) {
        var obj_albumHolding = { album_id: album_id, active: active };
        var albumHoldingPromise = AlbumHolding.create(obj_albumHolding);
        albumHoldingPromise.then(
            // POST was successful.
            function(response) {
                window.location = '#/' + $routeParams.userId;
            },
            // POST was unsuccessful. Notify user
            function(response) {
                alert("Album adding failed");
            }
        );
    }

}



