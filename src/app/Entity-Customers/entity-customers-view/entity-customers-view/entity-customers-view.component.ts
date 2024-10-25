import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
import { ChannelViewComponent } from '../../../Overall-Customer/channel-view/channel-view.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { settopStatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-entity-customers-view',
  templateUrl: './entity-customers-view.component.html',
  styleUrl: './entity-customers-view.component.css'
})
export class EntityCustomersViewComponent {
  id: any;
  customerview: any;
  customerviewalcot: any
  customer: any;
  selectedTab: string = 'customer-info'; // Default to 'customer-info'
  items: any[] = []; // The array of items to paginate
  currentPage: any = 1; // The current page number
  itemsPerPage = 3; //
  page: number = 1;
  page4:number=1;
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
  totalAmount: number=0;
  totalbouqet: number=0;
  totallcop: number=0;
  overallAmount: number=0;
  setupboxview: any;
  isChecked!: boolean;
  totalamount: any;
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
 
 
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute, private location: Location
  ) { }
 
  ngOnInit(): void {
 
 
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.value;
    });


    this.service.CustomerTotalPlanAmount(this.id).subscribe((res:any)=>{
      if(res.flag==1){
        this.totalamount = res.response.totalAmount;
      }
    })
 
    this.service.ViewCustomerBasicInfo(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewcustomer = res.response;
     
      }
 
 
 
      else {
        this.viewData = false;
 
      }
 
 
 
    })
    this.service.CustomerTransaction(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.showData = true;
 
      }
      else {
        this.showData = false
      }
    });
 
   
    this.service.ViewCustomersSetupBox(this.id).subscribe((res:any)=>{
      if(res.flag==1){
        this.setupboxview=res.response;
      }
    })

    this.service.ViewSetupBoxPlanDetails(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.alcotchannel = res.response.alcotList;
        this.bouquetPlan = res.response.bouquetList;
        this.lcopChannel = res.response.lcopList;
   
        let totalAmount = 0;
        const alcotList = res.response.alcotList;
   
     
        for (let i = 0; i < alcotList.length; i++) {
          if (alcotList[i].activeStatus === 1) {
            totalAmount += alcotList[i].price;
          }
        }
   
        this.totalAmount = totalAmount;
   
        let totalbouqet = 0;
        const bouquetList = res.response.bouquetList;
   
       
        for (let i = 0; i < bouquetList.length; i++) {
          if (bouquetList[i].activeStatus === 1) {
            totalbouqet += bouquetList[i].broadCasterId.amount;
          }
        }
   
        this.totalbouqet = totalbouqet;
   
        let totallcop = 0;
        const lcopList = res.response.lcopList;
   
        for (let i = 0; i < lcopList.length; i++) {
          if (lcopList[i].activeStatus === 1) {
            totallcop += lcopList[i].overallAmount;
          }
        }
   
        this.totallcop = totallcop;
   
        // Calculate overall amount
        this.overallAmount = this.totalAmount + this.totalbouqet + this.totallcop;
   
        this.viewData = true; // Assuming viewData should be set true only if there are valid amounts
      } else {
        this.viewData = false;
      }
    });
 
  }
 
  close() {
    this.location.back()
  }
 
  viewChannel(id: any) {
    console.log('alcot', this.id)
    this.dialog.open(ChannelViewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      data: { value: id }
    })
  }
 
  ActiveStatus(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitmodel: settopStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    }
    this.service.ActiveStatusSetupbox(id, submitmodel).subscribe((res: any) => {
      console.log(res);
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
 
 
 
 
 
  }
 
  view(id: any) {
    this.router.navigate([`dashboard/plan-details-customer/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }
  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
 
    });
  }
}
