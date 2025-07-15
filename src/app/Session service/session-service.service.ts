import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common'; // Import Location service
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {
  private timer: any;
  private timeoutInMinutes: number = 15; // Default timeout duration in minutes
  private lastAction: number = Date.now();
  private isLoggedInFlag: boolean = true; // Track user authentication status

  constructor(private router: Router, private location: Location, private dialog: MatDialog) {
    this.initTimer();
    this.initListener();
    this.initRouterListener();
  }

  private initTimer(): void {
    this.timer = setInterval(() => {
      const now = Date.now();
      const timeLeft = this.lastAction + this.timeoutInMinutes * 60 * 1000 - now;
      // console.log("timeLeft"+timeLeft)
      if (timeLeft < 0) {
        this.logout();
      }
    }, 1000);
  }


  private initListener(): void {
    ['click', 'mousemove', 'keypress', 'touchstart'].forEach(eventName => {
      document.addEventListener(eventName, () => this.updateLastAction());
    });
  }


  private updateLastAction(): void {
    this.lastAction = Date.now();
  }

  public updateTimeout(minutes: number): void {
    this.timeoutInMinutes = minutes;
    clearInterval(this.timer);
    this.initTimer();
  }

  public getTimeoutInMinutes(): number {
    return this.timeoutInMinutes;
  }

  private logout(): void {
    clearInterval(this.timer);
    this.clearHistoryAndNavigateToLogin();
    this.isLoggedInFlag = false; // Set authentication flag to false;
    setTimeout(() => {
      window.location.reload();
    },10);


  }


  private clearHistoryAndNavigateToLogin(): void {
    this.dialog.closeAll();
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login-page', { replaceUrl: true });
  }


  public restartTimer(): void {
    this.lastAction = Date.now();
    clearInterval(this.timer);
    this.initTimer();
    this.isLoggedInFlag = true; // Reset authentication flag
  }

  private initRouterListener(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (!this.isLoggedInFlag && event.url !== '/login-page') {
          this.clearHistoryAndNavigateToLogin();
        }
      });
  }

  public isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }
}
