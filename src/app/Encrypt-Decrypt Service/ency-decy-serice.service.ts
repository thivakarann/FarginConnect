import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncyDecySericeService {

  private secretKey = 'pYRxwwoe9IjA4ka0378A4S7nghopzxsh';

  encrypt(value: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const encrypted = CryptoJS.AES.encrypt(value, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }



  decrypt(value: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const decryptedBytes = CryptoJS.AES.decrypt(value, key, {
      mode: CryptoJS.mode.ECB,
      paddin: CryptoJS.pad.Pkcs7
    });
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }


  hash(value: string): string {
    return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
  }

}
