import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AlertController} from "@ionic/angular";
import { Preferences } from '@capacitor/preferences';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  URL='https://reqres.in/api/'
  constructor(public router:Router,private alertController:AlertController,private httpClient:HttpClient) { }

  login(veri:any)
  {
    return this.httpClient.post(this.URL+'login',veri);
  }

  signup(veri:any)
  {
    return this.httpClient.post(this.URL+'register',veri);
  }

  async presentAlert(message:any) {
    const alert = await this.alertController.create({
      header: 'Hata!',
      message: message,
      buttons: ['Error'],
    });

    await alert.present();
  }

  async setName(token:any)
    {
    await Preferences.set({
      key: 'ionicAuthMesut_usertoken',
      value: JSON.stringify(token),
    });
  };

  async removeName ()
  {
    await Preferences.remove({ key: 'ionicAuthMesut_usertoken' });
  };

}
