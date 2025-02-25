import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  login(email:string, password:string): Observable<User> {
    return of(email === "test@angular-university.io" && password === "123" ? new User(email) : new User('Guest'))
      .pipe(delay(1000)); // Simulate API delay
  }
}
