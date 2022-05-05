import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../_core/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  faGoogle = faGoogle;
  faFacebook = faFacebook;

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private titleService: Title,
    private authService: AuthService
  ) {
    this.titleService.setTitle('Login');
  }

  ngOnInit(): void {
    if(!!this.authService.loggedInUserData.getValue()){
      this.router.navigate(['/dashboard']);
    }
  }

  signInWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        this.router.navigate(['./dashboard']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signInWithFB(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(() => {
        this.router.navigate(['./dashboard']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
