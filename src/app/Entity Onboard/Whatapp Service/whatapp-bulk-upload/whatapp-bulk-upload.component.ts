import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { BulkUploadInfoComponent } from '../bulk-upload-info/bulk-upload-info.component';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';


@Component({
  selector: 'app-whatapp-bulk-upload',
  templateUrl: './whatapp-bulk-upload.component.html',
  styleUrl: './whatapp-bulk-upload.component.css'
})
export class WhatappBulkUploadComponent {
  merchantId: any = sessionStorage.getItem('merchantId');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  customerformGroup: any = FormGroup;
  ExcelData: any;
  parsedJson: any;
  uploadFiles: any;
  file: File | null = null;
  arrayExcel: any[] = [];
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  expectedHeaders = [
    'mobileNumber',
    'date',
    'reason'
  ]


  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
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


  uploadBulkFile(event: any) {
    console.log('UploadBulkFile triggered');
    this.file = event.target.files[0];

    if (!this.file) {
      this.toastr.error('No file selected');
      return;
    }

    const fileExtension = this.file.name.split('.').pop()?.toLowerCase();
    const mimeType = this.file.type;

    if (fileExtension !== 'csv') {
      this.toastr.error('Only CSV files are allowed!');
      this.uploadFile.reset();
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
          complete: (results: { data: any[]; meta: any }) => {
            if (!results.data.length) {
              this.toastr.error('The uploaded file is empty!');
              this.uploadFile.reset();
              return;
            }
            let fileHeaders = results.meta.fields;


            if (!fileHeaders || fileHeaders.every((h: string) => /^\d+$/.test(h))) {
              fileHeaders = Object.keys(results.data[0] || {});
            }

            const trimmedFileHeaders = fileHeaders.map((header: string) => header.trim());
            const trimmedExpectedHeaders = this.expectedHeaders.map(header => header.trim());


            const lowerFileHeaders = trimmedFileHeaders.map((header: string) => header.toLowerCase());
            const lowerExpectedHeaders = trimmedExpectedHeaders.map(header => header.toLowerCase());



            if (!lowerFileHeaders.length) {
              this.toastr.error('Failed to extract headers from the file!');
              return;
            }
            console.log(JSON.stringify(lowerFileHeaders.sort()));
            console.log(JSON.stringify(lowerExpectedHeaders.sort()));
            const valueHeader = JSON.stringify(lowerFileHeaders.sort())
            const JsonValueHeader = JSON.parse(valueHeader).filter((str: any) => str !== "")

            console.log(JsonValueHeader);

            if (JSON.stringify(JsonValueHeader) !== JSON.stringify(lowerExpectedHeaders.sort())) {
              this.toastr.error('File Mismatch, Kindly Upload the revelant file');
              this.uploadFile.reset();
              return;
            }

            console.log('Headers match ✅');


            this.arrayExcel = results.data.map((row: any) => {
              // Date validation with multiple formats
              let date = row.date;
              const isValid = moment(date, [
                'DD-MMM-YY',
                'DD-MMM-YYYY',
                'DD/MMM/YY',
                'DD/MMM/YYYY'
              ], true).isValid();

              return {
                mobileNumber: String(row.mobileNumber || ''),
                date: isValid ? date : 'Invalid Date',
                reason: String(row.reason || ''),


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
          let date = row.date;

          // Enhanced Excel date handling
          if (typeof date === 'number') {
            const jsDate = XLSX.SSF.parse_date_code(date);
            date = moment(new Date(jsDate.y, jsDate.m - 1, jsDate.d)).format('DD-MMM-YYYY');
          }

          const isValid = moment(date, [
            'DD-MMM-YY',
            'DD-MMM-YYYY',
            'DD/MMM/YY',
            'DD/MMM/YYYY'
          ], true).isValid();

          return {
            // ... (same field handling as CSV version)
            date: isValid ? date : 'Invalid Date',
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


  BulkUploadResponse() {
    this.dialog.open(BulkUploadInfoComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "500ms",
      disableClose: true,

    })
  }


  submit() {
    if (this.arrayExcel.length) {
      this.service.getwhatsappbulkupload(this.adminName, this.arrayExcel).subscribe((res: any) => {
        this.uploadFiles = res.responseMessage;
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
          this.BulkUploadResponse();
        } else {
          this.toastr.error(res.responseMessage);
          this.dialog.closeAll();

        }
      })
    }
  }

  close() {
    this.dialog.closeAll();
  }
}

