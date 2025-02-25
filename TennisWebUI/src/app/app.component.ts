import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthState } from './auth/state/auth.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    MatSidenavModule,  // ✅ Import Sidenav
    MatToolbarModule,   // ✅ Import Toolbar
    MatButtonModule,    // ✅ Import Buttons
    MatIconModule,      // ✅ Import Icons
    MatListModule,
    MatProgressSpinnerModule,
    RouterModule
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

  constructor(private router: Router) {

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

/*     this.isLoggedIn$ = this.store
      .pipe(
        map(state => !!state["auth"].user)
      );

    this.isLoggedOut$ = this.store
      .pipe(
        map(state => !state["auth"].user)
      ); */
  }

  logout() {

  }
}
