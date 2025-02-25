import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '../Player';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlayerService } from '../player.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-player-dialog',
    imports: [MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    providers: [DatePipe],
    templateUrl: './player-dialog.component.html',
    styleUrl: './player-dialog.component.scss'
})
export class PlayerDialogComponent {
  players: Player[] = [];
  newPlayer: Player = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '',
    role: 'Player',
    createdAt: this.getFormattedDate(),
    dateOfBirth: '',
    level: '',
    profileImage: ''
  };

  playerForm: FormGroup;
  
  constructor(
    private playerService: PlayerService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }, // Receiving data
    private datePipe: DatePipe
  ) { 
    this.playerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required]],
      level: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  createPlayer() {
    this.playerService.createPlayer(this.newPlayer).subscribe(() => {
      
    });
    this.dialogRef.close(this.newPlayer);
  }

  close(): void {
    this.dialogRef.close(); 
  }

  getFormattedDate(): string {
    return this.datePipe.transform(new Date().toLocaleString(), 'yyyy-MM-dd') || '';
  }
}
