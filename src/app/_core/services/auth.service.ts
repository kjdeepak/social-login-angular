import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly loggedInUserData: BehaviorSubject<SocialUser | null> =
    new BehaviorSubject<SocialUser | null>(null);
  readonly loggedInUserData$ = this.loggedInUserData.asObservable();

  constructor(private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe((user) => {
      this.loggedInUserData.next(user);
    });
  }
}
