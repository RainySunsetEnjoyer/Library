import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { QuoteService } from '../../../services/quote';
import { Quote } from '../../../models/quote';

@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm implements OnInit {
  quoteId: number | null = null;

  quoteForm;

  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.quoteForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.quoteId = Number(id);
      this.loadQuote(this.quoteId);
    }
  }

  loadQuote(id: number): void {
    this.quoteService.getQuote(id).subscribe({
      next: (quote) => {
        this.quoteForm.patchValue(quote);
      },
      error: (error) => {
        console.error('Failed to load quote:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) {
      return;
    }

    const quoteData = this.quoteForm.value as Quote;

    if (this.quoteId) {
      this.quoteService.updateQuote(this.quoteId, quoteData).subscribe({
        next: () => {
          this.router.navigate(['/quotes']);
        },
        error: (error) => {
          console.error('Failed to update quote:', error);
        }
      });
    } else {
      this.quoteService.createQuote(quoteData).subscribe({
        next: () => {
          this.router.navigate(['/quotes']);
        },
        error: (error) => {
          console.error('Failed to create quote:', error);
        }
      });
    }
  }
}