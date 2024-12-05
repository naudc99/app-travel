import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-destination-review',
  standalone: true,
  imports: [MatDialogActions],
  templateUrl: './delete-destination-review.component.html',
  styleUrl: './delete-destination-review.component.scss'
})
export class DeleteDestinationReviewComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDestinationReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false); 
  }

  onYesClick(): void {
    this.dialogRef.close(true); 
  }
}
