import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import * as XLSX from 'xlsx';
import { AlacarteBulkuploadinfoComponent } from '../alacarte-bulkuploadinfo/alacarte-bulkuploadinfo.component';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';
@Component({
  selector: 'app-alacarte-uploadbulk',
  templateUrl: './alacarte-uploadbulk.component.html',
  styleUrl: './alacarte-uploadbulk.component.css',
})
export class AlacarteUploadbulkComponent {
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  formGroup: any = FormGroup;
  ExcelData: any;
  parsedJson: any;
  uploadFiles: any;
  file: File | null = null;
  arrayExcel: any[] = [];
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      uploadFile: ['', Validators.required],
    });
  }
  get uploadFile() {
    return this.formGroup.get('uploadFile');
  }
  uploadBulkFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0] ?? null;
    this.file = file;

    if (!this.file) {
      this.toastr.error('No file selected');
      console.error('No file selected');
      return;
    }

    const fileExtension = this.file.name.split('.').pop()?.toLowerCase();
    console.log(fileExtension);

    const mimeType = this.file.type;

    if (fileExtension !== 'csv') {
      this.toastr.error('Only CSV files are allowed!');
      this.uploadFile.reset();
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.file);

    fileReader.onload = () => {
      const workbook = XLSX.read(fileReader.result, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      }) as unknown[];

      if (!sheetData.length || sheetData.length === 1) {
        this.toastr.error('Uploaded file is empty');
        console.error('Uploaded file is empty');
        return;
      }
      if (!sheetData.length) {
        this.toastr.error('Failed to extract headers from the file!');
        console.error('Failed to extract headers from the file!');
        return;
      }

      // Extract and normalize headers
      const fileHeaders = (sheetData[0] as string[]).map((header) =>
        header.trim().toLowerCase()
      );
      const expectedHeaders = [
        'broadCasterName',
        'serviceProviderName',
        'regionName',
        'channelName',
        'channelNo',
        'generic',
        'language',
        'channelType',
        'price',
      ].map((header) => header.trim().toLowerCase());

      // Header Validation
      if (
        JSON.stringify(fileHeaders.sort()) !==
        JSON.stringify(expectedHeaders.sort())
      ) {
        this.toastr.error('File Mismatch, Kindly Upload the relevant file');
        this.uploadFile.reset();
        return;
      }

      console.log('Headers match ✅');

      // Process file content
      this.arrayExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      this.arrayExcel = this.arrayExcel.map((row: any) => {
        return {
          broadCasterName: String(row.broadCasterName || '').trim(),
          serviceProviderName: String(row.serviceProviderName || '').trim(),
          regionName: String(row.regionName || '').trim(),
          channelName: String(row.channelName || '').trim(),
          channelNo: String(row.channelNo || '').trim(),
          generic: String(row.generic || '').trim(),
          language: String(row.language || '').trim(),
          channelType: row.channelType == 'Paid' ? 1 : row.channelType == 'Free' ? 0 : '',
          price: row.price || '',
        };
      });

      console.log('Processed Excel data:', this.arrayExcel);
    };

    fileReader.onerror = (error) => {
      console.error('Error reading file:', error);
      this.toastr.error('Error reading file');
    };
  }

  submit() {
    if (this.arrayExcel.length) {
      this.service
        .AlcartUploadbulk(this.adminName, this.arrayExcel)
        .then((res: any) => {
          this.uploadFiles = res.responseMessage;
          if (res.flag == 1) {
            // this.toastr.success(res.responseMessage);
            this.bankDetailsUpdated.emit();
            this.dialog.closeAll();
            this.BulkUploadResponse();
          } else {
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
    this.dialog.closeAll();
  }
  BulkUploadResponse() {
    this.dialog.open(AlacarteBulkuploadinfoComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "5ooms",
      disableClose: true,

    })
  }

}
