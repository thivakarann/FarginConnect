import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EntityStatus } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-entity-viewall',
  templateUrl: './entity-viewall.component.html',
  styleUrl: './entity-viewall.component.css'
})
export class EntityViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'merchantId',
    'entityName',
    'contactEmail',
    'accountId',
    'referenceNo',
    'merchantLegalName',
    'businessCategoryModel',
    'finalapproval',
    'pgonboard',
    'status',
    'View',
    'createdDatetime',
  
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

  constructor(
    public EntityViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.EntityViewall.EntityViewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.viewall);
    });
  }


  add() {
    this.router.navigateByUrl('dashboard/entity-add');
  }



  Viewdata(id: any) {
    this.router.navigate([`dashboard/entity-view/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportexcel() {
    console.log('check');
    let sno = 1;
    this.responseDataListnew = [];
    this.viewall.forEach((element: any) => {
      let createdate = element.createdDatetime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let moddate = element.modifiedDatetime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.entityName);
      this.response.push(element?.accountId);
      this.response.push(element?.merchantLegalName);
      this.response.push(element?.businessCategoryModel?.categoryName);
      this.response.push(element?.referenceNo);

if(element?.approvalStatusL2 == 'approved'){
  this.response.push('Approved');
}
else(element?.approvalStatusL2 == 'Pending')
{
  this.response.push('Pending');
}
if(element?.onBoardStatus == 'true'){
  this.response.push('Approved');
}
else(element?.onBoardStatus == 'false')
{
  this.response.push('Pending');
}
if(element?.accountStatus==1){
  this.response.push('Active');
}      
else(element?.accountStatus==0)
{
  this.response.push('Inactive');
}

      this.response.push(this.date1);

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
    "S.No",
    'entityName',
    'accountId',
    'referenceNo',
    'merchantLegalName',
    'businessCategoryModel',
    'finalapproval',
    'pgonboard',
    'status',
    "Created At"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Details');
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
      // console.log("row loop");

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


    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Entity Details.xlsx');
    });
  }

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: EntityStatus = {
      merchantId:id,
      accountStatus: this.isChecked ? 1 : 0,
    };

    this.EntityViewall.EntityActiveStatus(submitModel).subscribe((res: any) => {
      console.log(res);
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
}
