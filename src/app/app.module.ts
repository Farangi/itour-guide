import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { customHttpProvider } from '../_helpers/index';
import { AlertComponent } from '../_directives/index';
import { AlertService, AuthenticationService, UserService, PlaceService } from '../_services/index';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { BestPlaces } from '../pages/best-places/best-places';
import { TabsPage } from '../pages/tabs/tabs';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { PlanTripPage } from '../pages/plan-trip/plan-trip';
import { PlaceDetailsPage } from '../pages/place-details/place-details';
import { SentimentalAnalysisPage } from "../pages/sentimental-analysis/sentimental-analysis";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    BestPlaces,
    TabsPage,
    AlertComponent,
    UserProfilePage,
    PlanTripPage,
    PlaceDetailsPage,
	SentimentalAnalysisPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    BestPlaces,
    TabsPage,
    UserProfilePage,
    PlanTripPage,
    PlaceDetailsPage,
	SentimentalAnalysisPage
  ],
  providers: [
    Geolocation,
    customHttpProvider,
    AlertService,
    AuthenticationService,
    UserService,
    PlaceService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
