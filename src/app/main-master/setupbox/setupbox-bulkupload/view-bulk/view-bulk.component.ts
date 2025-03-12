import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Workbook } from 'exceljs';
import { PageEvent } from '@angular/material/paginator';

import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../../service/fargin-service.service';
import { AddSetupboxComponent } from '../../add-setupbox/add-setupbox.component';
import { CreateBulkComponent } from '../create-bulk/create-bulk.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { setupStatus } from '../../../../fargin-model/fargin-model.module';
import moment from 'moment';
import { EditSetupboxComponent } from '../../edit-setupbox/edit-setupbox.component';
import { Router } from '@angular/router';
import { StbStatusComponent } from '../stb-status/stb-status.component';

@Component({
  selector: 'app-view-bulk',
  templateUrl: './view-bulk.component.html',
  styleUrl: './view-bulk.component.css'
})
export class ViewBulkComponent implements OnInit {
  dataSource: any;
  merchantId: any = localStorage.getItem('merchantId');
  displayedColumns: any[] = ["stbId", "setupBoxNumber", "MSO", "Region", "status", "bookingStatus", "dueStatus", "UpdtaebookingStatus", "View", "STBView", "action"];
  bulkdata: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  responseDataListnew: any[] = [];
  response: any[] = []
  date1: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  channelexport: any;
  valuesetupadd: any;
  valuesetupexport: any;
  valuesetupimport: any;
  valuesetupuploadfile: any;
  valuesetupStatus: any;
  valuesetupedit: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  bulkdataexport: any;
  valuesetupbooking: any;
  valuesetupview: any;
  currentfilval: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  filter: boolean = false;
  searchPerformed: boolean = false;

  constructor(private router: Router,
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.bulkuploadViewall(this.merchantId, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.bulkdata = res.response.content;
        this.totalPages = res.pagination?.totalElements;
        this.totalpage = res.pagination?.totalPages;
        this.currentpage = res.pagination?.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.bulkdata)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filter = false;
      }
      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.bulkdata);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    })

    if (this.roleName == 'Merchant Super admin') {
      this.valuesetupadd = 'Setup Box Inventory-Add';
      this.valuesetupexport = 'Setup Box Inventory-Export';
      this.valuesetupimport = 'Setup Box Inventory-Download Template';
      this.valuesetupuploadfile = 'Setup Box Inventory-Upload File';
      this.valuesetupStatus = 'Setup Box Inventory-Status';
      this.valuesetupedit = 'Setup Box Inventory-Edit';
      this.valuesetupbooking = 'Setup Box Inventory-Update Booking Status'
      this.valuesetupview = 'Setup Box Inventory-View'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;


          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Setup Box Inventory-Add') {
              this.valuesetupadd = 'Setup Box Inventory-Add'
            }
            if (this.actions == 'Setup Box Inventory-Export') {
              this.valuesetupexport = 'Setup Box Inventory-Export'
            }
            if (this.actions == 'Setup Box Inventory-Download Template') {
              this.valuesetupimport = 'Setup Box Inventory-Download Template'
            }
            if (this.actions == 'Setup Box Inventory-Upload File') {
              this.valuesetupuploadfile = 'Setup Box Inventory-Upload File'
            }
            if (this.actions == 'Setup Box Inventory-Status') {
              this.valuesetupStatus = 'Setup Box Inventory-Status'
            }
            if (this.actions == 'Setup Box Inventory-Edit') {
              this.valuesetupedit = 'Setup Box Inventory-Edit'
            }

            if (this.actions == 'Setup Box Inventory-Update Booking Status') {
              this.valuesetupbooking = 'Setup Box Inventory-Update Booking Status'
            }

            if (this.actions == 'Setup Box Inventory-View') {
              this.valuesetupview = 'Setup Box Inventory-View'
            }

          }

        }
      })
    }


  }

  STBstatus(id: any) {
    this.dialog.open(StbStatusComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true,
      data: { value: id }
    })
  }


  customer(id: any) {
    this.router.navigate([`dashboard/setupbox-customerview/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  STBHistory(id: any) {
    this.router.navigate([`dashboard/stbhistory/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  reload() {
    window.location.reload()
  }

  openExcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.excelexportDetails();
  }
  // excelexportDetails() {
  //   const header = ["setupBoxNumber", "serviceProviderName", "stateName"]
  //   const data = this.responseDataListnew;
  //   let workbook = new Workbook();
  //   let worksheet = workbook.addWorksheet('Edit Sheet');
  //   let headerRow = worksheet.addRow(header);
  //   headerRow.font = { bold: true };
  //   headerRow.eachCell((cell, number) => {
  //     cell.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: 'FFFFFFFF' },
  //       bgColor: { argb: 'FF0000FF' },
  //     }
  //     cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  //   });

  //   data.forEach((d: any) => {
  //     let row = worksheet.addRow(d);
  //     let qty = row.getCell(1);
  //     let qty1 = row.getCell(2);
  //     let qty2 = row.getCell(3);

  //     qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  //     qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  //     qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  //   });
  //   workbook.xlsx.writeBuffer().then((data) => {
  //     let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     FileSaver.saveAs(blob, 'SetupBox.csv');
  //   });
  // }

  excelexportDetails() {
    const header = ['setupBoxNumber', 'serviceProviderName', 'stateName'];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Edit Sheet');
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    data.forEach((d: any) => {
      // Trim spaces before adding the data
      let trimmedData = {
        ...d,
        serviceProviderName: d.serviceProviderName ? d.serviceProviderName.trim() : '',
        stateName: d.stateName ? d.stateName.trim() : ''
      };

      let row = worksheet.addRow(trimmedData);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);

      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'SetupBox.csv');
    });
  }

  renderPage(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex = event.pageIndex;  // Update current page index
    this.pageSize = event.pageSize;           // Update page size (if changed)

    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex);
    console.log('New Page Size:', this.pageSize);

    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.ngOnInit()
  }
  changePageIndex(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    this.renderPage({
      pageIndex: newPageIndex,
      pageSize: this.pageSize,
      // length: this.totalItems
    } as PageEvent);
  }


  onSubmit(event: MatSlideToggleChange, id: any) {

    this.isChecked = event.checked;
    let submitModel: setupStatus = {
      status: this.isChecked ? 1 : 0,
      stbId: id
    };
    this.service.setupboxstatus(submitModel).subscribe((res: any) => {

      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        // window.location.reload();
        this.service.bulkuploadViewall(this.merchantId, this.pageSize, this.pageIndex).subscribe((res: any) => {
          if (res.flag == 1) {
            this.bulkdata = res.response.content;
            this.totalPages = res.pagination?.totalElements;
            this.totalpage = res.pagination?.totalPages;
            this.currentpage = res.pagination?.currentPage + 1;
            this.dataSource = new MatTableDataSource(this.bulkdata)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.filter = false;
          }
          else if (res.flag == 2) {
            this.dataSource = new MatTableDataSource([]);
            this.dataSource = new MatTableDataSource(this.bulkdata);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }

        })
      }, 1000);
    });
  }


  exportexcel() {
    this.service.bulkuploadExport(this.merchantId).subscribe((res: any) => {
      this.bulkdataexport = res.response?.reverse();
      if (res?.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.bulkdataexport?.forEach((element: any) => {
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.service?.serviceProviderName);
          this.response.push(element?.regionEntity?.stateName)
          this.response.push(element?.setupBoxNumber);
          this.response.push(element?.dueStatus)

          if (element?.status == '1') {
            this.response.push('Active')
          }
          else {
            this.response.push('Inactive')
          }

          if (element?.bookingStatus == '1') {
            this.response.push('Booked')
          }
          else if (element?.bookingStatus == '0') {
            this.response.push('Available')
          }
          else if (element?.bookingStatus == '2') {
            this.response.push('Damaged')
          }
          else {
            this.response.push('')
          }

          // this.response.push(element?.modifiedBy);
          // this.response.push(element?.modifiedAt);

          sno++;
          this.responseDataListnew.push(this.response);
        });
        this.excelexportCustomer();

      }
    });

  }

  excelexportCustomer() {
    const header = [
      "S.No",
      "MSO",
      "Region",
      "Setup Box Number",
      "Due Status",
      "Status",
      "Booking Status",

    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('SetupBox Details');
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

      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    }
    );
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'SetupBox Details.xlsx');
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create() {
    this.dialog.open(CreateBulkComponent, {
      disableClose: true,
      width: '80vw',// Use percentage to make it responsive
      maxWidth: '500px',
      height: 'auto',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.bulkuploadViewall(this.merchantId, this.pageSize, this.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.bulkdata = res.response.content;
          this.totalPages = res.pagination?.totalElements;
          this.totalpage = res.pagination?.totalPages;
          this.currentpage = res.pagination?.currentPage + 1;
          this.dataSource = new MatTableDataSource(this.bulkdata)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.filter = false;
        }
        else if (res.flag == 2) {
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }

      })

    })

  }

  open() {
    this.dialog.open(AddSetupboxComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.bulkuploadViewall(this.merchantId, this.pageSize, this.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.bulkdata = res.response.content;
          this.totalPages = res.pagination?.totalElements;
          this.totalpage = res.pagination?.totalPages;
          this.currentpage = res.pagination?.currentPage + 1;
          this.dataSource = new MatTableDataSource(this.bulkdata)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.filter = false;
        }
        else if (res.flag == 2) {
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }

      })
    })
  }

  Stbbookingstatus(id: any) {
    this.dialog.open(StbStatusComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: { value: id }
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.bulkuploadViewall(this.merchantId, this.pageSize, this.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.bulkdata = res.response.content;
          this.totalPages = res.pagination?.totalElements;
          this.totalpage = res.pagination?.totalPages;
          this.currentpage = res.pagination?.currentPage + 1;
          this.dataSource = new MatTableDataSource(this.bulkdata)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.filter = false;
        }
        else if (res.flag == 2) {
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }

      })
    })
  }

  edit(id: any) {
    this.dialog.open(EditSetupboxComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.bulkuploadViewall(this.merchantId, this.pageSize, this.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.bulkdata = res.response.content;
          this.totalPages = res.pagination?.totalElements;
          this.totalpage = res.pagination?.totalPages;
          this.currentpage = res.pagination?.currentPage + 1;
          this.dataSource = new MatTableDataSource(this.bulkdata)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.filter = false;
        }
        else if (res.flag == 2) {
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }

      })
    })
  }



  bulkResponse() {
    this.router.navigateByUrl('/dashboard/response-bulk')

  }
  setupbox(filterValue: any) {
    console.log(filterValue)

    if (filterValue) {
      this.service.SetupBox(this.merchantId, filterValue, this.pageSize1, this.pageIndex1).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.bulkdata = res.response;
            this.bulkdata.reverse();
            this.dataSource = new MatTableDataSource(this.bulkdata);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.totalPages1 = res.pagination.totalElements;
            this.totalpage1 = res.pagination.totalPages;
            this.currentpage1 = res.pagination.currentPage + 1;
            this.filter = true

          }
          else if (res.flag === 2) {
            this.bulkdata = [];
            this.dataSource = new MatTableDataSource(this.bulkdata);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.totalPages1 = res.pagination.totalElements;
            this.totalpage1 = res.pagination.totalPages;
            this.currentpage1 = res.pagination.currentPage + 1;
            this.filter = true
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    }
    // else if (!filterValue) {
    //   this.toastr.error('Please enter a value to search');
    //   return;
    // }

  }
  renderPage1(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex1 = event.pageIndex;  // Update current page index
    this.pageSize1 = event.pageSize;           // Update page size (if changed)

    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex1);
    console.log('New Page Size:', this.pageSize1);

    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.setupbox(this.currentfilval);
  }

  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }

}
