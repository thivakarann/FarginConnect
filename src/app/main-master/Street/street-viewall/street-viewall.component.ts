import { Component, ViewChild } from '@angular/core';
import { streetStatus, StreetStatusActive } from '../../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { StreetCreateComponent } from '../street-create/street-create.component';
import { EditStreetComponent } from '../edit-street/edit-street.component';
import moment from 'moment';

@Component({
  selector: 'app-street-viewall',
  templateUrl: './street-viewall.component.html',
  styleUrl: './street-viewall.component.css'
})
export class StreetViewallComponent {
  dataSource: any;
  displayedColumns: string[] = ["sno", "area","pincode","status", "action",
    // 'view',
    // 'createdat',
    // 'createdby',
    // 'modifyat',
    // 'modifyby'
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  regionValue: any;
  responseDataListnew: any[] = [];
  response: any[] = []
  valueregionExport: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  merchantid: any = localStorage.getItem('merchantId')
  pinvalue: any;

  isChecked: boolean = false;
  date1: any;
  date2: any;

  constructor(private router: Router, private service: FarginServiceService, private dialog: MatDialog,private toastr:ToastrService) { }
  ngOnInit(): void {
    this.service.streetGetAll().subscribe((res: any) => {
      this.pinvalue = res.response;
      this.dataSource = new MatTableDataSource(this.pinvalue?.reverse())
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  reload() {
    window.location.reload()
  }
  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.pinvalue.forEach((element: any) => {
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();
      let modifydate = element.modifiedAt;
      this.date2 = moment(modifydate).format('DD/MM/yyyy hh:mm a').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.streetName);
      this.response.push(element?.merchantArea?.areaName);
      if (element?.status == '1') {
        this.response.push('Active');
      } else {
        this.response.push('Inactive');
      }
      this.response.push(this.date1);
      this.response.push(element?.createdBy);
      this.response.push(this.date2);
      this.response.push(element?.modifiedBy);
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {

    const header = [
    "S.No", 
    "Street Name",
    "Area",
    "Status", 
    'CreatedAt',
    'CreatedBy',
    'ModifyAt',
    'ModifyBy'

    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Street Reports');
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
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Street Reports.xlsx');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create(){
    this.dialog.open(StreetCreateComponent,{
      // data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    })
  }

  edit(id:any,data:any){
    this.dialog.open(EditStreetComponent,{
      data: { value: id,
        value1:data
       },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    })
  }
  view(id:any){

  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {
    
    this.isChecked = event.checked;

    let submitModel: StreetStatusActive = {
      status: this.isChecked ? 1 : 0,
    };
    this.service.StreetActiveStatus(id,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);

      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }
}
