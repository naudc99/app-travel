import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CommentData } from '../../../../interfaces/comment-data';
import { Review } from '../../../../interfaces/review';

@Component({
  selector: 'app-edit-destination-review',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatIcon],
  templateUrl: './edit-destination-review.component.html',
  styleUrl: './edit-destination-review.component.scss'
})
export class EditDestinationReviewComponent {
  editedReview: CommentData;
  originalReview: Review; 
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EditDestinationReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { comment: Review } 
  ) {
    this.originalReview = data.comment; 
    this.editedReview = { ...this.originalReview }; 
    this.selectedValue = this.originalReview.rating / 2; 
  }

  submit(): void {
    this.editedReview.rating = this.selectedValue * 2;
    this.dialogRef.close(this.editedReview);
  }

  close(): void {
    this.dialogRef.close();
  }

  setRating(event: MouseEvent, star: number) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - rect.left;

    if (offsetX < rect.width / 2) {
      this.selectedValue = star - 0.5;
    } else {
      this.selectedValue = star;
    }
  }

  isSelected(star: number): boolean {
    return this.selectedValue >= star;
  }

  isHalfStar(star: number): boolean {
    return this.selectedValue === star - 0.5;
  }
}
