import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { CommentData } from '../../../../interfaces/comment-data';

@Component({
    selector: 'app-new-destination-review',
    standalone: true,
    imports: [MatFormFieldModule, MatIcon, CommonModule, FormsModule, MatDialogModule],
    templateUrl: './new-destination-review.component.html',
    styleUrl: './new-destination-review.component.scss'
})
export class NewDestinationReviewComponent {
    newReview: CommentData = { comment: '', rating: 1 };
    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number = 0;

    constructor(public dialogRef: MatDialogRef<NewDestinationReviewComponent>) { }

    ngOnInit(): void {
    }

    submit(): void {
        this.newReview.rating = this.selectedValue * 2;
        this.dialogRef.close(this.newReview);
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
