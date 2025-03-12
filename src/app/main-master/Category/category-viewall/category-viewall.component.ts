import { Component, ViewChild } from '@angular/core';
import { categoryActiveStatus } from '../../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
  selector: 'app-category-viewall',
  templateUrl: './category-viewall.component.html',
  styleUrl: './category-viewall.component.css'
})
export class CategoryViewallComponent {
  dataSource: any;
  displayedColumns: string[] = [
    "sno",
    "service",
    "inventoryStock",
    "status",
    'Customers',
    'Stock History',
    "action",


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
  valuecateadd: any;
  valuecateStatus: any;
  valuecateAction: any;
  searchPerformed: boolean = false;
  valuecustomerhistory: any;
  valueStockHistory: any;
 

  constructor(private router: Router, private service: FarginServiceService, private dialog: MatDialog, private toastr: ToastrService) { }
  ngOnInit(): void {

    if (this.roleName == 'Merchant Super admin') {
      this.valuecateadd = 'Stock-Add';
      this.valuecateAction = 'Stock-Edit';
      this.valuecateStatus = 'Stock-Status';
      this.valuecustomerhistory =  'Stock-CustomerHistory';
      this.valueStockHistory = 'Stock-StockHistory';


    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions
            if (this.actions == 'Stock-Add') {
              this.valuecateadd = 'Stock-Add'
            }
            if (this.actions == 'Stock-Edit') {
              this.valuecateAction = 'Stock-Edit'
            }
            if (this.actions == 'Stock-Status') {
              this.valuecateStatus = 'Stock-Status'
            }

            if (this.actions == 'Stock-CustomerHistory') {
              this.valuecustomerhistory = 'Stock-CustomerHistory'
            }

            if (this.actions == 'Stock-StockHistory') {
              this.valueStockHistory = 'Stock-StockHistory'
            }
          }
        }

      })
    }

    this.service.ViewCategoryByMerchant(this.merchantid).subscribe((res: any) => {
      if (res.flag == 1) {
        this.pinvalue = res.response;
        this.dataSource = new MatTableDataSource(this.pinvalue?.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.pinvalue.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    })



  }

  reload() {
    this.service.ViewCategoryByMerchant(this.merchantid).subscribe((res: any) => {
      if (res.flag == 1) {
        this.pinvalue = res.response;
        this.dataSource = new MatTableDataSource(this.pinvalue?.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.pinvalue.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    })

  }



  CustomerHistory(id:any){
    this.router.navigate([`dashboard/stock-customer-history/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  StockHistory(id:any){
    this.router.navigate([`dashboard/stock-history/${id}`], {
      queryParams: { Alldata: id },
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

  create() {
    this.dialog.open(AddCategoryComponent, {
      // data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.ViewCategoryByMerchant(this.merchantid).subscribe((res: any) => {
        if (res.flag == 1) {
          this.pinvalue = res.response;
          this.dataSource = new MatTableDataSource(this.pinvalue?.reverse())
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

        else if (res.flag == 2) {
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.pinvalue.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }

      })

    })
  }

  edit(id: any, data: any) {
    this.dialog.open(UpdateCategoryComponent, {
      data: {
        value: id,
        value1: data
      },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.ViewCategoryByMerchant(this.merchantid).subscribe((res: any) => {
        if (res.flag == 1) {
          this.pinvalue = res.response;
          this.dataSource = new MatTableDataSource(this.pinvalue?.reverse())
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

        else if (res.flag == 2) {
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.pinvalue.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }

      })
    })
  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {

    this.isChecked = event.checked;

    let submitModel: categoryActiveStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.CategoryActiveStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.service.ViewCategoryByMerchant(this.merchantid).subscribe((res: any) => {
            if (res.flag == 1) {
              this.pinvalue = res.response;
              this.dataSource = new MatTableDataSource(this.pinvalue?.reverse())
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }

            else if (res.flag == 2) {
              this.dataSource = new MatTableDataSource([]);
              this.dataSource = new MatTableDataSource(this.pinvalue.reverse());
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }

          })
        }, 500);

      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

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
      this.response.push(element?.merchantPincode?.pincodeNumber);
      this.response.push(element?.areaName);
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
      "Pincode",
      "Area",
      "Status",
      'CreatedAt',
      'CreatedBy',
      'ModifyAt',
      'ModifyBy'

    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Area Reports');
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
      FileSaver.saveAs(blob, 'Area Reports.xlsx');
    });
  }
}
