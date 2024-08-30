import { Component } from '@angular/core';
import { SessionServiceService } from './Session service/session-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FarginConnect';
  timeout: number;

  constructor(private sessionTimerService: SessionServiceService) {
    this.timeout = this.sessionTimerService.getTimeoutInMinutes();
  }

  updateTimeout(): void {
    this.sessionTimerService.updateTimeout(this.timeout);
  }
}
