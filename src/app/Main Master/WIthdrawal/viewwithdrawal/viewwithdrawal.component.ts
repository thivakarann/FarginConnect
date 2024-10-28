import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { AddwithdrawalComponent } from '../addwithdrawal/addwithdrawal.component';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { EditwithdrawalComponent } from '../editwithdrawal/editwithdrawal.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StatusWithdrawal } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-viewwithdrawal',
  templateUrl: './viewwithdrawal.component.html',
  styleUrl: './viewwithdrawal.component.css'
})
export class ViewwithdrawalComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'amountramge',
    'gst',
    'fee',
    'totalfee',
    'mode',
    'type',
    'edit',
    'status',
    'createdBy',
    'createdDatetime',
    'modifiedBy',
    'modifiedDatetime',
  ];
  viewall: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  viewwithdrawal: any;
  isChecked: any;
  valuewithdrawalEdit: any;
  valuewithdrawalAdd: any;
  valuewithdrawalExport: any;
  valuewithdrawalStatus: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;


  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.service.viewwithdrawals().subscribe((res: any) => {
      this.viewwithdrawal = res.response;
      this.viewwithdrawal.reverse();
      this.dataSource = new MatTableDataSource(this.viewwithdrawal);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          
          if (this.roleId == 1) {
            this.valuewithdrawalAdd = 'Withdrawal Fee-Add';
            this.valuewithdrawalEdit = 'Withdrawal Fee-Edit';
            this.valuewithdrawalExport = 'Withdrawal Fee-Export';
            this.valuewithdrawalStatus = 'Withdrawal Fee-Status';

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              

              if (this.actions == 'Withdrawal Fee-Add') {
                this.valuewithdrawalAdd = 'Withdrawal Fee-Add';
              }
              if(this.actions=='Withdrawal Fee-Export'){
                this.valuewithdrawalExport='Withdrawal Fee-Export'
              }
              if(this.actions=='Withdrawal Fee-Edit'){
                this.valuewithdrawalEdit='Withdrawal Fee-Edit'
              }
              if(this.actions=='Withdrawal Fee-Status'){
                this.valuewithdrawalStatus='Withdrawal Fee-Status'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.viewwithdrawal.forEach((element: any) => {
      let createdate = element?.createdDatetime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      let moddate = element?.modifiedDatetime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.amountRange);
      this.response.push(element?.gstInPercentage);
      this.response.push(element?.baseAmount);
      this.response.push(element?.fees);
      this.response.push(element?.mode);
      this.response.push(element?.gstType)
 
      if (element?.status == 'true') {
        this.response.push("Active");
      }
      else {
        this.response.push("Inactive");
      }
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
    const title = 'Withdrawal Fee';
    const header = [
      "S.No",
      "Amount Range",
      "GST",
      "Fee",
      "Total Fee",
      "Mode",
      "Gst Type",
      "Status",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At"
    ]
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Facheck');
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Times New Roman', family: 4, size: 16, bold: true };
 
 
    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
 
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
    }
    );
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Withdrawal.xlsx');
    });
  }
 
  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: StatusWithdrawal = {
      withrawalStatus: this.isChecked ? true : false,
    };
    this.service.statuswithdrawals(id, submitModel).subscribe((res: any) => {
      
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  add() {

    this.dialog.open(AddwithdrawalComponent, {
      width: '90vw',
      maxWidth: '570px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
  Edit(id: string) {
    this.dialog.open(EditwithdrawalComponent, {
      width: '90vw',
      maxWidth: '570px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { value: id }
    });
  }

}
