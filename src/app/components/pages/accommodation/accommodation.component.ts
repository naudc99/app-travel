import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accommodation.component.html',
  styleUrl: './accommodation.component.scss'
})
export class AccommodationComponent {

  accommodations = [
    {
      accommodationId: 1,
      nombre: 'París, Francia',
      imagen: '../../../assets/london.jpg',
      precio: 1500
    },
    {
      accommodationId: 2,
      nombre: 'Tokio, Japón',
      imagen: '../../../assets/london.jpg',
      precio: 2000
    },
    {
      accommodationId: 3,
      nombre: 'Roma, Italia',
      imagen: '../../../assets/london.jpg',
      precio: 1800
    },
    {
      accommodationId: 4,
      nombre: 'Nueva York, EE. UU.',
      imagen: '../../../assets/london.jpg',
      precio: 2200
    },
    {
      accommodationId: 5,
      nombre: 'Barcelona, España',
      imagen: '../../../assets/london.jpg',
      precio: 1600
    }
  ];

  constructor(private router: Router) {}

  navigateToDetailFlight(accommodationId: number) {
    this.router.navigate(['/accommodation', accommodationId]);
  }
}
