import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-customer-bulkupload',
  templateUrl: './customer-bulkupload.component.html',
  styleUrl: './customer-bulkupload.component.css'
})
export class CustomerBulkuploadComponent implements OnInit {
  merchantId: any = localStorage.getItem('merchantId');
  entityname: any = localStorage.getItem('fullname')
  customerformGroup: any = FormGroup;
  ExcelData: any;
  parsedJson: any;
  uploadFiles: any;
  file: File | null = null;
  arrayExcel: any[] = [];
  constructor(private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {

    this.customerformGroup = this.fb.group({
      uploadFile: ['', Validators.required]
    })

  }
  get uploadFile() {
    return this.customerformGroup.get('uploadFile')
  }

  excelDateToJSDate(serial: number) {
    const utc_days = Math.floor(serial - 25569);  // Adjust for Excel's date system starting point
    const utc_value = utc_days * 86400;  // Convert days to seconds
    const date_info = new Date(utc_value * 1000);  // Create a date object in UTC
    console.log(date_info); //

    // Format the date as YYYY-MM-DD using UTC values to avoid timezone issues
    const year = date_info.getUTCFullYear();
    const month = date_info.getUTCMonth() + 1;  // getUTCMonth() is zero-based
    const day = date_info.getUTCDate();
    console.log(year, '+', month, '+', day);

    // Format the month and day to always be two digits
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    if (month < 10 || day < 10) {
      return `${year}-${formattedDay}-${formattedMonth}`;
    }
    else if (month > 10 || day > 10) {
      return `${year}-${formattedDay}-${formattedMonth}`;
    }
    else {
      return `${year}-${formattedMonth}-${formattedDay}`;

    }
  }

  uploadBulkFile(event: any) {
    this.file = event.target.files[0];
    if (!this.file) {
      this.toastr.error('No file selected');
      console.error('No file selected');
      return;
    }
    const fileExtension = this.file.name.split('.').pop()?.toLowerCase();
    const mimeType = this.file.type;
    if (fileExtension === 'pdf' || mimeType === 'application/pdf') {
      this.toastr.error('Pdf files are not accepted');
      console.error('PDF files are not accepted');
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.file);
    fileReader.onload = (e) => {
      const rABS = !!fileReader.readAsArrayBuffer;
      const workbook = XLSX.read(fileReader.result, {
        type: rABS ? 'binary' : 'string',
      });
      const sheetName = workbook.SheetNames[0];
      this.arrayExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      this.arrayExcel = this.arrayExcel.map((row: any) => {
        const formatDate = (date: any) => {
          if (typeof date === 'number') {
            const jsDate = this.excelDateToJSDate(date);
            return moment(jsDate).format('YYYY-MM-DD');
          } else {
            const formats = ['DD/MM/YYYY', 'DD-MM-YYYY', 'MM-DD-YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'];
            const parsedDate = moment(date, formats, true);
            return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : '';
          }
        };
        const billingDate = formatDate(row.billingDate || '');
        console.log('Formatted billingDate:', billingDate);
        return {
          customerReferenceId: String(row.customerReferenceId || ''),
          customerMsoId: row.customerMsoId || '',
          customerName: row.customerName || '',
          mobileNumber: row.mobileNumber || '',
          alterMobileNumber: row.alterMobileNumber || '',
          age: row.age || '',
          emailAddress: row.emailAddress || '',
          doorNumber: row.doorNumber || '',
          blockNumber: row.blockNumber || '',
          flatNumber: row.flatNumber || '',
          houseName: row.houseName || '',
          apartmentName: row.apartmentName || '',
          streetName: row.streetName || '',
          area: row.area || '',
          landmark: row.landmark || '',
          countryName: row.countryName || '',
          stateName: row.stateName || '',
          cityName: row.cityName || '',
          pincodeName: row.pincodeName || '',
          freeLine: (row.freeLine || '').trim(),
          billingDate: billingDate || '',
          advanceStatus: (row.advanceStatus || '').trim(),
          advanceAmount: row.advanceAmount || '',
          branchStatus: (row.branchStatus || '').trim(),
          branchName: (row.branchName || '').trim(),
          setupBoxNumber: String(row.setupBoxNumber || '').trim(),
          channelName: row.channelName
            ? row.channelName.split(',').map((value: any) => value.trim())
            : [],
          planName: row.planName
            ? row.planName.split(',').map((value: any) => value.trim())
            : [],
          bouquetName: row.bouquetName
            ? row.bouquetName.split(',').map((value: any) => value.trim())
            : [],
        };
      });
    };
    fileReader.onerror = (error) => { };
  }



  submit() {
    if (this.arrayExcel.length) {
      this.service
      .customerAddBulk(this.merchantId, this.entityname, this.arrayExcel)
      .then((res: any) => {
        this.uploadFiles = res.responseMessage;
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          this.dialog.closeAll();
         
        } else if (res.flag == 2) {
          this.toastr.error(res.responseMessage);
          this.dialog.closeAll();
          
        }
      }).catch(()=>{
        this.toastr.error('Something went wrong.');
        this.dialog.closeAll();
 
      })
    }
  }


























  close() {
    this.dialog.closeAll()
  }
}
