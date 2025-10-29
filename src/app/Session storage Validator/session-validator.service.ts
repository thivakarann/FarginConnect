import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';

@Injectable({
  providedIn: 'root'
})
export class SessionValidatorService {

  private readonly keys = [
    'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'flag'
  ];

  constructor(private router: Router, private cryptoService: EncyDecySericeService,) { }

  logout(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login-page');
  }

  auditSession(): void {
    const allKeys = [...this.keys, 'sessionFingerprint', 'sessionReady'];
    const decryptedValues: { [key: string]: string } = {};
    for (const key of allKeys) {
      const encrypted = sessionStorage.getItem(key);
      decryptedValues[key] = encrypted ? this.cryptoService.decrypt(encrypted) : '[missing]';
    }
    console.table(decryptedValues);
  }

  startSessionMonitor(): void {
    setInterval(() => {
      const sessionReady = sessionStorage.getItem('sessionReady');
      const fingerprintStored = sessionStorage.getItem('sessionFingerprint');

      if (sessionReady !== 'true' || !fingerprintStored) return;

      let tampered = false;

      // Step 1: Check all keys exist and decrypt safely
      for (const key of this.keys) {
        const encrypted = sessionStorage.getItem(key);
        if (!encrypted) {
          tampered = true;
          break;
        }
        try {
          const decrypted = this.cryptoService.decrypt(encrypted);
          if (!decrypted || decrypted === 'undefined' || decrypted === 'null') {
            tampered = true;
            break;
          }
        } catch {
          tampered = true;
          break;
        }
      }

      // Step 2: Validate fingerprint
      if (!tampered) {
        try {
          const decryptedValues = this.keys.map(k => this.cryptoService.decrypt(sessionStorage.getItem(k) || ''));
          const expectedFingerprint = this.cryptoService.hash(decryptedValues.join(''));
          const actualFingerprint = sessionStorage.getItem('sessionFingerprint');
          if (expectedFingerprint !== actualFingerprint) {
            tampered = true;
          }
        } catch {
          tampered = true;
        }
      }

      // Step 3: Respond to tampering
      if (tampered) {
        alert('Session tampering detected. Logging out.');
        this.logout();
      }
    },1000);
  }
}

