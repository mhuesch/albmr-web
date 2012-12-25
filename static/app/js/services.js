'use strict';

/* Services */


// Get csrf token
var csrftoken = $.cookie('csrftoken');

angular.module('albmr.services', ['ngResource']).
    factory('Holders', function($http) {
        // Holders is a class for retrieving data from the server
        var Holders = function(data) {
            angular.extend(this, data);
        }

        Holders.query = function(id) {
            return $http.get('api/v1/user/' + id + '/holders/').then(function(response) {
                return response.data;
            });
        };

        return Holders;
    }).
    factory('AlbumHolding', function($http) {
        var AlbumHolding = function(data) {
            angular.extend(this, data);
        }

        AlbumHolding.put = function(ah) {
            return $http.put('api/v1/albumholding/' + ah.id + '/', ah, {headers: {'X-CSRFToken' : csrftoken }}).then(function(response) {
                return new AlbumHolding(response.data);
            });
        };

        AlbumHolding.delete = function(id) {
            return $http.delete('api/v1/albumholding/' + id + '/', {headers: {'X-CSRFToken' : csrftoken }}).then(function(response) {
                return response.status;
            });
        };

        return AlbumHolding;

/*
        return $resource('api/v1/albumholding/:ahId/', {}, {
            update: {method:'PUT', headers: {'X-CSRFToken' : csrftoken }},
            delete: {method:'DELETE', headers: {'X-CSRFToken' : csrftoken }}
        });
*/
    });

