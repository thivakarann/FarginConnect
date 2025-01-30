import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ChannelViewComponent } from '../channel-view/channel-view.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { settopStatus } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-overall-individual-customerview',
  templateUrl: './overall-individual-customerview.component.html',
  styleUrl: './overall-individual-customerview.component.css'
})
export class OverallIndividualCustomerviewComponent implements OnInit {
  id: any;
  customerview: any;
  customerviewalcot: any
  customer: any;
  selectedTab: string = 'customer-info'; // Default to 'customer-info'
  items: any[] = []; // The array of items to paginate
  currentPage: any = 1; // The current page number
  itemsPerPage = 3; //
  page: number = 1;
  page4: number = 1;
  page5:number=1;
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
  showDatas: boolean = false;
  showData1: boolean = false;
  viewData: boolean = false;
  totalAmount: number = 0;
  totalbouqet: number = 0;
  totallcop: number = 0;
  overallAmount: number = 0;
  setupboxview: any;
  isChecked!: boolean;
  totalamount: any;
  additionlpay: any;
  valuecustomerinfo: any;
  valueSetupBox: any;
  valueTransactions: any;
  valueAdditionalPayments: any;
  valuesetsts: any;
  valuesetview: any;
  valuetransreceipt: any;
  valueaddinvoice: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  refundval: any;
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  valuecustomerRefunds:any;


  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute, private location: Location
  ) { }

  ngOnInit(): void {



 this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
 
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
 
          if (this.roleId == 1) {
            this.valuecustomerinfo = 'Customers-Customer Info';
            this.valueSetupBox = 'Customers-Setup Box';
            this.valueTransactions = 'Customers-Transaction';
            this.valueAdditionalPayments = 'Customers-Additional Payments';
            this.valuesetsts = 'Customers-Setup Box Status'
            this.valuesetview = 'Customers-Setup Box View'
            this.valuetransreceipt = 'Customers-Transaction Receipt'
            this.valueaddinvoice = 'Customers-Additional Payments Invoice'
            this.valuecustomerRefunds='Customers-Refunds'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
             
              if (this.actions == 'Customers-Additional Payments Invoice') {
                this.valueaddinvoice = 'Customers-Additional Payments Invoice'
              }
              if (this.actions == 'Customers-Transaction Receipt') {
                this.valuetransreceipt = 'Customers-Transaction Receipt'
              }
              if (this.actions == 'Customers-Setup Box Status') {
                this.valuesetsts = 'Customers-Setup Box Status'
              }
              if (this.actions = 'Customers-Setup Box View') {
                this.valuesetview = 'Customers-Setup Box View'
              }
              if (this.actions == 'Customers-Customer Info') {
                this.valuecustomerinfo = 'Customers-Customer Info';
              }
              if (this.actions == 'Customers-Setup Box') {
                this.valueSetupBox = 'Customers-Setup Box'
              }
              if (this.actions == 'Customers-Transaction') {
                this.valueTransactions = 'Customers-Transaction'
              }
              if (this.actions == 'Customers-Additional Payments') {
                this.valueAdditionalPayments = 'Customers-Additional Payments'
              }
              if(this.actions=='Customers-Refunds'){
                this.valuecustomerRefunds='Customers-Refunds'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.service.ViewCustomerBasicInfo(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewcustomer = res.response;
        // this.alcotchannel = res.response.alcotList;
        // this.bouquetPlan = res.response.bouquetList;
        // this.lcopChannel = res.response.lcopList;
        // this.customerId = res.response.customerdetail.customerId;
        // let totalAmount = 0;
        // const alcotList = res.response.alcotList;


        // for (let i = 0; i < alcotList.length; i++) {
        //   totalAmount += alcotList[i].price;
        // }

        // this.totalAmount = totalAmount;
        // this.viewData = true;


        // let totalbouqet = 0;
        // const bouquetList = res.response.bouquetList;

        // for (let i = 0; i < bouquetList.length; i++) {
        //   totalbouqet += bouquetList[i].broadCasterId.amount;
        // }

        // this.totalbouqet = totalbouqet;
        // this.viewData = true;


        // let totallcop = 0;
        // const lcopList = res.response.lcopList;

        // for (let i = 0; i < lcopList.length; i++) {
        //   totallcop += lcopList[i].overallAmount;
        // }

        // this.totallcop = totallcop;

        // this.viewData = true;
        // this.overallAmount = this.totalAmount + this.totalbouqet + this.totallcop;
      }



      else {
        this.viewData = false;

      }



    });

    this.service.CustomerTotalPlanAmount(this.id).subscribe((res:any)=>{
      if(res.flag==1){
        this.totalamount=res.response.totalAmount;
      }
    })
    this.service.CustomerTransaction(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response.reverse();
        this.showData = true;

      }
      else {
        this.showData = false
      }
    });
    this.service.RefundForCustomerView(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.refundval = res.response.reverse();
     
      }
      else if (res.flag === 2) {
        this.refundval = [];
     
 
      }
    })

    // this.service.ViewCustomerDetails(this.id).subscribe((res: any) => {
    //   if (res.flag == 1) {
    //     this.viewcustomer = res.response.customerdetail;
    //     this.alcotchannel = res.response.alcotList;
    //     
    //     this.bouquetPlan = res.response.bouquetList;
    //     this.lcopChannel = res.response.lcopList;
    //     let totalAmount = 0;
    //     const alcotList = res.response.alcotList;


    //     for (let i = 0; i < alcotList.length; i++) {
    //       totalAmount += alcotList[i].price;
    //     }

    //     this.totalAmount = totalAmount;
    //    this.viewData=true;


    //    let totalbouqet=0;
    //    const bouquetList=res.response.bouquetList;

    //    for (let i = 0; i < bouquetList.length; i++) {
    //      totalbouqet += bouquetList[i].broadCasterId.amount;
    //    }

    //    this.totalbouqet = totalbouqet;
    //   this.viewData=true;


    //   let totallcop=0;
    //   const lcopList=res.response.lcopList;

    //   for (let i = 0; i < lcopList.length; i++) {
    //     totallcop += lcopList[i].overallAmount;
    //   }

    //   this.totallcop = totallcop;

    //  this.viewData=true;
    //  this.overallAmount = this.totalAmount + this.totalbouqet + this.totallcop;
    //  }
    //   else {
    //     this.viewData = false;

    //   }

    // })
    this.service.ViewCustomersSetupBox(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.setupboxview = res.response.reverse();
      }
    })
    this.service.AdditionalPaymentsCustomerTransaction(this.id).subscribe((res:any)=>{
      if(res.flag==1){
        this.additionlpay=res.response.reverse();
        this.showData1 = true;
      }
      else {
        this.showData1 = false
      }
    })

  }

  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
 
    });
  }

  close() {
    this.location.back()
  }

  viewChannel(id: any) {
    
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
    
  }

  reload(){
    window.location.reload()
  }

  Customercustid(id:any,filterValue: string) {
    if (!filterValue) {
        this.toastr.error('Please enter a value to search');
        return;
    }
   
    this.service.Customercustomeridsearch(id,filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transaction = res.response;  
          this.showData=true;
         
        }
        else if (res.flag === 2) {
          this.transaction = [];  
         this.showData=false;
      }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }

  viewreciept(id: any) {
    this.service.additionalpaymentsreceipts(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }

  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }
  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter(item =>
      item.subpermissionValue.toLowerCase().includes(searchText.toLowerCase())
    );
  }

}


