import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ChannelViewComponent } from '../channel-view/channel-view.component';
import { Location } from '@angular/common';
import { Businesskycstatus, customerplanStatus } from '../../fargin-model/fargin-model.module';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-plan-details-customer',
  templateUrl: './plan-details-customer.component.html',
  styleUrl: './plan-details-customer.component.css'
})
export class PlanDetailsCustomerComponent {
  id: any;
  customerview: any;
  customerviewalcot: any
  customer: any;
  selectedTab: string = 'customer-info';
  items: any[] = []; // The array of items to paginate
  page: number = 1;
  page1: number = 1;
  page2: number = 1;
  page3: number = 1;
  page4: number = 1;
  term: any;
  selected: any;
  dataSource: any;
  searchText: any;
  data: any;
  status: any;
  viewcustomer: any;
  alcotchannel: any;
  bouquetPlan: any;
  lcopChannel: any;
  transaction: any;
  showData: boolean = false;
  viewData: boolean = false;
  alcotlist: any;
  customerId: any;
  isChecked: any;
  totalAmount: number = 0;
  totalbouqet: number = 0;
  totallcop: number = 0;
  overallAmount: number = 0;
  setupboxview: any;
  currentPage: number = 1;
  currentPagebouquet = 1;
  currentPagelcop = 1;
  selectTab(tab: string) { this.selectedTab = tab; }


  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute, private location: Location

  ) { }

  ngOnInit(): void {

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });


    this.Getall();


  }

  Getall() {
    this.service.ViewSetupBoxPlanDetails(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.alcotchannel = res.response.alcotList.reverse();
        this.bouquetPlan = res.response.bouquetList.reverse();
        this.lcopChannel = res.response.lcopList.reverse();
        let totalAmount = 0;
        const alcotList = res.response.alcotList;
        for (let i = 0; i < alcotList.length; i++) {
          if (alcotList[i].activeStatus === 1) {
            totalAmount += alcotList[i].price;
          }
        }
        this.totalAmount = parseFloat(totalAmount.toFixed(2));
        let totalbouqet = 0;
        const bouquetList = res.response.bouquetList;
        for (let i = 0; i < bouquetList.length; i++) {
          if (bouquetList[i].activeStatus === 1) {
            totalbouqet += bouquetList[i].amount;
          }
        }
        this.totalbouqet = parseFloat(totalbouqet.toFixed(2));
        let totallcop = 0;
        const lcopList = res.response.lcopList;
        for (let i = 0; i < lcopList.length; i++) {
          if (lcopList[i].activeStatus === 1) {
            totallcop += lcopList[i].overallAmount;
          }
        }
        this.totallcop = parseFloat(totallcop.toFixed(2));
        // Calculate overall amount
        this.overallAmount = parseFloat((this.totalAmount + this.totalbouqet + this.totallcop).toFixed(2));
        this.viewData = true; // Assuming viewData should be set true only if there are valid amounts
      }
      else {
        this.viewData = false;
      }
    });
  }

  close() {
    this.location.back()
  }

  Viewchannels(id: any) {
    this.dialog.open(ChannelViewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { value: id }
    })
  }



  alcartePage() {
    this.currentPage = 1;

  }
  boquetePage() {
    this.currentPage = 1;

  }
  lcopPage() {
    this.currentPage = 1;

  }
  onStepChange(event: StepperSelectionEvent): void {
    if (event.selectedIndex === 0) {
      this.alcartePage();
    } else if (event.selectedIndex === 1) {
      this.boquetePage();
    }
    else if (event.selectedIndex === 2) {
      this.lcopPage();
    }
  }

  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter((item) =>
      item.subpermissionValue.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }
  onSearchbouquet(): void {
    // Reset to the first page whenever the search text changes
    this.currentPagebouquet = 1;
  }

  onSearchTextlcop(): void {
    // Reset to the first page whenever the search text changes
    this.currentPagelcop = 1;
  }

}
