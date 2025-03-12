import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CustomerBulkuploadComponent } from '../../Customer/customer-bulkupload/customer-bulkupload.component';
import { CustomerStatusComponent } from '../../Customer/customer-status/customer-status.component';
import { CustomerextrasetupboxbulkComponent } from '../../Customer/customerextrasetupboxbulk/customerextrasetupboxbulk.component';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-dashboardviewinactiveemployee',
  templateUrl: './dashboardviewinactiveemployee.component.html',
  styleUrl: './dashboardviewinactiveemployee.component.css'
})
export class DashboardviewinactiveemployeeComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'sno',
    "customerReferenceId",
    'customerMsoId',
    'name',
    'mobilenumber',
    "doorNumber",
    "area",
    "streetName",
    "cityName",
    "pincodeName",
    'status',
    "routeAssignedStatus",
    'View',
  ];
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  responseDataListnews: any = [];
  response: any = [];
  merchantid: any = localStorage.getItem('merchantId');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
currentfilval: any;
pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
 
  filter:boolean=false;
  inactivecustomer: any;
searchPerformed: boolean=false;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.dashboardActiveInactiveCustomers( this.merchantid, 0,this.pageSize,this.pageIndex)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewcustomer = res.response;

          this.dataSource = new MatTableDataSource(
            this.viewcustomer
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter=false;
        }
        else if(res.flag==2){
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.viewcustomer.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    if (this.roleName == 'Merchant Super admin') {
      this.valueCustomerAdd = 'Customer-Add';
      this.valueCustomerEdit = 'Customer-Edit';
      this.valueCustomerExport = 'Customer-Export';
      this.valueCustomerStatus = 'Customer-Status';
      this.valueCustomerView = 'Customer-View';
      this.valuecustomerimport = 'Customer-Import';
      this.valuecustomerupload = 'Customer-Upload File';
      this.valueCustomerhistory = 'Customer-History';
    } else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions;

            if (this.actions == 'Customer-Add') {
              this.valueCustomerAdd = 'Customer-Add';
            }
            if (this.actions == 'Customer-Edit') {
              this.valueCustomerEdit = 'Customer-Edit';
            }
            if (this.actions == 'Customer-Export') {
              this.valueCustomerExport = 'Customer-Export';
            }
            if (this.actions == 'Customer-Status') {
              this.valueCustomerStatus = 'Customer-Status';
            }
            if (this.actions == 'Customer-View') {
              this.valueCustomerView = 'Customer-View';
            }
            if (this.actions == 'Customer-Import') {
              this.valuecustomerimport = 'Customer-Import';
            }
            if (this.actions == 'Customer-Upload File') {
              this.valuecustomerupload = 'Customer-Upload File';
            }
            if (this.actions == 'Customer-History') {
              this.valueCustomerhistory = 'Customer-History';
            }
          }
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  exportexcel() {
    this.service.dashboardactiveinactiveexport(this.merchantid,0).subscribe((res: any) => {
      this.inactivecustomer = res.response.customerList;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.inactivecustomer.forEach((element: any) => {
   
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.customerReferenceId);
          this.response.push(element?.customerMsoId);
          this.response.push(element?.customerName);
          this.response.push(element?.mobileNumber);
          this.response.push(element?.doorNumber);
          this.response.push(element?.area);
          this.response.push(element?.streetName);
          this.response.push(element?.cityName);
          this.response.push(element?.pincodeName);
          if(element?.activeStatus ==1){
            this.response.push("Active")
          }
          else if(element?.activeStatus==0){
            this.response.push("Inactive")
          }
   
          if(element?.routeAssignedStatus ==1){
            this.response.push("Assigned")
          }
          else if(element?.routeAssignedStatus==0){
            this.response.push("Not Assigned")
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
          "Customer Id",
          "Customer MSO Id",
          "Customer Name",
          "Mobile Number",
          "Door No",
          "Area",
          "Street Name",
          "City Name",
          "Pincode",
          "Status",
          "Route Assigned status",
    ]
   
   
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Inactive customer');
   
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
   
    }
    );
   
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Inactive Customer.xlsx');
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

  customeronboard(filterValue: string) {
  
    if (filterValue) {
 
    this.service.CustomerActiveSearch(this.merchantid,0, filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.viewcustomerdetailsbymerchant = res.response;
          this.viewcustomerdetailsbymerchant.reverse();
          this.dataSource = new MatTableDataSource(this.viewcustomerdetailsbymerchant);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
        } else if (res.flag === 2) {
          this.viewcustomerdetailsbymerchant = [];
          this.dataSource = new MatTableDataSource(
            this.viewcustomerdetailsbymerchant
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
        }
      },
      error: (err: any) => {
        this.toastr.error('Error fetching filtered regions');
      },
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
    this.customeronboard(this.currentfilval);
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
