'use strict';

/* Controllers */


function WelcomeCtrl() {}
WelcomeCtrl.$inject = [];

function HoldersCtrl($scope, $routeParams, Holders) {
    var holders = $scope.holders = Holders.query({userId: $routeParams.userId});
}