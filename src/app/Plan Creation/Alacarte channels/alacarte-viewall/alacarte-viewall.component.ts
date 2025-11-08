import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Alcartstatus, Payload } from '../../../fargin-model/fargin-model.module';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AlacarteUploadbulkComponent } from '../alacarte-uploadbulk/alacarte-uploadbulk.component';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

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
    'channelNo',
    'Broadcaster',
    'msos',
    'region',
    'generic',
    'language',
    'type',
    'price',
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
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;
  valuealcartHistory: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  viewallexport: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  filter: boolean = true;
  currentfilval: any;
  currentfilvalShow!: boolean
  viewalls: any;
  searchPerformed: boolean = false;
  valueDownload: any;
  valueUpload: any;
  Uploadstatus: any;
  Roledetails: any;

  constructor(
    public AllcartViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
  ) { }
  ngOnInit(): void {

    this.Role();

    this.AllcartViewall.Alcartviewall(this.pageSize, this.pageIndex).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.viewall = res.response.content;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.viewall);
          this.currentfilvalShow = false
        } else if (res.flag == 2) {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall);
          this.currentfilvalShow = false
        }
      }
    );
  }

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.AllcartViewall.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valuealcartAdd = 'Channel Creation-Add';
            this.valuealcartEdit = 'Channel Creation-Edit';
            this.valuealcartExport = 'Channel Creation-Export';
            this.valuealcartStatus = 'Channel Creation-Status';
            this.valuealcartView = 'Channel Creation-View';
            this.valuealcartHistory = 'Channel Creation-History';
            this.valueDownload = 'Download A-LA-CARTE Template';
            this.valueUpload = 'Upload A-LA-CARTE File';
            this.Uploadstatus = 'Bulk Upload Status';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;


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
              if (this.actions == 'Channel Creation-History') {
                this.valuealcartHistory = 'Channel Creation-History';
              }
              if (this.actions == 'Download A-LA-CARTE Template') {
                this.valueDownload = 'Download A-LA-CARTE Template';
              }
              if (this.actions == 'Upload A-LA-CARTE File') {
                this.valueUpload = 'Upload A-LA-CARTE File';
              }
              if (this.actions == 'Bulk Upload Status') {
                this.Uploadstatus = 'Bulk Upload Status';
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
  }





  reload() {
    this.AllcartViewall.Alcartviewall(this.pageSize, this.pageIndex).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.viewall = res.response.content;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.viewall);
          this.currentfilvalShow = false
        } else if (res.flag == 2) {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall);
          this.currentfilvalShow = false
        }
      }
    );
  }



  add() {
    this.router.navigateByUrl('dashboard/alcart-add');
  }



  Viewdata(id: any) {
    this.router.navigate([`dashboard/alcart-view/${id}`], {
      queryParams: { Alldata: id },
    });

  }

  Edit(id: any) {
    this.router.navigate([`dashboard/alcart-edit/${id}`], {
      queryParams: { Alldata: id },
    });

  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {

    this.isChecked = event.checked;

    let submitModel: Alcartstatus = {
      alcotId: id,
      alcotStatus: this.isChecked ? 1 : 0,
    };
    this.AllcartViewall.AlcardStatus(submitModel).subscribe((res: any) => {

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.AllcartViewall.Alcartviewall(
            this.pageSize,
            this.pageIndex
          ).subscribe((res: any) => {
            if (res.flag == 1) {
              this.viewall = res.response.content;
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.dataSource = new MatTableDataSource(this.viewall);
              this.currentfilvalShow = false

            } else if (res.flag == 2) {
              this.viewall = [];
              this.dataSource = new MatTableDataSource(this.viewall);
              this.currentfilvalShow = false

            }

          });

        }, 500);
      } else {
        this.toastr.error(res.responseMessage);
      }

    });

  }



  exportexcel() {
    this.AllcartViewall.AlcartviewallExport().subscribe((res: any) => {
      this.viewallexport = res.response;
      if (res?.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.viewallexport.forEach((element: any) => {

          let createdate = element.createdAt;
          this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

          this.response = [];
          this.response.push(sno);
          this.response.push(element?.channelName);
          this.response.push(element?.channelNo);
          this.response.push(element?.bundleChannelId?.broadCasterName);
          this.response.push(element?.region?.service?.serviceProviderName);
          this.response.push(element?.region?.stateName);
          this.response.push(element?.generic);
          this.response.push(element?.language);

          if (element.type == 1) {
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
    });

  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "Channel Name",
      "Channel No",
      "Broadcaster",
      "Service Provider Name",
      "Region",
      "Generic",
      "Language",
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
      let qty14 = row.getCell(15);
      // let qty15 = row.getCell(16);
      // let qty16 = row.getCell(16);

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
      qty14.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty15.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty16.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

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
  alacartehistory() {
    this.router.navigateByUrl('dashboard/alcot-history')
  }



  Alacarte(filterValue: string) {
    if (filterValue) {
      this.AllcartViewall.AlcotSearch(
        filterValue,
        this.pageSize,
        this.pageIndex
      ).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.viewalls = res.response;

            this.dataSource = new MatTableDataSource(this.viewalls);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true

          } else if (res.flag === 2) {
            this.viewalls = [];
            this.dataSource = new MatTableDataSource(this.viewalls);

            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true

          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    } else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }


  getData(event: any) {
    if (this.currentfilvalShow) {
      this.AllcartViewall.AlcotSearch(
        this.currentfilval,
        event.pageSize,
        event.pageIndex
      ).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.viewalls = res.response;
            this.dataSource = new MatTableDataSource(this.viewalls);

            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;


          } else if (res.flag === 2) {
            this.viewalls = [];
            this.dataSource = new MatTableDataSource(this.viewalls);

            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;


          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    } else {
      this.AllcartViewall.Alcartviewall(
        event.pageSize,
        event.pageIndex
      ).subscribe((res: any) => {
        if (res.flag === 1) {
          this.viewall = res.response.content;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.viewall);

        } else {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
      });
    }
  }

  excel() {
    const header = [
      'broadCasterName',
      'serviceProviderName',
      'regionName',
      'channelName',
      'channelNo',
      'generic',
      'language',
      'channelType',
      'price',
    ];

    const data = this.responseDataListnew;

    // Prepare CSV content
    const csvContent = [];

    // Add header to CSV
    csvContent.push(header.map((item) => `"${item}"`).join(','));

    data.forEach((d: any) => {
      const rowData = [
        `"${d.broadCasterName}"` || '',
        `"${d.serviceProviderName}"` || '',
        `"${d.regionName}"` || '',
        `"${d.channelName}"` || '',
        `"${d.channelNo}"` || '',
        `"${d.generic}"` || '',
        `"${d.language}"` || '',
        `"${d.channelType}"` || '',
        d.price || '',

        // Add any other fields as needed
      ].map((item) => `"${item.replace(/"/g, '""')}"`); // Escape double quotes

      csvContent.push(rowData.join(','));
    });

    // Create a Blob and save as CSV
    const blob = new Blob([csvContent.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    FileSaver.saveAs(blob, 'A-LA-CARTE.csv');
  }

  createalacrateupload() {
    const dialogRef = this.dialog.open(AlacarteUploadbulkComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      position: { right: '0px' },

      width: '35%',
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetch();
    });
  }
  fetch() {
    this.AllcartViewall.Alcartviewall(this.pageSize, this.pageIndex).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.viewall = res.response.content;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.viewall);
          this.currentfilvalShow = false;
        } else if (res.flag == 2) {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall);
          this.currentfilvalShow = false;
        }
      }
    );
  }
  status() {
    this.router.navigateByUrl('dashboard/alacarte-bulkresponse');
  }


}
