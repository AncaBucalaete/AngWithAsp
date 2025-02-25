import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map, Observable } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';

import { AuthState } from './auth/state/auth.state';
import { AppState } from './auth/state';
import { AuthActions } from './auth/state/actions-type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  loading = true;
  isLoggedIn$: Observable<boolean> | undefined;
  isLoggedOut$: Observable<boolean> | undefined;
  //private store = inject(Store);
  //private store = inject<Store<AuthState>>(Store);
  private router = inject(Router);

  constructor(private store: Store<any>) {

  }

  ngOnInit() {

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this.store
      .pipe(
        map(state => {
          return !!state.auth.user;
        })
      );

    this.isLoggedOut$ = this.store
      .pipe(
        map(state => {
          return !state.auth.user;
        })
      );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
