import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import * as XLSX from 'xlsx';
import moment from 'moment';
import Papa from 'papaparse';
@Component({
  selector: 'app-customerextrasetupboxbulk',
  templateUrl: './customerextrasetupboxbulk.component.html',
  styleUrl: './customerextrasetupboxbulk.component.css'
})
export class CustomerextrasetupboxbulkComponent {
  merchantId: any = localStorage.getItem('merchantId');
  entityname: any = localStorage.getItem('fullname');
  customerformGroup: any = FormGroup;
  ExcelData: any;
  parsedJson: any;
  uploadFiles: any;
  file: File | null = null;
  arrayExcel: any[] = [];
  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.customerformGroup = this.fb.group({
      uploadFile: ['', Validators.required],
    });
  }
  get uploadFile() {
    return this.customerformGroup.get('uploadFile');
  }
//   excelDateToJSDate(serial: number) {
//     const utc_days = Math.floor(serial - 25569);  
//     const utc_value = utc_days * 86400; 
//     const date_info = new Date(utc_value * 1000);  
// console.log(date_info); 
//     const year = date_info.getUTCFullYear();
//     const month = date_info.getUTCMonth() + 1;  
//     const day = date_info.getUTCDate();
// console.log(year,'+',month, '+',day);
 
//     // Format the month and day to always be two digits
//     const formattedMonth = month < 10 ? `0${month}` : month;
//     const formattedDay = day < 10 ? `0${day}` : day;
// if (month < 10 || day < 10) {
//   return `${year}-${formattedDay}-${formattedMonth}`;
//  }
//  else if(month > 10 || day > 10)
//   {
//     return `${year}-${formattedDay}-${formattedMonth}`;
//   }
//  else{
//   return `${year}-${formattedMonth}-${formattedDay}`;
 
// }
// }
 


 
 









    uploadBulkFile(event: any) {
      console.log('UploadBulkFile triggered');
      this.file = event.target.files[0];
  
      if (!this.file) {
          this.toastr.error('No file selected');
          return;
      }
  
      const fileExtension = this.file.name.split('.').pop()?.toLowerCase();
      const mimeType = this.file.type;
  
      if (fileExtension === 'pdf' || mimeType === 'application/pdf') {
          this.toastr.error('PDF files are not accepted');
          return;
      }
  
      const fileReader = new FileReader();
  
      if (fileExtension === 'csv') {
          fileReader.onload = (e: any) => {
              const csvData = e.target.result as string;
              
              // Use PapaParse for proper CSV handling
              Papa.parse(csvData, {
                  header: true,
                  skipEmptyLines: true,
                  dynamicTyping: true,
                  complete: (results: { data: any[]; }) => {
                      this.arrayExcel = results.data.map((row: any) => {
                          // Date validation with multiple formats
                          let billingDate = row.billingDate;
                          const isValid = moment(billingDate, [
                              'DD-MMM-YY', 
                              'DD-MMM-YYYY',
                              'DD/MMM/YY',
                              'DD/MMM/YYYY'
                          ], true).isValid();
                          
                          return {
                            mobileNumber: row.mobileNumber || '',
                            billingDate: isValid ? billingDate : 'Invalid Date',
                            setupBoxNumber: String(row.setupBoxNumber || '').trim(),
                            setupBoxDoorNumber: row.setupBoxDoorNumber || '',
                            setupBoxAreaName: row.setupBoxAreaName || '',
                            setupBoxStreetName: row.setupBoxStreetName || '',
                              // Handle array fields with proper splitting
                              channelName: row.channelName 
                                  ? row.channelName.split(',').map((v: string) => v.trim().replace(/"/g, ''))
                                  : [],
                              bouquetName: row.bouquetName 
                                  ? row.bouquetName.split(',').map((v: string) => v.trim().replace(/"/g, ''))
                                  : [],
                              planName: row.planName 
                              ? row.planName.split(',').map((v: string) => v.trim().replace(/"/g, ''))
                              : [],
                          };
                      });
                      console.log('Processed CSV data:', this.arrayExcel);
                  }
              });
          };
          fileReader.readAsText(this.file);
      }
      else {
          fileReader.onload = (e: any) => {
              const workbook = XLSX.read(e.target.result, {
                  type: 'binary',
                  cellDates: false
              });
  
              const sheetName = workbook.SheetNames[0];
              this.arrayExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: false });
  
              this.arrayExcel = this.arrayExcel.map((row: any) => {
                  let billingDate = row.billingDate;
  
                  // Enhanced Excel date handling
                  if (typeof billingDate === 'number') {
                      const jsDate = XLSX.SSF.parse_date_code(billingDate);
                      billingDate = moment(new Date(jsDate.y, jsDate.m-1, jsDate.d)).format('DD-MMM-YYYY');
                  }
  
                  const isValid = moment(billingDate, [
                      'DD-MMM-YY', 
                      'DD-MMM-YYYY',
                      'DD/MMM/YY',
                      'DD/MMM/YYYY'
                  ], true).isValid();
  
                  return {
                      // ... (same field handling as CSV version)
                      billingDate: isValid ? billingDate : 'Invalid Date',
                      // ... (rest of the fields)
                  };
              });
              console.log('Processed Excel data:', this.arrayExcel);
          };
      }
  
      fileReader.onerror = (error) => {
          console.error('Error reading file:', error);
          this.toastr.error('Error reading file');
      };
  }
  
 
  submit() {
    if (this.arrayExcel.length) {
      this.service
      .customersetupAddBulk(this.merchantId, this.entityname, this.arrayExcel)
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
    this.dialog.closeAll();
  }
}
