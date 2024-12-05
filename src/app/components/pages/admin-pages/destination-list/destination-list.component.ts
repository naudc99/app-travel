import { Component } from '@angular/core';
import { Destination } from '../../../../interfaces/destination';
import { DestinationService } from '../../../../services/destination/destination.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-destination-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIcon],
  templateUrl: './destination-list.component.html',
  styleUrl: './destination-list.component.scss'
})
export class DestinationListComponent {
  destinations: Destination[] = [];
  displayedColumns: string[] = ['image', 'name', 'country', 'price', 'actions'];

  constructor(private destinationService: DestinationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {
    this.destinationService.getAllDestinations().subscribe(
      (destinations) => {
        this.destinations = destinations;
      },
      (error) => {
        console.error('Error fetching destinations:', error);
      }
    );
  }

  openEditDialog(destination: Destination): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { destination: destination }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.destinationService.updateDestination(destination.destinationId, result).subscribe(
          () => {
            this.loadDestinations();
          },
          (error) => {
            console.error('Error updating destination:', error);
          }
        );
      }
    });
  }

  openDeleteConfirmationDialog(destination: Destination): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { destination: destination }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDestinations();
      }
    });
  }
}

