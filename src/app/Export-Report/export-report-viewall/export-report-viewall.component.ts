import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../Loader service/loader.service';
import { ExportReportAddComponent } from '../export-report-add/export-report-add.component';

@Component({
  selector: 'app-export-report-viewall',
  templateUrl: './export-report-viewall.component.html',
  styleUrl: './export-report-viewall.component.css'
})
export class ExportReportViewallComponent implements OnInit{
  dataSource: any;
  displayedColumns: string[] = [
    'exportId',
    'exportDataName', 
    'exportStartDate',
    'exportEndDate',
    'paymentStatus',
    'resultStatus',
    'exportAt',
    'Download',
    'createdBy',
    'createdAt'
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
  valuesmsadd: any;
  valuesmsstatus: any;
  valuesmsedit: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  merchantId: any = sessionStorage.getItem('merchantId')
  actions: any;
  errorMessage: any;
  download: any;
  searchPerformed: boolean = false;
  private subscription!: Subscription;
  private intervalId: any;
  roleName = sessionStorage.getItem('roleName')
  valueDownload: any;
  valueadd: any;
  @ViewChild('ExportSearch') exportSearchTemplate!: TemplateRef<any>;
  exportreport: any = FormGroup;
  search: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog, 
    public loaderService: LoaderService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.exportreport = this.fb.group({
      exportDataName: ['', [Validators.required]],
      paymentStatus: [''],
      merchantId: ['']
    });

 
    this.service.ExportReportGet().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response; 
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.viewall.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  get exportDataName() {
    return this.exportreport.get('exportDataName');
  }

  get paymentStatus() {
    return this.exportreport.get('paymentStatus');
  }

  // ngOnDestroy(): void {
  //   this.loaderService.setExcludeLoader(false);

  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }


    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  
  

  AddReport() {
    const dialogRef = this.dialog.open(ExportReportAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true
    })

    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchexportreportview();
    });
  }


  fetchexportreportview(){
    this.service.ExportReportGet().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response; 
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.viewall.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }




  reload() {
    this.service.ExportReportGet().subscribe((res: any) => {
      this.viewall = res.response; 
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

 


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pagerefresh()
  {
    this.service.ExportReportGet().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response; 
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.viewall.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

   submit() {
      // let submitModel:ExportReportSearch= {
      //   exportDataName:this.exportDataName?.value,
      //   merchantId:this.merchantId,
      //   paymentStatus:this.paymentStatus?.value||''
      // }
 
      // this.service.ExportReportSearch(submitModel).subscribe((res:any) => {
      //   if (res.flag==1) {
      //     this.dialog.closeAll();
      //     this.close()
      //     this.toastr.success(res.responseMessage);
      //     this.search=res.response;
      //     this.dataSource=new MatTableDataSource(this.search);
      //     this.dataSource.sort=this.sort;
      //     this.dataSource.paginator=this.paginator;
        
               
      //   }
      //   else {
      //     this.toastr.error(res.responseMessage);
      //   }
      // })
    }
 
  
     
exportpay(event:any) {
  this.exportreport.get('paymentStatus')?.setValue('');
}

  Exportsearch() {
    this.dialog.open(this.exportSearchTemplate, {
      width: '400px', // or any width you prefer
      disableClose: true,
    });
  }

  close() {
    this.exportreport.reset();
  }
  back() {
    this.dialog.closeAll();
  }

  ExportDownload(id: any, exportDataName: number) { 
    enum ExportDataName {
      CustomerPayment = 4,
      AdditionalTransactions = 7,
      EntityOnboard =12,
      CloudFeePayment = 13,
      OneTimePayment = 14,
      ChannelCreation = 18,
      CustomizedPayment = 19,
      SmsHistory = 15,
      EntityRequest = 16,
      CustomerRequest = 17,
      OnlineRefund = 20,
      CloudFeeAutodebit = 21,
      Customer = 22,
    }

    const dataNameMapping: Record<ExportDataName, string> = {
      [ExportDataName.CustomerPayment]: 'Customer_Payment',
      [ExportDataName.AdditionalTransactions]: 'Additional_Transactions',
      [ExportDataName.EntityOnboard]: 'Entity_Onboard',
      [ExportDataName.CloudFeePayment]: 'CloudFee_Payment',
      [ExportDataName.OneTimePayment]: 'OneTime_Payment',
      [ExportDataName.ChannelCreation]: 'Channel_Creation',
      [ExportDataName.CustomizedPayment]: 'Customized_Payment',
      [ExportDataName.SmsHistory]: 'Sms_History',
      [ExportDataName.EntityRequest]: 'Entity_Request',
      [ExportDataName.CustomerRequest]: 'Customer_Request',
      [ExportDataName.OnlineRefund]: 'Online_Refund',
      [ExportDataName.CloudFeeAutodebit]: 'CloudFee_Autodebit',
      [ExportDataName.Customer]: 'Customer',
    };
 
    const fileName = dataNameMapping[exportDataName as ExportDataName] || 'Exported_Report';
 
    this.service.ExportReportDownload(id).subscribe((res: any) => {

      const blob = new Blob([res], { type: 'text/csv;charset=utf-8;' });
      const downloadURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = `${fileName}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}