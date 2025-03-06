import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
import { ChannelViewComponent } from '../../../Overall-Customer/channel-view/channel-view.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { settopStatus } from '../../../fargin-model/fargin-model.module';
import { PageEvent } from '@angular/material/paginator';

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
  viewData: boolean = false;
  totalAmount: number=0;
  totalbouqet: number=0;
  totallcop: number=0;
  overallAmount: number=0;
  setupboxview: any;
  isChecked!: boolean;
  totalamount: any;
  additionlpay: any;
  refundval: any;


valuecustomerinfo: any;
valuecustomerSetupBox: any;
valuecustomerTransactions: any;
valuecustomeradditional: any;
valuecustomerRefunds: any;
valuesetupsts: any;
valuesetupview: any;
valuetransreceipt: any;
valueadditionalinvoice: any;

getdashboard: any[] = [];
roleId: any = localStorage.getItem('roleId')
actions: any;
errorMessage: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  total: any;
  totalpages: any;
  currentpages: any;


  selectTab(tab: string) {
    this.selectedTab = tab;
  }
 
 
  pageIndex: number = 0;
  pageSize: number = 3;
  pageSizeadd: number=3;
  pageIndexadd:number=0;
  filter: boolean = false;
  filter1: boolean = false;
  filter2: boolean = false;
 
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
            this.valuecustomerinfo = 'Customer Info'
            this.valuecustomerSetupBox = 'Setup Box'
            this.valuecustomerTransactions = 'Transactions'
            this.valuecustomeradditional = 'Additional Payments'
            this.valuecustomerRefunds = 'Refunds'
            this.valuesetupsts = 'Setup Box-Status'
            this.valuesetupview = 'Setup Box-View'
            this.valuetransreceipt = 'Transactions-Reciept'
            this.valueadditionalinvoice = 'Additional Payments-Invoice'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
 
              if (this.actions == 'Customer Info') {
                this.valuecustomerinfo = 'Customer Info'
              }
              if (this.actions == 'Setup Box') {    
                this.valuecustomerSetupBox = 'Setup Box'
              }
              if (this.actions == 'Transactions') {
                this.valuecustomerTransactions = 'Transactions'
              }
              if (this.actions == 'Additional Payments') {
                this.valuecustomeradditional = 'Additional Payments'
              }
              if (this.actions == 'Refunds') {
                this.valuecustomerRefunds = 'Refunds'
              }
              if (this.actions == 'Setup Box-Status') {
                this.valuesetupsts = 'Setup Box-Status'
              }
              if (this.actions == 'Setup Box-View') {
                this.valuesetupview = 'Setup Box-View'
              }
              if (this.actions == 'Transactions-Reciept') {
                this.valuetransreceipt = 'Transactions-Reciept'
              }
              if (this.actions == 'Additional Payments-Invoice') {
                this.valueadditionalinvoice = 'Additional Payments-Invoice'
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
    this.service.CustomerTransaction(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
      

      }

      else if (res.flag == 2) {
       

        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
       
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
    this.service.AdditionalPaymentsCustomerTransaction(this.id, this.pageSizeadd, this.pageIndexadd).subscribe((res: any) => {
      if (res.flag == 1) {
        this.additionlpay = res.response;
        this.total = res.pagination.totalElements;
        this.totalpages = res.pagination.totalPages;
        this.currentpages = res.pagination.currentPage + 1;
    
      }
      else if (res.flag == 2) {
       

        this.total = res.pagination.totalElements;
        this.totalpages = res.pagination.totalPages;
        this.currentpages = res.pagination.currentPage + 1;
 
      
      }
    })
    this.service.RefundForCustomerView(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.refundval = res.response.reverse();
     
      }
      else if (res.flag === 2) {
        this.refundval = [];
     
 
      }
    })

 
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
  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
 
    });
  }
  reload(){
    this.service.ViewCustomersSetupBox(this.id).subscribe((res:any)=>{
      if(res.flag==1){
        this.setupboxview=res.response;
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
  renderPage(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex = event.pageIndex;  // Update current page index
    this.pageSize = event.pageSize;           // Update page size (if changed)

    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex);
    console.log('New Page Size:', this.pageSize);

    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.ngOnInit()
  }
  changePageIndex(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    this.renderPage({
      pageIndex: newPageIndex,
      pageSize: this.pageSize,
      // length: this.totalItems
    } as PageEvent);
  }
  renderPageadd(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndexadd = event.pageIndex;  // Update current page index
    this.pageSizeadd = event.pageSize;           // Update page size (if changed)

    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex);
    console.log('New Page Size:', this.pageSize);

    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.ngOnInit()
  }
  changePageIndexadd(newPageIndexs: number) {
    this.pageIndexadd = newPageIndexs;
    this.renderPage({
      pageIndex: newPageIndexs,
      pageSize: this.pageSizeadd,
      // length: this.totalItems
    } as PageEvent);
  }
}
