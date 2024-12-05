import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  activities = [
    {
      activityId: 1,
      nombre: 'París, Francia',
      imagen: '../../../assets/london.jpg',
      precio: 1500
    },
    {
      activityId: 2,
      nombre: 'Tokio, Japón',
      imagen: '../../../assets/london.jpg',
      precio: 2000
    },
    {
      activityId: 3,
      nombre: 'Roma, Italia',
      imagen: '../../../assets/london.jpg',
      precio: 1800
    },
    {
      activityId: 4,
      nombre: 'Nueva York, EE. UU.',
      imagen: '../../../assets/london.jpg',
      precio: 2200
    },
    {
      activityId: 5,
      nombre: 'Barcelona, España',
      imagen: '../../../assets/london.jpg',
      precio: 1600
    }
  ];

  constructor(private router: Router) {}

  navigateToDetailFlight(activityId: number) {
    this.router.navigate(['/activity', activityId]);
  }
}
