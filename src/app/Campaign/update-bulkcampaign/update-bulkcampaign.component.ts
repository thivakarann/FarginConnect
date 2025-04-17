import { Component, Inject } from '@angular/core';
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
  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.broadcasterid=this.data.value.broadcasterId 
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
    const mimeType = this.file.type;

    if (fileExtension !== 'csv') {
      this.toastr.error('Only CSV files are allowed!');
      this.uploadFile.reset();
      return;
  }

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.file);

    fileReader.onload = (e) => {
        const rABS = !!fileReader.readAsArrayBuffer;
        const workbook = XLSX.read(fileReader.result, {
            type: rABS ? 'binary' : 'string'
        });
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: true });

        // Extract email IDs from rows and store them in the payload
        const emailIds = rows.map((row: unknown) => {
            const emailRow = row as any[];
            return emailRow[0] || '';
        }).filter(emailId => emailId !== '');

        console.log('Email IDs:', emailIds);
        this.arrayExcel = emailIds;

        // Prepare the payload for the backend
        const backendPayload = {
            emailId: emailIds
        };

        console.log('Payload:', backendPayload);
    };

    fileReader.onerror = (error) => {
        console.error('Error reading file:', error);
    };
  }

  submit(): void {
    if (this.arrayExcel.length) {
      const payload = {
        emailId: this.arrayExcel
      };
      this.service.updatebulk(this.broadcasterid, this.entityname, payload )
        .then((res: any) => {
          this.uploadFiles = res.responseMessage;
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            this.dialog.closeAll();
          } else if (res.flag == 2) {
            this.toastr.error(res.responseMessage);
            this.dialog.closeAll();
          }
        }).catch(() => {
          this.toastr.error('Something went wrong.');
          this.dialog.closeAll();
        });
    }
  }

  close(): void {
    this.dialog.closeAll();
  }
}
