import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Post } from './services/post.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
//import { NativeStorage } from '@awesome-cordova-plugins/native-storage';


import {IonComponentComponent} from '../app/ion-component/ion-component.component';

@NgModule({
  declarations: [AppComponent, IonComponentComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
      Post,
      NativeStorage,
      {provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  
  bootstrap: [AppComponent, IonComponentComponent],
})
export class AppModule {}
