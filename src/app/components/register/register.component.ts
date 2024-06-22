import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private readonly service: AuthService,
    private router: Router
  ) { }

  isLogged?: boolean;
  user: User = {};
  registeredUser: User = {};

  requestForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit(): void {
    if (this.requestForm.valid) {

      const formValue = this.requestForm.value;
      this.user.username = formValue.username as string;
      this.user.email = formValue.email as string;
      this.user.password = formValue.password as string;

      this.service.registerUser(this.user).subscribe({
        next: data => {
          console.log("Utente creato", data);
          this.registeredUser = data;

          console.log('Attempting login with:', this.registeredUser.username, this.user.password);
          this.service.logIn(this.registeredUser.username, this.user.password)
            .subscribe(response => {
              const token = response.headers.get('access_token');
              if (token) {
                this.service.saveUser(token, this.registeredUser.username as string);
                this.router.navigate(['/']);
              }
              else console.error('Token not found in response');
            },
              error => {
                console.error('Login failed', error);
                console.log('Credenziali inserite:', this.registeredUser.username, this.registeredUser.password);
              }
            )
        },
        error: error => console.error("Errore durante la creazione dell'utente", error),
      });

    } else console.error("Form non valido");
  }



}