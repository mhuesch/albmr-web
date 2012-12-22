'use strict';

/* Controllers */


function WelcomeCtrl() {}
WelcomeCtrl.$inject = [];

function HoldersCtrl($scope, $routeParams, Holders) {
    $scope.holders = Holders.query({userId: $routeParams.userId});
}