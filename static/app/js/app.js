'use strict';


// Declare app level module which depends on filters, and services
angular.module('albmr', ['albmr.filters', 'albmr.services', 'albmr.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'static/app/partials/welcome.html', controller: WelcomeCtrl});
    $routeProvider.when('/add', {templateUrl: 'static/app/partials/add.html', controller: AddCtrl});
    $routeProvider.when('/:userId', {templateUrl: 'static/app/partials/holders.html', controller: HoldersCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
