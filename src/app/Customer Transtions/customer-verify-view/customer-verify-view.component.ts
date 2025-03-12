import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CustServiceService } from '../../Customer-service/cust-service.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../Language service/language-service.service';

@Component({
  selector: 'app-customer-verify-view',
  templateUrl: './customer-verify-view.component.html',
  styleUrl: './customer-verify-view.component.css'
})
export class CustomerVerifyViewComponent implements OnInit {
  Transactionhistory: any;
  MobileNumber: any;
  strings = "@";
  currentYear: any;
  selectedLang!: string;
  selectedLanguage: string = 'en';
  currentLanguageSubscription!: Subscription;
  currentLanguage!: string;


  constructor(
    public service: CustServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private languageService: LanguageService,
  ) { }


  ngOnInit(): void {

    this.selectedLang = localStorage.getItem('selectedLang') || 'en';
    this.languageService.setLanguage(this.selectedLang);
    this.currentYear = new Date().getFullYear();


    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;

    });



  }

  Viewdata(id: any) {
    this.router.navigate([`customer-transactionviews/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  Customerinfo(id: any) {
    this.router.navigate([`customer-payments-view/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  Customerraise(id: any) {
    this.router.navigate([`custickets-viewall/${id}`], {
      queryParams: { Alldata: id },
    });
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }


  Customersurvey(id: any) {
    this.router.navigate([`customer-survey-view/${id}`], {
      queryParams: { Alldata: id },
    });
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }


  AdditionalPay(id: any) {
    this.router.navigate([`Additional-pay/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  Additionaltransaction(id: any) {
    this.router.navigate([`Additional-transactionhistory/${id}`], {
      queryParams: { Alldata: id },
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


}



