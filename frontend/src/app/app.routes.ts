import { Routes } from '@angular/router';
import { BookList } from './components/books/book-list/book-list';
import { BookForm } from './components/books/book-form/book-form';
import { Register } from './components/auth/register/register';
import { Login } from './components/auth/login/login';
import { guestGuard } from './guards/guest.guard';
import { QuoteList } from './components/quotes/quote-list/quote-list';
import { QuoteForm } from './components/quotes/quote-form/quote-form';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full'
    },
    {
        path: 'books',
        component: BookList
    },
    {
        path: 'books/new',
        component: BookForm
    },
    {
        path: 'books/edit/:id',
        component: BookForm
    },
    {
        path: 'register',
        component: Register,
        canActivate: [guestGuard]
    },
    {
        path: 'login',
        component: Login,
        canActivate: [guestGuard]
    },
    {
        path: 'quotes',
        component: QuoteList
    },
    {
        path: 'quotes/new',
        component: QuoteForm
    },
    {
        path: 'quotes/edit/:id',
        component: QuoteForm
    }
];