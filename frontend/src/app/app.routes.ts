import { Routes } from '@angular/router';
import { BookList } from './components/books/book-list/book-list';
import { BookForm } from './components/books/book-form/book-form';
import { Register } from './components/auth/register/register';
import { Login } from './components/auth/login/login';
import { authGuard } from './guards/auth.guard';
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
        component: BookForm,
        canActivate: [authGuard]
    },
    {
        path: 'books/edit/:id',
        component: BookForm,
        canActivate: [authGuard]
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
        component: QuoteList,
        canActivate: [authGuard]
    },
    {
        path: 'quotes/new',
        component: QuoteForm,
        canActivate: [authGuard]
    },
    {
        path: 'quotes/edit/:id',
        component: QuoteForm,
        canActivate: [authGuard]
    }
];