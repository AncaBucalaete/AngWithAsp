import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlayerService } from '../player.service';
import { Player } from '../Player';
import { CoachService } from '../coach.service';

@Component({
  selector: 'app-coach-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './coach-dialog.component.html',
  styleUrl: './coach-dialog.component.scss'
})
export class CoachDialogComponent implements OnInit {
  coachForm: FormGroup;
  coaches: Player[] = [];
  newCoach: Player = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '',
    role: 'Coach',
    createdAt: this.getFormattedDate(),
    dateOfBirth: this.getFormattedDate(),
    level: '',
    profileImage: ''
  };

  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private coachService: CoachService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CoachDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private datePipe: DatePipe
  ) {
    this.coachForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      profileImage: [''] 
    });
  }

  ngOnInit() {
    this.coachForm.patchValue(this.newCoach);
  }

  createCoach() {
    if (this.coachForm.valid) {
      const playerData: Player = {
        ...this.newCoach, // Keep default values
        ...this.coachForm.value // Merge form values
      };
      console.log('Final Player Object:', playerData);
      this.coachService.createCoaches(playerData).subscribe();
      this.dialogRef.close(playerData);
    } else {
      console.log('Form Invalid');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Convert image to base64
        this.coachForm.get('profileImage')?.setValue(reader.result); // Update form control
      };
      reader.readAsDataURL(file);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  getFormattedDate(): string {
    return this.datePipe.transform(new Date().toLocaleString(), 'yyyy-MM-dd') || '';
  }
}
