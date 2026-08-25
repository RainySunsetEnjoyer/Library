import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuoteService } from '../../../services/quote';
import { Quote } from '../../../models/quote';

@Component({
  selector: 'app-quote-list',
  imports: [RouterLink],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.css',
})
export class QuoteList implements OnInit {
  quotes: Quote[] = [];

  deleteConfirmation = false;
  quoteIdToDelete: number | null = null;

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.quoteService.getQuotes().subscribe({
      next: (quotes) => {
        this.quotes = quotes;
      },
      error: (error) => {
        console.error('Failed to load quotes:', error);
      }
    });
  }

  confirmDelete(id: number): void {
    this.quoteIdToDelete = id;
    this.deleteConfirmation = true;
  }

  cancelDelete(): void {
    this.quoteIdToDelete = null;
    this.deleteConfirmation = false;
  }

  executeDelete(): void {
    if (this.quoteIdToDelete === null) {
      return;
    }
    this.deleteQuote(this.quoteIdToDelete);

    this.quoteIdToDelete = null;
    this.deleteConfirmation = false;
  }

  deleteQuote(id: number): void {
    this.quoteService.deleteQuote(id).subscribe({
      next: () => {
        this.quotes = this.quotes.filter(quote => quote.id !== id);
      },
      error: (error) => {
        console.error('Failed to delete quote:', error);
      }
    });
  }
}
