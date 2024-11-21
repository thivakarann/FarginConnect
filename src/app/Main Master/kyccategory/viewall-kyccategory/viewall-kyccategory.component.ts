import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddKyccategoryComponent } from '../add-kyccategory/add-kyccategory.component';
import { EditKyccategoryComponent } from '../edit-kyccategory/edit-kyccategory.component';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';
import { kyccateforysts } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-viewall-kyccategory',
  templateUrl: './viewall-kyccategory.component.html',
  styleUrl: './viewall-kyccategory.component.css'
})
export class ViewallKyccategoryComponent implements OnInit {
  categoryview: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  dataSource: any;
  displayedColumns: string[] = ['kycCategoryId', 'kycCategoryName', 'status', 'Edit', 'createdBy', 'createdAt', 'modifiedBy', 'modifiedAt']
  responseDataListnew: any;
  response: any;
  date2: any;
  date1: any;
  valuekycadd: any;
  valuekycexport: any;
  valuekycstatus: any;
  valuekycedit: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }
  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuekycadd = 'Business Document Type-Add';
            this.valuekycexport = 'Business Document Type-Export';
            this.valuekycedit = 'Business Document Type-Edit'
            this.valuekycstatus = 'Business Document Type-Status'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Business Document Type-Add') {
                this.valuekycadd = 'Business Document Type-Add';
              }
              if (this.actions == 'Business Document Type-Export') {
                this.valuekycexport = 'Business Document Type-Export'
              }
              if (this.actions == 'Business Document Type-Edit') {
                this.valuekycedit = 'Business Document Type-Edit'
              }
              if (this.actions == 'Business Document Type-Status') {
                this.valuekycstatus = 'Business Document Type-Status'
              }
            }
          }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });



    this.service.viewallkycCategory().subscribe((res: any) => {
      this.categoryview = res.response;

      this.dataSource = new MatTableDataSource(this.categoryview.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })



  }
  onSubmit(event: MatSlideToggleChange, id: string) {
    this.isChecked = event.checked;
    let submitModel: kyccateforysts = {
      kycCategoryId: id,
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.statuskycCategory(submitModel).subscribe((res: any) => {
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  create() {
    this.dialog.open(AddKyccategoryComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
    });
  }

  Edit(id: string) {
    this.dialog.open(EditKyccategoryComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { value: id },
      disableClose: true
    });
  }


  reload() {
    window.location.reload()
  }
  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.categoryview.forEach((element: any) => {
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.kycCategoryName);
      if (element?.activeStatus == 1) {

        this.response.push('Active')

      }

      else {

        this.response.push('InActive')

      }


      this.response.push(element?.createdBy);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);

      if (element?.modifiedAt) {
        this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy-hh:mm a').toString());
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
      "Document Type",
      "Status",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At",
    ]
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('KYC Category');
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
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    }
    );
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Business Documents.xlsx');
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}