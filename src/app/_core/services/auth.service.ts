import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { StorageKeys } from '../models/interface';

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
        localStorage.setItem(StorageKeys.SOCIAL_USER_DATA, JSON.stringify(user));
      }
      this.loggedInUserData.next(user);
    });
  }

  isLoggedIn(): SocialUser | null {
    if (!!localStorage.getItem(StorageKeys.SOCIAL_USER_DATA)) {
      return JSON.parse(localStorage.getItem(StorageKeys.SOCIAL_USER_DATA) as string);
    }
    return null;
  }
}
