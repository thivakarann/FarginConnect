import { Component, ElementRef, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-overall-customer-view',
  templateUrl: './overall-customer-view.component.html',
  styleUrl: './overall-customer-view.component.css'
})
export class OverallCustomerViewComponent implements OnInit{
  dataSource!: MatTableDataSource<any>;
  responseDataListnew: any = [];
response: any = [];
date1: any;
date2: any;
  displayedColumns: string[] = [
    'customerId',
    'customerName',
    'merchantLegalName',
    'categoryName',
    'stbNumber',
    'emailAddress',
    'mobileNumber',
    'Viewcustomer',
    'flatNumber',
    'blockNumber',
    
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
    id: any;
    showcategoryData: boolean = false;
  overallcustomer: any;
  
  constructor(
    public EntityViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute:ActivatedRoute
  ) { }
  
  ngOnInit(): void {

    this.EntityViewall.OverallCustomer().subscribe((res: any) => {
      if(res.flag==1){
        this.overallcustomer = res.response;
        this.overallcustomer.reverse();
        this.dataSource = new MatTableDataSource(this.overallcustomer);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.viewall); 
         this.showcategoryData = false;
      }
      else{
        this.showcategoryData = true;
      }
    
    });

  }

  Viewparticularcustomer(id:any){
    this.router.navigate([`dashboard/Overall-IndividualCustomer-view/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }
  
  
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}



exportexcel() {
  console.log('check');
  let sno = 1;
  this.responseDataListnew = [];
  this.viewall.forEach((element: any) => {
    // let createdate = element.createdDateTime;
    // this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

    // let moddate = element.modifiedDateTime;
    // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();

    this.response = [];
    this.response.push(sno);
    this.response.push(element?.customerName);
    this.response.push(element?.merchantId?.merchantLegalName);
    this.response.push(element?.merchantId?.businessCategoryModel?.categoryName);
    this.response.push(element?.emailAddress);
    this.response.push(element?.mobileNumber);
    this.response.push(element?.flatNumber);
    this.response.push(element?.blockNumber);
    this.response.push(element?.stbNumber);


    sno++;
    this.responseDataListnew.push(this.response);
  });
  this.excelexportCustomer();
}

excelexportCustomer() {
  // const title='Business Category';
  const header = [
  'customerId',
  'customerName',
  'merchantLegalName',
  'categoryName',
  'emailAddress',
  'mobileNumber',
  'flatNumber',
  'blockNumber',
  'stbNumber'
  ]


  const data = this.responseDataListnew;
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet('customer view');
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
    let qty7 = row.getCell(8);
    let qty8 = row.getCell(9);
 



    qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
 

  }
  );

  // worksheet.getColumn(1).protection = { locked: true, hidden: true }
  // worksheet.getColumn(2).protection = { locked: true, hidden: true }
  // worksheet.getColumn(3).protection = { locked: true, hidden: true }


  workbook.xlsx.writeBuffer().then((data: any) => {

    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


    FileSaver.saveAs(blob, 'Customer View.xlsx');

  });
}

  
}
