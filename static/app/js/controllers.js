'use strict';

/* Controllers */


function WelcomeCtrl() {}
WelcomeCtrl.$inject = [];

function HoldersCtrl($scope, $routeParams, $location, Holders, AlbumHolding) {
    var holders = $scope.holders = null;

    var holdersPromise = Holders.query($routeParams.userId);
    holdersPromise.then(function(hs) {
        holders = $scope.holders = hs;
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
            albumHoldingPromise.then(function(status) {
                if (status == 204) {
                    $scope.spliceHolder(holder);
                } else {
                    alert("Delete failed");
                }
            });
        }
    };

    $scope.spliceHolder = function ( holder ) {
        holders.splice(holders.indexOf(holder), 1);
    };
}

function AddCtrl($scope) {

}