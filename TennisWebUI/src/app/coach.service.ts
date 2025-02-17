import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

    private apiUrl = 'https://localhost:7151/api/Coach';
    
    constructor(private http: HttpClient) { }
  
    getCoaches(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
  
    createCoaches(player: any): Observable<any> {
      return this.http.post(this.apiUrl, player);
    }
  
    deleteCoaches(playerId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${playerId}`);
    }
}
