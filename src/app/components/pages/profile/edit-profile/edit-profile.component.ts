import { Component, Inject } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  editForm!: FormGroup;
  user: User;

  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private formBuilder: FormBuilder
  ) {
    this.user = data.user;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const editedUser: User = {
        ...this.user,
        name: this.editForm.value.name,
        email: this.editForm.value.email
      };
      this.dialogRef.close(editedUser);
    }
  }
}
