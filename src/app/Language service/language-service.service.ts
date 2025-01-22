// language.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class LanguageService {

  private currentLanguage = new BehaviorSubject<string>('en');

  constructor(private translate: TranslateService) {
    const savedLanguage = localStorage.getItem('appLanguage'); const defaultLanguage = savedLanguage || 'en'; this.translate.addLangs(['en', 'kn', 'ta', 'te', 'hi', 'ml']); this.translate.setDefaultLang(defaultLanguage); this.setLanguage(defaultLanguage);
  }

  get language() { return this.currentLanguage.asObservable(); }


  setLanguage(lang: string) { this.translate.use(lang); this.currentLanguage.next(lang); localStorage.setItem('appLanguage', lang); }
}