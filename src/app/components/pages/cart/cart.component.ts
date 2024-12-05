import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { User } from '../../../interfaces/user';
import { LoginService } from '../../../services/auth/login.service';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { Reservation } from '../../../interfaces/reservation';
import { CommonModule } from '@angular/common';
import { Destination } from '../../../interfaces/destination';
import { DestinationService } from '../../../services/destination/destination.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, AfterViewInit{
  currentUser!: User;
  userReservations: Reservation[] = [];
  pendingReservation!: Reservation;
  pendingDestination!: Destination;
  isLoading: boolean = true;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;


  constructor(
    private loginService: LoginService,
    private reservationService: ReservationService,
    private destinationService: DestinationService, 
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializePayPalButton();
    });
  }
  

  private initializePayPalButton(): void {
    window.paypal.Buttons(
      {
          style: {
              layout: 'horizontal',
              color: 'blue',
              shape: 'rect',
              label: 'paypal'
          },
          createOrder: (data: any, actions: any) => {
              return actions.order.create({
                  purchase_units: [{
                      amount: {
                          value: this.pendingReservation.price,
                          currency_code: 'EUR'
                      }
                  }]
              });
          },
          onApprove: (data: any, actions: any) => {
              return actions.order.capture().then((details: any) => {
                  if (details.status === 'COMPLETED') {
                      this.reservationService.updateReservationStatusToPaid(this.pendingReservation.reservationId).subscribe(
                          (updatedSale) => {
                              this.pendingReservation=updatedSale;    
                              this.router.navigateByUrl('/index');
                          },
                      );
                  }
                  else {
                      Swal.fire({
                          icon: 'error',
                          title: 'No has podido realizar la compra',
                          showConfirmButton: false,
                          timer: 2000
                      });
                  }
              });
          }
      }
  ).render(this.paymentRef.nativeElement);
  }

  getCurrentUser(): void {
    this.loginService.user.subscribe(
      (user: User) => {
        this.currentUser = user;
        this.getPendingReservation(user.userId);
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  getPendingReservation(userId: number): void {
    this.isLoading= true;
    this.reservationService.getAllReservationsByUserId(userId).subscribe(
      (reservations: Reservation[]) => {
        this.userReservations = reservations;
        const pendingReservation = this.userReservations.find(reservation => reservation.status === 'pending');
        if (pendingReservation) {
          this.pendingReservation = pendingReservation;
          this.getDestinationDetails(pendingReservation.destinationId);
          this.isLoading= false;
        }
        else
        this.router.navigateByUrl('index')
      },
      error => {
        console.error('Error al obtener las reservas pendientes:', error);
        this.isLoading= true;
      }
    );
  }
  

  getDestinationDetails(destinationId: number): void {
    this.destinationService.getDestinationById(destinationId).subscribe(
      (destination: Destination) => {
        this.pendingDestination = destination;
      },
      error => {
        console.error('Error al obtener los detalles del destino:', error);
      }
    );
  }

  deletePendingReservation(reservationId: number): void {
    this.reservationService.deleteReservation(reservationId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Has eliminado la reserva con éxito',
        });
        this.router.navigateByUrl('/index');
      },
      error => {
        console.error('Error deleting reservation:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar la reserva',
          text: 'Ha ocurrido un error al eliminar la reserva. Por favor, inténtalo de nuevo más tarde.'
        });
      }
    );
  }

}
