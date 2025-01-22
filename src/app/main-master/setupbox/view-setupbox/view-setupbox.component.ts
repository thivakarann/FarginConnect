import { Component, ViewChild } from '@angular/core';
import { AddSetupboxComponent } from '../add-setupbox/add-setupbox.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { roleStatus, setupStatus } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { EditSetupboxComponent } from '../edit-setupbox/edit-setupbox.component';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';

@Component({
  selector: 'app-view-setupbox',
  templateUrl: './view-setupbox.component.html',
  styleUrl: './view-setupbox.component.css'
})
export class ViewSetupboxComponent {
  dataSource: any;
  rolevalue: any;
  merchantId: any = localStorage.getItem('merchantId');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: any[] = ["stbId", "setupBoxNumber", "MSO", "Region", "status", "Booking Status", "CreatedBy", "action", "createdAt"];
  viewPermission: any;
  viewSubpermission: any;
  isChecked: any;
  values: any[] = [];
  values2: any[] = [];
  subId: any[] = [];
  perValueArray: any[] = [];
  moduleName: any[] = [];
  errorMessage: any;
  getAction: any;
  roleName: any;
  permissionview: any;
  subpermission: any;
  perValueObject: any;
  setupboxvalue: any;
  responseDataListnew: any[] = [];
  response: any[] = []
  date1: any;
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.setupboxbyid(this.merchantId).subscribe((res: any) => {
      this.setupboxvalue = res.response;
      
      this.dataSource = new MatTableDataSource(this.setupboxvalue?.reverse())
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload(){
    window.location.reload()
  }

  edit(id: any) {
    this.dialog.open(EditSetupboxComponent, {
      data: { value: id },
      disableClose: true,
      width: '80vw',// Use percentage to make it responsive
      maxWidth: '600px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }

  create() {
    this.dialog.open(AddSetupboxComponent, {
      disableClose: true,
      width: '80vw',// Use percentage to make it responsive
      maxWidth: '500px',
      height: 'auto',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.setupboxvalue.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.setupBoxNumber);
      this.response.push(element?.service?.serviceProviderName)
      this.response.push(element?.regionEntity?.stateName);
      this.response.push(element?.createdBy);
      let createdate = element?.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response.push(this.date1);
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      "S.No",
      "Setup Box Number",
      "MSO",
      "Region",
      "Created By",
      "Created At",
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Setupbox Reports');
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
      FileSaver.saveAs(blob, 'Setupbox Reports.xlsx');
    });
  }
}
