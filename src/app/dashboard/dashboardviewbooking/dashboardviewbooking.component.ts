import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { setupStatus } from '../../fargin-model/fargin-model.module';
import { AddSetupboxComponent } from '../../main-master/setupbox/add-setupbox/add-setupbox.component';
import { EditSetupboxComponent } from '../../main-master/setupbox/edit-setupbox/edit-setupbox.component';
import { CreateBulkComponent } from '../../main-master/setupbox/setupbox-bulkupload/create-bulk/create-bulk.component';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-dashboardviewbooking',
  templateUrl: './dashboardviewbooking.component.html',
  styleUrl: './dashboardviewbooking.component.css'
})
export class DashboardviewbookingComponent {
  dataSource: any;
  merchantId: any = localStorage.getItem('merchantId');
  displayedColumns: any[] = ["stbId","MSO", "Region",  "setupBoxNumber",  "status","bookingStatus",'View'];
  bulkdata: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  responseDataListnew: any[] = [];
  response: any[] = []
  date1: any;
  pageIndex: number=0 ;
  pageSize:number=5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  channelexport: any;
  valuesetupadd: any;
  valuesetupexport: any;
  valuesetupimport: any;
  valuesetupuploadfile: any;
  valuesetupStatus: any;
  valuesetupedit: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  bulkdataexport: any;
  bookingstatus: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
 
  filter:boolean=false;
  currentfilval:any;
  exportdata: any;
searchPerformed: boolean=false;

  constructor(private router: Router,
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.dashboardsetupboxStatusPagination(this.merchantId,1,this.pageSize,this.pageIndex).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.bookingstatus = res.response.content
        this.dataSource = new MatTableDataSource(this.bookingstatus.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter=false;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.bookingstatus.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
      }
    
    })

    if (this.roleName == 'Merchant Super admin') {
      this.valuesetupadd = 'Setup Box Inventory-Add';
      this.valuesetupexport = 'Setup Box Inventory-Export';
      this.valuesetupimport = 'Setup Box Inventory-Import Data';
      this.valuesetupuploadfile = 'Setup Box Inventory-Upload File';
      this.valuesetupStatus = 'Setup Box Inventory-Status';
      this.valuesetupedit = 'Setup Box Inventory-Edit'
    }
    else{
      this.service.viewRole(this.roleId).subscribe((res: any) => {
        
        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
         
      
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions
  
              if (this.actions == 'Setup Box Inventory-Add') {
                this.valuesetupadd = 'Setup Box Inventory-Add'
              }
              if (this.actions == 'Setup Box Inventory-Export') {
                this.valuesetupexport = 'Setup Box Inventory-Export'
              }
              if (this.actions == 'Setup Box Inventory-Import Data') {
                this.valuesetupimport = 'Setup Box Inventory-Import Data'
              }
              if (this.actions == 'Setup Box Inventory-Upload File') {
                this.valuesetupuploadfile = 'Setup Box Inventory-Upload File'
              }
              if (this.actions == 'Setup Box Inventory-Status') {
                this.valuesetupStatus = 'Setup Box Inventory-Status'
              }
              if (this.actions == 'Setup Box Inventory-Edit') {
                this.valuesetupedit = 'Setup Box Inventory-Edit'
              }
  
            }
          
        }
      })
    }
  

  }

  reload(){
    window.location.reload()
  }

  

  onSubmit(event: MatSlideToggleChange, id: any) {
    
    this.isChecked = event.checked;
    let submitModel: setupStatus = {
      status: this.isChecked ? 1 : 0,
      stbId: id
    };
    this.service.setupboxstatus(submitModel).subscribe((res: any) => {
      
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
 
  exportexcel() {
 
  this.service.dashboardsetupboxStatusExport(this.merchantId,1).subscribe((res: any) => {
      console.log("Response received:", res);
      this.exportdata=res.response;
 
 if (res.flag == 1) { 
    let sno = 1;
    this.responseDataListnew = [];
    this.exportdata?.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.service?.serviceProviderName);
      this.response.push(element?.regionEntity?.stateName)
      this.response.push(element?.setupBoxNumber);
 
      if(element?.status=='1'){
        this.response.push('Active')
      }
      else{
        this.response.push('Inactive')
      }
      if (element?.bookingStatus == '1') {
        this.response.push('Booked')
      }
      else if (element?.bookingStatus == '0') {
        this.response.push('Available')
      }
      else if (element?.bookingStatus == '2') {
        this.response.push('Damaged')
      }

     
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
});
 

   
  }

excelexportCustomer() {
  const header = [
    "S.No",
    "MSO",
    "Region",
    "Setup Box Number",
    "Status",
    "Booking Status",
  ]


  const data = this.responseDataListnew;
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet('Booked Setupbox Reports');
  // Blank Row
  worksheet.addRow([]);
  let headerRow = worksheet.addRow(header);
  headerRow.font = { bold: true };
  // Cell Style : Fill and Border
  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFFFF' },
      bgColor: { argb: 'FF0000FF' },

    }

    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  });

  data.forEach((d: any) => {
    //
    let row = worksheet.addRow(d);
    let qty = row.getCell(1);
    let qty1 = row.getCell(2);
    let qty2 = row.getCell(3);
    let qty3 = row.getCell(4);
    let qty4 = row.getCell(5);
    let qty5 = row.getCell(6);


    qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

  }
  );
  worksheet.getColumn(1).protection = { locked: true, hidden: true }
  worksheet.getColumn(2).protection = { locked: true, hidden: true }
  worksheet.getColumn(3).protection = { locked: true, hidden: true }
  workbook.xlsx.writeBuffer().then((data: any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'Booked Setupbox.xlsx');
  });
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customer(id:any){
    this.router.navigate([`dashboard/booked-customer-view/${id}`], {
      queryParams: { Alldata: id },
    });
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
 
 
  renderPage1(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex1 = event.pageIndex;  // Update current page index
    this.pageSize1 = event.pageSize;           // Update page size (if changed)
 
    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex1);
    console.log('New Page Size:', this.pageSize1);
 
    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.bookedsearch(this.currentfilval);
  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }
 
  bookedsearch(filterValue: string) {
    if (filterValue) {
    this.service.SetupboxDashboardSearch(this.merchantId,1,filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.bookingstatus = res.response;
          this.bookingstatus.reverse();
          this.dataSource = new MatTableDataSource(this.bookingstatus);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true;
 
        }
        else if (res.flag === 2) {
          this.bookingstatus = [];
          this.dataSource = new MatTableDataSource(this.bookingstatus);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
    else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
 
  }

}
