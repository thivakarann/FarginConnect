import { Component } from '@angular/core';
import { SessionServiceService } from './Session service/session-service.service';
import { ConsoleServiceService } from './Console Service/console-service.service';
import { SessionValidatorService } from './Session storage Validator/session-validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'FarginConnect';
  timeout: number;

  constructor(
    private sessionTimerService: SessionServiceService,
    private consoleToggle: ConsoleServiceService,
    private sessionValidator: SessionValidatorService
  ) { this.timeout = this.sessionTimerService.getTimeoutInMinutes(); this.consoleToggle.enable(); }

  ngOnInit(): void {
    //  this.sessionValidator.auditSession();
   
  }

  updateTimeout(): void {
    this.sessionTimerService.updateTimeout(this.timeout);
  }
}
