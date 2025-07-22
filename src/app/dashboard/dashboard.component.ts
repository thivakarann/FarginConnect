import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { LogoutComponent } from '../logout/logout.component';
import { FarginServiceService } from '../service/fargin-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private sidebarDropdowns: HTMLElement[] = [];
  private pageWrapper: HTMLElement | null = null;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  errorMessage: any;
  valueDashboard: any;
  valueBusinessCategory: any;
  valueBusinessKYC: any;
  valueCreditcart: any;
  valueUser: any;
  valueRole: any;
  valueTickets: any;
  valueTermsandPolicy: any;
  valueEntity: any;
  valueRegion: any;
  ValueMSO: any;
  valueFacheck: any;
  roles: any;
  valueCustomer: any;
  valueTransaction: any;
  valuepayOut: any;
  valuemerchantPlan: any;
  valuepgsetupkey: any;
  valueWithdrawalfee: any;
  valuechannelConfiguration: any;
  valueBroadcasterConfiguration: any;
  valuePlanConfiguration: any;
  valueBroadcasterBouqutes: any;
  valueprofile: any;
  valuechangepassword: any;
  valueentitydues: any;
  valuefarginpolicy: any;
  valueMerchantpolicy: any;
  counts: any;
  valuecustomerticket: any;
  valuecustomerpayment: any;
  valuecustomersubscription: any;
  valuecustomermanualpayment: any;
  valuekyccategory: any;
  valueannouncement: any;
  valuesmscost: any;
  valuebankdetails: any;
  valuefarginbank: any;
  valueentitysms: any;
  valuesmshistory: any;
  valueautodebit: any;
  valueCustomizationPayments: any;
  valuesurvey: any;
  valueBuisneesDoCument: any;
  valueentityagreement: any;
  valueBusinessPlan: any;
  valueSignerDetails: any;
  valueAdditionalPayments: any;
  valuebranch: any;
  valueonlienrefund: any;
  valuestickercost: any;
  valuecampign: any;
  valuerefundper: any;
  valuecampaign: any;
  values: any = ''
  Redirect: any;
  valueEntityDashboard: any;
  valueReport: any;
  valueRenewel: any;

  constructor(private elRef: ElementRef,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private service: FarginServiceService,) { }

  ngOnInit(): void {

    this.getpermissionValue();

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.permission;
          this.getpermissionValue();
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
    this.service.dashboardCount().subscribe((res: any) => {
      this.counts = res.response.totalTicketMemberOpenCount;
    });
  }

  getpermissionValue() {
    if (this.roleId == '1') {
      this.valueDashboard = 'Admin Dashboard';
      this.valueEntityDashboard = 'Entity Dashboard';
      this.valueEntity = 'Entity Onboard';
      this.valueCustomer = 'Customers';
      this.valueTransaction = 'Transactions';
      this.valuepayOut = 'Payout';
      this.valueTickets = 'Entity Request';
      this.valuecustomerticket = 'Customer Request'
      this.valueBusinessCategory = 'Bussiness Category';
      this.valueBusinessKYC = 'Business Category DocDocument Type';
      this.valueBusinessKYC = 'Business Category Doc';
      this.valueRegion = 'Region';
      this.ValueMSO = 'MSO';
      this.valuemerchantPlan = 'Entity Plan';
      this.valueFacheck = 'FaCheck Key';
      this.valuepgsetupkey = 'PG SetupKey';
      this.valueWithdrawalfee = 'Withdrawal Fee'
      this.valuechannelConfiguration = 'Channel Creation';
      this.valueBroadcasterConfiguration = 'Broadcaster Creation'
      this.valuePlanConfiguration = 'Plan Creation'
      this.valueBroadcasterBouqutes = 'Broadcaster Bouqutes'
      this.valueUser = 'User';
      this.valueRole = 'Role';
      this.valueentitydues = 'Entity Dues';
      this.valuefarginpolicy = 'Fargin Policy'
      this.valueMerchantpolicy = 'Merchant Policy'
      this.valuecustomerpayment = 'Customer Payment'
      this.valuecustomersubscription = 'Cloud Fee Payments'
      this.valuecustomermanualpayment = 'one Time Payments'
      this.valuekyccategory = 'Kyc Category'
      this.valueannouncement = 'Announcement'
      this.valuecampaign = 'Campaign'
      this.valuesmscost = 'SMS Cost'
      this.valuebankdetails = 'Bank Details'
      this.valuefarginbank = 'Fargin bank'
      this.valueentitysms = 'Entity Sms'
      this.valuesmshistory = 'SMS History'
      this.valueautodebit = 'Cloud Fee AutoDebit'
      this.valueRenewel = 'Renewal Fee Auto Debit'
      this.valueCustomizationPayments = 'Customized Payment'
      this.valuesurvey = 'Survey'
      this.valueBuisneesDoCument = 'Business Document Type'
      this.valueentityagreement = 'Entity Agreement'
      this.valueBusinessPlan = 'Business Plan'
      this.valueSignerDetails = 'Signer Details'
      this.valueAdditionalPayments = 'Additional Payments'
      this.valuebranch = 'Branch'
      this.valueonlienrefund = 'Online Refunds'
      this.valuestickercost = 'Sticker Cost'
      this.valuecampign = 'Campaign'
      this.valuerefundper = 'Refund Period'
      this.valueReport = 'Export Report'
    }
    else {
      for (let data of this.getdashboard) {
        this.roles = data.permission;
        if (this.roles == 'Admin Dashboard') {
          this.valueDashboard = 'Admin Dashboard';
        }
        if (this.roles == 'Entity Dashboard') {
          this.valueEntityDashboard = 'Entity Dashboard';
        }
        if (this.roles == 'Entity Onboard') {
          this.valueEntity = 'Entity Onboard';
        }
        if (this.roles == 'Entity Agreement') {
          this.valueentityagreement = 'Entity Agreement'
        }
        if (this.roles == 'Customers') {
          this.valueCustomer = 'Customers';
        }
        if (this.roles == 'Transactions') {
          this.valueTransaction = 'Transactions'
        }
        if (this.roles == 'Payout') {
          this.valuepayOut = 'Payout'
        }
        if (this.roles == 'Entity Request') {
          this.valueTickets = 'Entity Request';
        }
        if (this.roles == 'Bussiness Category') {
          this.valueBusinessCategory = 'Bussiness Category';
        }
        if (this.roles == 'Business Category DocDocument Type') {
          this.valueBusinessKYC = 'Business Category DocDocument Type';
        }
        if (this.roles == 'Business Category Doc') {
          this.valueBusinessKYC = 'Business Category Doc';
        }
        if (this.roles == 'Region') {
          this.valueRegion = 'Region';
        }
        if (this.roles == 'MSO') {
          this.ValueMSO = 'MSO';
        }
        if (this.roles == 'Entity Plan') {
          this.valuemerchantPlan = 'Entity Plan'
        }
        if (this.roles == 'Withdrawal Fee') {
          this.valueWithdrawalfee = 'Withdrawal Fee'
        }
        if (this.roles == 'Channel Creation') {
          this.valuechannelConfiguration = 'Channel Creation';
        }
        if (this.roles == 'Broadcaster Creation') {
          this.valueBroadcasterConfiguration = 'Broadcaster Creation'
        }
        if (this.roles == 'Plan Creation') {
          this.valuePlanConfiguration = 'Plan Creation'
        }
        if (this.roles == 'Broadcaster Bouqutes') {
          this.valueBroadcasterBouqutes = 'Broadcaster Bouqutes'
        }
        if (this.roles == 'Entity Dues') {
          this.valueentitydues = 'Entity Dues'
        }
        if (this.roles == 'Fargin Policy') {
          this.valuefarginpolicy = 'Fargin Policy'
        }
        if (this.roles == 'Merchant Policy') {
          this.valueMerchantpolicy = 'Merchant Policy'
        }
        if (this.roles == 'Customer Request') {
          this.valuecustomerticket = 'Customer Request'
        }
        if (this.roles == 'Customer Payment') {
          this.valuecustomerpayment = 'Customer Payment'
        }
        if (this.roles == 'Cloud Fee Payments') {
          this.valuecustomersubscription = 'Cloud Fee Payments'
        }
        if (this.roles == 'one Time Payments') {
          this.valuecustomermanualpayment = 'one Time Payments'
        }
        if (this.roles == 'Kyc Category') {
          this.valuekyccategory = 'Kyc Category'
        }
        if (this.roles == 'Announcement') {
          this.valueannouncement = 'Announcement'
        }
        if (this.roles == 'Campaign') {
          this.valuecampaign = 'Campaign'
        }
        if (this.roles == 'SMS Cost') {
          this.valuesmscost = 'SMS Cost'
        }
        if (this.roles == 'Bank List') {
          this.valuebankdetails = 'Bank List'
        }
        if (this.roles == 'Entity Sms') {
          this.valueentitysms = 'Entity Sms'
        }
        if (this.roles == 'SMS History') {
          this.valuesmshistory = 'SMS History'
        }
        if (this.roles == 'Cloud Fee AutoDebit') {
          this.valueautodebit = 'Cloud Fee AutoDebit'
        }
        if (this.roles == 'Renewal Fee Auto Debit') {
          this.valueRenewel = 'Renewal Fee Auto Debit'
        }
        if (this.roles == 'Customized Payment') {
          this.valueCustomizationPayments = 'Customized Payment'
        }
        if (this.roles == 'Business Document Type') {
          this.valueBuisneesDoCument = 'Business Document Type'
        }
        if (this.roles == 'Survey') {
          this.valuesurvey = 'Survey'
        }
        if (this.roles == 'Business Plan') {
          this.valueBusinessPlan = 'Business Plan'
        }
        if (this.roles == 'Signer Details') {
          this.valueSignerDetails = 'Signer Details'
        }
        if (this.roles == 'Additional Payments') {
          this.valueAdditionalPayments = 'Additional Payments'
        }
        if (this.roles == 'Branch') {
          this.valuebranch = 'Branch'
        }
        if (this.roles == 'Online Refunds') {
          this.valueonlienrefund = 'Online Refunds'
        }
        if (this.roles == 'Sticker Cost') {
          this.valuestickercost = 'Sticker Cost'
        }
        if (this.roles == 'Campaign') {
          this.valuecampign = 'Campaign'
        }
        if (this.roles == 'Refund Period') {
          this.valuerefundper = 'Refund Period'
        }
        if (this.roles == 'Bank Details') {
          this.valuebankdetails = 'Bank Details'
        }
        if (this.roles == 'Export Report') {
          this.valueReport = 'Export Report'
        }

        // if (this.roles == 'Fargin bank') {
        //   this.valuefarginbank = 'Fargin bank'
        // }
        // if (this.roles == 'FaCheck Key') {
        //   this.valueFacheck = 'FaCheck Key'
        // }
        // if (this.roles == 'PG SetupKey') {
        //   this.valuepgsetupkey = 'PG SetupKey'
        // }
      }
    }
  }

  ngAfterViewInit() {
    // Initialize DOM elements
    this.sidebarDropdowns = Array.from(
      this.elRef.nativeElement.querySelectorAll('.sidebar-dropdown')
    );

    this.pageWrapper = this.elRef.nativeElement.querySelector('.page-wrapper');
    // Attach click event listeners for dropdowns
    // 
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
    return this.sidebarDropdowns.some((dropdown) => dropdown.contains(target) ||
      (dropdown.querySelector('.sidebar-submenu') as HTMLElement)?.contains(target)
    );
  }

  toggleSidebar(show: boolean) {
    if (this.pageWrapper) {
      if (show) {
        this.renderer.addClass(this.pageWrapper, 'toggled');
      }
      else {
        this.renderer.removeClass(this.pageWrapper, 'toggled');
      }
    }
  }
  changepassword() {
    this.dialog.open(ChangePasswordComponent, {
      disableClose: true
    })
  }

  logout() {
    this.dialog.open(LogoutComponent, {
      enterAnimationDuration: "300ms",
      exitAnimationDuration: "500ms",
    })
  }
}
