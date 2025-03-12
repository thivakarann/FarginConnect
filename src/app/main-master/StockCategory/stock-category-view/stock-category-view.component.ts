import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportReportsAddComponent } from '../../../ExportReports/export-reports-add/export-reports-add.component';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { StockCategoryAddComponent } from '../stock-category-add/stock-category-add.component';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StockCategoryEditComponent } from '../stock-category-edit/stock-category-edit.component';
import moment from 'moment';

@Component({
  selector: 'app-stock-category-view',
  templateUrl: './stock-category-view.component.html',
  styleUrl: './stock-category-view.component.css'
})
export class StockCategoryViewComponent  implements OnInit{
  dataSource: any;
  displayedColumns: string[] = [
    'inventoryNameId',
    'inventoryName',
    'status',
    'edit',
    'createdBy',
    'createdAt',
    'modifiedBy',
    'modifiedAt'

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
  valuesmsadd: any;
  valuesmsstatus: any;
  valuesmsedit: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  merchantId: any = localStorage.getItem('merchantId');
  actions: any;
  errorMessage: any;
  download:any;status:any;
  searchPerformed: boolean=false;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.service.StockCategoryGet(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
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
        this.dataSource = new MatTableDataSource(this.viewall.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    });

  }

  Addstockcategory() {
    this.dialog.open(StockCategoryAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.StockCategoryGet(this.merchantId).subscribe((res: any) => {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });  
    })
  }
  
  update(id:any){
    this.dialog.open(StockCategoryEditComponent, {
      data: {
        value: id
      },
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true
      
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.StockCategoryGet(this.merchantId).subscribe((res: any) => {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });  
    })
  }


  reload() {
    this.service.StockCategoryGet(this.merchantId).subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

  
  onSubmit(event: MatSlideToggleChange, id: any) {
    const status = event.checked ? 1 : 0;  // Determine the activeStatus based on the checked state
    
    this.service.StockCategoryStatus(id, status).subscribe((res: any) => {
      this.toastr.success(res.responseMessage); 
  
      setTimeout(() => {
        this.service.StockCategoryGet(this.merchantId).subscribe((res: any) => {
          this.viewall = res.response;
          this.viewall.reverse();
          this.dataSource = new MatTableDataSource(this.viewall);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      }, 1000);
    });
  }
  
  
  
  

    exportexcel() {
  
      let sno = 1;
      this.responseDataListnew = [];
      this.viewall.forEach((element: any) => {
        
        // let createdate = element.createdAt;
        // this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();

        // let modifydate = element.modifiedAt;
        // this.date1 = moment(modifydate).format('DD/MM/yyyy hh:mm a').toString();

        this.response = [];
        this.response.push(sno);
        this.response.push(element?.inventoryName);
        if (element.status == 1) {
          this.response.push('Active')
        }
        else {
          this.response.push('Inactive')
        }
        this.response.push(element?.createdBy);
        // this.response.push(this.date1 || '--');
        if (element?.createdAt) {
          let createdate = element?.createdAt;
          this.date1 = moment(createdate).format('yyyy-MM-DD hh:mm a').toString();
          this.response.push(this.date1);
        }
        else {
          this.response.push('');
        }

        this.response.push(element?.modifiedBy);

        if (element?.modifiedAt) {
          let modifydate = element?.modifiedAt;
          this.date2 = moment(modifydate).format('yyyy-MM-DD hh:mm a').toString();
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
  
      const header = [
        "S.No",
        "Inventory Name",
        "Status",
        "Created By",
        "Created At",
        "Modified By",
        "Modified At"
      ]
  
  
      const data = this.responseDataListnew;
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Stock Category');
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
        // let qty7 = row.getCell(8);
  
  
        qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        // qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  
  
  
      }
      );
    
      workbook.xlsx.writeBuffer().then((data: any) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob, 'Stock Category.xlsx');
      });
    }


}

