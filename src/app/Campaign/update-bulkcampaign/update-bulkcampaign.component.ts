import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-update-bulkcampaign',
  templateUrl: './update-bulkcampaign.component.html',
  styleUrl: './update-bulkcampaign.component.css'
})
export class UpdateBulkcampaignComponent {
  merchantId: any = sessionStorage.getItem('merchantId');
  entityname: any = sessionStorage.getItem('fullname');
  customerformGroup: any = FormGroup;
  ExcelData: any;
  parsedJson: any;
  uploadFiles: any;
  file: File | null = null;
  arrayExcel: any[] = [];
  broadcasterid: any;
  formattedEmails: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.broadcasterid = this.data.value.broadcasterId
    this.customerformGroup = this.fb.group({
      uploadFile: ['', Validators.required],
    });
  }
  get uploadFile() {
    return this.customerformGroup.get('uploadFile');
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
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }) as unknown[];

      if (!sheetData.length) {
        this.toastr.error('Failed to extract headers from the file!');
        return;
      }

      // Extract and normalize headers
      const fileHeaders = (sheetData[0] as string[]).map(header => header.trim().toLowerCase());
      const expectedHeaders = ['emailAddress'].map(header => header.trim().toLowerCase());

      // Header Validation
      if (JSON.stringify(fileHeaders.sort()) !== JSON.stringify(expectedHeaders.sort())) {
        this.toastr.error('File Mismatch, Kindly Upload the relevant file');
        this.uploadFile.reset();
        return;
      }

      // Process file content and extract valid email addresses
      this.arrayExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const emailList = this.arrayExcel.map((row: any) => row.emailAddress?.trim()).filter(email => !!email);

      if (emailList.length === 0) {
        this.toastr.error('Uploaded file contains no valid email addresses');
        this.uploadFile.reset();
        return;
      }
      // Format email addresses for submission
      this.formattedEmails = emailList.map(email => email).join(', ');
    };

    fileReader.onerror = (error) => {
      this.toastr.error('Error reading file');
    };
  }

  submit(): void {
    if (this.formattedEmails?.length) {
      const payload = {
        emailAddress: [`${this.formattedEmails}`]
      };
      this.service.updatebulk(this.broadcasterid, this.entityname, payload).then((res: any) => {
        this.uploadFiles = res.responseMessage;
        if (res.flag === 1) {
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        }
        else if (res.flag === 2) {
          this.toastr.error(res.responseMessage);
          this.dialog.closeAll();
        }
      }).catch(() => {
        this.toastr.error('Something went wrong.');
        this.dialog.closeAll();
      });
    } else {
      this.toastr.error('No valid email addresses to submit.');
    }
  }
}
