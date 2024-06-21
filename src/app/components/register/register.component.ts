import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  constructor(
    private readonly service : AuthService, 
    private router: Router
  ) {}

  isLogged?:boolean;
  requestForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit() : void {
    if(this.requestForm.valid) {
      const formValue = this.requestForm.value;
      const username = formValue.username as string;
      const email = formValue.email as string;
      const password = formValue.password as string;
    }
  }
}
