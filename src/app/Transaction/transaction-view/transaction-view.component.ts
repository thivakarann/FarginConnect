import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { TransactionViewbyidComponent } from '../transaction-viewbyid/transaction-viewbyid.component';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { TransactionManualpayComponent } from '../transaction-manualpay/transaction-manualpay.component';
import { ReturnDuesComponent } from '../return-dues/return-dues.component';
import { PageEvent } from '@angular/material/paginator';
import { CommentbyComponent } from './commentby/commentby.component';
import { UpdateCusduesComponent } from '../update-cusdues/update-cusdues.component';
import { ManuvalpayWithoutOtpComponent } from '../manuvalpay-without-otp/manuvalpay-without-otp.component';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomerRefunds, DuePendingSetupbx, employeefilter, PaymentStatusSetupbx, PaymentStatusUpdate } from '../../fargin-model/fargin-model.module';
import { FormBuilder } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrl: './transaction-view.component.css'
})
export class TransactionViewComponent implements OnInit {
  merchantId: any = localStorage.getItem('merchantId')
  dataSource: any;
  displayedColumns: any[] = ['sno', 'customerReferenceId', 'transactionId', 'setupBoxNumber', 'serviceProviderName', 'customername', "mobileNumber", 'merchantAdminId', 'paymentMethod', 'status',"branchName",'createdat', 'paidat', 'amount', 'updateamount', 'view', 'Receipt', 'manualpayment', 'refund', "logsview", 'dues', 'reverse', 'commentby',];
  transactionValue: any;
  transactionValue1: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseDataListnew: any[] = [];
  response: any[] = []
  date1: any;
  duesValue: any;
  valueduesexport: any;
  valueduesgenerate: any;
  valueduesview: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  imageUrl: any;
  DocView: boolean = false;
  valueduesReceipt: any;
  valueduesmanual: any;
  valueduesRefund: any;
  roleName = localStorage.getItem('roleName')
  fullname: any = localStorage.getItem('fullname')
  valueReverseDues: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  transactionValueexport: any;
  isFullPolicyVisible: boolean = false;
  limit: number = 1;
  date2: any;
  searchPerformed: boolean = false;
  manuvalpaymentstatus: any = localStorage.getItem('customerManualStatus');
  selection = new SelectionModel<any>(true, []);
  selectedCustomerIds: string[] = [];
  selectedItems: { [key: string]: string } = {};
  dialogRef: any;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('dialogcustomrangeTemplate')
  dialogcustomrangeTemplate!: TemplateRef<any>;
  @ViewChild('dialogpaymentTemplate') dialogpaymentTemplate!: TemplateRef<any>;

  @ViewChild('SetupboxpaymentStatus') SetupboxpaymentStatus!: TemplateRef<any>;
  @ViewChild('updatepaymentStatus') updatepaymentStatus!: TemplateRef<any>;
  @ViewChild('paidcustomrange') paidcustomrange!: TemplateRef<any>;
  @ViewChild('unpaidcustomrange') unpaidcustomrange!: TemplateRef<any>;
  @ViewChild('duecancelcustomrange') duecancelcustomrange!: TemplateRef<any>;

  stbnumber: any;
  stbNumbers: any = FormGroup;
  stbNumberscustom: any = FormGroup;
  stbNumberspayment: any = FormGroup;
  paymentstatusform: any = FormGroup;
  Paidcustomrangeform: any = FormGroup;
  UnPaidcustomrangeform: any = FormGroup;
  duecancellcustomrangeform:any=FormGroup;

  stbNumbersArray: any[] = [];
  stbNumbersArray1: any[] = [];
  stbNumbersArray2: any[] = [];
  stbNumbersArray3: any[] = [];

  datefrom: any;
  dateto: any;
  @ViewChild('filterbyemployees') filterbyemployees!: TemplateRef<any>;

  fromdates: any;
  todates: any;
  status: any;
  filteremployeepayment: any = FormGroup;
  @ViewChild('headerCheckbox', { static: false }) headerCheckbox: ElementRef<HTMLInputElement> | undefined;
  checked: boolean = false;

  filter: boolean = false;
  filter1: boolean = false;
 
  activemployee: any;
  valueduesfilter: any;
  valueduesFilterExportt: any;
  valueduesLogs: any;
  Check: boolean = false;
  valueduesUpdate:any;
  valuedueslogview:any;
      
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;

  currentfilval:any;
  totalCount: any;
  paidfilter:boolean=false;

  constructor(private router: Router,
    private service: FarginServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private clipboard: Clipboard,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {


    this.stbNumbers = this.fb.group({
      stb: ['', [Validators.required]],
    });

    this.stbNumberscustom = this.fb.group({
      setupboxnum: ['', [Validators.required]],
      fromdate: ['', [Validators.required]],
      todate: ['', [Validators.required]],
    });

    this.stbNumberspayment = this.fb.group({
      setupboxnumber: ['', [Validators.required]],
      paymentstatus: ['', [Validators.required]],
      fromdatepaymnet: ['', [Validators.required]],
      todatepaymnet: ['', [Validators.required]],
    });

    this.paymentstatusform = this.fb.group({
      setupboxnumbers: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      check: [{ value: false, disabled: true }, Validators.requiredTrue]
    });
    this.paymentstatusform.valueChanges.subscribe(() => {
      this.toggleCheckbox();
    });
    this.filteremployeepayment = this.fb.group({
      employeeview: ['', [Validators.required]],
      paymentstatusemployee: ['', [Validators.required]],
      fromdateemployee: ['', [Validators.required]],
      todateemployee: ['', [Validators.required]],
    });


    this.Paidcustomrangeform = this.fb.group({
      fromdatecustrangepaid: ['', [Validators.required]],
      todatecustrangepaid: ['', [Validators.required]],
    });


    this.UnPaidcustomrangeform = this.fb.group({
      fromdatecustrangeunpaid: ['', [Validators.required]],
      todatecustrangeunpaid: ['', [Validators.required]],
    });
    this.duecancellcustomrangeform = this.fb.group({
      fromdatecustrangeduecancel: ['', [Validators.required]],
      todatecustrangeduecancel: ['', [Validators.required]],
    });
    this.loadData(this.pageIndex, this.pageSize);

    this.service.viewactiveemployes(this.merchantId).subscribe((res: any) => {
      this.activemployee = res.response;

    })

  }
  toggleCheckbox() {
    if (this.paymentstatusform.get('setupboxnumbers').valid && this.paymentstatusform.get('Status').valid) {
      this.paymentstatusform.get('check').enable();
    }
    else {
      this.paymentstatusform.get('check').disable();
    }
  }
  get stb() {
    return this.stbNumbers.get('stb');
  }

  get setupboxnum() {
    return this.stbNumberscustom.get('setupboxnum');
  }

  get fromdate() {
    return this.stbNumberscustom.get('fromdate');
  }

  get todate() {
    return this.stbNumberscustom.get('todate');
  }

  get setupboxnumber() {
    return this.stbNumberspayment.get('setupboxnumber');
  }

  get paymentstatus() {
    return this.stbNumberspayment.get('paymentstatus');
  }
  get fromdatepaymnet() {
    return this.stbNumberspayment.get('fromdatepaymnet');
  }

  get todatepaymnet() {
    return this.stbNumberspayment.get('todatepaymnet');
  }

  get setupboxnumbers() {
    return this.paymentstatusform.get('setupboxnumbers');
  }

  get Status() {
    return this.paymentstatusform.get('Status');
  }
  get paymentstatusemployee() {
    return this.filteremployeepayment.get('paymentstatusemployee');
  }
  get employeeview() {
    return this.filteremployeepayment.get('employeeview');
  }
  get fromdateemployee() {
    return this.filteremployeepayment.get('fromdateemployee');
  }
  get todateemployee() {
    return this.filteremployeepayment.get('todateemployee');
  }


  // paid customrange
  get fromdatecustrangepaid() {
    return this.Paidcustomrangeform.get('fromdatecustrangepaid');
  }
  get todatecustrangepaid() {
    return this.Paidcustomrangeform.get('todatecustrangepaid');
  }


  //unpaid customrange
  get fromdatecustrangeunpaid() {
    return this.UnPaidcustomrangeform.get('fromdatecustrangeunpaid');
  }
  get todatecustrangeunpaid() {
    return this.UnPaidcustomrangeform.get('todatecustrangeunpaid');
  }

  //due customrange
  get fromdatecustrangeduecancel() {
    return this.duecancellcustomrangeform.get('fromdatecustrangeduecancel');
  }
  get todatecustrangeduecancel() {
    return this.duecancellcustomrangeform.get('todatecustrangeduecancel');
  }
 

  loadData(pageIndex: number, pageSize: number): void {
    this.service
      .transactionView(this.merchantId, pageSize, pageIndex)
      .subscribe((res: any) => {
        if (res.flag === 1) {
          this.transactionValue = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          this.dataSource = new MatTableDataSource(this.transactionValue);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.filter = true;
          this.filter1=false;
        } else if (res.flag === 2) {
          this.dataSource = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          this.filter = true;
          this.filter1=false;

        }
      });
    this.loadRolePermissions();
  }
  loadRolePermissions(): void {
    if (this.roleName === 'Merchant Super admin') {
      this.valueduesexport = 'Customer dues-Export';
      this.valueduesview = 'Customer dues-View';
      this.valueduesReceipt = 'Customer dues-Receipt';
      this.valueduesmanual = 'Customer dues-Manual Payment';
      this.valueduesRefund = 'Customer dues-Refund';
      this.valueReverseDues = 'Customer dues-Reverse Dues';
      this.valueduesLogs = 'Customer dues-Audit Logs'
      this.valueduesfilter = 'Customer dues-Filter'
      this.valueduesFilterExportt = 'Customer dues-Filter Export'
      this.valueduesUpdate = 'Customer dues-Update Amount'
      this.valuedueslogview = 'Customer dues-Logs View'
    } else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {
        if (res.flag === 1) {
          this.getdashboard = res.response?.merchantSubPermission;
          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions;
            this.setRolePermissions(this.actions);
          }
        }
      });
    }
  }
  setRolePermissions(actions: string): void {
    if (actions === 'Customer dues-Export') {
      this.valueduesexport = 'Customer dues-Export';
    }
    if (actions === 'Customer dues-View') {
      this.valueduesview = 'Customer dues-View';
    }
    if (actions === 'Customer dues-Receipt') {
      this.valueduesReceipt = 'Customer dues-Receipt';
    }
    if (actions === 'Customer dues-Manual Payment') {
      this.valueduesmanual = 'Customer dues-Manual Payment';
    }
    if (actions === 'Customer dues-Refund') {
      this.valueduesRefund = 'Customer dues-Refund';
    }
    if (actions === 'Customer dues-Reverse Dues') {
      this.valueReverseDues = 'Customer dues-Reverse Dues';
    }
    if (actions === 'Customer dues-Audit Logs') {
      this.valueduesLogs = 'Customer dues-Audit Logs';
    }

    if (actions === 'Customer dues-Filter') {
      this.valueduesfilter = 'Customer dues-Filter';
    }

    if (actions === 'Customer dues-Filter Export') {
      this.valueduesFilterExportt = 'Customer dues-Filter Export';
    }

    if (actions === 'Customer dues-Update Amount') {
      this.valueduesUpdate = 'Customer dues-Update Amount';
    }

    if (actions === 'Customer dues-Logs View') {
      this.valuedueslogview = 'Customer dues-Logs View';
    }



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
        this.selectedItems[row.customerId.customerReferenceId] =
          row.customerId.customerReferenceId;
      });
    } else {
      this.dataSource.data.forEach((row: any) => {
        delete this.selectedItems[row.customerId.customerReferenceId];
      });
    }
    this.copySelected();
  }
  masterToggleSetupBox(event: any): void {
    const checked = event.target.checked;

    if (checked) {
      this.dataSource.data.forEach((row: any) => {
        this.selectedItems[row.customerStbId.stbId.setupBoxNumber] = row.customerStbId.stbId.setupBoxNumber;
      });
    } else {
      this.dataSource.data.forEach((row: any) => {
        delete this.selectedItems[row.customerStbId.stbId.setupBoxNumber];
      });
    } this.copySelected();
  }
  masterToggleMso(event: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.dataSource.data.forEach((row: any) => {
        this.selectedItems[
          row.customerStbId.stbId.service.serviceProviderName
        ] = row.customerStbId.stbId.service.serviceProviderName;
      });
    } else {
      this.dataSource.data.forEach((row: any) => {
        delete this.selectedItems[
          row.customerStbId.stbId.service.serviceProviderName
        ];
      });
    }
    this.copySelected();
  }
  // copySelected(): void {
  //   const selectedText = Object.keys(this.selectedItems).join(', ');
  //   if (selectedText) {
  //     navigator.clipboard.writeText(selectedText).then(() => {
  //       this.toastr.success('Copied Successfully');
  //     }).catch(err => {
  //       this.toastr.error('Could not copy text');
  //       console.error('Could not copy text: ', err);
  //     });
  //   } else {
  //   }
  // }
  copySelected(): void {
    const selectedData = Object.values(this.selectedItems);
    const formattedData = selectedData.join('\n'); // Join with new line for vertical alignment this.copyToClipboard(formattedData);    if (selectedText) {
      navigator.clipboard.writeText(formattedData).then(() => {
    this.toastr.success('Copied Successfully');
  })
  .catch(err => {
     this.toastr.error('Could not copy text');
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  dues(id: any) {
    this.dialog.open(ReturnDuesComponent, {
      width: '80vw',// Use percentage to make it responsive
      maxWidth: '400px',
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    })
  }



  refund(viewall: any) {
    let submitModel:CustomerRefunds = {
      payId: viewall.customerPayId,
      customerId: viewall.customerId.customerId,
      amount: viewall.paidAmount
    } 
   
    this.service.CutsomerRefunds(submitModel).subscribe((res: any) => {
      if (res.response.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
      }
      else {
        this.toastr.error(res.responseMessage
        )
      }
    })
  }

  Updatedue(id: any) {
    this, this.dialog.open(UpdateCusduesComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true,
      data: { value: id },
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.loadData(this.pageIndex, this.pageSize);
    })
  }

  comment(id: any) {
    this.dialog.open(CommentbyComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
    });
  }


  // generate() {
  //   this.service.generateDues(this.merchantId).subscribe((res: any) => {
  //     this.duesValue = res.response;
  //    
  //     if (res.flag == 1) {
  //       // this.toastr.success('Dues generated Successfully!')
  //     }

  //   })
  // }

  manuvalpayments(id: any) {
    if (this.manuvalpaymentstatus == 1) {
      this.dialog.open(TransactionManualpayComponent, {
        data: { value: id },
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.loadData(this.pageIndex, this.pageSize);
      })
    }

    else if (this.manuvalpaymentstatus == 0) {
      this.dialog.open(ManuvalpayWithoutOtpComponent, {
        data: { value: id },
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.loadData(this.pageIndex, this.pageSize);
      }) 
    }
  }


  logs() {
    this.router.navigateByUrl('dashboard/cusduelogsbymerchant')
  }

  logsview(id: any) {
    this.router.navigate([`dashboard/updated-duesdetails`], {
      queryParams: { Alldata: id },
    })

  }






  exportexcel() {
    this.service.transactionViewExport(this.merchantId).subscribe((res: any) => {
      this.transactionValueexport = res.response;
      if (res.flag == 1) {


        let sno = 1;
        this.responseDataListnew = [];
        this.transactionValueexport?.forEach((element: any) => {
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.customerReferenceId || element?.customerId?.customerId);
          this.response.push(element?.pgPaymentId || '-');
          this.response.push(element?.customerStbId?.stbId?.setupBoxNumber);

          this.response.push(element?.customerStbId?.stbId?.service?.serviceProviderName);

          this.response.push(element?.customerName || element?.customerId?.customerName);
          this.response.push(element?.mobileNumber || element?.customerId?.mobileNumber);
          this.response.push(element?.customerId?.merchantAdminId?.adminName || element?.adminName);
          this.response.push(element?.paymentMethod || '--');

          this.response.push(element?.paymentStatus || '--');
          if (element.createdDateTime) {
            this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else {
            this.response.push('');
          }

          if (element.paymentDateTime) {
            this.response.push(
              moment(element?.paymentDateTime)
                .format('DD/MM/yyyy hh:mm a')
                .toString()
            );
          } else {
            this.response.push('');
          }
          this.response.push(element?.paidAmount);

          if (element?.dueStatus == '1') {
            this.response.push('Dues Reversed');
          } else {
            this.response.push('Not Reversed');
          }
          this.response.push(element?.commentsBy);
          sno++;
          this.responseDataListnew.push(this.response);
        });
        this.excelexportCustomer();
      }
    })
  }

  excelexportCustomer() {
    const header = [
      'S No',
      'Customer ReferenceId',
      'Transaction Id',
      'SetupBox Number',
      'Service Provider Name',
      'Customer Name',
      "Mobile Number",
      'Field Executive Name',
      "Payment Method",
      'Status',
      'Created At',
      'Paid At',
      'Amount',
      'Reverse Status',
      'Comment By'
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customer Dues Reports');
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

    }
    );
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Customer Dues.xlsx');
    });
  }


  view(id: any) {
    this.dialog.open(TransactionViewbyidComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }

  reload() {
    window.location.reload()
  }
  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }

  customerpay(filterValue: string) {
  
    if (filterValue) {

    this.service.Customerdue(this.merchantId, filterValue,this.pageSize1, this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transactionValue = res.response;
          this.transactionValue.reverse();
          this.dataSource = new MatTableDataSource(this.transactionValue);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter = false;
          this.filter1=true;
        }
        else if (res.flag === 2) {
          this.transactionValue = [];
          this.dataSource = new MatTableDataSource(this.transactionValue);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter = false;
          this.filter1=true;
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
  PaidUnpaidFilter(event: any) {
    console.log(event.target.value);
    if (event.target.value == '1') {
      this.service
        .FilterUnpaidPaid(this.merchantId, 1)
        .subscribe((res: any) => {
          if(res.flag==1){        
            this.transactionValue1 = res.response;
            this.totalCount = this.transactionValue1.length;
        
            console.log(this.totalCount)
            this.dataSource = new MatTableDataSource(this.transactionValue1);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.filter = false;
            this.filter1 = false;
            this.paidfilter=true
          }
          else if (res.flag === 2) {
            this.totalCount =0;
            this.dataSource = new MatTableDataSource([]);
            this.dialogRef.close();
            this.filter = false;
            this.filter1 = false;
            this.paidfilter=true;
          }
        })
    }
    if (event.target.value == '0') {
      this.service
        .FilterUnpaidPaid(this.merchantId, 0)
        .subscribe((res: any) => {
          if(res.flag==1){        
            this.transactionValue1 = res.response;
            this.totalCount = this.transactionValue1.length;
        
            console.log(this.totalCount)
            this.dataSource = new MatTableDataSource(this.transactionValue1);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.filter = false;
            this.filter1 = false;
            this.paidfilter=true
          }
          else if (res.flag === 2) {
            this.totalCount =0;
            this.dataSource = new MatTableDataSource([]);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.totalPages;
            this.currentpage = res.pagination.currentPage + 1;
            this.dialogRef.close();
            this.filter = false;
            this.filter1 = false;
            this.paidfilter=true;
          }


                });
    }

    if (event.target.value == 'Due Pending') {
      this.duePending();
    }

    if (event.target.value == 'Due CustomerRange') {
      this.duePendingCustomrange();
    }

    if (event.target.value == 'Setupbox PaymentStatus') {
      this.PaymentSetupboxCustomrange();
    }
    if (event.target.value == 'Update Payment Status') {
      this.UpdatePaymentStatus();
    }
    if (event.target.value == 'filterbyemployee') {
      this.filterbyemployee();
    }
    if (event.target.value == 'Paid CustomRange') {
      this.paidcustrange();
    }

    if (event.target.value == 'Unpaid CustomRange') {
      this.unpaidcustrange();
    }
    if (event.target.value == 'Due Cancelled') {
      this.service.DueCancelledGetAll(this.merchantId).subscribe((res:any)=>{
        if(res.flag==1){        
          this.transactionValue1 = res.response;
          this.totalCount = this.transactionValue1.length;
      
          console.log(this.totalCount)
          this.dataSource = new MatTableDataSource(this.transactionValue1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.filter = false;
          this.filter1 = false;
          this.paidfilter=true
        }
        else if (res.flag === 2) {
          this.totalCount =0;
          this.dataSource = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          this.dialogRef.close();
          this.filter = false;
          this.filter1 = false;
          this.paidfilter=true;
        }     
      })
    }
 
    if (event.target.value == 'DueCancel CustomerRange') {
      this.duecancelledcustomrange();
    }
 

 

  }
  duecancelledcustomrange(){
    this.dialogRef = this.dialog.open(this.duecancelcustomrange, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
    });
  }

  unpaidcustrange() {
    this.dialogRef = this.dialog.open(this.unpaidcustomrange, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
      width: '30%'
    });
  }
  paidcustrange() {
    this.dialogRef = this.dialog.open(this.paidcustomrange, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
      width: '30%'
    });
  }
  filterbyemployee() {
    this.dialogRef = this.dialog.open(this.filterbyemployees, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
      width: '30%'
    });
  }
  duePending() {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
    });
  }
  submit() {
    const stbValue = this.stbNumbers.get('stb').value;
    // this.stbNumbersArray = stbValue.split(',').map((item: any) => item.trim());
    const stbInputsString = stbValue.split(/[ ,]+/).map((item: any) => item.trim()).join()
    let submitModel: DuePendingSetupbx = { stbInputs: stbInputsString };
    this.service
      .DuePendingSetupBoxFilter(this.merchantId, submitModel)
      .subscribe((res: any) => {
        if(res.flag==1){        
          this.transactionValue1 = res.response;
          this.totalCount = this.transactionValue1.length;
      
          console.log(this.totalCount)
          this.dataSource = new MatTableDataSource(this.transactionValue1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.filter = false;
          this.filter1 = false;
          this.paidfilter=true
          this.dialogRef.close();

        }
        else if (res.flag === 2) {
          this.totalCount =0;
          this.dataSource = new MatTableDataSource([]);
          this.dialogRef.close();
          this.filter = false;
          this.filter1 = false;
          this.paidfilter=true;
        }

      });
  }

  resetForm(): void {
    this.stb.reset();
  }

  resetFormpaysubmit(): void {
    this.stbNumberspayment.reset();
  }
  paymentstatussubmitreset(): void {
    this.paymentstatusform.reset({
      check: false
      // Reset checkbox to false (unchecked)
    });
  }
  filteremployeepayments(): void {
    this.filteremployeepayment.reset();
  }

  duePendingCustomrange() {
    this.dialogRef = this.dialog.open(this.dialogcustomrangeTemplate, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
    });
  }

  customsubmit() {
    const stbValue1 = this.stbNumberscustom.get('setupboxnum').value;
    // this.stbNumbersArray1 = stbValue1
    // .split(',')
    // .map((item: any) => item.trim());
    const stbInputs = stbValue1.split(/[ ,]+/).map((item: any) => item.trim()).join()
    this.fromdates = this.stbNumberscustom.get('fromdate').value;
    this.todates = this.stbNumberscustom.get('todate').value;

    let submitModel: DuePendingSetupbx = {
      stbInputs: stbInputs,
    };
    this.service
      .DuePendingCustomRange(
        this.merchantId,
        this.fromdates,
        this.todates,
        submitModel
      )
      .subscribe((res: any) => {
        if(res.flag==1){        
          this.transactionValue1 = res.response;
          this.totalCount = this.transactionValue1.length;
      
          console.log(this.totalCount)
          this.dataSource = new MatTableDataSource(this.transactionValue1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.filter = false;
          this.filter1 = false;
          this.paidfilter=true
          this.dialogRef.close();

        }
        else if (res.flag === 2) {
          this.totalCount =0;
          this.dataSource = new MatTableDataSource([]);
          this.dialogRef.close();
          this.filter = false;
          this.filter1 = false;
          this.paidfilter=true;
        }

      });
  }

  resetFormcustomrange(): void {

    this.stbNumberscustom.reset()
  }

  PaymentSetupboxCustomrange() {
    this.dialogRef = this.dialog.open(this.SetupboxpaymentStatus, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
    });
  }

  paysubmit() {
    const stbValue2 = this.stbNumberspayment.get('setupboxnumber').value;
    // this.stbNumbersArray2 = stbValue2
    // .split(',')
    // .map((item: any) => item.trim());
    const stbInputspay = stbValue2.split(/[ ,]+/).map((item: any) => item.trim()).join()

    this.datefrom = this.stbNumberspayment.get('fromdatepaymnet').value;
    this.dateto = this.stbNumberspayment.get('todatepaymnet').value;

    let submitModel: PaymentStatusSetupbx = {
      stbInputs: stbInputspay,
      paymentStatus: this.paymentstatus?.value,
    };
    this.service
      .SetupboxpaymentStatus(
        this.merchantId,
        this.datefrom,
        this.dateto,
        submitModel
      )
      .subscribe((res: any) => {
        if(res.flag==1){        
          this.transactionValue1 = res.response;
          this.totalCount = this.transactionValue1.length;
      
          console.log(this.totalCount)
          this.dataSource = new MatTableDataSource(this.transactionValue1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.filter = false;
          this.filter1 = false;
          this.paidfilter=true
          this.dialogRef.close();

        }
        else if (res.flag === 2) {
          this.totalCount =0;
          this.dataSource = new MatTableDataSource([]);
          this.dialogRef.close();
          this.filter = false;
          this.filter1 = false;
          this.paidfilter=true;
        }

      });
  }


  UpdatePaymentStatus() {
    this.dialogRef = this.dialog.open(this.updatepaymentStatus, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
    });
  }
  // paymentstatussubmit(): void {
  //   const stbValue3 = this.paymentstatusform.get('setupboxnumbers').value;
  //   this.stbNumbersArray3 = stbValue3
  //     .split(',')
  //     .map((item: string) => item.trim());
  //   const payIds = this.stbNumbersArray3
  //     .map((stbNumber) => {
  //       const found = this.dataSource.data.find(
  //         (item: {
  //           customerStbId: { stbId: { setupBoxNumber: string } };
  //           customerPayId: number;
  //         }) => item.customerStbId.stbId.setupBoxNumber === stbNumber
  //       );
  //       return found ? found.customerPayId : null;
  //     })
  //     .filter((id) => id !== null);
  //   let submitModel: PaymentStatusUpdate = {
  //     payId: payIds as number[],
  //     paymentStatus: this.paymentstatusform.get('Status').value,
  //   };
  //   this.service
  //     .UpdatePaymentStatus(this.merchantId, submitModel)
  //     .subscribe((res: any) => {

  //       if (res.flag === 1) {
  //         this.transactionValue = res.response;
  //         this.dataSource = new MatTableDataSource(this.transactionValue);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //         this.dialogRef.close();
  //         this.toastr.success(res.responseMessage);
  //         this.dialogRef.close();
  //         this.filter = false;
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 2000);
  //       } else {
  //         this.toastr.error(res.responseMessage);
  //       }
  //     });
  // }
  // paymentstatussubmit(): void {
  //   const stbValue3 = this.paymentstatusform.get('setupboxnumbers').value;


  //   this.stbNumbersArray3 = stbValue3.split(/[ ,]+/).map((item: any) => item.trim()).filter((item: any) => item);

  //   // Find the payIds based on the input
  //   const payIds = this.stbNumbersArray3
  //     .map((stbNumber: string) => {
  //       const found = this.dataSource.data.find(
  //         (item: {
  //           customerStbId: { stbId: { setupBoxNumber: string } };
  //           customerPayId: number;
  //         }) => item.customerStbId.stbId.setupBoxNumber === stbNumber
  //       );
  //       return found ? found.customerPayId : null;
  //     })
  //     .filter((id: number | null) => id !== null);

  //   let submitModel: PaymentStatusUpdate = {
  //     payId: payIds as number[],
  //     paymentStatus: this.paymentstatusform.get('Status').value,
  //   };

  //   this.service
  //     .UpdatePaymentStatus(this.merchantId, submitModel)
  //     .subscribe((res: any) => {
  //       if (res.flag === 1) {
  //         this.transactionValue1 = res.response;
  //         this.dataSource = new MatTableDataSource(this.transactionValue1);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //         this.dialogRef.close();
  //         this.toastr.success(res.responseMessage);
  //         this.filter = false;
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 2000);
  //       } else {
  //         this.toastr.error(res.responseMessage);
  //       }
  //     });
  // }

  paymentstatussubmit(): void {
    const stbValue3 = this.paymentstatusform.get('setupboxnumbers').value;
 
    // Split the setup box numbers by space, comma, or newline and filter out empty items
    this.stbNumbersArray3 = stbValue3.split(/[\s,]+/).map((item: any) => item.trim()).filter((item: any) => item);
    console.log(this.stbNumbersArray3);
 
    // Find the payIds based on the input
    const payIds = this.stbNumbersArray3.map((stbNumber: string) => {
      const found = this.dataSource.data.find(
        (item: {
          customerStbId: { stbId: { setupBoxNumber: string } };
          setupBoxNumber?: string;
          customerPayId: number;
        }) => item.customerStbId.stbId.setupBoxNumber === stbNumber || item.setupBoxNumber === stbNumber
      );
      return found ? found.customerPayId : null;
    }).filter((id: number | null) => id !== null) as number[];
 
    console.log('Pay IDs:', payIds); // Debugging step
 
    // if (payIds.length === 0) {
    //   this.toastr.error('The given Setup Box Number was not found');
    //   return;
    // }
 
    let submitModel: PaymentStatusUpdate = {
      payId: payIds,
      paymentStatus: this.paymentstatusform.get('Status').value,
      updatedBy:this.fullname
    };
 
    console.log('Submit Model:', submitModel); // Debugging step
 
    this.service.UpdatePaymentStatus(this.merchantId, submitModel).subscribe({
      next: (res: any) => {
        if (res.flag === 1) {
          this.transactionValue1 = res.response;
          this.dataSource = new MatTableDataSource(this.transactionValue1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dialogRef.close();
          this.toastr.success(res.responseMessage);
          // this.filter = false;
          // this.filter1=false;
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          this.toastr.error(res.responseMessage);
        }
      },
      error: (err: any) => {
        this.toastr.error('Error updating payment status');
        console.error('Update Payment Status Error:', err); // Debugging step
      }
    });
  }

  employeepaymentsubmit() {

    let submitModel: employeefilter = {
      paymentStatus: this.paymentstatusemployee?.value,
    };
    this.service
      .filteremployeepayment(
        this.employeeview?.value,
        this.fromdateemployee?.value,
        this.todateemployee?.value,
        submitModel
      )
      .subscribe((res: any) => {
        if(res.flag==1){        
          this.transactionValue1 = res.response;
          this.totalCount = this.transactionValue1.length;
      
          console.log(this.totalCount)
          this.dataSource = new MatTableDataSource(this.transactionValue1);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.filter = false;
          this.filter1 = false;
          this.paidfilter=true
          this.dialogRef.close();

        }
        else if (res.flag === 2) {
          this.totalCount =0;
          this.dataSource = new MatTableDataSource([]);
       
          this.dialogRef.close();
          this.filter = false;
          this.filter1 = false;
          this.paidfilter=true;
        }

      });
  }

  resetSelection() { this.selectedItems = {}; }

  filterexport() {
    let sno = 1;
    this.responseDataListnew = [];
    this.transactionValue1?.forEach((element: any) => {

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.customerReferenceId || element?.customerId?.customerId);
      this.response.push(element?.pgPaymentId || '-');
      this.response.push(element?.customerStbId?.stbId?.setupBoxNumber || element?.setupBoxNumber);

      this.response.push(element?.customerStbId?.stbId?.service?.serviceProviderName || element?.serviceProviderName);

      this.response.push(element?.customerName || element?.customerId?.customerName);
      this.response.push(element?.mobileNumber || element?.customerId?.mobileNumber);
      this.response.push(element?.customerId?.merchantAdminId?.adminName || element?.adminName);
      this.response.push(element?.paymentMethod || '--');

      this.response.push(element?.paymentStatus || '--');
      if (element.createdDateTime) {
        this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
      }
      else {
        this.response.push('');
      }

      if (element.paymentDateTime) {
        this.response.push(
          moment(element?.paymentDateTime)
            .format('DD/MM/yyyy hh:mm a')
            .toString()
        );
      } else {
        this.response.push('');

      }
      this.response.push(element?.paidAmount);

      if (element?.dueStatus == '2') {
        this.response.push('Dues Reversed');
      } else {
        this.response.push('Not Reversed');
      }
      this.response.push(element?.commentsBy);


      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer1();


  }


  excelexportCustomer1() {
    const header = [
      'S No',
      'Customer ReferenceId',
      'Transaction Id',
      'SetupBox Number',
      'Service Provider Name',
      'Customer Name',
      "Mobile Number",
     
      'Field Executive Name',
      "Payment Method",
      'Status',
      'Created At',
      'Paid At',
      'Amount',
      'Reverse Status',
      'Comment By'
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customer Dues Filter');
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
    });
    worksheet.getColumn(1).protection = { locked: true, hidden: true };
    worksheet.getColumn(2).protection = { locked: true, hidden: true };
    worksheet.getColumn(3).protection = { locked: true, hidden: true };
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Customer Dues Filter.xlsx');
    });
  }



  paidcustrangesubmit() {
    this.service.PaidUnPaidCustomRangeFilter(this.merchantId, this.fromdatecustrangepaid?.value, this.todatecustrangepaid?.value, 1).subscribe((res: any) => {
      if(res.flag==1){        
        this.transactionValue1 = res.response;
        this.totalCount = this.transactionValue1.length;
        console.log(this.totalCount)
        this.dataSource = new MatTableDataSource(this.transactionValue1);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filter = false;
        this.filter1 = false;
        this.paidfilter=true
        this.dialogRef.close();

      }
      else if (res.flag === 2) {
        this.totalCount =0;
        this.dataSource = new MatTableDataSource([]);
        this.dialogRef.close();
        this.filter = false;
        this.filter1 = false;
        this.paidfilter=true;
      }

    });
  }

  paidcustrangereset() {
    this.Paidcustomrangeform.reset()

  }

  unpaidcustrangesubmit() {
    this.service.PaidUnPaidCustomRangeFilter(this.merchantId, this.fromdatecustrangeunpaid?.value, this.todatecustrangeunpaid?.value, 0).subscribe((res: any) => {
      if(res.flag==1){        
        this.transactionValue1 = res.response;
        this.totalCount = this.transactionValue1.length;
        console.log(this.totalCount);
        this.dialogRef.close()
        this.dataSource = new MatTableDataSource(this.transactionValue1);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filter = false;
        this.filter1 = false;
        this.paidfilter=true
       

      }
      else if (res.flag === 2) {
        this.totalCount =0;
        this.dataSource = new MatTableDataSource([]);
        this.dialogRef.close()
        this.filter = false;
        this.filter1 = false;
        this.paidfilter=true;
      }

    });
  }

  unpaidcustrangereset() {
    this.UnPaidcustomrangeform.reset()

  }

  getDisplayText(commentsBy: any): string {
    if (Array.isArray(commentsBy) && commentsBy.length > 0) {

      return this.isFullPolicyVisible ? commentsBy.join(', ') : commentsBy.slice(0, this.limit).join(', ');
    }
    return '';
  }
  select(event: any) {
    console.log(event)
    this.Check = event.target.checked;

  }
  duecancelcustrangereset(){
    this.duecancellcustomrangeform.reset()
  }
  duecancellcustomrangeformsubmit(){
    this.service.DuecancelCustomrange(this.merchantId, this.fromdatecustrangeduecancel?.value, this.todatecustrangeduecancel?.value).subscribe((res: any) => {
      if(res.flag==1){        
        this.transactionValue1 = res.response;
        this.totalCount = this.transactionValue1.length;
    
        console.log(this.totalCount)
        this.dataSource = new MatTableDataSource(this.transactionValue1);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filter = false;
        this.filter1 = false;
        this.paidfilter=true
        this.dialogRef.close();

      }
      else if (res.flag === 2) {
        this.totalCount =0;
        this.dataSource = new MatTableDataSource([]);
        this.dialogRef.close();
        this.filter = false;
        this.filter1 = false;
        this.paidfilter=true;
      }

    });
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
    this.customerpay(this.currentfilval);
  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }
  reset()
  {
    this.loadData(this.pageIndex, this.pageSize);
    
  }
}
