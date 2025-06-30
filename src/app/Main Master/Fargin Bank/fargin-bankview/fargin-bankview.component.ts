import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FarginBankAddComponent } from '../fargin-bank-add/fargin-bank-add.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Adminstatus, farginstatus } from '../../../fargin-model/fargin-model.module';
import { FarginBankEditComponent } from '../fargin-bank-edit/fargin-bank-edit.component';

@Component({
  selector: 'app-fargin-bankview',
  templateUrl: './fargin-bankview.component.html',
  styleUrl: './fargin-bankview.component.css'
})
export class FarginBankviewComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountHolderName',
    'accountNumber',
    'bankName',
    'status',
    // 'Edit',
    'ifscCode',
    'branchName',
    'ledgerId',
    'type',
    'View',
    // 'createdBy',
    // 'createdDateTime',
    'modifiedBy',
    'modifiedDateTime'

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
  valueEntityAdd: any;
  valueEntityExport: any;
  valueEntityStatus: any;
  valueEntityView: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  unblockvalue: any;
  valueEntityUnblock: any;
  adminBankId: any;
  data: any;
  valuefarginadd: any;
  valuefarginexport: any;
  valuefarginstatus: any;
  valuefarginedit: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuefarginadd = 'Fargin bank-Add';
            this.valuefarginedit = 'Fargin bank-Edit';
            this.valuefarginexport = 'Fargin bank-Export';
            this.valuefarginstatus = 'Fargin bank-Status';

          }
          // else {
          //   for (let datas of this.getdashboard) {

          //     this.actions = datas.subPermissions;
          //     if (this.actions == 'Fargin bank-Add') {
          //       this.valuefarginadd = 'Fargin bank-Add';
          //     }
          //     if (this.actions == 'Fargin bank-Edit') {
          //       this.valuefarginedit = 'Fargin bank-Edit'
          //     }
          //     if (this.actions == 'Fargin bank-Status') {
          //       this.valuefarginstatus = 'Fargin bank-Status'
          //     }
          //     if (this.actions == 'Fargin bank-Export') {
          //       this.valuefarginexport = 'Fargin bank-Export'
          //     }

          //   }
          // }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.service.Farginview().subscribe((res: any) => {
      this.viewall = res.response.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });



  }

  AddBankDetails() {
    const dialogRef = this.dialog.open(FarginBankAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true
    })
 
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchfarginbankview();
    });
    
  };


  view(id: any) {
    this.router.navigate([`dashboard/fargin-bank-history/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  fetchfarginbankview(){
    this.service.Farginview().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

  Edit(id: any) {
    const dialogRef = this.dialog.open(FarginBankEditComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true,
      data: { value: id },
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchfarginbankview();
    });
  }

  ActiveStatus(event: MatSlideToggleChange, id: string) {
    this.adminBankId = id;

    this.isChecked = event.checked;

    let submitModel: farginstatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.Farginstatus(this.adminBankId, submitModel).subscribe((res: any) => {

      if (res.flag == 1) {
        this.data = res.response;

        this.toastr.success(res.responseMessage);
     setTimeout(() => {
      this.service.Farginview().subscribe((res: any) => {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  
      });
     }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }

  reloads() {
   
    this.service.Farginview().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });

  }

  reload() {
    window.location.reload()
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
    this.viewall.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let moddate = element.modifiedDateTime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.accountHolderName);
      this.response.push(element?.accountNumber);
      this.response.push(element?.bankName);
      if (element?.activeStatus == '1') {
        this.response.push('Active')
      }
      else {
        this.response.push('Inactive')
      }
      this.response.push(element?.ifscCode);
      this.response.push(element?.branchName);
      this.response.push(element?.ledgerId);
   
      this.response.push(element.createdBy);
    
      if (element?.createdDateTime) {
        let issuedatas = element?.createdDateTime;
        this.date2 = moment(issuedatas).format('DD/MM/yyyy hh:mm a').toString();
        this.response.push(this.date2);
      }
      else {
        this.response.push('');
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      'AccountHolderName',
      'AccountNumber',
      'BankName',
      'Status',
      'IFSCCode',
      'BranchName',
      'LedgerId',
      'Updated By',
      "Updated At"
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Fargin bank details');
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
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Fargin bank details.xlsx');
    });
  }
}
