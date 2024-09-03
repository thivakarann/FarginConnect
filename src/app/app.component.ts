import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { SessionServiceService } from './Session service/session-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FarginConnect';
  timeout: number;

  constructor(private sessionTimerService: SessionServiceService,private bnIdle: BnNgIdleService) {
    this.timeout = this.sessionTimerService.getTimeoutInMinutes();
  }
  ngOnInit(): void {
    this.bnIdle.startWatching(900).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        localStorage.removeItem('token');
        location.href = '/login';
        // this.toast.warning('Session Time Out')

      }
    });
  }

  updateTimeout(): void {
    this.sessionTimerService.updateTimeout(this.timeout);
  }
}
