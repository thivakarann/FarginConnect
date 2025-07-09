import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { SessionServiceService } from './Session service/session-service.service';
import { ConsoleServiceService } from './Console Service/console-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FarginConnect';
  timeout: number;

  constructor(private sessionTimerService: SessionServiceService, private bnIdle: BnNgIdleService, private consoleToggle: ConsoleServiceService) {
    this.timeout = this.sessionTimerService.getTimeoutInMinutes();
    this.consoleToggle.disable();
  }
  ngOnInit(): void {

    // this.bnIdle.startWatching(900).subscribe((isTimedOut: boolean) => {
    //   if (isTimedOut) {
    //     sessionStorage.clear();
    //     location.href = '/login';


    //   }
    // });
  }

  updateTimeout(): void {
    this.sessionTimerService.updateTimeout(this.timeout);
  }
}
