import { AuthenticationService, AlertService } from '../../_services';
import { SignupPage } from '../signup/signup';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  
  backgrounds = [
    '../assets/imgs/background/background-1.jpg',
    '../assets/imgs/background/1200px-Azad_kashmir.jpg',
    '../assets/imgs/background/567d1ca45aabe.jpg',
    '../assets/imgs/background/843302-bigthumbnail.jpg'
  ];
  model: any = {};
  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin(){
  this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
          data => {
              this.navCtrl.push(TabsPage);
          },
          error => {
              this.alertService.error(error);
          });
    
  }
  gotoSignUp(){
    this.navCtrl.push(SignupPage);
  }
}
