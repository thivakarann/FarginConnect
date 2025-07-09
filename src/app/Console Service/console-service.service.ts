import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsoleServiceService {
  private originalConsole = { ...console };
  disable(): void {
    console.log = () => { };
    // console.debug = () => {};
    // console.info = () => {};
    // console.warn = () => {};
    // console.error = () => {};
  }

  enable(): void {
    console.log = this.originalConsole.log;
    // console.debug = this.originalConsole.debug;
    // console.info = this.originalConsole.info;
    // console.warn = this.originalConsole.warn;
    // console.error = this.originalConsole.error;
  }
}
