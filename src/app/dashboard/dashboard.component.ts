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
  roleId: any = localStorage.getItem('roleId')
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
  valueannouncement:any;


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
      console.log(this.counts);
    });
 
  }

  getpermissionValue() {
    if (this.roleId == '1') {
      this.valueDashboard = 'Dashboard';
      this.valueEntity = 'Entity Onboard';
      this.valueCustomer = 'Customers';
      this.valueTransaction = 'Transactions';
      this.valuepayOut = 'Payout';
      this.valueTickets = 'Tickets';
      this.valueBusinessCategory = 'BussinessCategory';
      this.valueBusinessKYC = 'Business KYC';
      this.valueRegion = 'Region';
      this.ValueMSO = 'MSO';
      this.valuemerchantPlan = 'Merchant Plan';
      this.valueFacheck = 'FaCheck Key';
      this.valuepgsetupkey = 'PG SetupKey';
      this.valueWithdrawalfee = 'Withdrawal Fee'
      this.valuechannelConfiguration = 'Channel Configuration';
      this.valueBroadcasterConfiguration = 'Broadcaster Configuration'
      this.valuePlanConfiguration = 'Plan Configuration'
      this.valueBroadcasterBouqutes = 'Broadcaster Bouqutes'
      this.valueUser = 'User';
      this.valueRole = 'Role';
      this.valueentitydues = 'Entity Dues';
      this.valuefarginpolicy = 'Fargin Policy'
      this.valueMerchantpolicy = 'Merchant Policy'
      this.valueannouncement='Announcement'


    }
    else {
      for (let data of this.getdashboard) {
        this.roles = data.permission;


        if (this.roles == 'Dashboard') {
          this.valueDashboard = 'Dashboard';
        }
        if (this.roles == 'Entity Onboard') {
          this.valueEntity = 'Entity Onboard';
          console.log(this.roles);

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
        if (this.roles == 'Tickets') {
          this.valueTickets = 'Tickets';
        }
        if (this.roles == 'BussinessCategory') {
          this.valueBusinessCategory = 'BussinessCategory';
        }
        if (this.roles == 'Business KYC') {
          this.valueBusinessKYC = 'Business KYC';
        }
        if (this.roles == 'Region') {
          this.valueRegion = 'Region';
        }
        if (this.roles == 'MSO') {
          this.ValueMSO = 'MSO';
        }
        if (this.roles == 'Merchant Plan') {
          this.valuemerchantPlan = 'Merchant Plan'
        }
        if (this.roles == 'FaCheck Key') {
          this.valueFacheck = 'FaCheck Key'
        }
        if (this.roles == 'PG SetupKey') {
          this.valuepgsetupkey = 'PG SetupKey'
        }
        if (this.roles == 'Withdrawal Fee') {
          this.valueWithdrawalfee = 'Withdrawal Fee'
        }
        if (this.roles == 'Channel Configuration') {
          this.valuechannelConfiguration = 'Channel Configuration';
        }
        if (this.roles == 'Broadcaster Configuration') {
          this.valueBroadcasterConfiguration = 'Broadcaster Configuration'
        }
        if (this.roles == 'Plan Configuration') {
          this.valuePlanConfiguration = 'Plan Configuration'
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

        if(this.roles=='Announcement'){
          this.valueannouncement='Announcement'
        }
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
    this.dialog.open(ChangePasswordComponent), {

    }
  }

  logout() {
    this.dialog.open(LogoutComponent, {
      enterAnimationDuration: "300ms",
      exitAnimationDuration: "500ms",
    })
  }
}
