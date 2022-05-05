import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'social-login-angular';
  userData!: SocialUser | null;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  ngOnit(): void {}
}
