import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-service-provider-link-viewall',
  templateUrl: './service-provider-link-viewall.component.html',
  styleUrl: './service-provider-link-viewall.component.css'
})
export class ServiceProviderLinkViewallComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'serviceId',
    'serviceProviderName',
    'serviceProviderLink',
    
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  serviceprovideLinks: any;
  merchantId: any = localStorage.getItem('merchantId');
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
valueproviderlinkexport: any;
valueproviderlinkpay: any;
roleName = localStorage.getItem('roleName')
searchPerformed: boolean=false;

  constructor(
    public Serviceprovidelinksss: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.Serviceprovidelinksss.ServiceprovideLinks(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.viewall = res.response.services;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      }
      
 else if(res.flag==2){
  this.dataSource = new MatTableDataSource([]);
  this.dataSource = new MatTableDataSource(this.viewall.reverse());
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}
   
    });

    if (this.roleName == 'Merchant Super admin'){
      this.valueproviderlinkexport='ServiceProvider Payments-Export'
  this.valueproviderlinkpay='ServiceProvider Payments-Pay'
  }
  else{
    this.Serviceprovidelinksss.viewRole(this.roleId).subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.getdashboard = res.response?.merchantSubPermission;
      
     
        for (let datas of this.getdashboard) {
          this.actions = datas.subPermissions
           if(this.actions=='ServiceProvider Payments-Export'){
            this.valueproviderlinkexport='ServiceProvider Payments-Export'
           }
           if(this.actions=='ServiceProvider Payments-Pay'){
            this.valueproviderlinkpay='ServiceProvider Payments-Pay'
           }
         
          
              }
      
      }
    })
  }
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  reload(){
    this.Serviceprovidelinksss.ServiceprovideLinks(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.viewall = res.response.services;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      }
      
 else if(res.flag==2){
  this.dataSource = new MatTableDataSource([]);
  this.dataSource = new MatTableDataSource(this.viewall.reverse());
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}
   
    });
  }
  exportexcel() {
    
    let sno = 1;
    this.responseDataListnew = [];
    this.viewall.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.serviceProviderName);
      this.response.push(element?.serviceProviderLink);
      // if (element?.status == 1) {
      //   this.response.push("Active");
      // }

      // else {
      //   this.response.push("InActive");
      // }



      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S No",
      "Service Provider Name",
      "Service Provider Payment Link",
      // "Status",
    
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Service Provider Payments');
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
      // let qty3 = row.getCell(4);
      // let qty4 = row.getCell(5);
      // let qty5 = row.getCell(6);
      // let qty6 = row.getCell(7);






      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }



    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Service Provider Payments.xlsx');
    });
  }
}
