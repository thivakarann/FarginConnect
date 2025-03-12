import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ExportReportCreate, ExportReportstatic } from '../../fargin-model/fargin-model.module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-export-reports-add',
  templateUrl: './export-reports-add.component.html',
  styleUrl: './export-reports-add.component.css'
})
export class ExportReportsAddComponent implements OnInit {

  getadminname = localStorage.getItem('fullname');
  myForm!: FormGroup;
  merchantId: any = localStorage.getItem('merchantId')
  Daterange!: string;
  exportTypes: any;
  

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      exportDataName: new FormControl('', [Validators.required]),
      exportType: new FormControl(''),
      exportStartDate: new FormControl('', [Validators.required]),
      exportEndDate: new FormControl('', [Validators.required]),
      paymentStatus: new FormControl(''),
      createdBy: new FormControl(''),
      merchantId: new FormControl('')
    });
  }

  get exportDataName() {
    return this.myForm.get('exportDataName')
  }

  get exportStartDate() {
    return this.myForm.get('exportStartDate')
  }

  get exportEndDate() {
    return this.myForm.get('exportEndDate')
  }

  get exportType() {
    return this.myForm.get('exportType')
  }

  get paymentStatus() {
    return this.myForm.get('paymentStatus')
  }



  submitForm() {
    const selectedValue = this.myForm.get('exportDataName')?.value;
    const startDate = this.myForm.get('exportStartDate')?.value;
    const endDate = this.myForm.get('exportEndDate')?.value;
    const paymentStatus = this.myForm.get('paymentStatus')?.value;

    if (selectedValue == '6' && startDate && endDate) {
        this.Staticqr();
    } 
    else if ((selectedValue == '4' || selectedValue == '7') && startDate && endDate && !paymentStatus) {
        this.exportTypes = 1; // Export type without payment status
        this.submit();
        
    }
    else if ((selectedValue == '4' || selectedValue == '7') && startDate && endDate && paymentStatus) {
      this.exportTypes = 0; // Export type without payment status
      this.submit();
  }
    else if ((selectedValue == '4' || selectedValue == '7') && startDate && endDate) {
        this.exportTypes = 1; // Export type without payment status (assuming it should be 1 if exportDataName is 4)
        this.submit();
    }
    else if (startDate && endDate) {
        this.exportTypes = 0; // Export type with payment status
        this.submit();
    }
    else {
        this.exportTypes = 0;
        this.submit();
    }
}

exportpay(event: any) {
  this.myForm.get('paymentStatus')?.setValue('');
}

//customer ,merchant refund,customer history, customer payment(type,status),Stb model
//merchant sms history, export Dues history
  submit() {
    let submitModel: ExportReportCreate = {
      createdBy: this.getadminname,
      exportDataName: this.exportDataName?.value,
      exportStartDate: this.exportStartDate?.value,
      exportEndDate: this.exportEndDate?.value,
      merchantId: this.merchantId,
      exportType: this.exportTypes,
      paymentStatus:this.paymentStatus?.value
    }

    this.service.ExportReportAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }

  
  //Static Qr transaction
  Staticqr() {

    const datepipe: DatePipe = new DatePipe("en-US");
    let formattedstartDate = datepipe.transform(this.exportStartDate?.value, "dd/MM/YYYY 00:00");
    let formattedendDate = datepipe.transform(this.exportEndDate?.value, "dd/MM/YYYY 23:59");
    this.Daterange = formattedstartDate + " " + "-" + " " + formattedendDate;

    let submitModel: ExportReportstatic = {
      createdBy: this.getadminname,
      exportDataName: this.exportDataName?.value,
      exportType: 0,
      dateRange: this.Daterange,
      merchantId: this.merchantId,
      pageNo: "",
      query: "",
      size: "",
      status: "",
      terminalId: "",
      exportStartDate: this.exportStartDate?.value,
      exportEndDate: this.exportEndDate?.value
    }

    this.service.ExportReportAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
