import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ChannelViewComponent } from '../channel-view/channel-view.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { settopStatus } from '../../fargin-model/fargin-model.module';
import { PageEvent } from '@angular/material/paginator';
import { OfflineDetailsComponent } from '../offline-details/offline-details.component';

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
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  refundval: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  total: any;
  totalpages: any;
  currentpages: any;
  totalsearch: any;
  totalpagesearch: any;
  currentpagesearch: any;
  currentfilval: any;
  vaaluedetails:any;
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  valuecustomerRefunds:any;
  pageIndex: number = 0;
  pageSize: number = 3;
  pageSizeadd: number=3;
  pageIndexadd:number=0;
  filter: boolean = false;
  filter1: boolean = false;
  filter2: boolean = false;
  pageIndex1: number = 0;
  pageSize1 = 3;
  currentfilvaladd: any;
  filter3: boolean=false;
  totalsearchadd: any;
  totalpagesearchadd: any;
  currentpagesearchadd: any;
  pageadd: number = 0;
  pagesizeadd = 3;
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute, private location: Location
  ) { }

  ngOnInit(): void {



 this.service.rolegetById(this.roleId).subscribe({next: (res: any) => {

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
            this.valueaddinvoice = 'Customers-Additional Payments Receipt'
            this.valuecustomerRefunds='Customers-Refunds'
            this.vaaluedetails = 'Customers-Refunds-View';
        
          }
          else { 
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions; 

              if (this.actions == 'Customers-Additional Payments Receipt') {
                this.valueaddinvoice = 'Customers-Additional Payments Receipt'
              }
              if (this.actions == 'Customers-Transaction Receipt') {
                this.valuetransreceipt = 'Customers-Transaction Receipt'
              }
              if (this.actions == 'Customers-Setup Box Status') {
                this.valuesetsts = 'Customers-Setup Box Status'
              }
              if (this.actions == 'Customers-Setup Box View') {
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
              if(this.actions =='Customers-Refunds'){
                this.valuecustomerRefunds='Customers-Refunds'
              }
              if(this.actions =='Customers-Refunds-View'){
                this.vaaluedetails='Customers-Refunds-View'
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
    this.service.CustomerTransaction(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
    
        this.filter = true;
        this.filter1 = false;
        console.log( this.filter1)
     
 
      }

      else if (res.flag == 2) {
       

        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        
        this.filter = true;
        this.filter1 = false;
       
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
    this.service.AdditionalPaymentsCustomerTransaction(this.id, this.pageSizeadd, this.pageIndexadd).subscribe((res: any) => {
      if (res.flag == 1) {
        this.additionlpay = res.response;
        this.total = res.pagination.totalElements;
        this.totalpages = res.pagination.totalPages;
        this.currentpages = res.pagination.currentPage + 1;
        
        this.filter2 = true;
        this.filter3 = false;
    
      }
      else if (res.flag == 2) {
       

        this.total = res.pagination.totalElements;
        this.totalpages = res.pagination.totalPages;
        this.currentpages = res.pagination.currentPage + 1;
        this.filter2 = true;
        this.filter3 = false;
      
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
  offline(id: any) {
    
    this.dialog.open(OfflineDetailsComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
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

  reload()
{
  this.service.CustomerTransaction(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
    if (res.flag == 1) {
      this.transaction = res.response;
      this.totalPages = res.pagination.totalElements;
      
      this.totalpage = res.pagination.totalPages;
      this.currentpage = res.pagination.currentPage + 1;
  
      this.filter = true;
      this.filter1 = false;
      console.log( this.filter1)
   

    }

    else if (res.flag == 2) {
     

      this.totalPages = res.pagination.totalElements;
      this.totalpage = res.pagination.totalPages;
      this.currentpage = res.pagination.currentPage + 1;
      
      this.filter = true;
      this.filter1 = false;
     
    }
  })
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

// Handle pagination for filtered search results
renderPage1(event: PageEvent) {
  this.pageIndex1 = event.pageIndex;
  this.pageSize1 = event.pageSize;
  console.log('New Page Index:', this.pageIndex1);
  console.log('New Page Size:', this.pageSize1);
  this.customerpay(this.currentfilval);
}

// Change page index for filtered search results
changePageIndex1(newPageIndex1: number) {
  this.pageIndex1 = newPageIndex1;
  this.renderPage1({
    pageIndex: newPageIndex1,
    pageSize: this.pageSize1
  } as PageEvent);
}

// Perform the search and update the filtered results
customerpay(filterValue: string) {
  if (filterValue) {
    console.log(filterValue);
    this.service.customertransactionsearch(this.id, filterValue, this.pageSize1, this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transaction = res.response;
          this.totalsearch = res.pagination.totalElements;
          this.totalpagesearch = res.pagination.totalPages;
          this.currentpagesearch = res.pagination.currentPage + 1;
          this.filter = false;
          this.filter1 = true;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  } else {
    this.toastr.error('Please enter a value to search');
  }
}

// Handle pagination for filtered search results
renderadd(event: PageEvent) {
  this.pageadd = event.pageIndex;
  this.pagesizeadd = event.pageSize;
 
  this.customerpayadd(this.currentfilvaladd);
}

// Change page index for filtered search results
changePageadd(newPageadd: number) {
  this.pageadd = newPageadd;
  this.renderadd({
    pageIndex: newPageadd,
    pageSize: this.pagesizeadd
  } as PageEvent);
}

// Perform the search and update the filtered results
customerpayadd(filterValue: string) {
  if (filterValue) {
    console.log(filterValue);
    this.service.customeradditionaltransactionsearch(this.id, filterValue, this.pagesizeadd, this.pageadd).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.additionlpay = res.response;
          this.totalsearchadd = res.pagination.totalElements;
          this.totalpagesearchadd = res.pagination.totalPages;
          this.currentpagesearchadd= res.pagination.currentPage + 1;
          this.filter2 = false;
          this.filter3 = true;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  } else {
    this.toastr.error('Please enter a value to search');
  }
}
reloadadd() {
  this.service.AdditionalPaymentsCustomerTransaction(this.id, this.pageSizeadd, this.pageIndexadd).subscribe((res: any) => {
    if (res.flag == 1) {
      this.additionlpay = res.response;
      this.total = res.pagination.totalElements;
      this.totalpages = res.pagination.totalPages;
      this.currentpages = res.pagination.currentPage + 1;
      
      this.filter2 = true;
      this.filter3 = false;
  
    }
    else if (res.flag == 2) {
     

      this.total = res.pagination.totalElements;
      this.totalpages = res.pagination.totalPages;
      this.currentpages = res.pagination.currentPage + 1;
      this.filter2 = true;
      this.filter3 = false;
    
    }
  })
}

}


