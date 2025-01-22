import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ActiveCustomer, duegenertes, Statusadmin } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CustomerBulkuploadComponent } from '../customer-bulkupload/customer-bulkupload.component';
import { CustomerStatusComponent } from '../customer-status/customer-status.component';
import { PageEvent } from '@angular/material/paginator';
import { CustomerextrasetupboxbulkComponent } from '../customerextrasetupboxbulk/customerextrasetupboxbulk.component';
import { TemplateRef } from '@angular/core';
import { SetupboxnumberreadmoreComponent } from '../setupboxnumberreadmore/setupboxnumberreadmore.component';
import { MsoComponent } from '../mso/mso.component';
import { ManualduesgenerateComponent } from '../manualduesgenerate/manualduesgenerate.component';

@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrl: './viewcustomer.component.css'
})
export class ViewcustomerComponent {
  dataSource: any;
  displayedColumns: string[] =
    [
      "sno",
      "customerReferenceId",
      "customerMsoId",
      "name",
      "mobilenumber",
      "stbnumber",
      "mso",
      "doorNumber",
      "area",
      "streetName",
      "cityName",
      "pincodeName",
      "status",
      "Viewhistory",
      "View",
      "edit",
      "routeAssignedStatus",
      "merchantAdminId",

      // "createdBy",
      // "createdDateTime",
      // "modifiedBy",
      // "modifiedDateTime"
    ]
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantid: any = localStorage.getItem('merchantId')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  customer: any;
  admin: any;
  isChecked: any;
  date1: any;
  date2: any;
  limit: number = 1;
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
  roleId: any = localStorage.getItem('roleId')
  valuecustomerimport: any;
  valuecustomerupload: any;
  valueCustomerhistory: any;
  roleName = localStorage.getItem('roleName')
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  viewcustomerExport: any;
  valuecustomerExcelSetupbox: any;
  valuecustomerfileSetupbox: any;
  alcotChannelNames: any[] = [];
  alcotChannelNos: any[] = [];
  bouquetNames: any[] = [];
  lcopPlans: any[] = [];
  alcotChannelprice: any[] = [];
  bouquetamount: any[] = [];
  lcopamount: any[] = [];
  searchPerformed: boolean = false;
  responsemessage: any;
  searchPerformedvcjhvc: boolean = false;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef: any;
  isFullPolicyVisible: boolean = false;
  customerid: any;
  customermsoid: any;
  selectedItems: { [key: string]: string } = {};
  customerPaymentMode: any = localStorage.getItem('customerPaymentMode')
  customerIdsList: any;
  customerIdsArray: any[] = [];
  customerindex: any;
  customerlength: any;
  setupboxnum: any;
  FilterFlag: any;
  @ViewChild('MSOdialogTemplate') MSOdialogTemplate!: TemplateRef<any>;
  @ViewChild('SetupboxdialogTemplate') SetupboxdialogTemplate!: TemplateRef<any>;
  customerRefId: any;
  setupboxnumber: any;
  fieldexecutivename: any;
  msoname: any;
  filterValue: any;
  viewcustomermerchantfilter: any;
  details: any;
  date5: any;
  Setupboxvalue = "Setupbox Number";
  MsoValue = "MSO"
  filter:boolean=false;
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
currentfilval: any;
  showentries:boolean=false;
  totalCount: any;
  filter1:boolean=false;
   
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {

    if (this.roleName == 'Merchant Super admin') {

      this.valueCustomerAdd = 'Customer-Add';
      this.valueCustomerEdit = 'Customer-Edit'
      this.valueCustomerExport = 'Customer-Export'
      this.valueCustomerStatus = 'Customer-Status'
      this.valueCustomerView = 'Customer-View'
      this.valueCustomerhistory = 'Customer-History'

      this.valuecustomerimport = 'Customer-Download Customer Template'
      this.valuecustomerupload = 'Customer-Upload Customer File'
      this.valuecustomerExcelSetupbox = 'Customer-Download Setupbox Template'
      this.valuecustomerfileSetupbox = 'Customer-Upload Setupbox File'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Customer-Add') {
              this.valueCustomerAdd = 'Customer-Add'
            }
            if (this.actions == 'Customer-Edit') {
              this.valueCustomerEdit = 'Customer-Edit'
            }
            if (this.actions == 'Customer-Export') {
              this.valueCustomerExport = 'Customer-Export'
            }
            if (this.actions == 'Customer-Status') {
              this.valueCustomerStatus = 'Customer-Status'
            }
            if (this.actions == 'Customer-View') {
              this.valueCustomerView = 'Customer-View'
            }
            if (this.actions == 'Customer-Download Customer Template') {
              this.valuecustomerimport = 'Customer-Download Customer Template'
            }
            if (this.actions == 'Customer-Upload Customer File') {
              this.valuecustomerupload = 'Customer-Upload Customer File'
            }
            if (this.actions == 'Customer-Download Setupbox Template') {
              this.valuecustomerExcelSetupbox = 'Customer-Download Setupbox Template'
            }
            if (this.actions == 'Customer-Upload Setupbox File') {
              this.valuecustomerfileSetupbox = 'Customer-Upload Setupbox File'
            }
            if (this.actions == 'Customer-History') {
              this.valueCustomerhistory = 'Customer-History'
            }


          }
        }
      })
    }


    this.loadData(this.pageIndex, this.pageSize);


  }
  loadData(pageIndex: number, pageSize: number): void {
    this.service
      .ViewCustomerByMerchantDetails(this.merchantid, pageSize, pageIndex)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewcustomerdetailsbymerchant = res.response;



          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          // this.viewcustomerdetailsbymerchant.reverse();

          this.dataSource = new MatTableDataSource(this.viewcustomerdetailsbymerchant);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filter=true;
          this.filter1=false;
          this.showentries=false;
          
        }

        else if (res.flag == 2) {
          this.dataSource = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          this.filter=true;
          this.filter1=false;
          this.showentries=false;
          
        }

      })

  }
  toggleSelection(item: string): void {
    if (this.selectedItems[item]) {
      delete this.selectedItems[item];
    } else {
      this.selectedItems[item] = item;
    }
    this.copySelected();
  }
  isSelected(item: string): boolean {
    return !!this.selectedItems[item];
  }
  masterToggle(event: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.dataSource.data.forEach((row: any) => {
        this.selectedItems[row.customerReferenceId] =
          row.customerReferenceId;
      });
    } else {
      this.dataSource.data.forEach((row: any) => {
        delete this.selectedItems[row.customerReferenceId];
      });
    }
    this.copySelected();
  }
  masterToggleformso(event: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.dataSource.data.forEach((row: any) => {
        this.selectedItems[row.customerMsoId] =
          row.customerMsoId;
      });
    } else {
      this.dataSource.data.forEach((row: any) => {
        delete this.selectedItems[row.customerMsoId];
      });
    }
    this.copySelected();
  }
  copySelected(): void {
    // Functionality to copy selected items
    const selectedText = Object.keys(this.selectedItems).join(', ');
    navigator.clipboard.writeText(selectedText).then(() => {
      console.log('Copied to clipboard: ', selectedText);
    })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  }
  renderPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }
  changePageIndex(newPageIndex: number): void {
    this.pageIndex = newPageIndex;
    this.renderPage({
      pageIndex: newPageIndex,
      pageSize: this.pageSize,
      length: this.totalPages,
    } as PageEvent);
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
  Viewstatushistory(id:any){
    console.log(id);
    this.router.navigate([`dashboard/customer-status-history/${id}`], {
      queryParams: { Alldata: id },
    });
 
  }







  ActiveStatus(id: any, status: any) {
    this.dialog.open(CustomerStatusComponent,
      {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        data: {
          value: id,
          value1: status
        }
      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.loadData(this.pageIndex, this.pageSize);
      })
  }
  creates() {
    this.dialog.open(CustomerextrasetupboxbulkComponent,
      {
        disableClose: true,
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        position: { right: '0px' },

        width: '35%'

      }
    )
    this.dialog.afterAllClosed.subscribe(()=>{
        this.loadData(this.pageIndex, this.pageSize);
      })

  }

  setuphistory() {

    // this.router.navigate([`dashboard/setupboxhistory/${id}`], {
    //   queryParams: { Alldata: id },
    // });

    this.router.navigate([`dashboard/setupboxhistory`], {
      // queryParams: { Alldata: id },
    })
  }

  exportexcel() {
    this.service.merchantviewexcels(this.merchantid).subscribe((res: any) => {
      console.log("Response received:", res);

      if (res.flag == 1) {
        this.viewcustomerExport = res.response.CustomerStbModel.reverse();
        console.log(this.viewcustomerExport);

        let sno = 1;
        this.responseDataListnew = [];
        this.viewcustomerExport.forEach((element: any) => {
          let createdate = element.createdAt;
          this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();

          this.alcotChannelNames = [];
          this.alcotChannelNos = [];
          this.alcotChannelprice = [];

          this.bouquetNames = [];
          this.bouquetamount = [];
          this.lcopamount = [];
          this.lcopPlans = [];

          if (element.alcotList && element.alcotList.length > 0) {
            element.alcotList.forEach((alcot: any) => {
              this.alcotChannelNames.push(alcot.channelName);
              this.alcotChannelNos.push(alcot.channelNo);
              this.alcotChannelprice.push(alcot.price);
            });
          }
          if (element.bouquetExportList && element.bouquetExportList.length > 0) {
            element.bouquetExportList.forEach((bouquet: any) => {
              this.bouquetNames.push(
                bouquet.bouquetName
              );
              this.bouquetamount.push(bouquet.amount);
            });
          }
          if (element.lcopList && element.lcopList.length > 0) {
            element.lcopList.forEach((lcop: any) => {
              this.lcopPlans.push(lcop.planName);
              this.lcopamount.push(lcop.overallAmount);
            });
          }


          this.response = [];
          this.response.push(sno);
          this.response.push(element?.customerReferenceId);
          this.response.push(element?.customerMsoId);
          this.response.push(element?.customerName);
          this.response.push(element?.mobileNumber);
          this.response.push(element?.setupBoxNumber);
          this.response.push(element?.serviceProviderName);
          this.response.push(element?.doorNumber);
          this.response.push(element?.area);
          this.response.push(element?.streetName);
          this.response.push(element?.cityName);
          this.response.push(element?.pincodeName);
          this.response.push(element?.emailAddress);
          this.response.push(element?.branchStatus);
          this.response.push(element?.branchName);
          if (element.billingDate) {
            this.response.push(moment(element?.billingDate).format('DD/MM/yyyy').toString());
          }
          else {
            this.response.push('');

          }
          this.response.push(element?.dueStatus);
          // let billingdate = element.billingDate;
          // this.date5 = moment(billingdate).format('DD/MM/yyyy').toString(); 
          // this.response.push(this.date5);         
          if (element?.routeAssignedStatus == 0) {

            this.response.push('Not Assigned');

          }

          else {
            this.response.push('Assigned');

          }
          this.response.push(element?.merchantAdminName);
          this.response.push(element?.freeLine);


          this.response.push(this.alcotChannelNames.join(', '));
          this.response.push(this.alcotChannelNos.join(', '));
          this.response.push(this.alcotChannelprice.join(', '));
          this.response.push(this.bouquetNames.join(', '));
          this.response.push(this.bouquetamount.join(', '));
          this.response.push(this.lcopPlans.join(', '));
          this.response.push(this.lcopamount.join(', '));
          this.response.push(element?.totalPayableAmount)
          if (element?.activeStatus == '1') {
            this.response.push('Active');
          } else {
            this.response.push('Inactive');
          }
          this.response.push(element?.createdBy);
          this.response.push(this.date1);

          this.response.push(element?.modifiedBy);
          if (element.modifiedAt) {
            this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy hh:mm a').toString());
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
      'S.No',
      'Customer Id',
      'Customer MSOId',
      'Customer Name',
      'Mobile Number',
      'SetupBox Number',
      'Service Provider Name',
      'Door Number',
      'Area',
      'Street',
      'City',
      'Pincode',
      'Email',
      'Branch Status',
      'Branch Name',
      'Billing Date',
      'Due Status',
      'Route Assignded Status',
      'Field ExecutiveName',
      'Connection Type',
      'Channel Name',
      'Channel Number',
      'Channel Amount',
      'Bouquet Name',
      'Bouquet Amount',
      'lcop Plan Name',
      'Lcop Amount',
      'Total Payable Amount',
      'Status',
      'Created By',
      'Created At',
      'Modified By',
      'Modified At',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customer Onboard');
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
      let qty19 = row.getCell(20);
      let qty20 = row.getCell(21);
      let qty21 = row.getCell(22);
      let qty22 = row.getCell(23);
      let qty23 = row.getCell(24);
      let qty24 = row.getCell(25);
      let qty25 = row.getCell(26);
      let qty26 = row.getCell(27);
      let qty27 = row.getCell(28);
      let qty28 = row.getCell(29);
      let qty29 = row.getCell(30);
      let qty30 = row.getCell(31);

      let qty31 = row.getCell(32);

      let qty32 = row.getCell(33);



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
      qty19.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty20.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty21.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty22.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty23.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      qty24.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty25.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty26.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty27.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty28.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty29.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty30.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty31.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty32.border = {
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

      FileSaver.saveAs(blob, 'Customer Onboard.xlsx');
    });
  }


  excelexportDetails() {
    const header = [
      'customerReferenceId',
      'customerMsoId',
      'customerName',
      'mobileNumber',
      'alterMobileNumber',
      'age',
      'emailAddress',
      'doorNumber',
      'blockNumber', // Optional
      'flatNumber', // Optional
      'houseName', // Optional
      'apartmentName', // Optional
      'streetName',
      'area',
      'landmark', // Optional
      'countryName',
      'stateName',
      'cityName',
      'pincodeName',
      'freeLine',
      'billingDate',
      'advanceStatus',
      'advanceAmount',
      'branchStatus',
      'branchName',
      'setupBoxNumber',
      'channelName',
      'bouquetName',   //Broadcaster plan name
      'planName',    //Lcop plan name
 
      // Add any other fields as needed
    ];
 
    const data = this.responseDataListnew;
 
 
 
    // Prepare CSV content
    const csvContent = [];
 
    // Add header to CSV
    csvContent.push(header.map(item => `"${item}"`).join(','));
 
    data.forEach((d: any) => {
      // Prepare the row data
      const rowData = [
        `"${d.customerReferenceId}"` || '',
        d.customerMsoId || '',
        d.customerName || '',
        d.mobileNumber || '',
        d.alterMobileNumber || '',
        d.age || '',
        d.emailAddress || '',
        d.doorNumber || '',
        d.blockNumber || '',     // Optional
        d.flatNumber || '',      // Optional
        d.houseName || '',       // Optional
        d.apartmentName || '',  // Optional
        d.streetName || '',
        d.area || '',
        d.landmark || '',        // Optional
        d.countryName || '',
        d.stateName || '',
        d.cityName || '',
        d.pincodeName || '',
        d.freeLine || '',
        d.billingDate || '',
        // moment(d.billingDate).format('YYYY-MM-DD') || '',
        d.advanceStatus || '',
        d.advanceAmount || '',
        d.branchStatus || '',
        d.branchName || '',
        `"${d.setupBoxNumber}"` || '',
        Array.isArray(d.channelName) ? d.channelName.join(', ') : d.channelName,
        Array.isArray(d.bouquetName) ? d.bouquetName.join(', ') : d.bouquetName,
        Array.isArray(d.planName) ? d.planName.join(', ') : d.planName,
 
        // Add any other fields as needed
      ].map(item => `"${item.replace(/"/g, '""')}"`); // Escape double quotes
 
      csvContent.push(rowData.join(','));
    });
 
    // Create a Blob and save as CSV
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'Customer.csv');
  }
  create() {
    this.dialog.open(CustomerBulkuploadComponent,
      {
        disableClose: true,
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
        position: { right: '0px' },

        width: '35%'

      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.loadData(this.pageIndex, this.pageSize);
      })

  }
  reload() {
    window.location.reload()
  }

  excelsetupbox() {
    const header = [
      "mobileNumber",
      "billingDate",
      "setupBoxNumber",
      "channelName",
      "planName",
      "bouquetName",
    ];
 
    const data = this.responseDataListnew;
 
    // Prepare CSV content
    const csvContent = [];
 
    // Add header to CSV
    csvContent.push(header.map(item => `"${item}"`).join(','));
 
    data.forEach((d: any) => {
      // Prepare the row data
      const rowData = [
        d.mobileNumber || '',
       d.billingDate  || '',
        `"${d.setupBoxNumber}"` || '',
        Array.isArray(d.channelName) ? d.channelName.join(', ') : d.channelName,
        Array.isArray(d.planName) ? d.planName.join(', ') : d.planName,
        Array.isArray(d.bouquetName) ? d.bouquetName.join(', ') : d.bouquetName,
 
        // Add any other fields as needed
      ].map(item => `"${item.replace(/"/g, '""')}"`); // Escape double quotes
 
      csvContent.push(rowData.join(','));
    });
 
    // Create a Blob and save as CSV
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'SetupBox.csv');
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
  customeronboard(filterValue: string) {
    
    if (filterValue) {
 
      this.service.Customerduessearch(this.merchantid, filterValue,this.pageSize1,this.pageIndex1).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.viewcustomerdetailsbymerchant = res.response;
            this.viewcustomerdetailsbymerchant.reverse();
            this.dataSource = new MatTableDataSource(this.viewcustomerdetailsbymerchant);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.filter=false;
            this.totalPages1 = res.pagination.totalElements;
            this.totalpage1 = res.pagination.totalPages;
            this.currentpage1 = res.pagination.currentPage + 1;
            this.filter1=true;
            this.showentries=false;
          
 
          }
          else if (res.flag === 2) {
            // this.responsemessage = "No data For"
            this.searchPerformedvcjhvc = true;
            this.viewcustomerdetailsbymerchant = [];
            this.dataSource = new MatTableDataSource(this.viewcustomerdetailsbymerchant);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.totalPages1 = res.pagination.totalElements;
            this.totalpage1 = res.pagination.totalPages;
            this.currentpage1 = res.pagination.currentPage + 1;
            this.filter=false;
            this.filter1=true;
            this.showentries=false;
          
 
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    }
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
 
  }

  duegenerate() {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
      width: '30%'
    });
  }

  number(id: any,id2:any) {
    this.dialog.open(SetupboxnumberreadmoreComponent, {
      data: { value: id,value2:id2},
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
    });
  }
  mso(id: any) {
    this.dialog.open(MsoComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
    });
  }
  //CUtsomer
  shouldDisable(fieldName: string): boolean {
    const fields = [
      this.customerid,
      this.customermsoid,

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
      'customerid',
      'customermsoid',

    ];

    return fieldNames.indexOf(fieldName);
  }
  reset(): void {
    this.customerid = '';
    this.customermsoid = '';
  }
  // search for manual due
  // submit() {
  //   const customerIds = this.customerid ? this.customerid.split(',').map((item: string) => item.trim()) : [];
  //   const setupBoxIds = this.customermsoid ? this.customermsoid.split(',').map((item: string) => item.trim()) : [];

  //   let submitModel = { cusStbRefIds: [...customerIds, ...setupBoxIds] };

  //   this.service.customeridsearch(this.merchantid, submitModel).subscribe((res: any) => {
  //     if (res.flag == 1) {

  //       this.customerIdsArray = res.response.map((item: any) => item.customerId);
  //       this.customerindex = res.response.map((item: any, index: number) => index + 1);
  //       this.customerlength = this.customerindex.length

  //       console.log('Customer IDs:', this.customerIdsArray);
  //       console.log('Customer Index:', this.customerindex);

  //       this.dialogRef.close();
  //       this.dialog.open(ManualduesgenerateComponent, {
  //         data: {
  //           customerIdsList: this.customerIdsArray,
  //           customerIndexList: this.customerlength
  //         },
  //         disableClose: true,
  //         enterAnimationDuration: '500ms',
  //         exitAnimationDuration: '1000ms',
  //       });
  //     }
  //   });
  // }


  submit() {
    let submitmodel: duegenertes = {
      merchantId: this.merchantid,
      stbNumber: this.customermsoid,
    }
    this.service.customeridsearch(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      else {
        this.toastr.error(res.responseMessage)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
  }

  getDisplayText(setupBox: any): string {
    if (Array.isArray(setupBox) && setupBox.length > 0) {
      // If isFullPolicyVisible is false, return sliced setupBox up to the limit
      return this.isFullPolicyVisible ? setupBox.join(', ') : setupBox.slice(0, this.limit).join(', ');
    }
    return ''; // Return empty string if setupBox is empty or not an array
  }


  //Filter

  Filter(event: any) {
    console.log(event.target.value);
    this.filterValue = event.target.value;
    this.filterbymso();

  }

  filterbymso() {
    if (this.filterValue == 'Filterbymso') {
      this.dialogRef = this.dialog.open(this.MSOdialogTemplate, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        disableClose: true,
        position: { right: '0px' },
        width: '30%'
      });
    } else if (this.filterValue == 'Filterbysetupbox') {
      this.dialogRef = this.dialog.open(this.SetupboxdialogTemplate, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        disableClose: true,
        position: { right: '0px' },
        width: '30%'
      });
    }
  }

  shouldDisable1(fieldName: string): boolean {
    const fields = [
      this.msoname,
      this.fieldexecutivename,

    ];

    // Check if any field is filled except for the current field
    return (
      fields.filter(
        (value, index) => value && index !== this.getFieldIndex1(fieldName)
      ).length > 0
    );
  }

  private getFieldIndex1(fieldName: string): number {
    const fieldNames = [
      'msoname',
      'fieldexecutivename',

    ];

    return fieldNames.indexOf(fieldName);
  }

  reset1() {
    this.msoname = '';
    this.fieldexecutivename = '';
  }

  msosubmit() {

    const msovalue = this.msoname ? this.msoname.split(',').map((item: string) => item.trim()) : [];
    const fieldexecutivevalue = this.fieldexecutivename ? this.fieldexecutivename.split(',').map((item: string) => item.trim()) : [];

    let submitModel = {
      msoEmpId: [
        ...msovalue,
        ...fieldexecutivevalue
      ]

    };

    this.service.CustomerMSOSearch(this.merchantid,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
 
        this.FilterFlag = res.flag;
        this.viewcustomermerchantfilter = res.response;
        // this.totalPages = res.pagination.totalElements;
        // this.totalpage = res.pagination.totalPages;
        // this.currentpage = res.pagination.currentPage + 1;
        // this.viewcustomerdetailsbymerchant.reverse();
        this.dataSource = new MatTableDataSource(this.viewcustomermerchantfilter);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dialogRef.close();
        this.totalCount = this.viewcustomermerchantfilter.length;
     
          console.log(this.totalCount)
          this.showentries=true;
          this.filter=false;
          this.filter1=false;
       
      }
      else if (res.flag === 2) {
        this.viewcustomermerchantfilter = [];
        this.dataSource = new MatTableDataSource(this.viewcustomermerchantfilter);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dialogRef.close();
        this.totalCount = 0;
     
          console.log(this.totalCount)
          this.showentries=true;
          this.filter=false;
          this.filter1=false;
      }
    })
  }

  shouldDisable2(fieldName: string): boolean {
    const fields = [
      this.customerRefId,
      this.setupboxnumber,

    ];

    // Check if any field is filled except for the current field
    return (
      fields.filter(
        (value, index) => value && index !== this.getFieldIndex2(fieldName)
      ).length > 0
    );
  }

  private getFieldIndex2(fieldName: string): number {
    const fieldNames = [
      'customerRefId',
      'setupboxnumber',

    ];

    return fieldNames.indexOf(fieldName);
  }

  reset2() {
    this.customerRefId = '';
    this.setupboxnumber = '';
  }
  settopboxsubmit() {
    const custrefIdval = this.customerRefId ? this.customerRefId.split(' ').map((item: string) => item.trim()) : [];
    const setupboxnumberval = this.setupboxnumber ? this.setupboxnumber.split(' ').map((item: string) => item.trim()) : [];

    const concatenatedIds = [...custrefIdval, ...setupboxnumberval].join(' ');


    let submitModel = {
      cusStbRefIds: concatenatedIds

    };

    this.service.CustomerMerchantSearch(this.merchantid,submitModel).subscribe((res: any) => {
 
      if (res.flag == 1) {
 
        this.FilterFlag = res.flag;
        console.log(this.FilterFlag);
 
        this.viewcustomermerchantfilter = res.response;
        // this.totalPages = res.pagination.totalElements;
        // this.totalpage = res.pagination.totalPages;
        // this.currentpage = res.pagination.currentPage + 1;
        // this.viewcustomerdetailsbymerchant.reverse();
        this.dataSource = new MatTableDataSource(this.viewcustomermerchantfilter);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dialogRef.close();
        this.totalCount = this.viewcustomermerchantfilter.length;
     
        console.log(this.totalCount)
        this.showentries=true;
        this.filter=false;
        this.filter1=false;
      }
      else if (res.flag === 2) {
        this.viewcustomermerchantfilter = [];
        this.dataSource = new MatTableDataSource(this.viewcustomermerchantfilter);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dialogRef.close();
        this.totalCount = 0;
     
        console.log(this.totalCount)
        this.showentries=true;
        this.filter=false;
        this.filter1=false;
      }
    })
  }




  filterexport() {

    let sno = 1;
    this.responseDataListnew = [];
    this.viewcustomermerchantfilter?.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.customerReferenceId);
      this.response.push(element?.customerMsoId);
      this.response.push(element?.customerName);
      this.response.push(element?.mobileNumber);
      this.response.push(element?.setupBox);
      this.response.push(element?.serviceProvider);
      this.response.push(element?.doorNumber);
      this.response.push(element?.area);
      this.response.push(element?.streetName);
      this.response.push(element?.cityName);
      this.response.push(element?.pincodeName);
      this.response.push(element?.merchantAdminName);

      if (element?.status == '1') {
        this.response.push('Active');
      }
      else {
        this.response.push('Inactive')
      }

      if (element?.routeAssignedStatus == '1') {
        this.response.push('Assigned');
      }
      else {
        this.response.push('Not Assigned')
      }
      this.response.push(element?.merchantAdminName);


      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer1();

  }


  excelexportCustomer1() {
    const header = [
      "Sno",
      "CustomerReferenceId",
      "CustomerMsoId",
      "Name",
      "Mobilenumber",
      "Stbnumber",
      "Mso",
      "DoorNumber",
      "Area",
      "StreetName",
      "CityName",
      "PincodeName",
      "Fieldexecutivename",
      "Status",
      "RouteAssignedStatus",
      "RouteExecutiveName",
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('View Customer Filter');
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
      let qty7 = row.getCell(8);
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);
      let qty10 = row.getCell(11);
      let qty11 = row.getCell(12);
      let qty12 = row.getCell(13);
      let qty13 = row.getCell(14);
      let qty14 = row.getCell(15);
      let qty15 = row.getCell(16);


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
      qty15.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    }
    );
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'View Customer Filter.xlsx');
    });
  }

}
