import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CountryService } from '../../../../services/country/country.service';
import { Country } from '../../../../interfaces/country';
import { DestinationService } from '../../../../services/destination/destination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-destination',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxDropzoneModule, FormsModule],
  templateUrl: './new-destination.component.html',
  styleUrl: './new-destination.component.scss'
})
export class NewDestinationComponent {
  destinationForm: FormGroup;
  countries: Country[] = [];
  imageFile!: File;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private destinationService: DestinationService,
    private router: Router
  ) {
    this.destinationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      countryId: ['', Validators.required], // Cambio a countryId
      price: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getAllCountries().subscribe(
      countries => {
        this.countries = countries;
      },
      error => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  onImageSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.destinationForm.valid && this.imageFile) {
      const selectedCountryId = this.destinationForm.value.countryId;
      const formData = new FormData();
      formData.append('name', this.destinationForm.value.name);
      formData.append('description', this.destinationForm.value.description);
      formData.append('countryId', selectedCountryId.toString());
      formData.append('price', this.destinationForm.value.price);
      formData.append('image', this.imageFile);

      this.destinationService.createDestinationWithImage(formData).subscribe(
        createdDestination => {
          console.log('New destination created:', createdDestination);
          this.destinationForm.reset();
          this.router.navigateByUrl("/admin/destinationList");
        },
        error => {
          console.error('Error creating destination:', error);
        }
      );
    } else {
      // Handle invalid form or no image selected
    }
  }
}