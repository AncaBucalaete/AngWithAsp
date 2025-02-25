import { Component, OnInit } from '@angular/core';
import { Player } from '../Player';
import { PlayerService } from '../player.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-player',
    imports: [FormsModule],
    templateUrl: './player.component.html',
    styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit {
  players: Player[] = [];
  newPlayer: Player = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '',
    role: 'Player',
    createdAt: '',
    level: '',
    profileImage: '',
    dateOfBirth: ''
  };

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe((data: Player[]) => {
      this.players = data;
    });
  }

  createPlayer() {
    this.playerService.createPlayer(this.newPlayer).subscribe(() => {
      this.loadPlayers();
    });
  }

  deletePlayer(id: number) {
    this.playerService.deletePlayer(id).subscribe(() => {
      this.loadPlayers();
    });
  }
}
