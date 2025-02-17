import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PlayerService } from '../player.service';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../Player';
import { CoachDialogComponent } from '../coach-dialog/coach-dialog.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CoachService } from '../coach.service';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss'
})
export class CoachesComponent {
  coaches: Player[] = [];
  selectedCoach?: Player = undefined;
  constructor(private coachService: CoachService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.coachService.getCoaches().subscribe(data => {
      this.coaches = data;
    });
  }

  onAddCoach() {
    const dialogRef = this.dialog.open(CoachDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(response => {
      console.log("We close the Add Coach dialog with status ", response);
      if (response) {
        this.coaches.push(response);
      }
    });
  }

  onSelect(coach: any) {
    if (this.selectedCoach === coach) {
      this.selectedCoach = undefined; // Deselect if it's already selected
    } else {
      this.selectedCoach = coach; // Select the coach
    }
  }

  deleteCoach() {
    if (this.selectedCoach) {
      const index = this.coaches.indexOf(this.selectedCoach);
      if (index >= 0) {
        this.coachService.deleteCoaches(this.selectedCoach.userId).subscribe(res => {
          console.log("Delete coach res: ", res);
          this.coaches.splice(index, 1); // Remove the coach from the list
          this.selectedCoach = undefined; // Reset selected coach
          //this.coaches = [...this.coaches];           
        });
      }
    }
  }
}
