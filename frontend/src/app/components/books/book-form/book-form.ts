import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { BookService } from '../../../services/book';

@Component({
  selector: 'app-book-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {

  bookForm;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const book = {
      title: this.bookForm.value.title!,
      author: this.bookForm.value.author!,
      publicationDate: this.bookForm.value.publicationDate!
    };

    this.bookService.createBook(book).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (error) => {
        console.error('Failed to create book:', error);
      }
    });
  }
}