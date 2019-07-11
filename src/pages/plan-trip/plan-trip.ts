import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlaceService } from '../../_services';
import { Geolocation } from '@ionic-native/geolocation';
import { PlaceDetailsPage } from '../place-details/place-details';

/**
 * Generated class for the PlanTripPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-plan-trip',
  templateUrl: 'plan-trip.html',
})
export class PlanTripPage implements OnInit {
  places: any[];
  interest: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private placeService: PlaceService,
    private geolocation: Geolocation) {
  }
  ngOnInit() {
    this.interest = 'hill';
    this.getPlacesByInterest();
  }
  getPlacesByInterest() {
    this.places = null;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.placeService.getPlacesByKeyword(resp.coords.longitude,resp.coords.latitude,this.interest).subscribe(response => {
        this.places = response.json.results;
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  
  selectPlace(place:any){
    this.navCtrl.push(PlaceDetailsPage, {
      place: place
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanTripPage');
  }

}
