import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authenticatedUserInfo: any;
  userLoggedIn: boolean;
  authSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSub = this.authService.logStatus$.subscribe((data) => {
      this.authenticatedUserInfo = data;
      this.userLoggedIn = this.authenticatedUserInfo != null;
    });
  }

  login(): void {
    this.authService.googleLogin();
  }
  logout(): void {
    this.authService.googleLogout();
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
