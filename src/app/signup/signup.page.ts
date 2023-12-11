import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {FormGroup,FormBuilder,Validators}  from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  uyelikBilgisi:FormGroup;
  userValue:any;
  constructor(private router:Router,private fb:FormBuilder,private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.uyelikBilgisi=this.fb.group({
      ad:['Eve Holt',[Validators.required,Validators.minLength(4)]],
      soyad:['Eve Holt',[Validators.required,Validators.minLength(4)]],
      email:['eve.holt@reqres.in',[Validators.required,Validators.email]],
      password:['pistol!F',[Validators.required,Validators.minLength(6)]]
    });
  }

  signup()
  {
    this.authService.signup(this.uyelikBilgisi.value).subscribe(
      (result:any) => {
        console.log(result);
        this.userValue=result.token;
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

  get ad()
  {
    return this.uyelikBilgisi.get('ad');
  }

  get soyad()
  {
    return this.uyelikBilgisi.get('soyad');
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
