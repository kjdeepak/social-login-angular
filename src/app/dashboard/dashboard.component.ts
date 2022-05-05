import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../_core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userData!: SocialUser | null;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Dashboard');
  }

  ngOnInit(): void {
    this.userData = this.authService.loggedInUserData.getValue();
  }

  signOut(): void {
    this.socialAuthService
      .signOut()
      .then(() => {
        this.clearUserDataAndNavigateToLoginPage();
      })
      .catch((err) => {
        this.clearUserDataAndNavigateToLoginPage();
        console.log(err);
      });
  }

  clearUserDataAndNavigateToLoginPage(): void {
    localStorage.removeItem('socialUserData');
    this.authService.loggedInUserData.next(null);
    this.router.navigate(['/login']);
  }
}
