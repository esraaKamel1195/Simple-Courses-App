import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../auth.service';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { LoginAction } from '../auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form: FormGroup<any> = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['test@course.io', [Validators.required]],
      password: ['test', [Validators.required]],
    });
  }

  login() {
    this.authService
      .login(this.form.value.email, this.form.value.password)
      .subscribe({
        next: (user) => {
          console.log('response', user);
          this.store.dispatch(LoginAction({ user: user }));
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
