import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { RegionAddComponent } from './region-add/region-add.component';
import { RegionEditComponent } from './region-edit/region-edit.component';
import { RegionStatus } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})
export class RegionComponent implements OnInit {


  dataSource: any;
  displayedColumns: string[] =
    [
      "regionId",
      "stateName",
      "serviceProviderName",
      "status",
      "Edit",
      "createdBy",
      "createdAt",
      "modifiedBy",
      "modifiedAt"

    ]
  region: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  regionId: any;
  regionids: any;
  regionAdd: any;
  regionexport: any;
  regionStatus: any;
  regionEdit: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;


  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.RegionGet().subscribe((res: any) => {
      this.region = res.response;
      this.region.reverse();
      this.dataSource = new MatTableDataSource(this.region);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.flag==1) {
          this.getdashboard = res.response?.subPermission;
          
          if (this.roleId == 1) {
            this.regionAdd = 'Region-Add';
            this.regionexport = 'Region-Export';
            this.regionEdit = 'Region-Edit';
            this.regionStatus = 'Region-Status';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Region-Add') {
                this.regionAdd = 'Region-Add';
              }

              if (this.actions == 'Region-Export') {
                this.regionexport = 'Region-Export';
              }

              if (this.actions == 'Region-Edit') {
                this.regionEdit = 'Region-Edit';
              }

              if (this.actions == 'Region-Status') {
                this.regionStatus = 'Region-Status';
              }
            }
          }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })

  }

  onSubmit(event: MatSlideToggleChange, id: string) {
    this.isChecked = event.checked;
    let submitModel: RegionStatus = {
      regionId: id,
      status: this.isChecked ? 1 : 0,
    };
    this.service.RegionStatus(submitModel).subscribe((res: any) => {
      console.log(res);
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }


  create() {
    this.dialog.open(RegionAddComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose:true,
    });
  }


  Edit(id: string) {
    this.dialog.open(RegionEditComponent, {
      width: '80vw',
      maxWidth: '400px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { value: id },
      disableClose:true,
    });

  }



  exportexcel() {
    console.log('check');
    let sno = 1;
    this.responseDataListnew = [];
    this.region.forEach((element: any) => {
      // let createdate = element.service?.createdAt;
      // this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      // let moddate = element.service?.modifiedAt;
      // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.service?.companyName);
      this.response.push(element?.service?.serviceProviderName);
      this.response.push(element?.service?.emailAddress);
      this.response.push(element?.service?.mobileNumber);
      this.response.push(element?.service?.location);

      if (element?.status == 1) {
        this.response.push("Active");
      }
      else {
        this.response.push("InActive");
      }

      this.response.push(element?.service?.createdBy);

      if (element?.service?.createdAt != null) {
        let createdate = element?.service?.createdAt;
        this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
        this.response.push(this.date1);
      }
      else {
        this.response.push();
      }

      this.response.push(element?.service?.modifiedBy);

      if (element?.service?.modifiedAt != null) {
        let moddate = element?.service?.modifiedAt;
        this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
        this.response.push(this.date2);
      }
      else {
        this.response.push();
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
      "Company Name",
      "Service Provider Name",
      "Email Address",
      "Mobile Number",
      "location",
      "Status",

      "createdBy",
      "createdAt",
      "modifiedBy",
      "modifiedAt",

    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Region');
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

    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }


    workbook.xlsx.writeBuffer().then((data: any) => {

      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


      FileSaver.saveAs(blob, 'Region.xlsx');

    });
  }


  cancel() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
