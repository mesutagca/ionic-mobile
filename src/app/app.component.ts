import { Component } from '@angular/core';
import {Preferences} from "@capacitor/preferences";
import {AuthenticationService} from "./authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService:AuthenticationService) {
    this.checkName();
  }

  async checkName()
  {
    const {value}=await Preferences.get({ key: 'ionicAuthMesut_usertoken' });

    if (value!=null)
      this.authService.router.navigateByUrl('home');
    else
      this.authService.router.navigateByUrl('login');
  };
}
