import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../Loader service/loader.service';
import { ExportReportAddComponent } from '../export-report-add/export-report-add.component';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { Payload } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-export-report-viewall',
  templateUrl: './export-report-viewall.component.html',
  styleUrl: './export-report-viewall.component.css'
})
export class ExportReportViewallComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'exportId',
    'exportDataName',
    'exportStartDate',
    'exportEndDate',
    'resultStatus',
    'Download',
    'exportAt',
    'merchantname',
    'paymentStatus',
    'paymentrefund',
    'branchname',
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
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  merchantId: any = sessionStorage.getItem('merchantId')
  actions: any;
  errorMessage: any;
  download: any;
  searchPerformed: boolean = false;
  roleName = sessionStorage.getItem('roleName')
  valueDownload: any;
  valueadd: any;
  @ViewChild('ExportSearch') exportSearchTemplate!: TemplateRef<any>;
  exportreport: any = FormGroup;
  search: any;
  value: any;
  Roledetails: any;

  constructor(
    public service: FarginServiceService,
    private dialog: MatDialog,
    public loaderService: LoaderService,
    public fb: FormBuilder,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit(): void {
    this.Role();
    this.Getall();

    this.exportreport = this.fb.group({
      exportDataName: ['', [Validators.required]],
      paymentStatus: [''],
      merchantId: ['']
    });

  }

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;

          if (this.roleId == 1) {
            this.value = 'Export Report-Download';
            this.valueadd = 'Export Report-Add'

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              if (this.actions == 'Export Report-Download') {
                this.value = 'Export Report-Download'
              }
              if (this.actions == 'Export Report-Add') {
                this.valueadd = 'Export Report-Add'
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

  get exportDataName() {
    return this.exportreport.get('exportDataName');
  }

  get paymentStatus() {
    return this.exportreport.get('paymentStatus');
  }

  exportpay(event: any) {
    this.exportreport.get('paymentStatus')?.setValue('');
  }

  Getall() {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  AddReport() {
    const dialogRef = this.dialog.open(ExportReportAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true,
      maxWidth: '610px',
      maxHeight: '570px'
    })

    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  ExportDownload(id: any, exportDataName: number) {
    enum ExportDataName {
      CustomerPayment = 4,
      AdditionalTransactions = 7,
      EntityOnboard = 12,
      CloudFeePayment = 13,
      OneTimePayment = 14,
      ChannelCreation = 18,
      CustomizedPayment = 19,
      SmsHistory = 15,
      WhatsappHistory = 26,
      EntityRequest = 16,
      CustomerRequest = 17,
      OnlineRefund = 20,
      CloudFeeAutodebit = 21,
      Customer = 22,
      StaticQRTransaction = 6,
      Branch = 23,
      RenewalFeeAutodebit = 24,
    }

    const dataNameMapping: Record<ExportDataName, string> = {
      [ExportDataName.CustomerPayment]: 'Customer_Payment',
      [ExportDataName.AdditionalTransactions]: 'Additional_Transactions',
      [ExportDataName.EntityOnboard]: 'Entity_Onboard',
      [ExportDataName.CloudFeePayment]: 'CloudFee_Payment',
      [ExportDataName.OneTimePayment]: 'OneTime_Payment',
      [ExportDataName.ChannelCreation]: 'Channel_Creation',
      [ExportDataName.CustomizedPayment]: 'Customized_Payment',
      [ExportDataName.SmsHistory]: 'SMS_History',
      [ExportDataName.WhatsappHistory]: 'WhatsApp_History',
      [ExportDataName.EntityRequest]: 'Entity_Request',
      [ExportDataName.CustomerRequest]: 'Customer_Request',
      [ExportDataName.OnlineRefund]: 'Online_Refund',
      [ExportDataName.CloudFeeAutodebit]: 'CloudFee_Autodebit',
      [ExportDataName.RenewalFeeAutodebit]: 'Renewal_Fee AutoDebit',
      [ExportDataName.Customer]: 'Customer',
      [ExportDataName.StaticQRTransaction]: 'StaticQRTransaction',
      [ExportDataName.Branch]: 'Branch',
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

  close() {
    this.exportreport.reset();
  }
  back() {
    this.dialog.closeAll();
  }


}