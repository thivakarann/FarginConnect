import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BouquetenameAddComponent } from '../bouquetename-add/bouquetename-add.component';
import { BouquetenameEditComponent } from '../bouquetename-edit/bouquetename-edit.component';
import { BouquetenameStatus } from '../../../fargin-model/fargin-model.module';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';

@Component({
  selector: 'app-bouquete-plan-viewall',
  templateUrl: './bouquete-plan-viewall.component.html',
  styleUrl: './bouquete-plan-viewall.component.css'
})
export class BouquetePlanViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'boqCreationId',
    'broadCasterName',
    'bouquetName',
    'status',
    'createdBy',
    'createdAt',
    'Edit',
    'modifiedBy',
    'modifiedAt',
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
    public Bouqutenameviewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.Bouqutenameviewall.Bouqetenameviewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.viewall);
    });
  }

  add() {
    this.dialog.open(BouquetenameAddComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms'
    })
  }

  Edit(id: any) {
    console.log(id);
    this.dialog.open(BouquetenameEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {
    console.log(id)
    this.isChecked = event.checked;

    let submitModel: BouquetenameStatus = {
      boqCreationId: id,
      status: this.isChecked ? 1 : 0
    };
    this.Bouqutenameviewall.Bouquetnamestatus(submitModel).subscribe((res: any) => {
      console.log(res);
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        window.location.reload();
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }

 
  exportexcel() {
    console.log('check');
    let sno = 1;
    this.responseDataListnew = [];
    this.viewall.forEach((element: any) => {

      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let moddate = element.modifiedAt;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.bundleChannel.broadCasterName);
      this.response.push(element?.bouquetName);
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);

      this.response.push(this.date2);

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "BroadCaster Name",
      "BroadCaster Plan",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At",
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Plan Creation Details');
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
 
 
 
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
 
    }
    );
 
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'Plan Creation Details.xlsx');
 
    });
  }

}
