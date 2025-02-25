import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { noop, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthState } from '../state/auth.state';
import { login } from '../state/auth.actions';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule, 
        MatCardModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;

  //private store = inject(Store);
  // private store = inject<Store<AuthState>>(Store);

  
  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router,
    private readonly store: Store<AuthState>
  ) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {

    const val = this.form.value;

    this.auth.login(val.email, val.password)
      .pipe(
        tap(user => {

          console.log(user);

          this.store.dispatch(login({ user }));

          this.router.navigateByUrl('/players');

        })
      )
      .subscribe(
        noop,
        () => alert('Login Failed')
      );
  }
}
