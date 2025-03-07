import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiUrl = 'http://localhost:5078/api/players';
  
  constructor(private http: HttpClient) { }

  getPlayers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createPlayer(player: any): Observable<any> {
    return this.http.post(this.apiUrl, player);
  }

  deletePlayer(playerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${playerId}`);
  }
}
