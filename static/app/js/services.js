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
                return response;
            });
        };

        return Holders;
    }).
    factory('AlbumHolding', function($http) {
        var AlbumHolding = function(data) {
            angular.extend(this, data);
        }

        AlbumHolding.create = function(ah_obj) {
            return $http.post('api/v1/albumholding/', ah_obj, {headers: {'X-CSRFToken' : csrftoken }}).then(function(response) {
                return response;
            });
        };

        AlbumHolding.put = function(id, ah_obj) {
            return $http.put('api/v1/albumholding/' + id + '/', ah_obj, {headers: {'X-CSRFToken' : csrftoken }}).then(function(response) {
                return response;
            });
        };

        AlbumHolding.delete = function(id) {
            return $http.delete('api/v1/albumholding/' + id + '/', {headers: {'X-CSRFToken' : csrftoken }}).then(function(response) {
                return response;
            });
        };

        return AlbumHolding;
    }).
    factory('Artist', function($http) {
        var Artist = function(data) {
            angular.extend(this, data);
        }

        Artist.query = function() {
            return $http.get('api/v1/artist/', {headers: {'X-CSRFToken' : csrftoken }}).then(function(response) {
                return response;
            });
        };

        Artist.query_autocomplete = function() {
            return $http.get('api/v1/autocomplete/artist/', {headers: {'X-CSRFToken' : csrftoken }}).then(function(response) {
                return response;
            });
        }

        return Artist;
    }).
    factory('Album', function($http) {
        var Album = function(data) {
            angular.extend(this, data);
        }

        Album.artist_query_autocomplete = function(id) {
            return $http.get('api/v1/autocomplete/artist/' + id + '/albums/', {headers: {'X-CSRFToken' : csrftoken }}).then(function(response) {
                return response;
            });
        }

        return Album;
    });

