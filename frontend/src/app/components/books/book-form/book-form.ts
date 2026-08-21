import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { BookService } from '../../../services/book';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-book-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm implements OnInit {
  bookId: number | null = null;

  bookForm;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = Number(id);
      this.loadBook(this.bookId);
    }
  }

  loadBook(id: number): void {
    this.bookService.getBook(id).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          publicationDate: book.publicationDate
        });
      },
      error: (error) => {
        console.error('Failed to load book:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const formValue = this.bookForm.getRawValue();

    if (this.bookId !== null) {
      const updatedBook: Book = {
        id: this.bookId,
        title: formValue.title!,
        author: formValue.author!,
        publicationDate: formValue.publicationDate!
      };

      this.bookService.updateBook(this.bookId, updatedBook).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Failed to update book:', error);
        }
      });
    } else {
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
}