import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private readonly service : AuthService, private router: Router) {}

  isLogged?:boolean;
  username?:string;


  requestForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.service.isLoggedIn().subscribe(loggedIn => {
      this.isLogged = loggedIn;
      if (loggedIn) {
        this.username = localStorage.getItem("username") as string;
      } else {
        this.username = '';
      }
    });
  }

  onSubmit() : void{
     if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      const email = formValue.email as string;
      const password = formValue.password as string;

      this.service.logIn(email,password).subscribe(response => {
         const token = response.headers.get('access_token');
        
         if (token) {
            this.service.saveUser(token, email);
         } else {
           console.error('Token not found in response');
         }       
       },error => {
         console.error('Login failed', error);
      });
      this.router.navigate(['/']); 
     } else {
       console.error('Form non valido');
     } 
    console.log(localStorage);  
  } 
}
