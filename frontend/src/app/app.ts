import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/layout/navbar/navbar';
import { BookList } from './components/books/book-list/book-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BookList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('library-app');
}
