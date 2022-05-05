import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUserData: BehaviorSubject<SocialUser | null> =
    new BehaviorSubject<SocialUser | null>(this.isLoggedIn());
  readonly loggedInUserData$ = this.loggedInUserData.asObservable();

  constructor(private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe((user) => {
      if (!!user) {
        localStorage.setItem('socialUserData', JSON.stringify(user));
      }
      this.loggedInUserData.next(user);
    });
  }

  isLoggedIn(): SocialUser | null {
    if (!!localStorage.getItem('socialUserData')) {
      return JSON.parse(localStorage.getItem('socialUserData') as string);
    }
    return null;
  }
}
