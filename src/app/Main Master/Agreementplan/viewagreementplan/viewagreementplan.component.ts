import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Busineessstatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-viewagreementplan',
  templateUrl: './viewagreementplan.component.html',
  styleUrl: './viewagreementplan.component.css',
})
export class ViewagreementplanComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'businessCategoryId',
    'planname',
    'servicefee',
    'mmcamount',
    'securitydepositamount',
    'settlementCycle',
    'status',
    'Edit',
    'view',
    'createdBy',
    'createdDateTime',
    'modifiedBy',
    'modifiedDateTime',
  ];
  businesscategory: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  valueCategoryAdd: any;
  valueCategoryexport: any;
  valueCategorystatus: any;
  valueCategoryEdit: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId');
  actions: any;
  errorMessage: any;
  agreementplan: any;
  valuebussinesscreate: any;
  valuebussinessexport: any;
  valuebussinessedit: any;
  valuebussinessview: any;
  valuebussinessstatus: any;
  searchPerformed: boolean = false;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuebussinesscreate = 'Business Plan-Add';
            this.valuebussinessexport = 'Business Plan-Export';
            this.valuebussinessedit = 'Business Plan-Edit';
            this.valuebussinessview = 'Business Plan-View';
            this.valuebussinessstatus = 'Business Plan-Status';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Business Plan-Add') {
                this.valuebussinesscreate = 'Business Plan-Add';
              }
              if (this.actions == 'Business Plan-Export') {
                this.valuebussinessexport = 'Business Plan-Export';
              }
              if (this.actions == 'Business Plan-Edit') {
                this.valuebussinessedit = 'Business Plan-Edit';
              }
              if (this.actions == 'Business Plan-View') {
                this.valuebussinessview = 'Business Plan-View';
              }
              if (this.actions == 'Business Plan-Status') {
                this.valuebussinessstatus = 'Business Plan-Status';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

    this.service.viewagreementplan().subscribe((res: any) => {
      if (res.flag == 1) {
        this.agreementplan = res.response;
        this.agreementplan.reverse();
        this.dataSource = new MatTableDataSource(this.agreementplan);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.agreementplan = [];
        this.agreementplan.reverse();
        this.dataSource = new MatTableDataSource(this.agreementplan);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  add() {
    this.router.navigateByUrl('/addagreementplan');
  }
  edit(id: any) {
    this.router.navigate([`/editagreementplan/${id}`], {
      queryParams: { Alldata: id },
    });
  }
  view(id: any) {
    this.router.navigate([`/allagreementplan/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  reload() {
    this.service.viewagreementplan().subscribe((res: any) => {
      if (res.flag == 1) {
        this.agreementplan = res.response;
        this.agreementplan.reverse();
        this.dataSource = new MatTableDataSource(this.agreementplan);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.agreementplan = [];
        this.agreementplan.reverse();
        this.dataSource = new MatTableDataSource(this.agreementplan);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  onSubmit(event: MatSlideToggleChange, id: string) {
    this.isChecked = event.checked;
    let submitModel: Busineessstatus = {
      status: this.isChecked ? 1 : 0,
      commercialId: id,
    };
    this.service.viewstatusagreementplan(submitModel).subscribe((res: any) => {
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        this.service.viewagreementplan().subscribe((res: any) => {
          if (res.flag == 1) {
            this.agreementplan = res.response;
            this.agreementplan.reverse();
            this.dataSource = new MatTableDataSource(this.agreementplan);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          } else {
            this.agreementplan = [];
            this.agreementplan.reverse();
            this.dataSource = new MatTableDataSource(this.agreementplan);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
        });
      }, 500);
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

  // onSubmit(event: MatSlideToggleChange, id: any) {
  //   this.isChecked = event.checked;

  //   let submitModel: Businessstatus = {

  //     activeStatus: this.isChecked ? 1 : 0,

  //   };

  //   this.service.Businessactive(id, submitModel).subscribe((res: any) => {

  //     this.toastr.success(res.responseMessage);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 1000);
  //   });
  // }

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.agreementplan.forEach((element: any) => {
      // let createdate = element.createdAt;
      // this.date1 =  moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.planName);
      this.response.push(element?.mmcAmount);
      this.response.push(element?.serviceFee);
      this.response.push(element?.securityDepositAmount);
      this.response.push(element?.settlementCycle);
      // this.response.push(element?.netBankingAmount);
      this.response.push(element?.netBankingPercentage);
      this.response.push(element?.netBankingFixedFee);
      // this.response.push(element?.nbOtherBankAmount);
      this.response.push(element?.nbOtherBankPercentage);
      this.response.push(element?.nbOtherBankFixedFee);
      // this.response.push(element?.eCollectAmount);
      this.response.push(element?.eCollectPercentage);
      this.response.push(element?.eCollectFixedFee);
      // this.response.push(element?.disbursementApiAmount);
      this.response.push(element?.disbursementApiPercentage);
      this.response.push(element?.disbursementApiFixedFee);
      // this.response.push(element?.internationalApiAmount);
      this.response.push(element?.internationApiPercentage);
      this.response.push(element?.internationApiFixedFee);
      // this.response.push(element?.upiAmount);
      this.response.push(element?.upiPercentage);
      this.response.push(element?.upiFixedFee);
      // this.response.push(element?.dynamicQrAmount);
      this.response.push(element?.dynamicQrPercentage);
      this.response.push(element?.dynamicQrFixedFee);
      // this.response.push(element?.rupayDebitCardMaxAmount);
      this.response.push(element?.rupayDebitCardMaxPercentage);
      this.response.push(element?.rupayDebitCardMaxFixedFee);
      // this.response.push(element?.rupayDebitCardMinAmount);
      this.response.push(element?.rupayDebitCardMinPercentage);
      this.response.push(element?.rupayDebitCardMinFixedFee);
      // this.response.push(element?.otherDebitCardMaxAmount);
      this.response.push(element?.otherDebitCardMaxPercentage);
      this.response.push(element?.otherDebitCardMaxFixedFee);
      // this.response.push(element?.otherDebitCardMinAmount);
      this.response.push(element?.otherDebitCardMinPercentage);
      this.response.push(element?.otherDebitCardMinFixedFee);
      // this.response.push(element?.amexCardAmount);
      this.response.push(element?.amexCardPercentage);
      this.response.push(element?.amexCardFixedFee);
      // this.response.push(element?.dinnersCardAmount);
      this.response.push(element?.dinnersCardPercentage);
      this.response.push(element?.dinnersCardFixedFee);
      // this.response.push(element?.corporateOrCommercialCardAmount);
      this.response.push(element?.corporateOrCommercialCardPercentage);
      this.response.push(element?.corporateOrCommercialCardFixedFee);
      // this.response.push(element?.prepaidCardAmount);
      this.response.push(element?.prepaidCardPercentage);
      this.response.push(element?.prepaidCardFixedFee);
      // this.response.push(element?.creditCardAmount);
      this.response.push(element?.creditCardPercentage);
      this.response.push(element?.creditCardFixedFee);
      // this.response.push(element?.walletPhonepeAmount);
      this.response.push(element?.walletPhonepePercentage);
      this.response.push(element?.walletPhonepeFixedFee);
      // this.response.push(element?.walletFreeChargeAmount);
      this.response.push(element?.walletFreeChargePercentage);
      this.response.push(element?.walletFreeChargeFixedFee);
      // this.response.push(element?.walletPayzappAmount);
      this.response.push(element?.walletPayzappPercentage);
      this.response.push(element?.walletPayzappFixedFee);
      // this.response.push(element?.walletPaytmAmount);
      this.response.push(element?.walletPaytmPercentage);
      this.response.push(element?.walletPaytmFixedFee);
      // this.response.push(element?.walletOlaMoneyAmount);
      this.response.push(element?.walletOlaMoneyPercentage);
      this.response.push(element?.walletOlaMoneyFixedFee);
      // this.response.push(element?.walletMobikwikkAmount);
      this.response.push(element?.walletMobikwikkPercentage);
      this.response.push(element?.walletMobikwikkFixedFee);
      // this.response.push(element?.walletRelianceJioMoneyAmount);
      this.response.push(element?.walletRelianceJioMoneyPercentage);
      this.response.push(element?.walletRelianceJioMoneyFixedFee);
      // this.response.push(element?.walletAirtelMoneyAmount);
      this.response.push(element?.walletAirtelMoneyPercentage);
      this.response.push(element?.walletAirtelMoneyFixedFee);

      this.response.push(element?.createdBy);
      if (element.createdAt) {
        this.response.push(
          moment(element?.createdAt).format('DD/MM/yyyy-hh:mm a').toString()
        );
      } else {
        this.response.push('-');
      }
      this.response.push(element?.modifiedBy);

      if (element.modifiedAt) {
        this.response.push(
          moment(element?.modifiedAt).format('DD/MM/yyyy-hh:mm a').toString()
        );
      } else {
        this.response.push('-');
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'SNo',
      'Plan Name',
      'AMC/MMC',
      'Service Fee',
      'Security Deposit Amount',
      'Settlement Cycle',
      'Net Banking Percentage  (HDFC/SBI/Kotak/ICICI/Axis)',
      'Net Banking Fixed Fee  (HDFC/SBI/Kotak/ICICI/Axis)',
      'Net Banking Other Bank Percentage',
      'Net Banking Other Bank Fixed Fee',
      'e-Collect Percentage',
      'e-Collect Fixed Fee',
      'Disbursement API Percentage',
      'Disbursement API Fixed Fee',
      'International API Percentage',
      'International API Fixed Fee',
      'UPI Percentage',
      'UPI Fixed Fee',
      'Dynamic QR Percentage',
      'Dynamic QR Fixed Fee',
      'Rupay Debit Card Percentage  (> 2000 )',
      'Rupay Debit Card Fixed Fee  (> 2000 )',
      'Rupay Debit Card Percentage  (< 2000 )',
      'Rupay Debit Card Fixed Fee  (< 2000 )',
      'Other Debit Card Percentage (> 2000 )',
      'Other Debit Card Fixed Fee (> 2000 )',
      'Other Debit Card Percentage (< 2000 )',
      'Other Debit Card Fixed Fee (< 2000 )',
      'Amex Card Percentage',
      'Amex Card Fixed Fee',
      'Dinners Card Percentage',
      'Dinners Card Fixed Fee',
      'Corporate/Commercial Card Percentage',
      'Corporate/Commercial Card Fixed Fee',
      'Prepaid Card Percentage',
      'Prepaid Card Fixed Fee',
      'Credit Card Percentage',
      'Credit Card Fixed Fee',
      'Phonepe Percentage',
      'Phonepe Fixed Fee',
      'FreeCharge Percentage',
      'FreeCharge Fixed Fee',
      'Payzapp Percentage',
      'Payzapp Fixed Fee',
      'Paytm Percentage',
      'Paytm Fixed Fee',
      'Ola Money Percentage',
      'Ola Money Fixed Fee',
      'Mobikwik Percentage',
      'Mobikwik Fixed Fee',
      'Reliance Jio Money Percentage',
      'Reliance Jio Money Fixed Fee',
      'Airtel Money Percentage',
      'Airtel Money Fixed Fee',
      'CreatedBy',
      'Created At',
      'ModifiedBy',
      'Modified At',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Business Plan');
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
      let qty33 = row.getCell(34);
      let qty34 = row.getCell(35);
      let qty35 = row.getCell(36);
      let qty36 = row.getCell(37);
      let qty37 = row.getCell(38);
      let qty38 = row.getCell(39);
      let qty39 = row.getCell(40);
      let qty40 = row.getCell(41);
      let qty41 = row.getCell(42);
      let qty42 = row.getCell(43);
      let qty43 = row.getCell(44);
      let qty44 = row.getCell(45);
      let qty45 = row.getCell(46);
      let qty46 = row.getCell(47);
      let qty47 = row.getCell(48);
      let qty48 = row.getCell(49);
      let qty49 = row.getCell(50);
      let qty50 = row.getCell(51);
      let qty51 = row.getCell(52);
      let qty52 = row.getCell(53);
      let qty53 = row.getCell(54);
      let qty54 = row.getCell(55);
      let qty55 = row.getCell(56);
      let qty56 = row.getCell(57);
      let qty57 = row.getCell(58);

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
      qty33.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty34.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty35.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty36.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty37.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty38.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty39.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty40.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty41.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty42.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty43.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty44.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty45.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty46.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty47.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty48.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty49.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty50.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty51.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty52.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty53.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty54.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty55.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty56.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty57.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }

    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'Business Plan.xlsx');
    });
  }
}
