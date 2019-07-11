import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BestPlaces } from '../best-places/best-places';
import { LoginPage } from '../login/login';
import { UserProfilePage } from '../user-profile/user-profile';
import { PlanTripPage } from '../plan-trip/plan-trip';

import { User } from '../../_models';
import { UserService } from '../../_services';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  currentUser: User;
  tab1 = UserProfilePage;
  tab2 = PlanTripPage;
  tab3 = BestPlaces;

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    public navParams: NavParams) {
  }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  logout(){
    this.navCtrl.push(LoginPage)
  }
}
