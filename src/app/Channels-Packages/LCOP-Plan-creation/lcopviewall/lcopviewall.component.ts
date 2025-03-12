import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PlanStatus } from '../../../fargin-model/fargin-model.module';
import { LcopEditComponent } from '../lcop-edit/lcop-edit.component';
import FileSaver from 'file-saver';
import { PageEvent } from '@angular/material/paginator';
import { Workbook } from 'exceljs';
import moment from 'moment';

@Component({
  selector: 'app-lcopviewall',
  templateUrl: './lcopviewall.component.html',
  styleUrl: './lcopviewall.component.css'
})
export class LCOPviewallComponent {
  dataSource: any;
  displayedColumns: string[] =
    [
      "lcopId",
      "planName",
      "totalAmount",
      "price",
      "overallAmount",
      "status",
      "View",
      "Edit",
      "createdBy",
      "createdAt",
    ]
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantId: any = localStorage.getItem('merchantId');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  customer: any;
  admin: any;
  isChecked: any;
  date1: any;
  date2: any;
  Viewall: any;
  valuelcopAdd: any;
  valuelcopExport: any;
  valuelcopStatus: any;
  valuelcopView: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valuelcopEdit: any;
  pageIndex: number=0 ;
  pageSize:number=5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  channelexport: any;
  roleName = localStorage.getItem('roleName')
  Viewallexport: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
 
  filter:boolean=false;
  currentfilval:any;
  permissionview: any;
  subpermission: any;
  perValueObject: any;
  permissionvalue: any;
  subpermissionValue: any;
  valueroleadd: any;
  valuepermissonView: any;
  valuepermissonStatus: any;
  valuepermissonEdit: any;
  bouquet:any;
 
  roleNames = localStorage.getItem('roleName')
  rolevalue: any;
  bouquetids: any[]=[];
  bouquetid: any[]=[];
  bouquetIds: any[]=[];
  bouquetidplan: any[]=[];
  amount: any[]=[];
  planNames: any;
  totalamount: any;
  overallprice: any;
  lpid: any;
  values: any[] = [];
  values2: any[] = [];
  subId: any[] = [];
  perValueArray: any[] = [];
  moduleName: any[] = [];
  errorMessage: any;
  getAction: any;
searchPerformed: boolean=false;
 

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }


  ngOnInit() {

    this.service.LcopViewalls(this.merchantId,this.pageSize,this.pageIndex).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.Viewall = res.response;
        this.totalPages=res.pagination?.totalElements;
        this.totalpage=res.pagination?.totalPages;
        this.currentpage=res.pagination?.currentPage +1;
        // this.Viewall.reverse();
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    });
    if (this.roleName == 'Merchant Super admin') {
      this.valuelcopAdd = 'LCOP Plan Configuration-Add';
      this.valuelcopExport = 'LCOP Plan Configuration-Export';
      this.valuelcopStatus = 'LCOP Plan Configuration-Status';
      this.valuelcopView = 'LCOP Plan Configuration-View';
      this.valuelcopEdit = 'LCOP Plan Configuration-Edit'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;


          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'LCOP Plan Configuration-Add') {
              this.valuelcopAdd = 'LCOP Plan Configuration-Add'
            }
            if (this.actions == 'LCOP Plan Configuration-Export') {
              this.valuelcopExport = 'LCOP Plan Configuration-Export'
            }
            if (this.actions == 'LCOP Plan Configuration-Status') {
              this.valuelcopStatus = 'LCOP Plan Configuration-Status'
            }
            if (this.actions == 'LCOP Plan Configuration-View') {
              this.valuelcopView = 'LCOP Plan Configuration-View'
            }
            if (this.actions == 'LCOP Plan Configuration-Edit') {
              this.valuelcopEdit = 'LCOP Plan Configuration-Edit'
            }
          }

        }
      })
    }


  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update(id: any) {
    this.dialog.open(LcopEditComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id }
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.LcopViewalls(this.merchantId,this.pageSize,this.pageIndex).subscribe((res: any) => {
        if(res.flag==1)
        {
          this.Viewall = res.response;
          this.totalPages=res.pagination?.totalElements;
          this.totalpage=res.pagination?.totalPages;
          this.currentpage=res.pagination?.currentPage +1;
          // this.Viewall.reverse();
          this.dataSource = new MatTableDataSource(this.Viewall);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else if(res.flag==2){
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.Viewall);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
  
      });
    })
  }


  // update(id: any) {
  //   this.values = [];
  //   this.subId = [];
  //   this.bouquetid=[]
  //   this.bouquetidplan=[];
  //   this.amount=[];
  //   this.perValueArray = [];
  //   this.service.viewlcopid(id).subscribe((res: any) => {
  //     this.rolevalue = res.response;
  //     if (res.flag == 1) {
  //       this.getAction = res.response;
  //       console.log(this.getAction)
  //       this.lpid=this.getAction.lcopId,
  //       this.planNames=this.getAction.planName;
  //       this.totalamount=this.getAction.totalAmount;
  //       this.overallprice=this.getAction.price
  //       console.log(this.planNames)
  //       this.permissionview = this.getAction.merchantFreeChannel
  //       console.log(this.permissionview)
  //       this.subpermission = this.getAction.merchantPaidChannel
  //       this.bouquet= this.getAction.merchantBouquet
  //       // for (let data of this.permissionview) {
  //       //   this.values.push(data.alcotFreeChannel?.alcotId)
  //       // }

  //       this.perValueObject = new Set(this.values)
  //       for (let value of this.perValueObject) {
  //         this.perValueArray.push(value)
  //       }


  //       // for (let data1 of this.subpermission) {
  //       //   this.subId.push(data1.alcotPaidChannel?.alcotId)
  //       // }

  //       // for (let data2 of this.bouquet) {
  //       //   this.bouquetids.push(data2.broadCasterBouquets?.bouquetCreation?.boqCreationId)
  //       // }


  //       // for (let data3 of this.bouquet) {
  //       //   this.bouquetidplan.push(data3.broadCasterBouquets?.bouquetId)
  //       // }

       
  //       for (let data4 of this.bouquet) {
  //         this.amount.push(data4.broadCasterBouquets?.amount)
  //       }


  //       this.dialog.open(LcopEditComponent, {
  //         data: {  values: this.values, sub: this.subId, bouqt:this.bouquetids, id:this.bouquetidplan, amt:this.amount, lcopplan:this.planNames, lcoptotalamount:this.totalamount, overallamount:this.overallprice, lpsid:this.lpid },
  //         disableClose: true,
  //         enterAnimationDuration: '500ms',
  //         exitAnimationDuration: '1000ms',
  //       });
  //     } else if (res.flag == 2) {

  //       this.errorMessage = res.responseMessage;
  //     } else {
  //       this.errorMessage = res.responseMessage;
  //     }
  //   });
  // }

  Viewdata(id: any) {
    this.router.navigate([`dashboard/lcopview/${id}`], {
      queryParams: { Alldata: id },
    });

  }


  create() {
    this.router.navigateByUrl('dashboard/lcopadd');
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



  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;

    let submitModel: PlanStatus = {
      lcopId: id,
      status: this.isChecked ? 1 : 0,
    };

    this.service.LCOPPlanStatus(submitModel).subscribe((res: any) => {

      this.toastr.success(res.responseMessage);
      setTimeout(() => {
           this.service.LcopViewalls(this.merchantId,this.pageSize,this.pageIndex).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.Viewall = res.response;
        this.totalPages=res.pagination?.totalElements;
        this.totalpage=res.pagination?.totalPages;
        this.currentpage=res.pagination?.currentPage +1;
        // this.Viewall.reverse();
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    });
      }, 300);
    });
  }



  exportexcel() {
    this.service.LcopViewallsExport(this.merchantId).subscribe((res: any) => {
     this.Viewallexport = res.response;
   if (res?.flag == 1) {
   let sno = 1;
   this.responseDataListnew = [];
   this.Viewallexport?.forEach((element: any) => {
    let createdate = element.createdAt;
    this.date1 =  moment(createdate).format('DD/MM/yyyy hh:mm a').toString();
     this.response = [];

     this.response.push(sno);
     this.response.push(element?.planName);
     this.response.push(element?.totalAmount);
     this.response.push(element?.price);
     this.response.push(element?.overallAmount);
   
     if(element?.status=='1'){
       this.response.push('Active');
     }
     else{
       this.response.push('Inactive')
     }
     this.response.push(element?.createdBy);
     this.response.push(this.date1);
 
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
      "Plan Name",
      "Selected Package Amount",
      "Margin Amount",
      "LCOP Final Amount",
      "Plan Status",
      "Created By",
      "Created At"
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('LCOP Plan Details');
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
      let qty6 = row.getCell(7);
      let qty7 = row.getCell(8);
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
 
 
    }
    );
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'LCOP Plan Details.xlsx');
    });
  }
 
  lcopplandetails(filterValue: string) {
   
    if (filterValue) {
 
    this.service.LcopPlan(this.merchantId,filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.Viewall = res.response;  
          this.Viewall.reverse();
          this.dataSource = new MatTableDataSource(this.Viewall);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
         
        }
        else if (res.flag === 2) {
          this.Viewall = [];  
          this.dataSource = new MatTableDataSource(this.Viewall);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
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
 
 
  reload(){
    this.service.LcopViewalls(this.merchantId,this.pageSize,this.pageIndex).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.Viewall = res.response;
        this.totalPages=res.pagination?.totalElements;
        this.totalpage=res.pagination?.totalPages;
        this.currentpage=res.pagination?.currentPage +1;
        // this.Viewall.reverse();
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    });
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
    this.lcopplandetails(this.currentfilval);
  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }




}
