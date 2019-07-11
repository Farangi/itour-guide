import { UserService, AlertService, AuthenticationService } from '../../_services';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  
  model: any = {};
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  ngOnInit() {
    this.model.rating = 0.0;
  }
  
  signup() {
    this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.authenticationService.login(this.model.username, this.model.password)
                        .subscribe(
                            data => {
                                this.navCtrl.push(TabsPage);
                            },
                            error => {
                                this.alertService.error(error);
                            });
                },
                error => {
                    this.alertService.error(error);
                });
    
  }
}
