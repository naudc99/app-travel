import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-destination',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-destination.component.html',
  styleUrl: './dialog-destination.component.scss'
})
export class DialogDestinationComponent {
  reservationForm!: FormGroup;
  currentDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<DialogDestinationComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const minStartDate = new Date(this.currentDate);
    minStartDate.setDate(minStartDate.getDate() + 1);

    this.reservationForm = this.fb.group({
      initialDate: [minStartDate.toISOString().split('T')[0], [Validators.required, this.validateInitialDate]], // Agrega el validador personalizado para la fecha inicial
      finalDate: ['', [Validators.required, this.validateFinalDate]], // No se establece un valor predeterminado, se configurará después en base a initialDate
      passengerCount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Validador personalizado para la fecha inicial
  validateInitialDate(control: AbstractControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate <= currentDate) {
      return { invalidStartDate: true };
    }
    return null;
  }

  // Validador personalizado para la fecha final
  validateFinalDate(control: AbstractControl): { [key: string]: boolean } | null {
    const initialDateControl = control.root.get('initialDate'); // Obtiene la referencia al control de fecha inicial
    if (initialDateControl && initialDateControl.value) {
      const initialDate = new Date(initialDateControl.value);
      const selectedDate = new Date(control.value);
      if (selectedDate <= initialDate) {
        return { invalidEndDate: true };
      }
    }
    return null;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onBookClick(): void {
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      this.dialogRef.close(reservationData);
    }
  }
}