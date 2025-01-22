import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SmsapprovalComponent } from './smsapproval/smsapproval.component';
import { SmsviewhistoryComponent } from '../smsviewhistory/smsviewhistory.component';
import { ActiveSms } from '../../fargin-model/fargin-model.module';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-viewsms',
  templateUrl: './viewsms.component.html',
  styleUrl: './viewsms.component.css'
})
export class ViewsmsComponent {
  dataSource: any;
  displayedColumns: string[] = ["sno", "smsTitle", "smsTempDescription", "approval", "status", "approveststatus", "viewstatus"]
  businesscategory: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantId: any = localStorage.getItem('merchantId')
  fullname: any = localStorage.getItem('fullname')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  viewsms: any;
  isChecked: any;
  merchantsmsId: any;
  id: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valuessmsstatus: any;
  valuessmsapproval: any;
  valuessmsaview: any;
  roleName = localStorage.getItem('roleName')
  valuessmsexport:any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }

  ngOnInit() {

    if (this.roleName == 'Merchant Super admin') {
      this.valuessmsapproval = 'SMS Service-Approval'
      this.valuessmsaview = 'SMS Service-View'
      this.valuessmsexport = 'SMS Service-Export'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;


          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions
            if (this.actions == 'SMS Service-Approval') {
              this.valuessmsapproval = 'SMS Service-Approval'
            }
            if (this.actions == 'SMS Service-View') {
              this.valuessmsaview = 'SMS Service-View'
            }
            // if (this.actions == 'SMS Service-Status') {
            //   this.valuessmsstatus = 'SMS Service-Status'
            // }

            if (this.actions == 'SMS Service-Export') {
              this.valuessmsexport = 'SMS Service-Export'
            }


          }
        }
      })
    }


    this.service.viewmerchantssms(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewsms = res.response;
        this.viewsms.reverse();
        this.dataSource = new MatTableDataSource(this.viewsms);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };

        this.showcategoryData = false;

      }
      else {
        this.errorMsg = res.responseMessage;
        this.showcategoryData = true;
      }
    });
 

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;

    let submitModel: ActiveSms = {
      smsStatus: this.isChecked ? 1 : 0,
      modifedBy: this.fullname

    };

    this.service.updateactivesstatus(id, submitModel).subscribe((res: any) => {

      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
  SmsApproval(id: any) {
    this.dialog.open(SmsapprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.viewmerchantssms(this.merchantId).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewsms = res.response;
          this.viewsms.reverse();
          this.dataSource = new MatTableDataSource(this.viewsms);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
  
          this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
  
          this.showcategoryData = false;
  
        }
        else {
          this.errorMsg = res.responseMessage;
          this.showcategoryData = true;
        }
      });
   
    })

  }
  ViewMerchantSms(id: any) {
    this.merchantsmsId = id;
    this.dialog.open(SmsviewhistoryComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: this.id,
        value1: this.merchantsmsId
      }
    })
  }

  reload() {
    window.location.reload()
  }


  exportexcel() {
 
    let sno = 1;
    this.responseDataListnew = [];
    this.viewsms.forEach((element: any) => {
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.type?.smsTitle);
      this.response.push(element?.type?.smsTempDescription);
      // if (element.activeStatus == 1) {
      //   this.response.push('Active')
      // }
      // else {
      //   this.response.push('InActive')
      // }
 
      if (element.smsApprovalStatus == 'approved' ) {
        this.response.push('Approved')
      }
      else if(element.smsApprovalStatus == 'Pending') {
        this.response.push('Pending')
      }
      else if(element.smsApprovalStatus == 'Rejected'){
        this.response.push('Rejected')
      }
 
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    const header = [
      "S.No",
      "Sms Title ",
      "Sms Description",
      "Sms Approval",
      // "Status",
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('SMS Reports');
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
      // let qty4 = row.getCell(5);
   
 
 
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
 
 
    }
    );
 
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'SMS Reports.xlsx');
 
    });
  }

}