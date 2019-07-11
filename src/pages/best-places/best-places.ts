import { UserService } from '../../_services';
import { PlaceService } from '../../_services';
import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PlaceDetailsPage } from '../place-details/place-details';

@Component( {
	selector: 'best-places',
	templateUrl: 'best-places.html'
} )
export class BestPlaces implements OnInit {
	places: any[];
	ngOnInit() {
		this.getPlaces();
	}

	getPlaces() {
		this.geolocation.getCurrentPosition().then(( resp ) => {
			this.placeService.getAll( resp.coords.longitude, resp.coords.latitude ).subscribe( response => {
				this.places = response.json.results;
			} );
		} ).catch(( error ) => {
			console.log( 'Error getting location', error );
		} );
	}

	selectPlace( place: any ) {
		this.navCtrl.push( PlaceDetailsPage, {
			place: place
		} );
	}

	constructor(
		public navCtrl: NavController,
		public app: App,
		private userService: UserService,
		private placeService: PlaceService,
		private geolocation: Geolocation ) {
	}
}
