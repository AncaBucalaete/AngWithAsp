import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

    private apiUrl = 'http://localhost:5078/api/coaches';
    // Restful
    // GET api/coaches
    // POST api/coaches
    // PUT/PATCH api/coaches/123
    // DELETE api/coaches/123
    
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
