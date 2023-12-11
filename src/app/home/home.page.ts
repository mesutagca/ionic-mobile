import {Component} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  kullanicilar: any;
  basliklar:any;

  URL: string = "https://reqres.in/api/users";

  constructor(private authService: AuthenticationService, private httpClient: HttpClient) {
    this.verGetir().subscribe(
      sonuc => {

        this.basliklar=sonuc['data'][0];
        this.kullanicilar=sonuc['data'];
      },
      err => {
        console.log(err.error.error);
      }
    );
  }

  verGetir() {
    return this.httpClient.get(this.URL);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.verGetir().subscribe(sonuc => {
        this.kullanicilar = sonuc;
        console.log(this.kullanicilar);
      }, error => {
        console.log(error)
      });
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  cikis() {
    this.authService.removeName().then((success) => {
      this.authService.router.navigateByUrl('login')
    }).catch((err) => {
    });
  }
}
