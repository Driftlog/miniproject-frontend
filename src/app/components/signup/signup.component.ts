import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  @ViewChild('file') imageFile !: ElementRef;

  fb = inject(FormBuilder)
  appSvc = inject(AppService)
  signUpForm !: FormGroup


  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.fb.group
  }

  signUp() {
    
  }

}
