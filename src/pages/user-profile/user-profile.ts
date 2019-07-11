import { User } from '../../_models';
import { UserService } from '../../_services';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage implements OnInit {
  currentUser: User;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userService: UserService,
    public app: App) {
    this.currentUser = {
          _id: null,
          username: null,
          password: null,
          firstName: null,
          lastName: null,
          guide: false,
          rating: null
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  logoutme() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }
}
