import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../services/book';
import { Book } from '../../../models/book';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (error) => {
        console.error('Failed to load books:', error);
      }
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.id !== id);
      },
      error: (error) => {
        console.error('Failed to delete book:', error);
      }
    });
  }
}