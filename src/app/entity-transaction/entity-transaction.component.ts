import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';

@Component({
  selector: 'app-entity-transaction',
  templateUrl: './entity-transaction.component.html',
  styleUrl: './entity-transaction.component.css',
})
export class EntityTransactionComponent {
  valuetransaction: any;
  valuetransactionExport: any;
  valuetransactionview: any;

 
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
   'settlementId',
    'payoutId',
    'amount',
    'reference',
    'status',
    'txnItem',
    'createdAt',
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  id: any;
  showcategoryData: boolean = false;
  viewdata: any;
  details: any;
  detaislone: any;
  bankdetails: any;
  accountid: any;
  Viewall: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId');
  actions: any;
  responseDataListnew: any=[];
  response: any=[];
  AccountId: any;
  searchPerformed: boolean = false;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuetransactionExport = 'Entity View Transaction-Export';
            this.valuetransactionview = 'Entity View Transaction-View';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Transaction-Export') {
                this.valuetransactionExport = 'Entity View Transaction-Export';
              }
              if (this.actions == 'Entity View Transaction-View') {
                this.valuetransactionview = 'Entity View Transaction-View';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.service.EntityTraansaction(this.id).subscribe((res: any) => {
      if(res.flag ==1){
        this.details = res.response;
        this.dataSource = new MatTableDataSource(this.details);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
  
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
  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.details.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.pgPaymentId || element?.paymentId);
      this.response.push(element?.paidAmount);
      this.response.push(element?.paymentMethod);
      this.response.push(element?.paymentStatus);
      this.response.push(element?.orderReference);
      if(element.createdDateTime){
        this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
      }
      else{
        this.response.push('');
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
 
    const header = [
     'SNO',
    'Payment Id',
    'Amount',
    'Payment Method',
    'Payment Status',
    'Order Reference',
    'CreatedAt',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Transaction');
 
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
      };
 
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
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
 
      qty.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty1.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty2.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty3.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty4.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty5.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty6.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
     
    });
 
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
 
      FileSaver.saveAs(blob, 'Entity Transaction.xlsx');
    });
  }
 

  close() {
    this.location.back();
  }

  reload(){
    window.location.reload();
  }

}
