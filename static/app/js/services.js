'use strict';

/* Services */

angular.module('albmr.services', ['ngResource']).
    factory('Holders', function($resource){
  return $resource('api/v1/user/:userId/holders', {}, {
    query: {method:'GET', isArray:true}
  });
});