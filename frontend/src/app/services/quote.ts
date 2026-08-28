import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote, CreateQuote } from '../models/quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = '/api/quotes';

  constructor(private http: HttpClient) { }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl, { withCredentials: true });
  }

  getQuote(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  createQuote(quote: CreateQuote): Observable<Quote> {
    return this.http.post<Quote>(this.apiUrl, quote, { withCredentials: true });
  }

  updateQuote(id: number, quote: Quote): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, quote, { withCredentials: true });
  }

  deleteQuote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
