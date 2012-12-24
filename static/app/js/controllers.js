'use strict';

/* Controllers */


function WelcomeCtrl() {}
WelcomeCtrl.$inject = [];

function HoldersCtrl($scope, $routeParams, $location, Holders) {
    var holders = $scope.holders = Holders.query({userId: $routeParams.userId});

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
        holders.splice(holders.indexOf(holder), 1);
        console.log("Holder removed");
        console.dir(holder);
        // Call a function to send a delete to the server for this holder
    };
}

function AddCtrl($scope) {

}