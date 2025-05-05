import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MerchantPlanAddComponent } from '../merchant-plan-add/merchant-plan-add.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MerchantPlanStatus } from '../../fargin-model/fargin-model.module';
import { EditMerchantPlanComponent } from '../edit-merchant-plan/edit-merchant-plan.component';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-merchant-plan-viewall',
  templateUrl: './merchant-plan-viewall.component.html',
  styleUrl: './merchant-plan-viewall.component.css'
})
export class MerchantPlanViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'merchantPlanId',
    'planName',
    'countLimit',
    'activeStatus',
    'Edit',
    'serviceAmount',
    'renewalAmount',
    'maintenanceAmount',
    'voiceBoxSetupFee',
    'voiceBoxAdvRent',
    'frequency',
    'createdBy',
    'createdDateTime',
    'modifiedBy',
    'modifiedDateTime',
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
  valueMerchantAdd: any;
  valueMerchantExport: any;
  valueMerchantStatus: any;
  valueMerchantEdit: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  searchPerformed: boolean = false;

  constructor(
    public Merchantplanviewall: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.Merchantplanviewall.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueMerchantAdd = 'Entity Plan-Add';
            this.valueMerchantEdit = 'Entity Plan-Edit'
            this.valueMerchantExport = 'Entity Plan-Export'
            this.valueMerchantStatus = 'Entity Plan-Status'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'Entity Plan-Add') {
                this.valueMerchantAdd = 'Entity Plan-Add';
              }
              if (this.actions == 'Entity Plan-Edit') {
                this.valueMerchantEdit = 'Entity Plan-Edit'
              }
              if (this.actions == 'Entity Plan-Export') {
                this.valueMerchantExport = 'Entity Plan-Export'
              }
              if (this.actions == 'Entity Plan-Status') {
                this.valueMerchantStatus = 'Entity Plan-Status'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.Merchantplanviewall.merchantplanviewall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };

      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }


    });

  }

  Add() {
    const dialogRef = this.dialog.open(MerchantPlanAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      disableClose: true
    })

    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchmerchantplan();
    });
  }

  fetchmerchantplan() {
    this.Merchantplanviewall.merchantplanviewall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };

      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }


    });
  }

  reload() {
    this.Merchantplanviewall.merchantplanviewall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };

      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }


    });
  }

  Edit(id: any) {
    const dialogRef = this.dialog.open(EditMerchantPlanComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "1000ms",
      data: { value: id },
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchmerchantplan();
    });
  }


  ActiveStatus(event: MatSlideToggleChange, id: any) {

    this.isChecked = event.checked;

    let submitModel: MerchantPlanStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.Merchantplanviewall.merchantplanstatus(id, submitModel).subscribe((res: any) => {

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.Merchantplanviewall.merchantplanviewall().subscribe((res: any) => {
            if (res.flag == 1) {
              this.viewall = res.response;
              this.viewall.reverse();
              this.dataSource = new MatTableDataSource(this.viewall);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };

            }
            else if (res.flag == 2) {
              this.viewall = [];
              this.viewall.reverse();
              this.dataSource = new MatTableDataSource(this.viewall);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }


          });

        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
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
    this.viewall.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.planName);
      this.response.push(element?.countLimit);
      if (element?.activeStatus == 1) {
        this.response.push("Active");
      }
      else {
        this.response.push("InActive");
      }
      this.response.push(element?.technicalAmount);
      this.response.push(element?.renewalAmount);
      this.response.push(element?.maintenanceAmount);
      this.response.push(element?.voiceBoxSetupFee);
      this.response.push(element?.voiceBoxAdvRent);

      if (element?.frequency == 'Day') {
        this.response.push("Daily");
      }
      else if (element?.frequency == 'Week') {
        this.response.push("Weekly");
      }
      else if (element?.frequency == 'Month') {
        this.response.push("Monthly");
      }
      else if (element?.frequency == 'Quarterly') {
        this.response.push("Quarterly");
      }
      else if (element?.frequency == 'Half Yearly') {
        this.response.push("Half-Yearly");
      }
      else if (element?.frequency == 'Year') {
        this.response.push("Yearly");
      }



      this.response.push(element?.createdBy);

      if (element?.createdDateTime) {
        this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy-hh:mm a').toString());
      }
      else {
        this.response.push('');
      }
      this.response.push(element?.modifiedBy);

      if (element?.modifiedDateTime) {
        this.response.push(moment(element?.modifiedDateTime).format('DD/MM/yyyy-hh:mm a').toString());
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
      "PlanName",
      "Customer Onboard Limit",
      "Plan Status",
      "One-Time Setup Fee",
      "Yearly Renewal Fee",
      "Cloud Fee",
      "Voice Box Setup Fee",
      "Voice Box Rent",
      "Cloud Fee Frequency",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At"










    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Merchant Plan Details');
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
      let qty10 = row.getCell(11);
      let qty11 = row.getCell(12);
      let qty12 = row.getCell(13);
      let qty13 = row.getCell(14);







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
      qty11.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty12.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty13.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Entity Plans.xlsx');
    });
  }

}


