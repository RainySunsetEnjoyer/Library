import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, CreateBook } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = '/api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl, { withCredentials: true });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  createBook(book: CreateBook): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, { withCredentials: true });
  }

  updateBook(id: number, book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, book, { withCredentials: true });
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}