import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { setupStatus } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import moment from 'moment';

@Component({
  selector: 'app-yesterdayonoffstatus',
  templateUrl: './yesterdayonoffstatus.component.html',
  styleUrl: './yesterdayonoffstatus.component.css'
})
export class YesterdayonoffstatusComponent {
dataSource: any;
  merchantId: any = localStorage.getItem('merchantId');
  displayedColumns: any[] = ["stbId","customerName", "mobileNumber",  "stbnumber",  "dueStatus","activatedDate","billingDate"];
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
  onstatus: any;
  date2: any;
searchPerformed: boolean=false;

  constructor(private router: Router,
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.dashbaordyesterdayonoffstatu(this.merchantId,'ON').subscribe((res: any) => {
      if(res.flag==1)
      {
        this.onstatus = res.response
        this.dataSource = new MatTableDataSource(this.onstatus.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.onstatus.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

     
    })
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
    let sno = 1;
    this.responseDataListnew = [];
    this.onstatus?.forEach((element: any) => {
      this.response = [];
      let createdate = element.activatedDate;
           this.date1 = moment(createdate).format('DD/MM/yyyy').toString();
           let createbilingdate = element.billingDate;
           this.date2 = moment(createbilingdate).format('DD/MM/yyyy').toString();
           this.response.push(sno);
           this.response.push(element?.customerId?.customerName);
           this.response.push(element?.customerId?.mobileNumber);
           this.response.push(element?.stbId?.setupBoxNumber);
           if (element?.dueStatus == 'ON') {
            this.response.push('ON');
          }
       else if (element?.dueStatus == 'OFF') {
         this.response.push('OFF');
       }
       
     
           this.response.push(this.date1);
           this.response.push(this.date2);
     

     
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
 
 

   
  }

excelexportCustomer() {
  const header = [
    'S.No',
    'Customer Name',
    'Mobile Number',
    'Setupbox Number',
    'Due Status',
    'Activated Date',
    'Billing Date',
  ]


  const data = this.responseDataListnew;
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet('Yesterday ON Status');
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
    qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  }
  );
  worksheet.getColumn(1).protection = { locked: true, hidden: true }
  worksheet.getColumn(2).protection = { locked: true, hidden: true }
  worksheet.getColumn(3).protection = { locked: true, hidden: true }
  workbook.xlsx.writeBuffer().then((data: any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'Yesterday ON Status.xlsx');
  });
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
