import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { Renewal } from '../../fargin-model/fargin-model.module';
import { subscribe } from 'diagnostics_channel';
import { RenewaltransactiondetailsComponent } from '../renewaltransactiondetails/renewaltransactiondetails.component';
import moment from 'moment';

@Component({
  selector: 'app-viewrenewal',
  templateUrl: './viewrenewal.component.html',
  styleUrl: './viewrenewal.component.css'
})
export class ViewrenewalComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ["sno", "pgPaymentId", "planname", "PlanType", "startDate", "endDate", "createdDateTime","paidAmount", "gstAmount", "totalPayableAmount", "paymentStatus", "view", "dues", "invoice"]
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantId: any = localStorage.getItem('merchantId')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  renewal: any;
  merchantPayId: any;
  apikey: any;
  pgModelID: any;
  transactionId: any;
  orderReference: any;
  hashKey: any;
  entityName: any;
  contactEmail: any;
  contactMobile: any;
  billingAddress: any;
  zipcode: any;
  city: any;
  stateName: any;
  secretKey: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valuerenewexport: any;
  valuerenewview: any;
  valuerenewpay: any;
  valuerenewinvoice: any;
  roleName = localStorage.getItem('roleName')
  searchPerformed: boolean = false;
  date1: any;
  date2: any;
  date3: any;


  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.service.viewrenewals(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.renewal = res.response;

        this.dataSource = new MatTableDataSource(this.renewal.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const transformedFilter = filter.trim().toLowerCase();
          const dataStr = Object.keys(data)
          .reduce((currentTerm: string, key: string) => {
            return (
              currentTerm +
              (typeof data[key] === 'object'
                ? JSON.stringify(data[key])
                : data[key])
            );
          }, '')
          .toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

      }

      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]); 
        this.dataSource = new MatTableDataSource(this.renewal.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
    if (this.roleName == 'Merchant Super admin') {
      this.valuerenewexport = 'Renewal-Export'
      this.valuerenewinvoice = 'Renewal-Invoice'
      this.valuerenewpay = 'Renewal-Pay'
      this.valuerenewview = 'Renewal-View'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Renewal-Export') {
              this.valuerenewexport = 'Renewal-Export'
            }
            if (this.actions == 'Renewal-Invoice') {
              this.valuerenewinvoice = 'Renewal-Invoice'
            }
            if (this.actions == 'Renewal-Pay') {
              this.valuerenewpay = 'Renewal-Pay'
            }
            if (this.actions == 'Renewal-View') {
              this.valuerenewview = 'Renewal-View'
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
  reload() {
    this.service.viewrenewals(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.renewal = res.response;

        this.dataSource = new MatTableDataSource(this.renewal.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const transformedFilter = filter.trim().toLowerCase();
          const dataStr = Object.keys(data)
          .reduce((currentTerm: string, key: string) => {
            return (
              currentTerm +
              (typeof data[key] === 'object'
                ? JSON.stringify(data[key])
                : data[key])
            );
          }, '')
          .toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

      }

      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]); 
        this.dataSource = new MatTableDataSource(this.renewal.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }


  exportexcel() {
 
    let sno = 1;
    this.responseDataListnew = [];
    this.renewal.forEach((element: any) => {
      let duegenerated = element.createdDateTime;
      this.date1 = moment(duegenerated).format('DD/MM/yyyy').toString();
            let startdates = element.startDate;
            this.date2 = moment(startdates).format('DD/MM/yyyy').toString();
            let enddates = element.endDate;
            this.date3 = moment(enddates).format('DD/MM/yyyy').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.pgPaymentId);
      this.response.push(element?.merchantId?.merchantPlanModel?.planName);
      this.response.push(element?.merchantId?.merchantPlanModel?.frequency );
      this.response.push(this.date2);
      this.response.push(this.date3);
      this.response.push(element?.paidAmount);
      this.response.push(element?.gstAmount);
      this.response.push(element?.totalPayableAmount)
      this.response.push(element?.paymentStatus)
      
      this.response.push(this.date1);
 
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    const header = [
    "S No",
    "PaymentId",
    "Plan Name",
     "Plan Type",
     "Start Date",
     "End Date",
     "Paid Amount",
      "Gst Amount",
       "PayableAmount",
       "PaymentStatus",
     "Due GeneratedAt",
     
    ]
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Renewal');
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
      FileSaver.saveAs(blob, 'Renewal.xlsx');
    });
  }


  view(id: any) {
    this.dialog.open(RenewaltransactiondetailsComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }

  invoice(id: any) {
    this.service.renewalinvoices(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }
  submit(id: any) {
    this.merchantPayId = id.merchantPayId
    this.entityName = id.merchantId.entityName;
    this.contactEmail = id.merchantId.contactEmail;
    this.contactMobile = id.merchantId.contactMobile;
    this.billingAddress = id.merchantId.billingAddress;
    this.zipcode = id.merchantId.zipcode;
    this.city = id.merchantId.city;

    this.stateName = id.merchantId.stateName;

    let submitModel: Renewal = {
      merchantPayId: this.merchantPayId
    };
    this.service.craeterenewals(submitModel).subscribe((res: any) => {
      this.transactionId = res.transactionId;
      if (res.flag == 1) {
        this.service.pgmodes().subscribe((res: any) => {
          this.apikey = res.response.apiKey;
          this.pgModelID = res.response.pgModeId;

          this.service.getCreateCost(this.transactionId, this.pgModelID).subscribe((res: any) => {
            this.orderReference = res.response.orderReference;
            this.service.getinitateCost(this.transactionId, this.pgModelID).subscribe((res: any) => {
              this.hashKey = res.response;
              this.router.navigate(['/dashboard/setupform'], {
                queryParams: {
                  hashkey: this.hashKey,
                  apikey: this.apikey,
                  secretKey: this.secretKey,
                  orderReference: this.orderReference,
                  firstAddress: this.billingAddress,
                  typeName: this.entityName,
                  userEmail: this.contactEmail,
                  mobileNo: this.contactMobile,
                  pincodeName: this.zipcode,
                  cityName: this.city,
                  stateName: this.stateName,
                },
              })
            });

          });
        });
      }
      else {
        this.toastr.warning(res.responseMessage);
        this.dialog.closeAll()
      }
    });
  }
}
