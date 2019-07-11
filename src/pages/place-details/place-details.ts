import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PlaceService } from '../../_services';
import {SentimentalAnalysisPage} from '../sentimental-analysis/sentimental-analysis';

declare var google;

/**
 * Generated class for the PlaceDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component( {
	selector: 'page-place-details',
	templateUrl: 'place-details.html',
} )
export class PlaceDetailsPage {
	guide: number;
	@ViewChild( 'map' ) mapElement: ElementRef;
	map: any;

	place: any;
	location: any;
	reviews: any[];
	weather: any;
	total: number = 0;
	currentUser: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private placeService: PlaceService,
	   	private modalCtrl: ModalController ) {
		this.place = navParams.get( "place" );
		this.guide = 4.5;
		//console.log( this.place );
		this.placeService.getPlace( this.place.place_id ).subscribe(( data ) => {
			//console.log( data );
			this.location = data.geometry.location;
			this.reviews = data.reviews;
			data.reviews.map(review => {
				this.total += parseFloat(review.sentiment.comparative);
			});
			this.total = (this.total / 5);
			this.weather = data.weather;
			this.loadMap();
		}, err => console.log( err ) );
	}
	ngOnInit() {
		this.currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
	}
	
	loadMap() {
		let latLng = new google.maps.LatLng( this.location.lat, this.location.lng);
		let mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		this.map = new google.maps.Map( this.mapElement.nativeElement, mapOptions );
		new google.maps.Marker( {
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: this.map.getCenter()
		} );
	}
	sentimentAnalysis(sentiment:any){
		let modal = this.modalCtrl.create(SentimentalAnalysisPage, sentiment);
		modal.present();
	}
	
	registerAsGuide(){
		if(this.currentUser.guide){
			let params = {
				placeId: this.place.place_id,
				guideId: this.currentUser._id
			};
			this.placeService.registerGuideToPlace(params).subscribe(data => {
				console.log('Guide Registered');
			}, err => {console.log(err)});
		}
	}
}
