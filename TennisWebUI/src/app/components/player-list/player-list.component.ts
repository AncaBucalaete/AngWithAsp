import { ChangeDetectorRef, Component } from '@angular/core';
import { PlayerService } from '../../player.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PlayerDialogComponent } from '../../player-dialog/player-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';  
import { Player } from '../../Player';
import { MatTableModule } from '@angular/material/table'; 

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, MatCheckboxModule, MatTableModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent {
  players: Player[] = [];
  selectedPlayer?: Player = undefined;
  displayedColumns: string[] = ['select', 'firstName', 'level'];

  constructor(private playerService: PlayerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(data => {
      this.players = data;
    });
  }

  onAddPlayer() {
    const dialogRef = this.dialog.open(PlayerDialogComponent, {     
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(response => {
      console.log("We close the Add Player dialog with status ", response);
      if (response) {
        this.players.push(response);
        this.players = [...this.players];   
      }
    });
  }

  playerSearch(event: any) {

  }

  public playerSearchCleared(args: MouseEvent): void {
    if ((args.target as HTMLElement).previousElementSibling) {
      ((args.target as HTMLElement).previousElementSibling as HTMLInputElement).value = '';
    }
  }

  onSelect(player: any) {
    if (this.selectedPlayer === player) {
      this.selectedPlayer = undefined; // Deselect if it's already selected
    } else {
      this.selectedPlayer = player; // Select the player
    }
  }

  deletePlayer() {
    if (this.selectedPlayer) {
      const index = this.players.indexOf(this.selectedPlayer);
      if (index >= 0) {
        this.playerService.deletePlayer(this.selectedPlayer.userId).subscribe(res => {
          console.log("Delete player res: ", res);
          this.players.splice(index, 1); // Remove the player from the list
          this.selectedPlayer = undefined; // Reset selected player
          this.players = [...this.players];           
        });
      }
    }
  }
}