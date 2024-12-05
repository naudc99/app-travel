import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Destination } from '../../../interfaces/destination';
import { DestinationService } from '../../../services/destination/destination.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogDestinationComponent } from '../dialog-destination/dialog-destination.component';
import { Review } from '../../../interfaces/review';
import { ReviewService } from '../../../services/review/review.service';
import { LoginService } from '../../../services/auth/login.service';
import { User } from '../../../interfaces/user';
import { NewDestinationReviewComponent } from '../review/new-destination-review/new-destination-review.component';
import { NewReviewDestination } from '../../../interfaces/new-review-destination';
import { MatIcon } from '@angular/material/icon';
import { EditDestinationReviewComponent } from '../review/edit-destination-review/edit-destination-review.component';
import { DeleteDestinationReviewComponent } from '../review/delete-destination-review/delete-destination-review.component';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { Reservation } from '../../../interfaces/reservation';
import { DeleteReservationComponent } from '../delete-reservation/delete-reservation.component';

@Component({
  selector: 'app-detail-destination',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './detail-destination.component.html',
  styleUrl: './detail-destination.component.scss'
})
export class DetailDestinationComponent {
  destination!: Destination;
  reviews: Review[] = [];
  userReviews: Review[] = [];
  currentUser!: User;
  userHasCommented: boolean = false;
  userReservations: Reservation[] = [];

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
    private dialog: MatDialog,
    private reviewService: ReviewService,
    private loginService: LoginService,
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.getDestination(id);
    });

    this.getCurrentUser();
  }

  getDestination(id: number): void {
    this.destinationService.getDestinationById(id).subscribe((data: Destination) => {
      this.destination = data;
      this.loadReviews();
      this.loadReviewsByUser();
      this.loadUserReservations();
    });
  }

  getStars(value: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(value / 2);
    const halfStar = value % 2 === 1;

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }

    if (halfStar) {
      stars.push('star_half');
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push('star_border');
    }

    return stars;
  }

  getCurrentUser(): void {
    this.loginService.user.subscribe(
      (user: User) => {
        this.currentUser = user;
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  loadReviews(): void {
    if (this.destination && this.currentUser && this.currentUser.userId) {
      const destinationId = this.destination.destinationId;

      this.reviewService.getReviewsByDestinationId(destinationId).subscribe(
        (reviews: Review[]) => {
          this.reviews = reviews;
        },
        error => {
          console.error('Error al cargar las reseñas:', error);
        }
      );
    }
  }

  loadReviewsByUser(): void {
    if (this.destination && this.currentUser && this.currentUser.userId) {
      const destinationId = this.destination.destinationId;
      const userId = this.currentUser.userId;

      this.reviewService.getReviewByDestinationIdAndUserId(destinationId, userId).subscribe(
        (reviews: Review[] | null) => {
          if (reviews) {
            this.userReviews = reviews;
            this.userHasCommented = reviews.length > 0;
          } else {
            this.userReviews = [];
            this.userHasCommented = false;
          }
        },
        error => {
          console.error('Error al cargar las reseñas:', error);
        }
      );
    }
  }

  loadUserReservations(): void {
    if (this.currentUser && this.currentUser.userId) {
      const userId = this.currentUser.userId;
      this.reservationService.getAllReservationsByUserId(userId).subscribe(
        (reservations: Reservation[]) => {
          this.userReservations = reservations || [];
        },
        error => {
          console.error('Error al cargar las reservas del usuario:', error);
        }
      );
    }
  }


  openNewCommentModal(): void {
    if (!this.userHasCommented) {
      this.loginService.user.subscribe(
        (user: User) => {
          if (user !== null) {
            this.currentUser = user;
            const dialogRef = this.dialog.open(NewDestinationReviewComponent, {
              width: '400px'
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                this.addReview(result);
              }
            });
          } else {
            console.error('Error: No se encontró un usuario autenticado.');
          }
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    } else {
      console.log('El usuario ya ha dejado un comentario en este destino.');
    }
  }

  addReview(newReviewData: NewReviewDestination): void {
    if (!this.currentUser) {
      console.error('Error: Usuario no autenticado');
      return;
    }

    const userId = this.currentUser.userId;
    const destinationId = this.destination.destinationId;

    const newReviewWithIds: NewReviewDestination = {
      ...newReviewData,
      userId: userId,
      destinationId: destinationId
    };

    this.reviewService.addReviewDestination(newReviewWithIds).subscribe({
      next: response => {
        console.log('Reseña agregada correctamente');
        this.loadReviews();
        this.loadReviewsByUser();
      },
      error: error => {
        console.error('Error al agregar la reseña:', error);
      }
    });
  }

  openEditCommentModal(comment: Review): void {
    if (!this.currentUser || comment.userId !== this.currentUser.userId) {
      console.error('No tiene permiso para editar este comentario.');
      return;
    }

    const dialogRef = this.dialog.open(EditDestinationReviewComponent, {
      width: '400px',
      data: { comment: comment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateComment(result);
      }
    });
  }

  updateComment(updatedComment: Review): void {
    if (!this.currentUser || updatedComment.userId !== this.currentUser.userId) {
      console.error('No tiene permiso para editar este comentario.');
      return;
    }

    this.reviewService.updateReviewByUserIdAndDestinationId(updatedComment.userId, updatedComment.destinationId, updatedComment).subscribe(
      () => {
        this.loadReviews();
        this.loadReviewsByUser();
      },
      error => {
        console.error('Error al actualizar el comentario:', error);
      }
    );
  }

  deleteReview(userId: number, destinationId: number): void {
    const dialogRef = this.dialog.open(DeleteDestinationReviewComponent, {
      width: '400px',
      data: { message: '¿Estás seguro de que quieres eliminar esta valoración?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reviewService.deleteReviewByUserIdAndDestinationId(userId, destinationId).subscribe(
          () => {
            console.log('Valoración eliminada correctamente.');
            this.loadReviews();
            this.loadReviewsByUser();
          },
          error => {
            console.error('Error al eliminar la valoración:', error);
          }
        );
      } else {
        console.log('Eliminación cancelada.');
      }
    });
  }

  openBookingDialog(): void {
    const dialogRef = this.dialog.open(DialogDestinationComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createReservation(result);
      }
    });
  }
  createReservation(reservationData: any): void {
    const newReservationWithIds: Reservation = {
      ...reservationData,
      userId: this.currentUser.userId,
      destinationId: this.destination.destinationId
    };
    this.reservationService.addReservation(newReservationWithIds).subscribe(
      response => {
        console.log('Reserva creada correctamente:', response);
        this.loadUserReservations();
      },
      error => {
        console.error('Error al crear la reserva:', error);
      }
    );
  }
  
  hasPendingReservations(): boolean {
    return this.userReservations.some(reservation => reservation.status === 'pending');
  }
  
}
