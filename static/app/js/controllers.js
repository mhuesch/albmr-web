'use strict';

/* Controllers */


function WelcomeCtrl() {}
WelcomeCtrl.$inject = [];

function HoldersCtrl($scope, $routeParams, $location, Holders) {
    var holders = $scope.holders = Holders.query({userId: $routeParams.userId});

    $scope.expandedHolder = null;

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
        if ($scope.expandedHolder == holder) {
            $scope.expandedHolder = null;
        } else {
            $scope.expandedHolder = holder;
        }
    };

    $scope.removeHolder = function ( holder ) {
        $scope.holders.splice($scope.holders.indexOf(holder), 1);
    };
}

function AddCtrl($scope) {

}