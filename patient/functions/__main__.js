var http = require('http');
var address = "University of Waterloo";

var gmc = require('@google/maps').createClient({
	key: 'AIzaSyA0wqJEF-4QkWCSRkU__X6ICjLqevhEXng'
})

async function getLoc(address){
	var obj = await geocode(address);
	return obj;
}


function getCoords(address){
	var coord = new Array();
	return new Promise(function(resolve, reject) {
		gmc.geocode({
			address: address
		}, function(err, response) {
			console.log(err);
			if (!err) {
  	//console.log(response.json.results[0].geometry.location.lat);
  	var obj = response.json.results[0].geometry.location;
  	coord.push(obj.lat);
  	coord.push(obj.lng);
  	resolve(coord);
  }
});

	});
}

function getPlaces(loc,dist){

	var near = [];

	return new Promise(function(resolve, reject) {
		console.log('SENDING?');
		gmc.places({
			query: 'hospital',
			language: 'en',
			location: loc,
			radius: 1
		}, function(err, response){
			console.log(err);
			if (err) {
				return reject(err);
			}
			
			var i = 0;
			var obj = response.json.results;
			while(obj[i] != undefined){
				console.log('inf?', i)
				near.push(obj[i]);
				i++;
			}
			resolve(near);
		});

	});
}

function getDist(origin, dest){
	var shortest_path = new Array();
	return new Promise(function(resolve, reject) {
		gmc.distanceMatrix({
			origins: origin,
			destinations: dest,
			transit_mode: ['bus'],
		}, function(err,response){
			if(!err){
				var obj = response.json.rows[0];
				var i = 0;
				var dist = 0, min_dist = 0;
				while(obj.elements[i] != undefined){
					dist = Number(obj.elements[i].distance.value);
					min_dist = dist;
					var n = min_dist - dist;
					if(n<= 0){
						min_dist = dist;
						shortest_path.push(obj.elements[i].distance.text);
						shortest_path.push(obj.elements[i].duration.text);
					}
					i++;
				}
				resolve(shortest_path);
			}
		});

	});
	
}

function wait_time(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash % 120);
}

/*async function getClinics (location = 'Toronto', numResults = 5) {
	var nearest_clinics = new Array();
	var c = await getCoords(location);
	var loc = {lat: c[0], lng: c[1]};
	var places = await getPlaces(loc,50000);
	var index = 0;

	for(var key in places){
		var obj = places[key]
		var lat = places[key].geometry.location.lat, long = places[key].geometry.location.lng;
		var dest = {lat: lat, lng: long};
		var shortest_dist = await getDist(loc,dest);
		var wait_time = wait_time(places[key].name);
		var temp = {location:loc, dest:dest, dist:shortest_dist, clinic_name:places[key].name, wait_time: wait_time};
		nearest_clinics.push(temp);
		if(index == numResults - 1) break;
		index++;
	}
	return nearest_clinics;
}*/

// async function test(address){
	
// }

// var nearest_clinics;

// function get_clinics(address,numResults){
// 	getClinics_async(address,numResults).then(v => {
// 		for(var key in v){
// 			console.log(v[key]);
// 		}
// 		return v;
// 	});

// }

// var clinics = get_clinics(address,3);

/**
* Gets nearby clinics
* @param {string} location A location
* @param {integer} numResults Number of results
* @returns {array}
*/
module.exports = async function getClinics (location = 'Toronto', numResults = 2) {
	var nearest_clinics = new Array();
	console.log('A');
	var c = await getCoords(location);
	console.log('A1');
	var loc = {lat: c[0], lng: c[1]};
	var places = await getPlaces(loc,50000);
		console.log('B');


	var index = 0;

	for(var key in places){
			console.log('C');

		var obj = places[key]
		var lat = places[key].geometry.location.lat, long = places[key].geometry.location.lng;
		var dest = {lat: lat, lng: long};
		var shortest_dist = await getDist(loc,dest);
		var wt = wait_time(places[key].name);
		var temp = {location:loc, dest:dest, dist:shortest_dist, clinic_name:places[key].name, wait_time: wt};
		nearest_clinics.push(temp);
		if(index == numResults - 1) break;
		console.log("here", index);
		index++;
	}

	return nearest_clinics;
}

/*
const lib = require('lib')({token: YOURSTDLIB_TOKEN});

module.exports = async () => {
	
	lib['nim-wijetunga'].patient['@dev']({location: 'Toronto'}, (err, results) => {
	
		// do whatever with results

	});

	// do something to results

	return 'hello!';

}; 
*/

















