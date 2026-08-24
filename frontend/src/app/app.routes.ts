import { Routes } from '@angular/router';
import { BookList } from './components/books/book-list/book-list';
import { BookForm } from './components/books/book-form/book-form';
import { Register } from './components/auth/register/register';


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
        component: Register
    }
];