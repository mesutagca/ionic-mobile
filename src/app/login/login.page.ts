import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {FormGroup,FormBuilder,Validators}  from "@angular/forms";
import {Router} from "@angular/router";



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  uyelikBilgisi:FormGroup;
  userValue:any;

  constructor(private router:Router,private fb:FormBuilder,private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.uyelikBilgisi=this.fb.group({
      email:['eve.holt@reqres.in',[Validators.required,Validators.email]],
      password:['pistol!F',[Validators.required,Validators.minLength(6)]]
    });
  }

  login()
  {
    this.authService.login(this.uyelikBilgisi.value).subscribe(
      result => {
        console.log(result);
        this.userValue=result;
        if (this.userValue){
          this.router.navigateByUrl('home');
          this.authService.setName(this.userValue);
        }
      },
      e => {
        this.authService.presentAlert(e.error.error)
      }
    );
  }

  get email()
  {
    return this.uyelikBilgisi.get('email');
  }

  get password()
  {
    return this.uyelikBilgisi.get('password');
  }

}
