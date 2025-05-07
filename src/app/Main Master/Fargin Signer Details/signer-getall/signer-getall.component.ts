import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { SignerAddComponent } from '../signer-add/signer-add.component';
import { SignerUpdateComponent } from '../signer-update/signer-update.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { farginstatus, UpdatesignerStatus } from '../../../fargin-model/fargin-model.module';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';

@Component({
  selector: 'app-signer-getall',
  templateUrl: './signer-getall.component.html',
  styleUrl: './signer-getall.component.css'
})
export class SignerGetallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'signAdminName',
    'signAdminEmail',
    'signAdminMobile',
    'status',
    // 'Edit',
    'createdBy',
    'createdAt',
    // 'modifiedBy',
    // 'modifiedAt'
    "View"

  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  roleId: any = sessionStorage.getItem('roleId')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  actions: any;
  errorMessage: any;
  data: any;
  valueSignerDetailsStatus: any;
  valueSignerDetailscreate: any;
  getdashboard: any;
  valueSignerDetailsHistory:any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueSignerDetailscreate = 'Signer Details-Update';
            this.valueSignerDetailsStatus = 'Signer Details-Status';
            this.valueSignerDetailsHistory = 'Signer Details-History';

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Signer Details-Update') {
                this.valueSignerDetailscreate = 'Signer Details-Update'
              }
              if (this.actions == 'Signer Details-Status') {
                this.valueSignerDetailsStatus = 'Signer Details-Status'
              }

              if (this.actions == 'Signer Details-History') {
                this.valueSignerDetailsHistory = 'Signer Details-History'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.service.signergetall().subscribe((res: any) => {
      this.data = res.response;
      this.data.reverse();
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  view(id: any) {
    this.router.navigate([`dashboard/signer-history/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  reload() {
    this.service.signergetall().subscribe((res: any) => {
      this.data = res.response;
      this.data.reverse();
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

  AddsignerDetails() {
    const dialogRef = this.dialog.open(SignerAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true
    })

    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchsignerget();
    });
  }


  fetchsignerget() {
    this.service.signergetall().subscribe((res: any) => {
      this.data = res.response;
      this.data.reverse();
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

  Edit(id: any) {
    this.dialog.open(SignerUpdateComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true,
      data: { value: id },
    })
  }

  ActiveStatus(event: MatSlideToggleChange, id: string) {
    this.isChecked = event.checked;
    let submitModel: UpdatesignerStatus = {
      activeStatus: this.isChecked ? 1 : 0,
      signId: id
    };
    this.service.signerstatus(submitModel).subscribe((res: any) => {

      if (res.flag == 1) {
        this.data = res.response;
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.service.signergetall().subscribe((res: any) => {
            this.data = res.response;
            this.data.reverse();
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;

          });
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
    this.data.forEach((element: any) => {
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let moddate = element.modifiedAt;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.signAdminName);
      this.response.push(element?.signAdminEmail);
      this.response.push(element?.signAdminMobile);
      if (element?.activeStatus == '1') {
        this.response.push('Active')
      }

      else {
        this.response.push('Inactive')
      }
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
      this.response.push(element.modifiedBy);
      this.response.push(this.date1);


      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "Sno",
      'Signer Name',
      'Signer Email',
      'Signer Mobile',
      'Signer Status',
      'createdBy',
      'createdAt',
      'modifiedBy',
      'modifiedAt'
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Signer Details');
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
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Signer details.xlsx');
    });
  }



}
