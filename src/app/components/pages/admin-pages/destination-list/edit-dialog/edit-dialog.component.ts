import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Destination } from '../../../../../interfaces/destination';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CountryService } from '../../../../../services/country/country.service';
import { MatOptionModule } from '@angular/material/core';
import { Country } from '../../../../../interfaces/country';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatOptionModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent implements OnInit{
  editForm!: FormGroup;
  countries: Country[] = [];
  imageFile!: File;

  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { destination: Destination },
    private formBuilder: FormBuilder,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCountries();
  }

  initForm(): void {
    this.editForm = this.formBuilder.group({
      name: [this.data.destination.name],
      description: [this.data.destination.description],
      // Inicializar el campo de país con el país actual del destino
      country: [this.data.destination.country],
      price: [this.data.destination.price],
      image: ['']
    });
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
  if (this.editForm.valid) {
    let editedDestination: Destination;

    if (this.imageFile) {
      editedDestination = {
        destinationId: this.data.destination.destinationId,
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        country: this.data.destination.country,
        price: this.editForm.value.price,
        image: this.editForm.value.image
      };
    } else {
      editedDestination = {
        destinationId: this.data.destination.destinationId,
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        country: this.data.destination.country,
        price: this.editForm.value.price,
        image: this.data.destination.image
      };
    }
    this.dialogRef.close(editedDestination);
  }
}

  onCancel(): void {
    this.dialogRef.close();
  }
}