import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ProfileComponent } from '../profile/profile.component';
import { LogOutComponent } from '../log-out/log-out.component';
import { FarginServiceService } from '../service/fargin-service.service';
import { log } from 'console';
import { LanguageService } from '../Language service/language-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  emailststaus = Number(localStorage.getItem('emailOtpVerificationStatus')) || '';
  smsstatus = Number(localStorage.getItem('smsOtpVerificationstatus')) || '';
  modifiedDateTime = localStorage.getItem('modifiedDateTime') || '';
  entityname = localStorage.getItem('entityname') || '';
  lastLoggedOn = localStorage.getItem('lastLoggedOn') || '';
  technicalAmount = Number(localStorage.getItem('technicalAmount')) || '';
  technical = localStorage.getItem('technicalPayStatus') || '';
  adminName = localStorage.getItem('adminName');
  offlineQrEnableStatus = localStorage.getItem('offlineQrEnableStatus');

  merchantId = Number(localStorage.getItem('merchantId')) || '';
  private sidebarDropdowns: HTMLElement[] = [];
  private pageWrapper: HTMLElement | null = null;
  valueDashboard: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  errorMessage: any;
  roles: any;
  valueVerification: any;
  valueCustomer: any;
  valuetermscondition: any;
  valuedisclaimer: any;
  valueprivacypolicy: any;
  valuerefund: any;
  valueserviceticket: any;
  valueTransaction: any;
  valuecustomerdues: any;
  valueBeneficiary: any;
  valuefunds: any;
  valueChannelConfiguration: any;
  valuePlanConfiguration: any;
  LCOPPlanConfiguration: any;
  valueLCOPPlanConfiguration: any;
  valuebulksetup: any;
  valueregion: any;
  valueRouteConfiguration: any;
  valuesetup: any;
  valuerole: any;
  valueemployee: any;
  valueprofile: any;
  valuechangepassword: any;
  valueDues: any;
  valuecutomerticket: any;
  customercount: any;
  policyId: any;
  approvedstatus: any;
  terms: any;
  sms: any;
  checkStatus: boolean = false;
  FourtStataus: boolean = false;
  valuecustomerbulk: any;
  valuerenewal: any;
  valueCustomizations: any;
  valueServiceProvider: any;
  valuesms: any;
  valuesmshistory: any;
  roleName = localStorage.getItem('roleName')
  valuesurvey: any;
  smsactive = Number(localStorage.getItem('smsStatus')) || '';
  valueAgreement: any;
  valuecustomerbulksetupbox: any;
  valuestatic: any;
  valuecustomerreport: any;
  valueDuesReports: any;
  valueSetupboxReports: any;
  valueBranch: any;
  valueCategory: any;
  valueAdditionalTransactions: any;
  branchviews: any;
  branchstatus: boolean = false;
  valueRouteStatus: any;
  valueDueStatusHistory: any;
  valueonline: any;
  currentLanguageSubscription!: Subscription;
   currentLanguage!: string;
   selectedLanguage: string = 'en';

  constructor(private languageService: LanguageService, private cdRef: ChangeDetectorRef, private elRef: ElementRef, private renderer: Renderer2, private dialog: MatDialog, private service: FarginServiceService,) { }






  ngOnInit(): void {

    this.service.viewterm(this.merchantId).subscribe((res: any) => {
      this.terms = res.response;
      this.policyId = res.response?.EntityModel?.policyId;

      this.service.viewapprovepolicy(this.policyId).subscribe((res: any) => {
        this.approvedstatus = res.response.approvalStatus;
        this.checkConditions();
      });
    });

    this.service.smsmerchants(this.merchantId).subscribe((res: any) => {
      this.sms = res.response;
      this.checkConditions();
      console.log(this.sms + "sms Aproved or Pending")
    })

    setTimeout(() => {
      this.emailststaus = 1;
      this.smsstatus = 1;
      this.technical.toLowerCase() == 'success'
      this.checkConditions();
    }, 300);

    this.currentLanguageSubscription = this.languageService.language.subscribe(lang => { this.currentLanguage = lang; });

    // const time = setTimeout(() => {
    //   console.log(" this.emailststaus" + this.emailststaus)
    //   console.log(" this.smsstatus" + this.smsstatus)
    //   console.log(" this.technical" + this.technical)
    //   console.log(" this.approvedstatus" + this.approvedstatus)
    //   if (
    //     this.emailststaus == 1 &&
    //     this.smsstatus == 1 &&
    //     this.technical.toLowerCase() == 'success' &&
    //     this.approvedstatus == 'Approved'

    //   ) {
    //     this.FourtStataus = true
    //     console.log("this.FourtStataus for condi" + this.FourtStataus)
    //   }

    //   console.log("this.FourtStataus" + this.FourtStataus)
    //   console.log("this.smsactive" + this.smsactive)
    //   console.log("this.sms" + this.sms)

    //   if (this.FourtStataus == true) {
    //     this.checkStatus = true
    //     if (this.smsactive == 1 && this.sms == 'Pending') {
    //       this.checkStatus = false
    //       console.log("checkStatus for sms" + this.checkStatus)
    //     }
    //   }

    //   if (this.FourtStataus == false) {
    //     this.checkStatus = false
    //     console.log("checkStatuses" + this.checkStatus)
    //   }
    //   console.log("checkStatus" + this.checkStatus)




    // }, 300);















    // const time = setTimeout(() => {
    //   if (
    //     this.sms != 'Pending' &&
    //     this.emailststaus == 1 &&
    //     this.smsstatus == 1 &&
    //     this.technical == 'Success' &&
    //     this.approvedstatus == 'Approved' &&
    //     this.smsactive == 1

    //   ) {
    //     this.checkStatus = true;
    //   }
    // }, 500);
    //     const time = setTimeout(() => {
    //       console.log(this.sms + "sms")
    //       console.log(this.emailststaus + "emailststaus")
    //       console.log(this.smsstatus + "smsstatus")
    //       console.log(this.technical + "technical")
    //       console.log(this.approvedstatus + "approvedstatus")
    //       console.log(this.smsactive + "smsactive")
    //       if (


    //         this.emailststaus == 1 &&
    //         this.smsstatus == 1 &&
    //         this.technical.toLowerCase() == 'success' &&
    //         this.approvedstatus == 'Approved'

    //       ) {
    //         this.checkStatus = true;
    //         console.error(this.sms + "" + this.smsactive + "check pending")



    //         if (this.sms !== 'Pending' &&
    //           this.smsactive === 1) {
    //           this.checkStatus = false;

    // console.log(this.checkStatus)
    //         }

    //       }
    //       console.log(this.checkStatus + "fwjekfbjewk")
    //       console.log(this.technical.toLowerCase() + "jsdbkjqewbd")
    //     }, 500);


    if (this.roleName == 'Merchant Super admin') {
      this.valueDashboard = 'Dashboard';
      this.valueVerification = 'Verification';
      this.valueCustomer = 'Customer';
      this.valuetermscondition = 'Terms and Condition';
      this.valuedisclaimer = 'Disclaimer';
      this.valueprivacypolicy = 'Privacy Policy';
      this.valuerefund = 'Refund Policy';
      this.valueserviceticket = 'Support Request'
      this.valuecustomerdues = 'Customer dues';
      this.valueBeneficiary = 'Beneficiary';
      this.valuefunds = 'Fund Transfer';
      this.valueChannelConfiguration = 'Channel Configuration';
      this.valuePlanConfiguration = 'Plan Configuration';
      this.valueLCOPPlanConfiguration = 'LCOP Plan Configuration';
      this.valuebulksetup = 'Setup box Status';
      this.valueregion = 'Region'
      // this.valueRouteConfiguration = 'Route Configuration';
      this.valuesetup = 'Setup Box Inventory';
      this.valuerole = 'Role';
      this.valueemployee = 'Employee';
      this.valueprofile = 'Profile';
      this.valueDues = 'Subscription'
      this.valuecutomerticket = 'Customer Request'
      this.valuecustomerbulk = 'Customer Status'
      this.valuerenewal = 'Renewal'
      this.valueCustomizations = 'Customizations Payments'
      this.valuesms = 'SMS Service'
      this.valuesmshistory = 'SMS History'
      this.valuesurvey = 'Customer Survey'
      this.valueAgreement = 'Agreement'
      this.valuecustomerbulksetupbox = 'Customer Setupbox Status'
      this.valueServiceProvider = 'Service Provider Payments'
      this.valuecustomerreport = 'Customer Reports'
      this.valueDuesReports = 'Dues Reports'
      this.valueSetupboxReports = 'Setup Box Reports'
      this.valuestatic = 'Static QR Transactions'
      this.valueBranch = 'Branch'
      this.valueCategory = 'Category'
      this.valueAdditionalTransactions = 'Additional Transactions'
      this.valueRouteStatus = 'Route Status'
      this.valueDueStatusHistory = 'Due Status History'
      this.valueonline = 'Online Refunds'

    }


    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response.merchantPermission
          this.getpermissionValue()
        }
        else {
          this.errorMessage = res.responseMessage
        }
      })
    }


    this.service.dashboardcount(this.merchantId).subscribe((res: any) => {
      this.customercount = res.response;
    });

    this.service.viewterm(this.merchantId).subscribe((res: any) => {
      this.terms = res.response;
      this.policyId = res.response?.EntityModel?.policyId;

      this.service.viewapprovepolicy(this.policyId).subscribe((res: any) => {
        this.approvedstatus = res.response.approvalStatus;

      });
    });

    this.service.BranchView(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchviews = res.response;
        this.branchstatus = true;
      }
      else if (res.flag == 2) {
        this.branchstatus = false;
      }
    })





  }

  


  switchLanguage(lang: string) {
     this.languageService.setLanguage(lang);
     console.log("lang" + lang)

   }


  getpermissionValue() {


    for (let datas of this.getdashboard) {
      this.roles = datas.permissions
      if (this.roles == 'Dashboard') {
        this.valueDashboard = 'Dashboard';
      }
      if (this.roles == 'Verification') {
        this.valueVerification = 'Verification'
      }
      if (this.roles == 'Customer') {
        this.valueCustomer = 'Customer'
      }
      if (this.roles == 'Terms and Condition') {
        this.valuetermscondition = 'Terms and Condition'
      }
      if (this.roles == 'Disclaimer') {
        this.valuedisclaimer = 'Disclaimer'
      }
      if (this.roles == 'Privacy Policy') {
        this.valueprivacypolicy = 'Privacy Policy'
      }
      if (this.roles == 'Refund Policy') {
        this.valuerefund = 'Refund Policy'
      }
      if (this.roles == 'Support Request') {
        this.valueserviceticket = 'Support Request'
      }
      if (this.roles == 'Customer dues') {
        this.valuecustomerdues = 'Customer dues'
      }
      if (this.roles == 'Beneficiary') {
        this.valueBeneficiary = 'Beneficiary'
      }
      if (this.roles == 'Fund Transfer') {
        this.valuefunds = 'Fund Transfer'
      }
      if (this.roles == 'Channel Configuration') {
        this.valueChannelConfiguration = 'Channel Configuration'
      }
      if (this.roles == 'Plan Configuration') {
        this.valuePlanConfiguration = 'Plan Configuration'
      }
      if (this.roles == 'LCOP Plan Configuration') {
        this.valueLCOPPlanConfiguration = 'LCOP Plan Configuration'
      }
      if (this.roles == 'Setup box Status') {
        this.valuebulksetup = 'Setup box Status'
      }
      if (this.roles == 'Region') {
        this.valueregion = 'Region'
      }
      // if (this.roles == 'Route Configuration') {
      //   this.valueRouteConfiguration = 'Route Configuration'
      // }
      if (this.roles == 'Setup Box Inventory') {
        this.valuesetup = 'Setup Box Inventory'
      }
      if (this.roles == 'Profile') {
        this.valueprofile = 'Profile'
      }
      if (this.roles == 'Subscription') {
        this.valueDues = 'Subscription'
      }
      if (this.roles == 'Customer Request') {
        this.valuecutomerticket = 'Customer Request'
      }
      if (this.roles == 'Customer Status') {
        this.valuecustomerbulk = 'Customer Status'
      }
      if (this.roles == 'Renewal') {
        this.valuerenewal = 'Renewal'
      }
      if (this.roles == 'Customizations Payments') {
        this.valueCustomizations = 'Customizations Payments'
      }
      if (this.roles == 'SMS Service') {
        this.valuesms = 'SMS Service'
      }
      if (this.roles == 'SMS History') {
        this.valuesmshistory = 'SMS History'
      }
      if (this.roles == 'Customer Survey') {
        this.valuesurvey = 'Customer Survey'
      }

      if (this.roles == 'Agreement') {
        this.valueAgreement = 'Agreement'
      }
      if (this.roles == 'Customer Setupbox Status') {
        this.valuecustomerbulksetupbox = 'Customer Setupbox Status'
      }
      if (this.roles == 'Service Provider Payments') {
        this.valueServiceProvider = 'Service Provider Payments'
      }
      if (this.roles == 'Static QR Transactions') {
        this.valuestatic = 'Static QR Transactions'
      }

      if (this.roles == 'Customer Reports') {
        this.valuecustomerreport = 'Customer Reports'
      }
      if (this.roles == 'Dues Reports') {
        this.valueDuesReports = 'Dues Reports'
      }
      if (this.roles == 'Setup Box Reports') {
        this.valueSetupboxReports = 'Setup Box Reports'
      }
      if (this.roles == 'Branch') {
        this.valueBranch = 'Branch'
      }
      if (this.roles == 'Category') {
        this.valueCategory = 'Category'
      }
      if (this.roles == 'Additional Transactions') {
        this.valueAdditionalTransactions = 'Additional Transactions'
      }
      if (this.roles == 'Route Status') {
        this.valueRouteStatus = 'Route Status'
      }

      if (this.roles == 'Due Status History') {
        this.valueDueStatusHistory = 'Due Status History'
      }

      if (this.roles == 'Online Refunds') {
        this.valueonline = 'Online Refunds'
      }
    }

  }
  checkConditions() {
    console.log('this.emailststaus' + this.emailststaus);
    console.log('this.smsstatus' + this.smsstatus);
    console.log('this.technical' + this.technical);
    console.log('this.approvedstatus' + this.approvedstatus);
    if (
      this.emailststaus === 1 &&
      this.smsstatus === 1 &&
      this.technical.toLowerCase() === 'success' &&
      this.approvedstatus === 'Approved'
    ) {
      this.FourtStataus = true;
      console.log('this.FourtStataus for condi' + this.FourtStataus);
    }
    console.log('this.FourtStataus' + this.FourtStataus);
    console.log('this.smsactive' + this.smsactive);
    console.log('this.sms' + this.sms);
    if (this.FourtStataus === true) {
      this.checkStatus = true;
      if (this.smsactive === 1 && this.sms === 'Pending') {
        this.checkStatus = false;
        console.log('checkStatus for sms' + this.checkStatus);
      }
    }
    if (this.FourtStataus === false) {
      this.checkStatus = false;
      console.log('checkStatuses' + this.checkStatus);
    }
    console.log('checkStatus' + this.checkStatus);
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    // Initialize DOM elements
    this.sidebarDropdowns = Array.from(
      this.elRef.nativeElement.querySelectorAll('.sidebar-dropdown')
    );
    this.pageWrapper = this.elRef.nativeElement.querySelector('.page-wrapper');

    // Attach click event listeners for dropdowns
    this.sidebarDropdowns.forEach((dropdown) => {
      const anchor = dropdown.querySelector('a');
      if (anchor) {
        this.renderer.listen(anchor, 'click', (event) => {
          event.preventDefault(); // Prevent default anchor behavior
          this.toggleDropdown(dropdown);
        });
      }

      // Attach click event listeners for dropdown menu items
      const menuItems = dropdown.querySelectorAll('.sidebar-submenu a');
      menuItems.forEach((item) => {
        this.renderer.listen(item, 'click', () => this.closeDropdown(dropdown));
      });
    });

    // Attach click event listeners for sidebar toggle buttons
    const closeSidebarButton =
      this.elRef.nativeElement.querySelector('#close-sidebar');
    const showSidebarButton =
      this.elRef.nativeElement.querySelector('#show-sidebar');

    if (closeSidebarButton) {
      this.renderer.listen(closeSidebarButton, 'click', () =>
        this.toggleSidebar(false)
      );
    }

    if (showSidebarButton) {
      this.renderer.listen(showSidebarButton, 'click', () =>
        this.toggleSidebar(true)
      );
    }

    // Attach global click listener to handle clicks outside dropdowns
    this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.isClickInsideDropdown(event)) {
        this.closeAllDropdowns();
      }
    });
  }

  toggleDropdown(dropdown: HTMLElement) {
    const submenu = dropdown.querySelector('.sidebar-submenu') as HTMLElement;
    if (submenu) {
      const isActive = dropdown.classList.contains('active');
      this.sidebarDropdowns.forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove('active');
          const sub = d.querySelector('.sidebar-submenu') as HTMLElement;
          if (sub) sub.style.display = 'none'; // Hide other submenus
        }
      });
      if (!isActive) {
        this.renderer.addClass(dropdown, 'active');
        submenu.style.display = 'block'; // Show submenu
      } else {
        this.renderer.removeClass(dropdown, 'active');
        submenu.style.display = 'none'; // Hide submenu
      }
    }
  }

  closeDropdown(dropdown: HTMLElement) {
    this.renderer.removeClass(dropdown, 'active');
    const submenu = dropdown.querySelector('.sidebar-submenu') as HTMLElement;
    if (submenu) {
      submenu.style.display = 'none'; // Hide submenu
    }
  }

  closeAllDropdowns() {
    this.sidebarDropdowns.forEach((dropdown) => {
      this.closeDropdown(dropdown);
    });
  }

  isClickInsideDropdown(event: Event): boolean {
    const target = event.target as HTMLElement;
    return this.sidebarDropdowns.some(
      (dropdown) =>
        dropdown.contains(target) ||
        (dropdown.querySelector('.sidebar-submenu') as HTMLElement)?.contains(
          target
        )
    );
  }

  toggleSidebar(show: boolean) {
    if (this.pageWrapper) {
      if (show) {
        this.renderer.addClass(this.pageWrapper, 'toggled');
      } else {
        this.renderer.removeClass(this.pageWrapper, 'toggled');
      }
    }
  }
  changepassword() {

    this.dialog.open(ChangePasswordComponent, {

      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }

  logout() {

    this.dialog.open(LogOutComponent, {
      // width:'350px',
      // position:{top:'0px'}
    })

  }

  getFontSize() {
    if (this.selectedLanguage === 'en') {
      return '14px';
    } else if (this.selectedLanguage === 'kn' || this.selectedLanguage === 'ml') {
      return '12px'; // Adjust for Kannada and Malayalam
    }
    else if (this.selectedLanguage === 'ta') {
      return '12px'; // Adjust for Kannada and Malayalam
    } else {
      return '12px'; // Default for other languages
    }
  }
}
