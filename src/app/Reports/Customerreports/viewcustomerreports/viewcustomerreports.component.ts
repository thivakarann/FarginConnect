import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CustomerBulkuploadComponent } from '../../../Customer/customer-bulkupload/customer-bulkupload.component';
import { CustomerStatusComponent } from '../../../Customer/customer-status/customer-status.component';
import { CustomerextrasetupboxbulkComponent } from '../../../Customer/customerextrasetupboxbulk/customerextrasetupboxbulk.component';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-viewcustomerreports',
  templateUrl: './viewcustomerreports.component.html',
  styleUrl: './viewcustomerreports.component.css'
})
export class ViewcustomerreportsComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'sno',
    'name',
    'mobilenumber',
    'email',
    'status',
    'routeAssignedStatus',
    // 'createdBy',
    // 'createdDateTime',
    // 'modifiedBy',
    // 'modifiedDateTime',
  ];
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  responseDataListnews: any = [];
  response: any = [];
  merchantid: any = localStorage.getItem('merchantId');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  customer: any;
  admin: any;
  isChecked: any;
  date1: any;
  date2: any;
  viewcustomerdetailsbymerchant: any;
  viewcustomer: any;
  alcotchannel: any;
  bouquetPlan: any;
  lcopChannel: any;
  dialogRef: any;
  values: any[] = [];
  values1: any[] = [];
  values2: any[] = [];
  datas: any[] = [];
  datas1: any[] = [];
  datas2: any[] = [];
  valueCustomerAdd: any;
  valueCustomerExport: any;
  valueCustomerEdit: any;
  valueCustomerView: any;
  valueCustomerStatus: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId');
  valuecustomerimport: any;
  valuecustomerupload: any;
  valueCustomerhistory: any;
  roleName = localStorage.getItem('roleName');
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  viewcustomerExport: any;
 
  alcotChannelNames: any[] = [];
  alcotChannelNos: any[] = [];
  bouquetNames: any[] = [];
  lcopPlans: any[] = [];
  alcotChannelprice: any[] = [];
  bouquetamount: any[] = [];
  lcopamount: any[] = [];
  customernanme: any;
  mobilenumber: any;
  email: any;
  status: any;
  route: any;
  valuecusreportexport: any;
  roleNames = localStorage.getItem('roleName')
  statused: any;
  Hidden:boolean =true;
  showFooter: boolean=true;
  totalCount: any;
  showentries:boolean=false;
searchPerformed: boolean=false;
 
  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }
 
  ngOnInit() {
    this.service
      .ViewCustomerByMerchantDetails(
        this.merchantid,
        this.pageSize,
        this.pageIndex
      )
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewcustomerdetailsbymerchant = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          // this.viewcustomerdetailsbymerchant.reverse();
 
          this.dataSource = new MatTableDataSource(
            this.viewcustomerdetailsbymerchant
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else if(res.flag==2){
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.viewcustomerdetailsbymerchant.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    if (this.roleNames == 'Merchant Super admin') {
 
      this.valuecusreportexport = 'Customer Reports-Export'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {
 
        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
 
          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions
 
 
            if (this.actions == 'Customer Reports-Export') {
              this.valuecusreportexport = 'Customer Reports-Export'
            }
          }
        }
      })
    }
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  add() {
    this.router.navigateByUrl('dashboard/add-customer');
  }
  edit(id: any) {
    this.router.navigate([`dashboard/editcustomer/${id}`], {
      queryParams: { Alldata: id },
    });
  }
 
  Viewdata(id: any) {
    this.router.navigate([`dashboard/personal-view/${id}`], {
      queryParams: { Alldata: id },
    });
  }
 
  ActiveStatus(id: any, status: any) {
    this.dialog.open(CustomerStatusComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        value: id,
        value1: status,
      },
    });
  }
 
  setuphistory() {
    // this.router.navigate([`dashboard/setupboxhistory/${id}`], {
    //   queryParams: { Alldata: id },
    // });
 
    this.router.navigate([`dashboard/setupboxhistory`], {
      // queryParams: { Alldata: id },
    });
  }
  exportexcel() {
 
    let sno = 1;
    this.responseDataListnew = [];
    this.viewcustomerdetailsbymerchant.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.customerName);
      this.response.push(element?.customerReferenceId);
 
      this.response.push(element?.mobileNumber);
 
      this.response.push(element?.alterMobileNumber);
      this.response.push(element?.emailAddress);
      this.response.push(element?.streetName);
      this.response.push(element?.cityName);
      this.response.push(element?.stateName);
      this.response.push(element?.doorNumber);
      this.response.push(element?.pincodeName);
      this.response.push(element?.countryName);
      this.response.push(element?.age);
      this.response.push(element?.landmark);
      this.response.push(element?.serviceProviderName);
      this.response.push(element?.setupBox);
 
 
      if (element?.routeAssignedStatus == '0') {
        this.response.push('Not Assigned');
      } else {
        this.response.push('Assigned');
      }
      if (element?.activeStatus == '1') {
        this.response.push('Active');
      } else {
        this.response.push('Inactive');
      }
      this.response.push(element?.merchantLegalName);
 
      // this.response.push(element?.createdBy);
      // this.response.push(element?.date1);
      // this.response.push(element?.modifiedBy);
      // if (element.modifiedDateTime) {
      //   this.response.push(moment(element?.modifiedDateTime).format('DD/MM/yyyy hh:mm a').toString());
      // }
      // else {
      //   this.response.push('');
      // }
 
      sno++;
      this.responseDataListnew.push(this.response);
    });
 
    this.excelexportCustomer();
 
 
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      'S.No',
      'Customer Name',
      'Customer Reference Id',
      'Mobile Number',
      'Alternative MobileNumber',
      'Email',
      'Streetname',
      'Cityname',
      'Statename',
      'DoorNumber',
      'Pincode',
      'Country',
      'Age',
      'Landmark',
      'Service ProviderName',
      'Setupbox',
      'Route Assigned Status',
      'Status',
      'Entity Name'
      // 'Created By',
      // 'Created At',
      // 'Modified By',
      // 'Modified At',
    ];
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customer Reports');
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
      };
 
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
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
       let qty15 = row.getCell(16);
       let qty16 = row.getCell(17);
       let qty17 = row.getCell(18);
       let qty18 = row.getCell(19);
 
 
      qty.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty1.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty2.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty3.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty4.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty5.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty6.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty7.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty8.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty9.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty10.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty11.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty12.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty13.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty14.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty15.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty16.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty17.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
 
      qty18.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
 
    });
 
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
 
      FileSaver.saveAs(blob, 'Customer Reports.xlsx');
    });
  }
 
  excelexportDetails() {
    const header = [
      'customerName',
      'area',
      'cityName',
      'pincodeName',
      'stateName',
      'countryName',
      'emailAddress',
      'alterMobileNumber',
      'apartmentName', // Optional
      'flatNumber', // Optional
      'blockNumber', // Optional
      'doorNumber',
      'landmark', // Optional
      'houseName', // Optional
      'age',
      'advanceStatus',
      'advanceAmount',
      'streetName',
      'mobileNumber',
      'freeLine',
      'customerReferenceId',
      'setupBoxNumber',
      'channelName',
      'planName',
      'bouquetName',
      // Add any other fields as needed
    ];
 
    const data = this.responseDataListnew;
 
    // Prepare CSV content
    const csvContent = [];
 
    // Add header to CSV
    csvContent.push(header.map((item) => `"${item}"`).join(','));
 
    data.forEach((d: any) => {
      // Prepare the row data
      const rowData = [
        d.customerName || '',
        d.area || '',
        d.cityName || '',
        d.pincodeName || '',
        d.stateName || '',
        d.countryName || '',
        d.emailAddress || '',
        d.alterMobileNumber || '',
        d.apartmentName || '', // Optional
        d.flatNumber || '', // Optional
        d.blockNumber || '', // Optional
        d.doorNumber || '',
        d.landmark || '', // Optional
        d.houseName || '', // Optional
        d.age || '',
        d.advanceStatus || '',
        d.advanceAmount || '',
        d.streetName || '',
        d.mobileNumber || '',
        d.freeLine || '',
        `"${d.customerReferenceId}"` || '',
        `"${d.setupBoxNumber}"` || '',
        Array.isArray(d.channelName) ? d.channelName.join(', ') : d.channelName,
        Array.isArray(d.planName) ? d.planName.join(', ') : d.planName,
        Array.isArray(d.bouquetName) ? d.bouquetName.join(', ') : d.bouquetName,
 
        // Add any other fields as needed
      ].map((item) => `"${item.replace(/"/g, '""')}"`); // Escape double quotes
 
      csvContent.push(rowData.join(','));
    });
 
    // Create a Blob and save as CSV
    const blob = new Blob([csvContent.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    FileSaver.saveAs(blob, 'Customer.csv');
  }
 
  excelsetupbox() {
    const header = [
      'mobileNumber',
      'setupBoxNumber',
      'channelName',
      'planName',
      'bouquetName',
    ];
 
    const data = this.responseDataListnew;
 
    // Prepare CSV content
    const csvContent = [];
 
    // Add header to CSV
    csvContent.push(header.map((item) => `"${item}"`).join(','));
 
    data.forEach((d: any) => {
      // Prepare the row data
      const rowData = [
        d.mobileNumber || '',
        `"${d.setupBoxNumber}"` || '',
        Array.isArray(d.channelName) ? d.channelName.join(', ') : d.channelName,
        Array.isArray(d.planName) ? d.planName.join(', ') : d.planName,
        Array.isArray(d.bouquetName) ? d.bouquetName.join(', ') : d.bouquetName,
 
        // Add any other fields as needed
      ].map((item) => `"${item.replace(/"/g, '""')}"`); // Escape double quotes
 
      csvContent.push(rowData.join(','));
    });
 
    // Create a Blob and save as CSV
    const blob = new Blob([csvContent.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    FileSaver.saveAs(blob, 'SetupBox.csv');
  }
 
  create() {
    this.dialog.open(CustomerBulkuploadComponent, {
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
  creates() {
    this.dialog.open(CustomerextrasetupboxbulkComponent, {
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
  reload() {
    window.location.reload();
  }
  renderPage(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex = event.pageIndex; // Update current page index
    this.pageSize = event.pageSize; // Update page size (if changed)
 
    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex);
    console.log('New Page Size:', this.pageSize);
 
    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.ngOnInit();
  }
  changePageIndex(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    this.renderPage({
      pageIndex: newPageIndex,
      pageSize: this.pageSize,
      // length: this.totalItems
    } as PageEvent);
  }
 

  reports() {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
    });
  }
  shouldDisable(fieldName: string): boolean {
    const fields = [
      this.customernanme,
      this.mobilenumber,
      this.email,
      this.route,
      this.statused,
 
    ];
 
    // Check if any field is filled except for the current field
    return (
      fields.filter(
        (value, index) => value && index !== this.getFieldIndex(fieldName)
      ).length > 0
    );
  }
 
  // custom filter disables fuctions
  private getFieldIndex(fieldName: string): number {
    const fieldNames = [
      'customernanme',
      'mobilenumber',
      'email',
      'route',
      'statused',
    ];
 
    return fieldNames.indexOf(fieldName);
  }
 
  customers() {
    let idParam = '';
 
    if (this.customernanme) {
      idParam += this.customernanme;
    }
    if (this.mobilenumber) {
      idParam += this.mobilenumber;
    }
    if (this.email) {
      idParam += this.email;
    }
    if (this.route) {
      this.sendRequestWithRoute();
    }
    if (this.statused) {
      // status is a dropdown, could be 1 or 0
      this.sendRequestWithStatus();
    }
 
    if (idParam.endsWith('&')) {
      idParam = idParam.slice(0, -1);
    }
    if (this.customernanme || this.mobilenumber || this.email) {
      this.sendcustomerdetails(idParam);
    }
  }
  sendcustomerdetails(idParam: any) {
    this.service.Customeronboards(this.merchantid, idParam, 1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.viewcustomerdetailsbymerchant = res.response;
          this.viewcustomerdetailsbymerchant.reverse();
          this.dataSource = new MatTableDataSource(
            this.viewcustomerdetailsbymerchant
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
         this.reset();
         this.showFooter = false;
         this.totalCount = this.viewcustomerdetailsbymerchant.length;
         this.showentries=true;
        } else if (res.flag === 2) {
          this.totalCount = 0;
          this.showentries=true;
          this.viewcustomerdetailsbymerchant = [];
          this.dataSource = new MatTableDataSource(
            this.viewcustomerdetailsbymerchant
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
          this.showFooter = false;
         
        }
      },
    });
  }
  sendRequestWithRoute() {
    let idParam = this.route;
    this.service.Customeronboards(this.merchantid, idParam, 2).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.viewcustomerdetailsbymerchant = res.response;
          this.viewcustomerdetailsbymerchant.reverse();
          this.dataSource = new MatTableDataSource(
            this.viewcustomerdetailsbymerchant
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
          this.reset();
          this.showFooter = false;
          this.totalCount = this.viewcustomerdetailsbymerchant.length;
          this.showentries=true;
        } else if (res.flag === 2) {
          this.totalCount = 0;
          this.viewcustomerdetailsbymerchant = [];
          this.dataSource = new MatTableDataSource(
            this.viewcustomerdetailsbymerchant
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
        
          this.showentries=true;
          this.showFooter = false;
        }
      },
    });
  }
  sendRequestWithStatus() {
    let idParam = this.statused;
    this.service.Customeronboards(this.merchantid, idParam, 3).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.viewcustomerdetailsbymerchant = res.response;
          this.viewcustomerdetailsbymerchant.reverse();
          this.dataSource = new MatTableDataSource(
            this.viewcustomerdetailsbymerchant
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
          this.reset();
          this.showFooter = false;
          this.totalCount = this.viewcustomerdetailsbymerchant.length;
          this.showentries=true;
        } else if (res.flag === 2) {
          this.totalCount = 0;
          this.viewcustomerdetailsbymerchant = [];
          this.dataSource = new MatTableDataSource(
            this.viewcustomerdetailsbymerchant
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
       
          this.showentries=true;
          this.showFooter = false;
        }
      },
    });
  }

  reset(): void {
    this.customernanme = '',
      this.mobilenumber = '',
      this.email = '',
      this.route = '',
      this.statused = ''
 
  }



}
