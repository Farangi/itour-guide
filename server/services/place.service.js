var config = require('config.json');
var sentiment = require('sentiment');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('places');
let request = require('request');
var googleMapsClient = require('@google/maps').createClient({
	key : config.mapsApiKey
});

var service = {};

service.getAll = getAll;
service.getPlace = getPlace;
service.addGuideToPlace = addGuideToPlace;
service.getPlacesByKeyword = getPlacesByKeyword;

module.exports = service;

function addGuideToPlace(params) {
	var deferred = Q.defer();
	
	db.places.findOne({ _id: params.placeId}, function(err, place){
		if (err) deferred.reject(err.name + ': ' + err.message);
		if(place) {
			db.places.update({_id: params.placeId}, {
				$push : {
							"guides" : {
								"guideId" : params.guideId
							}
					}
			}, function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
			
		} else {
			db.places.insert(
		            {_id: params.placeId},
		            function (err, doc) {
		                if (err) deferred.reject(err.name + ': ' + err.message);
		                else {
		                	addGuideToPlace(params);
		                }
		            });
		}
	});
	
	return deferred.promise;
}

function getAll(longitude, latitude) {
	var deferred = Q.defer();

	var long = parseFloat(longitude).toFixed(5);
	var lat = parseFloat(latitude).toFixed(5);
	googleMapsClient.placesNearby({
		language : 'en',
		location : [ lat, long ],
		rankby : 'prominence',
		keyword : 'tourist',
		radius : 50000
	}, function(err, places) {
		if (err) {
			console.log(err);
			deferred.reject(err.name + ': ' + err.message);
		}

		// places.json.results.forEach(function(place) {
		// 	console.log(place);
		// });
		var sliceChecker = true;
		while (sliceChecker) {
			sliceChecker = false;
			places.json.results.forEach(function(result, resultIndex, resultArray) {
				result.types.forEach(function(type) {
					if (type == 'travel_agency') {
						resultArray.splice(resultIndex, 1);
						sliceChecker = true;
					}
				});
			});
		}

		deferred.resolve(places);
	});

	return deferred.promise;
}

function getPlacesByKeyword(longitude, latitude, keyword) {
	var deferred = Q.defer();
	var long = parseFloat(longitude).toFixed(5);
	var lat = parseFloat(latitude).toFixed(5);
	// var source = [lat, long];
	// var dest = [34.328869, 73.464649];
	// getOptimalPath(source, dest);
	googleMapsClient.placesNearby({
		language : 'en',
		location : [ lat, long ],
		rankby : 'prominence',
		keyword : keyword,
		radius : 50000
	}, function(err, places) {
		if (err) {
			console.log(err);
			deferred.reject(err.name + ': ' + err.message);
		}
		deferred.resolve(places);
	});

	return deferred.promise;
}
// function findDistances(sources, destinations){
// 	var deferred = Q.defer();
// 	results = [];
// 	googleMapsClient.distanceMatrix({
// 		origins: sources,//[source],
// 		destinations: destinations//nearbyLocations
// 	}, function(err, matrix){
// 		if (err) {console.log("Google distance matrix error: "+err);deferred.reject(err.name + ': ' + err.message);}
// 		matrix.json.rows.forEach(function(row){
// 			if(row.elements){
// 				row.elements.forEach(function(element){
// 					if(element.status == 'OK'){
// 						results.push(parseInt(element.distance.text));
// 					}
// 				});
// 			}
// 		});
// 		deferred.resolve(results);
// 	});
// 	return deferred.promise;
// }

// function getOptimalPath(source, destination) {
// 	var deferred = Q.defer();
// 	var nearbyLocations = [];
// 	var originToPlaces = [];
// 	var placesToDestination = [];
// 	getAll(source[1],source[0])
// 	.then(function (places) {
// 		places.json.results.forEach(function(place) {
// 			nearbyLocations.push(place.geometry.location);
// 			console.log(place.name);
// 		});

// 		findDistances([source], nearbyLocations)
// 		.then(function(results){
// 			originToPlaces = results;

// 			findDistances(nearbyLocations, [destination])
// 			.then(function(results){
// 				placesToDestination = results;
// 				if(originToPlaces.length === placesToDestination.length){
// 					var smallestDistance = 100000;
// 					var shortestPathIndex = 0;
// 					for (let index = 0; index < originToPlaces.length; index++) {
// 						var distanceFromCurrentPlace = originToPlaces[index] + placesToDestination[index];
// 						if (distanceFromCurrentPlace < smallestDistance) {
// 							smallestDistance = distanceFromCurrentPlace;
// 							shortestPathIndex = index;
// 						}
// 						//console.log('Smallest Distance: '+smallestDistance+', Shortest Path Index: '+shortestPathIndex);
// 					}
// 					//console.log("Smallest: "+JSON.stringify(nearbyLocations[shortestPathIndex]));
// 					var nextSource = [nearbyLocations[shortestPathIndex].lat, nearbyLocations[shortestPathIndex].lng];
// 					console.log(nextSource);
// 					getOptimalPath(nextSource, destination);
// 				}
// 			})
// 			.catch(function (err) {
// 				console.log(err);
// 				deferred.reject(err);
// 			});
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 			deferred.reject(err);
// 		});
// 	})
// 	.catch(function (err) {
// 		deferred.reject(err);
// 	});
// 	return deferred.promise;
// }

function getPlace(placeId) {
	console.log("place get");
	var deferred = Q.defer();
	googleMapsClient.place({
		placeid : placeId
	}, function(err, place) {
		if (err) {
			console.log(err);
			deferred.reject(err.name + ': ' + err.message);
		}
		place.json.result.reviews.forEach(function(review, reviewIndex, reviewsArray) {
			reviewsArray[reviewIndex].sentiment = sentiment(review.text);
		});

		let weatherApiKey = '8f12b7e8aad0b68c15406cc83319ed34';
		let location = place.json.result.geometry.location;
		let url = `http://api.openweathermap.org/data/2.5/weather?lat=${parseFloat(location.lat)}&lon=${parseFloat(location.lon)}&appid=${weatherApiKey}`

		request(url, function(err, response, body) {
			if (err) {
				console.log('error:', error);
			} else {
				place.json.result.weather = JSON.parse(body);
			}
			deferred.resolve(place.json.result);
		});

	});
	return deferred.promise;
}