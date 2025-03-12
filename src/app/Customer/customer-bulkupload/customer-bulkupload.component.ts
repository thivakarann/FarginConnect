import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import Papa from 'papaparse';



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
                          area: row.area || '',
                          streetName: row.streetName || '',
                          landmark: row.landmark || '',
                          countryName: row.countryName || '',
                          stateName: row.stateName || '',
                          cityName: row.cityName || '',
                          pincodeName: row.pincodeName || '',
                          freeLine: (row.freeLine || '').trim(),
                          advanceStatus: (row.advanceStatus || '').trim(),
                          advanceAmount: row.advanceAmount || '',
                          branchStatus: (row.branchStatus || '').trim(),
                          branchName: (row.branchName || '').trim(),
                          setupBoxNumber: String(row.setupBoxNumber || '').trim(),
                          setupBoxDoorNumber: row.setupBoxDoorNumber || '',
                          setupBoxAreaName: row.setupBoxAreaName || '',
                          setupBoxStreetName: row.setupBoxStreetName || '',
                            billingDate: isValid ? billingDate : 'Invalid Date',
                        
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
        })
        .catch(() => {
          this.toastr.error('Something went wrong.');
          this.dialog.closeAll();
        });
    }
  }


























  close() {
    this.dialog.closeAll()
  }
}
