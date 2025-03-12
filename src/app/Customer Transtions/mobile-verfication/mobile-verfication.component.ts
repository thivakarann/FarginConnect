import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustServiceService } from '../../Customer-service/cust-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerOTP, resendotp } from '../../fargin-model/fargin-model.module';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../Language service/language-service.service';

@Component({
  selector: 'app-mobile-verfication',
  templateUrl: './mobile-verfication.component.html',
  styleUrl: './mobile-verfication.component.css'
})
export class MobileVerficationComponent implements OnInit {
  strings = "@";
  MobileNumber: any;
  myForm!: FormGroup;
  resendOtp: boolean = false;
  displayTimer: boolean = true;
  Mobileverify: boolean = true;
  MobileOTP: boolean = false;
  display!: string;
  signupId: any;
  emailAddress: any;
  email: any;
  merchantId: any;
  currentYear:any;
  error: unknown;
  mobilenumbers: any;
  selectedLang!:string;
  selectedLanguage: string = 'en';
  currentLanguageSubscription!: Subscription;
  currentLanguage!: string;


  constructor(
    public service: CustServiceService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private languageService: LanguageService,
  ) {  }

  ngOnInit(): void {

    this.selectedLang = localStorage.getItem('selectedLang') || 'en';
    this.languageService.setLanguage(this.selectedLang);
 

    this.currentYear = new Date().getFullYear();
 
    this.myForm = new FormGroup({
      MobileNumbers: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),
    });
  }

  toggleDropdowns() {
    const selectElement = document.querySelector('.select');
    if (selectElement) {
      selectElement.classList.toggle('active');
    }
  }
 
  switchcustomerLanguage(lang: string) {
    this.selectedLang = lang;
    this.languageService.setLanguage(lang);
    localStorage.setItem('selectedLang', lang);
   }
 
 
    // Listen for clicks outside the dropdown to close it
  @HostListener('document:click', ['$event'])
  documentClick(event: Event): void {
    const dropdown = document.querySelector('.select');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      dropdown.classList.remove('active');
    }
  }


  get MobileNumbers() {
    return this.myForm.get('MobileNumbers')

  }


  verify() {
    this.service.Mobileverify(this.MobileNumber).subscribe((res: any) => {
      if (res.flag == 1) {
        localStorage.setItem(
          'tokens',
          JSON.stringify(
            res.response.tokenData.token
          )
        );
        this.mobilenumbers = res.response.mobile
        
        
        // this.router.navigate([`customer-otp-verify/${this.mobilenumbers}`], {
        //   queryParams: { Alldata: this.mobilenumbers },
        // });

        this.router.navigate([`customer-verify-view/${this.mobilenumbers}`], {
          queryParams: { Alldata: this.mobilenumbers },
        });

        setTimeout(() => {
          window.location.reload()
        }, 200);


     

        
        
      }
      else {
        window.alert(res.responseMessage)
      }
    });
}
  





 



}
