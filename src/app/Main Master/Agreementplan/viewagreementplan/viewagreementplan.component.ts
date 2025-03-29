import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Busineessstatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-viewagreementplan',
  templateUrl: './viewagreementplan.component.html',
  styleUrl: './viewagreementplan.component.css'
})
export class ViewagreementplanComponent {


  dataSource: any;
  displayedColumns: string[] = ["businessCategoryId", "planname", "servicefee", "mmcamount", "securitydepositamount",
    "status", "Edit", "view", "createdBy", "createdDateTime", "modifiedBy", "modifiedDateTime"]
  businesscategory: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  valueCategoryAdd: any;
  valueCategoryexport: any;
  valueCategorystatus: any;
  valueCategoryEdit: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  agreementplan: any;
  valuebussinesscreate: any;
  valuebussinessexport: any;
  valuebussinessedit: any;
  valuebussinessview: any;


  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuebussinesscreate = 'Business Plan-Add'
            this.valuebussinessexport = 'Business Plan-Export'
            this.valuebussinessedit = 'Business Plan-Edit'
            this.valuebussinessview = 'Business Plan-View'

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Business Plan-Add') {
                this.valuebussinesscreate = 'Business Plan-Add'
              }
              if (this.actions == 'Business Plan-Export') {
                this.valuebussinessexport = 'Business Plan-Export'
              }
              if (this.actions == 'Business Plan-Edit') {
                this.valuebussinessedit = 'Business Plan-Edit'
              }
              if (this.actions == 'Business Plan-View') {
                this.valuebussinessview = 'Business Plan-View'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.service.viewagreementplan().subscribe((res: any) => {
      if (res.flag == 1) {
        this.agreementplan = res.response;
        this.agreementplan.reverse();
        this.dataSource = new MatTableDataSource(this.agreementplan);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showcategoryData = false;

      }
      else {
        this.errorMsg = res.responseMessage;
        this.showcategoryData = true;
      }
    });



  }

  add() {
    this.router.navigateByUrl('/addagreementplan');
  }
  edit(id: any) {
    this.router.navigate([`/editagreementplan/${id}`], {
      queryParams: { Alldata: id },
    });

  }
  view(id: any) {
    this.router.navigate([`/allagreementplan/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  reload() {
    this.service.viewagreementplan().subscribe((res: any) => {
      if (res.flag == 1) {
        this.agreementplan = res.response;
        this.agreementplan.reverse();
        this.dataSource = new MatTableDataSource(this.agreementplan);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showcategoryData = false;

      }
      else {
        this.errorMsg = res.responseMessage;
        this.showcategoryData = true;
      }
    });

  }


   onSubmit(event: MatSlideToggleChange, id: string) {
      this.isChecked = event.checked;
      let submitModel: Busineessstatus = {
        
        status: this.isChecked ? 1 : 0,
        commercialId: id,
      };
      this.service.viewstatusagreementplan(submitModel).subscribe((res: any) => {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
        
    this.service.viewagreementplan().subscribe((res: any) => {
      if (res.flag == 1) {
        this.agreementplan = res.response;
        this.agreementplan.reverse();
        this.dataSource = new MatTableDataSource(this.agreementplan);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showcategoryData = false;

      }
      else {
        this.errorMsg = res.responseMessage;
        this.showcategoryData = true;
      }
    });
      
        }, 500);
      });
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  // onSubmit(event: MatSlideToggleChange, id: any) {
  //   this.isChecked = event.checked;

  //   let submitModel: Businessstatus = {

  //     activeStatus: this.isChecked ? 1 : 0,

  //   };

  //   this.service.Businessactive(id, submitModel).subscribe((res: any) => {

  //     this.toastr.success(res.responseMessage);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 1000);
  //   });
  // }




  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.agreementplan.forEach((element: any) => {
      // let createdate = element.createdAt;
      // this.date1 =  moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();



      this.response = [];
      this.response.push(sno);
      this.response.push(element?.planName);
      this.response.push(element?.serviceFee);

      this.response.push(element?.createdBy);
      if (element.createdAt) {
        this.response.push(moment(element?.createdAt).format('DD/MM/yyyy-hh:mm a').toString());
      }
      else {
        this.response.push('-');
      }
      this.response.push(element?.modifiedBy);

      if (element.modifiedAt) {
        this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy-hh:mm a').toString());
      }
      else {
        this.response.push('-');
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      "SNo",
      "Planname",
      "Servicefee",
      "CreatedBy",
      "CreatedDateTime",
      "ModifiedBy",
      "ModifiedDateTime"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Business Plan');
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



      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    }
    );

    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }


    workbook.xlsx.writeBuffer().then((data: any) => {

      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


      FileSaver.saveAs(blob, 'Business Plan.xlsx');

    });
  }



}
