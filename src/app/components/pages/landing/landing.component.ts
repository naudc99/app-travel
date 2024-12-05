import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, NgbModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  flights = [
    { name: 'Destino 1', image: '../../../assets/london.jpg', price: '500' },
    { name: 'Destino 2', image: '../../../assets/london.jpg', price: '600' },
    { name: 'Destino 3', image: '../../../assets/london.jpg', price: '700' },
    { name: 'Destino 5', image: '../../../assets/london.jpg', price: '800' },
    { name: 'Destino 6', image: '../../../assets/london.jpg', price: '900' },
    { name: 'Destino 7', image: '../../../assets/london.jpg', price: '300' },
    { name: 'Destino 8', image: '../../../assets/london.jpg', price: '400' }
  ];
  accommodations = [
    { name: 'Alojamiento 1', image: '../../../assets/hotel.webp', price: '500' },
    { name: 'Alojamiento 2', image: '../../../assets/hotel.webp', price: '600' },
    { name: 'Alojamiento 3', image: '../../../assets/hotel.webp', price: '700' },
    { name: 'Alojamiento 5', image: '../../../assets/hotel.webp', price: '800' },
    { name: 'Alojamiento 6', image: '../../../assets/hotel.webp', price: '900' },
    { name: 'Alojamiento 7', image: '../../../assets/hotel.webp', price: '300' },
    { name: 'Alojamiento 8', image: '../../../assets/hotel.webp', price: '400' }
  ];
  activities = [
    { name: 'Actividad 1', image: '../../../assets/activities.jpg', price: '500' },
    { name: 'Actividad 2', image: '../../../assets/activities.jpg', price: '600' },
    { name: 'Actividad 3', image: '../../../assets/activities.jpg', price: '700' },
    { name: 'Actividad 5', image: '../../../assets/activities.jpg', price: '800' },
    { name: 'Actividad 6', image: '../../../assets/activities.jpg', price: '900' },
    { name: 'Actividad 7', image: '../../../assets/activities.jpg', price: '300' },
    { name: 'Actividad 8', image: '../../../assets/activities.jpg', price: '400' }
  ]

  constructor(config: NgbCarouselConfig) {
    config.interval = 5000; // Intervalo de cambio de diapositivas (en milisegundos)
    config.wrap = true; // El carrusel volverá al primer slide después de llegar al último
    config.keyboard = true; // Habilita el control del carrusel mediante el teclado
  }
}
