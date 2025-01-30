import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Alcartstatus } from '../../../fargin-model/fargin-model.module';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-alacarte-viewall',
  templateUrl: './alacarte-viewall.component.html',
  styleUrl: './alacarte-viewall.component.css'
})
export class AlacarteViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
 displayedColumns: string[] = [
    'alcotId',
    'channelName',
    'channelNo',
    'Broadcaster',
    'msos',
    'region',
    'generic',
    'language',
    'type',
    'price',
    'alcotStatus',
    'View',
    'Edit',
    'createdBy',
    'createdAt',
    'modifiedBy',
    'modifiedAt'

  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  valuealcartAdd: any;
  valuealcartExport: any;
  valuealcartStatus: any;
  valuealcartView: any;
  valuealcartEdit: any;

  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;
  valuealcartHistory:any;
  pageIndex: number = 0;
  pageSize=5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  viewallexport: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  filter: boolean = true;
  currentfilval: any;

  constructor(
    public AllcartViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.loadData();
    this.AllcartViewall.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuealcartAdd = 'Channel Creation-Add';
            this.valuealcartEdit = 'Channel Creation-Edit';
            this.valuealcartExport = 'Channel Creation-Export'
            this.valuealcartStatus = 'Channel Creation-Status'
            this.valuealcartView = 'Channel Creation-View'
            this.valuealcartHistory = 'Channel Creation-History'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'Channel Creation-Add') {
                this.valuealcartAdd = 'Channel Creation-Add';
              }
              if (this.actions == 'Channel Creation-Edit') {
                this.valuealcartEdit = 'Channel Creation-Edit';
              }
              if (this.actions == 'Channel Creation-Export') {
                this.valuealcartExport = 'Channel Creation-Export';
              }
              if (this.actions == 'Channel Creation-View') {
                this.valuealcartView = 'Channel Creation-View'
              }
              if (this.actions == 'Channel Creation-Status') {
                this.valuealcartStatus = 'Channel Creation-Status';
              }
              if (this.actions == 'Channel Creation-History') {
                this.valuealcartHistory = 'Channel Creation-History';
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
    this.AllcartViewall.Alcartviewall(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {

      this.viewall = res.response.content;
      this.totalPages=res.pagination.totalElements;
      this.totalpage=res.pagination.totalPages;
     this.currentpage=res.pagination.currentPage+1;
      // this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filter = false;

      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;  
        this.filter = false;
      }
     
    });
 

  }





  reload() {
    this.AllcartViewall.Alcartviewall(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {

      this.viewall = res.response.content;
      this.totalPages=res.pagination.totalElements;
      this.totalpage=res.pagination.totalPages;
     this.currentpage=res.pagination.currentPage+1;
      // this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filter = false;

      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;  
        this.filter = false;
      }
     
    });
  }



  add() {
    this.router.navigateByUrl('dashboard/alcart-add');
  }



  Viewdata(id: any) {
    this.router.navigate([`dashboard/alcart-view/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }

  Edit(id: any) {
    this.router.navigate([`dashboard/alcart-edit/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {
    
    this.isChecked = event.checked;

    let submitModel: Alcartstatus = {
      alcotId: id,
      alcotStatus: this.isChecked ? 1 : 0,
    };
    this.AllcartViewall.AlcardStatus(submitModel).subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.AllcartViewall.Alcartviewall(this.pageSize,this.pageIndex).subscribe((res: any) => {
            if (res.flag == 1) {
      
            this.viewall = res.response.content;
            this.totalPages=res.pagination.totalElements;
            this.totalpage=res.pagination.totalPages;
           this.currentpage=res.pagination.currentPage+1;
            // this.viewall.reverse();
            this.dataSource = new MatTableDataSource(this.viewall);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.filter = false;
      
            }
            else if (res.flag == 2) {
              this.viewall = [];
              this.dataSource = new MatTableDataSource(this.viewall);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;  
              this.filter = false;
            }
           
          });
       
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }



 exportexcel() {
    this.AllcartViewall.AlcartviewallExport().subscribe((res: any) => {
      this.viewallexport = res.response;
    if (res?.flag == 1) {
    let sno = 1;
    this.responseDataListnew = [];
    this.viewallexport.forEach((element: any) => {
 
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.channelName);
      this.response.push(element?.channelNo);
      this.response.push(element?.bundleChannelId?.broadCasterName);
      this.response.push(element?.region?.service?.serviceProviderName);
      this.response.push(element?.region?.stateName);
      this.response.push(element?.generic);
      this.response.push(element?.language);

      if (element.type == 1) {
        this.response.push('Paid')
      }
      else {
        this.response.push('Free')
      }
      this.response.push(element?.price)
 
      if (element.alcotStatus == 1) {
        this.response.push('Active')
      }
      else {
        this.response.push('Inactive')
      }
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);
   
      if(element?.modifiedAt){
        this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy-hh:mm a').toString());
      }
      else{
        this.response.push('');
      }
     
     
 
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
});
 
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "Channel Name",
      "Channel No",
      "Broadcaster",
      "Service Provider Name",
      "Region",
      "Generic",
      "Language",
      "Channel Type",
      "Price",
      "Channel Status",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At",
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('A-LA-CARTE Details');
    // Blank Row
    // let titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Times New Roman', family: 4, size: 16, bold: true };
 
 
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
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);
      let qty10 = row.getCell(11);
      let qty11 = row.getCell(12);
      let qty12 = row.getCell(13);
      let qty13 = row.getCell(14);
      let qty14 = row.getCell(15);
      // let qty15 = row.getCell(16);
      // let qty16 = row.getCell(16);
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty10.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty11.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty12.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty13.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty14.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty15.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty16.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     
    }
    );
 
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'A-LA-CARTE Details.xlsx');
 
    });
  }
  alacartehistory(){
    this.router.navigateByUrl('dashboard/alcot-history')
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

  Alacarte(filterValue: string) {
  
    if (filterValue) {

    this.AllcartViewall.AlcotSearch(filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.viewall = res.response;  
          this.viewall.reverse();
          this.dataSource = new MatTableDataSource(this.viewall);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true;
         
        }
        else if (res.flag === 2) {
          this.viewall = [];  
          this.dataSource = new MatTableDataSource(this.viewall);  
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
renderPage1(event: PageEvent) {
  // Capture the new page index and page size from the event
  this.pageIndex1 = event.pageIndex;  // Update current page index
  this.pageSize1 = event.pageSize;           // Update page size (if changed)

  // Log the new page index and page size to the console (for debugging)
  console.log('New Page Index:', this.pageIndex1);
  console.log('New Page Size:', this.pageSize1);

  // You can now fetch or display the data for the new page index
  // Example: this.fetchData(this.currentPageIndex, this.pageSize);
  this.Alacarte(this.currentfilval);
}

changePageIndex1(newPageIndex1: number) {
  this.pageIndex1 = newPageIndex1;
  this.renderPage1({
    pageIndex: newPageIndex1,
    pageSize: this.pageSize1,
    // length: this.totalItems
  } as PageEvent);
}


onPageChange(event: PageEvent) {
  // Update the page index and size
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
 
  // Reload the data with the new page index and page size
  this.loadData();
}
 
loadData() {
  this.AllcartViewall.Alcartviewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag === 1) {
          this.viewall = res.response.content;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          this.dataSource = new MatTableDataSource(this.viewall);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filter = false;
      } else {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filter = false;
      }
  });
}
}






