import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm !: FormGroup
  fb = inject(FormBuilder)
  appSvc = inject(AppService)
  authSvc = inject(AuthService)

  ngOnInit() {
    this.loginForm = this.createForm()
  }

  createForm() {
    return this.fb.group({
      email: this.fb.control<string>('', [Validators.email, Validators.required]),
      password: this.fb.control<string>('', [Validators.required])
    })
  }

  login() {
    const loginEmail = this.loginForm.value['email']
    const loginPassword = this.loginForm.value['password']
  }

  googleLogin() {
      this.authSvc.login()
  }


}
