import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { updatecamapaign } from '../../Fargin Model/fargin-model/fargin-model.module';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrl: './edit-campaign.component.css'
})
export class EditCampaignComponent {
  setupformGroup: any = FormGroup;
  viewData: any;

  boxnumber: any;
  setupid: any;
  regionactive: any;
  regionValue: any;
  serviceIds: any;
  serviceValue: any;
  view: any;
  broadcasterId: any;
  minDate: any = Date;
  file: any;
  ExcelData: any;
  parsedJson: any;
  arrayExcel: any;
  excelData: any[] = [];
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  uploadFiles: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.view = this.data.value

    this.broadcasterId = this.data.value.broadcasterId;


    const today = new Date();
    today.setDate(today.getDate() + 1);
    this.minDate = today.toISOString().split('T')[0]

    this.setupformGroup = this.fb.group({
      subject: ['', Validators.required],
      emailContent: ['', [Validators.required, Validators.maxLength(1000)]],
      EmailDate: ['', Validators.required],
      uploadFile: ['']
    });
  }

  get subject() {
    return this.setupformGroup.get('subject');
  }

  get emailContent() {
    return this.setupformGroup.get('emailContent');
  }


  get EmailDate() {
    return this.setupformGroup.get('EmailDate');
  }
  get uploadFile() {
    return this.setupformGroup.get('uploadFile');
  }
  uploadBulkFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0] ?? null;
    this.file = file;

    if (!this.file) {
      this.toastr.error('No file selected');
      console.error('No file selected');
      inputElement.value = ''; // Reset input field
      return;
    }

    const fileExtension = this.file.name.split('.').pop()?.toLowerCase();
    const mimeType = this.file.type;

    // Reject non-CSV file types
    const rejectedExtensions = ['pdf', 'jpeg', 'jpg', 'png', 'gif', 'xls', 'xlsx'];
    const rejectedMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (rejectedExtensions.includes(fileExtension) || rejectedMimeTypes.includes(mimeType)) {
      this.toastr.error('File type not acceptable. Only CSV files are allowed!');
      console.error('File type not acceptable');
      inputElement.value = ''; // Reset input field
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
        console.error('Failed to extract headers from the file!');
        return;
      }

      // **Extract and Normalize Headers**
      const fileHeaders = (sheetData[0] as string[]).map(header => header.trim().toLowerCase());
      console.log('Extracted Headers:', fileHeaders);

      // **Expected Headers**
      const expectedHeaders = ['emailAddress'].map(header => header.trim().toLowerCase());

      // **Header Validation**
      const headersMatch = expectedHeaders.every(header => fileHeaders.includes(header));

      if (!headersMatch) {
        this.toastr.error('File Mismatch, Kindly Upload the relevant file');
        console.error('File headers do not match:', fileHeaders);
        inputElement.value = ''; // Reset input field
        return;
      }

      console.log('Headers match ✅');
      this.arrayExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      console.log('Formatted Data:', this.arrayExcel);

      // **Validate Email Addresses**
      const emailIds = this.arrayExcel.map((row: any) => row.emailAddress).filter((email: any) => !!email); // Ensure 'emailAddress' exists

      if (emailIds.length == 0) {
        this.toastr.error('Uploaded file contains no valid email addresses');
        console.error('No valid email addresses found in the file');
        inputElement.value = ''; // Reset input field
        return;
      }
    };

    fileReader.onerror = (error) => {
      console.error('Error reading file:', error);
      this.toastr.error('Error reading file');
    };
  }





  submit(): void {
    let emailIds: string[] = [];
   
    // Check if a file has been uploaded and extract email addresses
    if (this.arrayExcel && this.arrayExcel.length > 0) {
        emailIds = this.arrayExcel
            .map((row: any) => row.emailAddress?.trim())
            .filter((email: string) => !!email);
    }
   
    // If no file is uploaded, set emailIds to an empty array without displaying a warning
    if (emailIds.length === 0) {
        emailIds = []; // Default to empty array
    }
   
    // Prepare the payload
    const payload = {
        emailContent: this.emailContent.value,
        subject: this.subject.value.trim(),
        modifiedBy: this.createdBy,
        emailAddress: emailIds, // Either extracted emails or empty array
        emailDate: this.EmailDate.value,
        flag: 1 // Assuming flag is fixed
    };
   
    // Call the service with the payload
    this.service.updatebulk(this.broadcasterId, this.createdBy, payload)
        .then((res: any) => {
            this.uploadFiles = res.responseMessage; // Handle response message
            if (res.flag == 1) {
                this.toastr.success(res.responseMessage);
                this.bankDetailsUpdated.emit();
                this.dialog.closeAll(); // Close the dialog on success
            } else {
                this.toastr.error(res.responseMessage);
                this.dialog.closeAll(); // Close the dialog on error
            }
        }).catch(() => {
            this.toastr.error('Something went wrong.');
            this.dialog.closeAll(); // Handle unexpected errors
        });
  }
   
}
