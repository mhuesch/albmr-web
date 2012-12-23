'use strict';

/* Controllers */


function WelcomeCtrl() {}
WelcomeCtrl.$inject = [];

function HoldersCtrl($scope, $routeParams, $location, Holders) {
    var holders = $scope.holders = Holders.query({userId: $routeParams.userId});

    $scope.$watch( 'routeParams.display', function( type ) {
        $scope.display_type = ($routeParams.display == 'inactive') ?
          'inactive' : ($routeParams.display == 'all') ?
            'all' : 'active';
        $scope.route_path = $location.path();
        $scope.activeFilter = ($routeParams.display == 'inactive') ?
          { active: false } : ($routeParams.display == 'all') ?
            null : { active: true };
    });
}

function AddCtrl($scope) {
    
}