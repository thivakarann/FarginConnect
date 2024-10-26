import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Alcartstatus } from '../../../fargin-model/fargin-model.module';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';

@Component({
  selector: 'app-alacarte-viewall',
  templateUrl: './alacarte-viewall.component.html',
  styleUrl: './alacarte-viewall.component.css'
})
export class AlacarteViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'alcotId',
    'channelName',
    'type',
    'price',
    // 'language',
    // 'generic',
    'alcotStatus',
    'View',
    'Edit',
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
  valuealcartAdd: any;
  valuealcartExport: any;
  valuealcartStatus: any;
  valuealcartView: any;
  valuealcartEdit: any;

  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;

  constructor(
    public AllcartViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {

    this.AllcartViewall.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuealcartAdd = 'Channel Creation-Add';
            this.valuealcartEdit = 'Channel Creation-Edit';
            this.valuealcartExport = 'Channel Creation-Export'
            this.valuealcartStatus = 'Channel Creation-Status'
            this.valuealcartView = 'Channel Creation-View'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'Channel Creation-Add') {
                this.valuealcartAdd = 'Channel Creation-Add';
              }
              if (this.actions == 'Channel Creation-Edit') {
                this.valuealcartEdit = 'Channel Creation-Edit';
              }
              if (this.actions == 'Channel Creation-Export') {
                this.valuealcartExport = 'Channel Creation-Export';
              }
              if (this.actions == 'Channel Creation-View') {
                this.valuealcartView = 'Channel Creation-View'
              }
              if (this.actions == 'Channel Creation-Status') {
                this.valuealcartStatus = 'Channel Creation-Status';
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.AllcartViewall.Alcartviewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.viewall);
    });
 

  }


  reload() {
    window.location.reload()
  }



  add() {
    this.router.navigateByUrl('dashboard/alcart-add');
  }



  Viewdata(id: any) {
    this.router.navigate([`dashboard/alcart-view/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }

  Edit(id: any) {
    this.router.navigate([`dashboard/alcart-edit/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {
    console.log(id)
    this.isChecked = event.checked;

    let submitModel: Alcartstatus = {
      alcotId: id,
      alcotStatus: this.isChecked ? 1 : 0,
    };
    this.AllcartViewall.AlcardStatus(submitModel).subscribe((res: any) => {
      console.log(res);
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        window.location.reload();
      }
      else {
        this.toastr.error(res.responseMessage);
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

  exportexcel() {
    console.log('check');
    let sno = 1;
    this.responseDataListnew = [];
    this.viewall.forEach((element: any) => {
 
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.channelName);
      if (element.alcotStatus == 1) {
        this.response.push('Paid')
      }
      else {
        this.response.push('Free')
      }
      this.response.push(element?.price)
 
      if (element.alcotStatus == 1) {
        this.response.push('Active')
      }
      else {
        this.response.push('Inactive')
      }
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);
   
      if(element?.modifiedAt){
        this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy-hh:mm a').toString());
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
    // const title='Business Category';
    const header = [
      "S.No",
      "Channel Name",
      "Channel Type",
      "Price",
      "Channel Status",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At",
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('A-LA-CARTE Details');
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
      // let qty9 = row.getCell(10);
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
 
    }
    );
 
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'A-LA-CARTE Details.xlsx');
 
    });
  }


}






