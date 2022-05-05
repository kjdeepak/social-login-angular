import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
    this.authService.loggedInUserData$.subscribe((userData) => {
      this.userData = userData;
    });
  }

  signOut(): void {
    this.socialAuthService.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch((err) => {
      this.router.navigate(['/login']);
      console.log(err);
    });
  }
}
