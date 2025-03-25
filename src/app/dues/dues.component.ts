import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { DuesViewComponent } from './dues-view/dues-view.component';
import { MatDialog } from '@angular/material/dialog';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-dues',
  templateUrl: './dues.component.html',
  styleUrl: './dues.component.css'
})
export class DuesComponent {
  responseDataListnew: any = [];
  response: any = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Id',
    'legalname',
    'plan',
    'Category',
    'planamount',
    'paidamount',
    'method',
    'status',
    'view',
    'receipt',
    'paymentAt',
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
  duesValue: any;
  valueentityexport: any;
  valueduesview: any;
  valueduesreceipt: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
valuegeneratedues: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {


    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueentityexport = 'Entity Dues-Export';
            this.valueduesview = 'Entity Dues-View'
            this.valueduesreceipt = 'Entity Dues-Receipt'
            this.valuegeneratedues='Entity Dues-Genarate'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity Dues-Export') {
                this.valueentityexport = 'Entity Dues-Export'
              }
              if (this.actions == 'Entity Dues-View') {
                this.valueduesview = 'Entity Dues-View'
              }
              if (this.actions == 'Entity Dues-Receipt') {
                this.valueduesreceipt = 'Entity Dues-Receipt'
              }
              if(this.actions=='Entity Dues-Genarate'){
                this.valuegeneratedues='Entity Dues-Genarate'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    // this.service.DuesGenerate().subscribe((res: any) => {
    //   this.duesValue = res.response;
    
    // })


    this.service.DuesViewAll().subscribe((res: any) => {
      this.details = res.response;
      this.details.reverse();
      
      this.dataSource = new MatTableDataSource(this.details);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
   
  }



  reload(){
    window.location.reload()
  }

  close() {
    this.location.back()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewDues(id: any) {
    this.dialog.open(DuesViewComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        value: id,
      }
    });

  }

  // generate() {
  //   this.service.DuesGenerate().subscribe((res: any) => {
  //     this.duesValue = res.response;
    
  //   })
  // }

  exportexcel() {
    
    let sno = 1;
    this.responseDataListnew = [];
    this.details.forEach((element: any) => {
      let createdate = element.createdDateTime;
      // this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let moddate = element.modifiedDateTime;
      // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.merchantId?.merchantLegalName);
      this.response.push(element?.merchantId.merchantPlanModel.planName);
      this.response.push(element?.merchantId.businessCategoryModel.categoryName);
      this.response.push(element?.merchantId.merchantPlanModel.maintenanceAmount);
      this.response.push(element?.totalPayableAmount);
      this.response.push(element?.paymentMethod);
      this.response.push(element?.paymentStatus);
      this.response.push(element?.paymentDateTime);



      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      'Id',
      'Merchant Name',
      'Merchant plan',
      'Category',
      'planamount',
      'paidamount',
      'method',
      'status',
      'paymentAt',
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Payment Dues');
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


      FileSaver.saveAs(blob, 'Payment Dues.xlsx');

    });
  }


  viewreciept(id: any) {
    

    this.service.MaintenanceReciept(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }
}
