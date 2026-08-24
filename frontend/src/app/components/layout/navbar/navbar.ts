import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  isMenuOpen = false;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    this.authService.checkAuth();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.checkAuth();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}