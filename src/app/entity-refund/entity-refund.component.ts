import { Component, ElementRef, ViewChild } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { EntityOfflineviewComponent } from '../Entity Onboard/entity-offlineview/entity-offlineview.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-entity-refund',
  templateUrl: './entity-refund.component.html',
  styleUrl: './entity-refund.component.css'
})
export class EntityRefundComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["sno", "setupbox", "custname", "custmobile",  "type",  "reqid", "pgPaymentId", "paidAmount", "refund", "status", "View", "createdAt",]

  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  id: any;
  showcategoryData: boolean = false;
  transaction: any;
  responseDataListnew: any = [];
  date1: any;
  response: any = [];
  searchPerformed: boolean = false;
  errorMessage:any;
  roleId: any = sessionStorage.getItem('roleId');
  getdashboard: any[] = [];
  valueview:any;
  actions:any;
  valueexport:any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private Location: Location,
    private dialog:MatDialog
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueview = 'Entity View Refund-View'
            this.valueexport = 'Entity View Refund-Export'

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Refund-View') {
                this.valueview = 'Entity View Refund-View'
              }
              if (this.actions == 'Entity View Refund-Export') {
                this.valueexport = 'Entity View Refund-Export'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.service.Entityrefund(this.id).subscribe((res: any) => {

      this.transaction = res.response;
      this.dataSource = new MatTableDataSource(this.transaction)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }


  reload() {
    window.location.reload()
  }

  view(id: any) {
    this.dialog.open(EntityOfflineviewComponent,{
     enterAnimationDuration:"500ms",
     exitAnimationDuration:"500ms",
     data:{value:id},
     disableClose:true
    })
   }


  close() {
    this.Location.back()
  }
  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.transaction.forEach((element: any) => {
      this.response = [];
          this.response.push(sno);
          this.response.push(element?.paymentModel?.customerStbId?.stbId?.setupBoxNumber);
          this.response.push(element?.customerId?.customerName);
          this.response.push(element?.customerId?.mobileNumber);
          this.response.push(element?.typeMode);
          this.response.push(element?.requestId);
          this.response.push(element?.paymentId);
          this.response.push(element?.paymentModel?.paidAmount);
          this.response.push(element?.refundAmount);
          this.response.push(element?.refundStatus);
          if (element.createdAt) {
            this.response.push(moment(element?.createdAt).format('DD/MM/yyyy hh:mm a').toString());
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
    // const title='Entity Details';
    const header = [
      "SNo",
      "Setupbox",
      "CustomerName",
      "CustomerMobile",
      "Type",
      "Request ID",
      "Payment ID",
      "PaidAmount",
      "RefundAmount",
      "Status",
      "Requested Date"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Refunds');

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

    }
    );

    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Refunds.xlsx');
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}