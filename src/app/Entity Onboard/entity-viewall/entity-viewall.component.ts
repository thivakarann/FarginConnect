import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EntityStatus } from '../../fargin-model/fargin-model.module';
import { PageEvent } from '@angular/material/paginator';
import { CreateCampaginComponent } from '../../Announcement/create-campagin/create-campagin.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-entity-viewall',
  templateUrl: './entity-viewall.component.html',
  styleUrl: './entity-viewall.component.css'
})
export class EntityViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'merchantId',
    'accountId',
    'referenceNo',
    // 'entityName',
    'merchantLegalName',
    'businessCategoryModel',
    'contactMobile',
    'contactEmail',
    'finalapproval',
    'pgonboard',
    'status',
    'View',
    'createdDatetime',
    // 'accountStatus',
    'failedLoginCount',
    'unblock'

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
  valueEntityAdd: any;
  valueEntityExport: any;
  valueEntityStatus: any;
  valueEntityView: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  unblockvalue: any;
  valueEntityUnblock: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  viewallexport: any;

  pageIndex1: number = 0;
  pageSize1 = 5;

  totalpage1: any;
  totalPages1: any;
  currentpage1: any;

  filter: boolean = false;
  currentfilval: any;
  entitytrans: any;
  entityoffline: any;
  entitysettle: any;
  entityrefund: any;
  entityQR: any;
  entitycustomer: any;
  entitypaylink: any;
  entitygeneral: any;
  entitybank: any;
  entityKYC: any;
  entitybussi: any;
  entityfinal: any;
  entityonetime: any;
  entitycusti: any;
  entitysms:any;
  entityAgrrement:any;
  entitybranch:any;
  valuecloud: any;
  constructor(
    public EntityViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {

    this.EntityViewall.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueEntityAdd = 'Entity Onboard-Add';
            this.valueEntityExport = 'Entity Onboard-Export';
            this.valueEntityStatus = 'Entity Onboard-Status';
            // this.valueEntityView = 'Entity Onboard-View';
            this.valueEntityUnblock = 'Entity Onboard-Unblock';
            this.entitytrans = 'Entity View Transaction';
            this.entityoffline = 'Entity View Offline';
            this.entitysettle = 'Entity View Settlement';
            this.entityrefund = 'Entity View Refund';
            this.entityQR = "Entity View QR";
            this.entitycustomer = 'Entity View Customer';
            this.entitypaylink = 'Entity View Payment Link';
            this.entitygeneral = 'Entity View General Information';
            this.entitybank = 'Entity View Bank Information';
            this.entityKYC = 'Entity View KYC Document';
            this.entitybussi = 'Entity View Bussiness Document';
            this.entityfinal = 'Entity View Final Approval';
            this.entityonetime = 'One Time Setup Payment';
            this.entitycusti = 'Entity View Customized Payment';
            this.entitysms = 'Entity View-SMS Settings';
            this.entityAgrrement = 'Entity View Agreement';
            this.entitybranch = 'Entity View Branch';
            this.valuecloud = 'Entity View Cloud Fee AutoDebit'



          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'Entity Onboard-Add') {
                this.valueEntityAdd = 'Entity Onboard-Add';
              }
              if (this.actions == 'Entity Onboard-Export') {
                this.valueEntityExport = 'Entity Onboard-Export'
              }
              if (this.actions == 'Entity Onboard-Status') {
                this.valueEntityStatus = 'Entity Onboard-Status'
              }
              if (this.actions == 'Entity Onboard-View') {
                this.valueEntityView = 'Entity Onboard-View'
              }
              if (this.actions == 'Entity Onboard-Unblock') {
                this.valueEntityUnblock = 'Entity Onboard-Unblock'
              }
              if (this.actions == 'Entity View Transaction') {
                this.entitytrans = 'Entity View Transaction'
              }
              if (this.actions == 'Entity View Offline') {
                this.entityoffline = 'Entity View Offline'
              }
              if (this.actions == 'Entity View Settlement') {
                this.entitysettle = 'Entity View Settlement'
              }
              if (this.actions == 'Entity View Refund') {
                this.entityrefund = 'Entity View Refund'
              }
              if (this.actions == 'Entity View QR') {
                this.entityQR = 'Entity View QR'
              }
              if (this.actions == 'Entity View Customer') {
                this.entitycustomer = 'Entity View Customer'
              }
              if (this.actions == 'Entity View Payment Link') {
                this.entitypaylink = 'Entity View Payment Link'
              }
              if (this.actions == 'Entity View General Information') {
                this.entitygeneral = 'Entity View General Information'
              }
              if (this.actions == 'Entity View Bank Information') {
                this.entitybank = 'Entity View Bank Information'
              }
              if (this.actions == 'Entity View KYC Document') {
                this.entityKYC = 'Entity View KYC Document'
              }
              if (this.actions == 'Entity View Bussiness Document') {
                this.entitybussi = 'Entity View Bussiness Document'
              }
              if (this.actions == 'Entity View Final Approval') {
                this.entityfinal = 'Entity View Final Approval'
              }
              if (this.actions == 'One Time Setup Payment') {
                this.entityonetime = 'One Time Setup Payment'
              }
              if (this.actions == 'Entity View Customized Payment') {
                this.entitycusti = 'Entity View Customized Payment'
              }
              if (this.actions == 'Entity View-SMS Settings') {
                this.entitysms = 'Entity View-SMS Settings'
              }
              if (this.actions == 'Entity View Agreement') {
                this.entityAgrrement = 'Entity View Agreement'
              }
              if (this.actions == 'Entity View Branch') {
                this.entitybranch = 'Entity View Branch'
              }
              if (this.actions == 'Entity View Cloud Fee AutoDebit') {
                this.valuecloud = 'Entity View Cloud Fee AutoDebit'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.EntityViewall.EntityViewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag === 1) {

        this.viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        // this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
      }
      else if (res.flag === 2) {
        this.viewall = [];
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;

      }

    });


  }


  reload() {
    this.EntityViewall.EntityViewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag === 1) {

        this.viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        // this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
      }
      else if (res.flag === 2) {
        this.viewall = [];
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;

      }

    });
  }


  unblock(id: any) {
    this.EntityViewall.unblockentityAccount(id).subscribe((res: any) => {
      this.unblockvalue = res.response;

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {

          this.EntityViewall.EntityViewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
            if (res.flag === 1) {

              this.viewall = res.response;
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.totalPages;
              this.currentpage = res.pagination.currentPage + 1;
              // this.viewall.reverse();
              this.dataSource = new MatTableDataSource(this.viewall);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.filter = false;
            }
            else if (res.flag === 2) {
              this.viewall = [];
              this.dataSource = new MatTableDataSource(this.viewall);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.filter = false;
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.totalPages;
              this.currentpage = res.pagination.currentPage + 1;

            }

          });

        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })

  }


  add() {
    this.router.navigateByUrl('dashboard/entity-add');
  }



  Viewdata(id: any) {
    this.router.navigate([`dashboard/entity-view/${id}`], {
      queryParams: { Alldata: id },
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
    this.EntityViewall.EntityViewallExport().subscribe((res: any) => {
      this.viewallexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.viewallexport.forEach((element: any) => {

          this.response = [];
          this.response.push(sno);
          this.response.push(element?.accountId);
          this.response.push(element?.referenceNo);
          this.response.push(element?.entityName);
          this.response.push(element?.businessCategoryModel?.categoryName);

          this.response.push(element?.contactEmail);

          if (element?.approvalStatusL2 == 'approved') {
            this.response.push('Approved');
          }
          else if (element?.approvalStatusL2 == 'Pending') {
            this.response.push('Pending');
          }
          else {
            this.response.push('Rejected');
          }
          //
          if (element?.onBoardStatus == 'true') {
            this.response.push('Approved');
          }
          else {
            this.response.push('Pending');
          }
          //
          if (element?.accountStatus == 1) {
            this.response.push('Active');
          }
          else {
            this.response.push('Inactive');
          }
          if (element.createdDatetime) {
            this.response.push(moment(element?.createdDatetime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else {
            this.response.push('');
          }

          if (element?.failedLoginCount != 6) {
            this.response.push('Unblocked');
          }
          else {
            this.response.push('blocked');
          }


          sno++;
          this.responseDataListnew.push(this.response);
        });
        this.excelexportCustomer();
      }
    });
  }

  excelexportCustomer() {
    // const title='Entity Details';
    const header = [
      "S.No",
      'Account Id',
      'Reference No',
      'Entity Name',
      'Business Category Model',
      'Entity Email',
      'Final approval',
      'PG Onboard',
      'Status',
      "Created Date/Time",
      "Login Count"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Details');

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

    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Entity Details.xlsx');
    });
  }

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: EntityStatus = {
      merchantId: id,
      accountStatus: this.isChecked ? 1 : 0,
    };

    this.EntityViewall.EntityActiveStatus(submitModel).subscribe((res: any) => {

      this.toastr.success(res.responseMessage);
      setTimeout(() => {

        this.EntityViewall.EntityViewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
          if (res.flag === 1) {

            this.viewall = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.totalPages;
            this.currentpage = res.pagination.currentPage + 1;
            // this.viewall.reverse();
            this.dataSource = new MatTableDataSource(this.viewall);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.filter = false;
          }
          else if (res.flag === 2) {
            this.viewall = [];
            this.dataSource = new MatTableDataSource(this.viewall);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.filter = false;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.totalPages;
            this.currentpage = res.pagination.currentPage + 1;

          }

        });

      }, 1000);
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

  Entity(filterValue: string) {
    if (filterValue) {
      this.EntityViewall.EntitySearch(filterValue, this.pageSize1, this.pageIndex1).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.viewall = res.response.content;
            this.viewall.reverse();
            this.dataSource = new MatTableDataSource(this.viewall);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.totalPages1 = res.pagination.totalElements;
            this.totalpage1 = res.pagination.totalPages;
            this.currentpage1 = res.pagination.currentPage + 1;
            this.filter = true

          }
          else if (res.flag === 2) {
            this.viewall = [];
            this.dataSource = new MatTableDataSource(this.viewall);
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
    else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

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
    this.Entity(this.currentfilval);
  }

  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }
  addcampagin() {
    this.dialog.open(CreateCampaginComponent, {

      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    })

  }
}
