import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { DestinationService } from '../../../../../services/destination/destination.service';
import { Destination } from '../../../../../interfaces/destination';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogActions],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private destinationService: DestinationService,
    @Inject(MAT_DIALOG_DATA) public data: { destination: Destination }
  ) { }

  confirmDelete(): void {
    this.destinationService.deleteDestination(this.data.destination.destinationId).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error deleting destination:', error);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close(false); 
  }
}

