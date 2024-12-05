import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Destination } from '../../../interfaces/destination';
import { CommonModule } from '@angular/common';
import { DestinationService } from '../../../services/destination/destination.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent implements OnInit{
  destinations: Destination[] = [];
  
  constructor(private router: Router, private destinationService: DestinationService) {}

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
  navigateToDetailFlight(flightId: number) {
    this.router.navigate(['/destination', flightId]);
  }
}
