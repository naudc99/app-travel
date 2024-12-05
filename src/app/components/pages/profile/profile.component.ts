import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { LoginService } from '../../../services/auth/login.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditDialogComponent } from '../admin-pages/destination-list/edit-dialog/edit-dialog.component';
import { Reservation } from '../../../interfaces/reservation';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { CommonModule } from '@angular/common';
import { Destination } from '../../../interfaces/destination';
import { DestinationService } from '../../../services/destination/destination.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  currentUser!: User;
  paidReservations: Reservation[] = [];
  paidDestination!: Destination;

  constructor(
    private loginService: LoginService,
    private dialog: MatDialog,
    private reservationService: ReservationService,
    private destinationService: DestinationService 
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.loginService.user.subscribe(
      (user: User) => {
        this.currentUser = user;
        this.getReservationsByStatus('Paid');
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '400px',
      data: { user: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        this.currentUser = updatedUser;
      }
    });
  }

  getReservationsByStatus(status: string): void {
    this.reservationService.getAllReservationsByUserId(this.currentUser.userId).subscribe(
      (reservations: Reservation[]) => {
        this.paidReservations = reservations.filter(reservation => reservation.status === status);
        this.getDestinationForPaidReservations(); // Llamamos a la función para obtener información completa del destino
      },
      error => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  getDestinationForPaidReservations(): void {
    this.paidReservations.forEach(reservation => {
      this.destinationService.getDestinationById(reservation.destinationId).subscribe(
        (destination: Destination) => {
          this.paidDestination = destination;
        },
        error => {
          console.error('Error al obtener la información del destino:', error);
        }
      );
    });
  }
}
