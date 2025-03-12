import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
import { ReturnDuesComponent } from '../../../Transaction/return-dues/return-dues.component';
import { TransactionManualpayComponent } from '../../../Transaction/transaction-manualpay/transaction-manualpay.component';
import { TransactionViewbyidComponent } from '../../../Transaction/transaction-viewbyid/transaction-viewbyid.component';
import { ManuvalpayWithoutOtpComponent } from '../../../Transaction/manuvalpay-without-otp/manuvalpay-without-otp.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-customertransactionroute',
  templateUrl: './customertransactionroute.component.html',
  styleUrl: './customertransactionroute.component.css',
})
export class CustomertransactionrouteComponent {
  id: any;
  transaction: any;
  showData: boolean = false;
  searchText: any;
  page4: number = 1;
  manuvalpaymentstatus: any = localStorage.getItem('customerManualStatus');
  pageIndex: number = 0;
  pageSize: number = 3;
  
  pageIndex1: number = 0;
  pageSize1 = 3;
  filter: boolean = false;
  filter1: boolean = false;
  filter2: boolean = false;
totalPages: any;
currentpage: any;
totalpage: any;
totalPages1: any;
currentpage1: any;
totalpage1: any;
totalPages2: any;
pageIndex2: any;
currentpage2: any;
totalpage2: any;
  totalsearch: any;
  totalpagesearch: any;
  currentpagesearch: any;
  currentfilval:any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
    private location: Location
 
  ) {}

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
  

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
  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
    });
  }
  view(id: any) {
    this.dialog.open(TransactionViewbyidComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }
   
  dues(id: any) {
    this.dialog.open(ReturnDuesComponent, {
      width: '80vw',
      maxWidth: '400px',
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.CustomerTransaction(this.id ,this.pageSize, this.pageIndex).subscribe((res: any) => {
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
    })

  }
  viewpay(id: any) {
    if (this.manuvalpaymentstatus == 1) {
      this.dialog.open(TransactionManualpayComponent, {
        data: { value: id },
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.service.CustomerTransaction(this.id,this.pageSize, this.pageIndex).subscribe((res: any) => {
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
      })

    }

    else if (this.manuvalpaymentstatus == 0) {
      this.dialog.open(ManuvalpayWithoutOtpComponent, {
        data: { value: id },
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.service.CustomerTransaction(this.id,this.pageSize, this.pageIndex).subscribe((res: any) => {
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
      })
    }

  }
  close() {
    this.location.back()     
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

}
