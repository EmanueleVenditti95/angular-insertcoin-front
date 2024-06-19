import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private readonly service : AuthService) {}

  requestForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      const email = formValue.email as string;
      const password = formValue.password as string;
      this.service.logIn(email,password).subscribe(response => {
        const token = response.headers.get('access_token');
        console.log(token);       
      },error => {
        console.error('Login failed', error);
      });
      
    } else {
      console.error('Form non valido');
    } 
  } 
}
