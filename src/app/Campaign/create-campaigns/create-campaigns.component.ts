import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-create-campaigns',
  templateUrl: './create-campaigns.component.html',
  styleUrl: './create-campaigns.component.css'
})
export class CreateCampaignsComponent {
  announcementform: any = FormGroup;
  categoryvalue: any;
  minDate: any = Date;
  uploadidentityfront: any;

 @ViewChild('select') select: any = MatSelect;
 allSelected = false;
  activeemail: any;
  campagin: any;

  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  file: any;
  ExcelData: any;
  parsedJson: any;
  arrayExcel: any;
  excelData: any[]=[];


  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }
  
  ngOnInit(): void {

    

    const today = new Date();
    today.setDate(today.getDate() + 1);
    this.minDate = today.toISOString().split('T')[0]

  

    this.announcementform = new FormGroup({
     subject: new FormControl('',Validators.required),
     startDate: new FormControl('',Validators.required),
     contents: new FormControl('',[Validators.required,Validators.maxLength(1000)]),
     document: new FormControl('',Validators.required),
     uploadFile: new FormControl('',Validators.required),
})

  
  }


  
  get subject() {
    return this.announcementform.get('subject');
  }

  get contents() {
    return this.announcementform.get('contents');
  }

  get startDate() {
    return this.announcementform.get('startDate');
  }

  get document() {
    return this.announcementform.get('document')
  }

  get uploadFile() {
    return this.announcementform.get('uploadFile')
  }

  onFileSelected(event: any) {
    this.uploadidentityfront = event.target.files[0];
    console.log(this.uploadidentityfront)

    // Ensure this.uploadImage is not null
    if (this.uploadidentityfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

      if (acceptableTypes.includes(this.uploadidentityfront.type)) {
        if (this.uploadidentityfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.document?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.document?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }


  }
    toggleAllSelection() {
      if (this.allSelected) {
        this.select.options.forEach((item: MatOption) => item.select());
      } else {
        this.select.options.forEach((item: MatOption) => item.deselect());
      }
    }

//     uploadBulkFile(event: any) {
//       const file = event.target.files[0];
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         const workbook = XLSX.read(e.target.result, { type: 'binary' });
//         const firstSheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[firstSheetName];
//         this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
//         console.log('Excel data:', this.excelData);
//       };
//       reader.readAsBinaryString(file);
//     }

//     save() {
//      const formData = new FormData();
//      formData.append('image', this.uploadidentityfront);
//      formData.append('emailContent', this.contents?.value);
//      formData.append('subject', this.subject?.value);
//      formData.append('emailDate', this.startDate?.value);
//      formData.append('createdBy', this.createdBy);
//      formData.append('merchantId', '0');

//      formData.append('flag', '1');

//      const emailAddresses = this.excelData.map(data => data.emailAddress);
//      const emailBinary = new Blob([JSON.stringify(emailAddresses)], { type: 'application/json' });
//      formData.append('emailAddress', emailBinary);
    
//      this.service.addcampagin(formData).subscribe((res: any) => {
//          this.campagin = res.response;
         
//          if (res.flag == 1) {
//           this.toastr.success(res.responseMessage);
//           this.dialog.closeAll();
//         } else {
//           this.toastr.error(res.responseMessage);
//         }
//      });
//  }


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

  // Reject specific file types: PDF, JPEG, PNG, GIF
  const rejectedExtensions = ['pdf', 'jpeg', 'jpg', 'png', 'gif'];
  const rejectedMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
  ];

  if (rejectedExtensions.includes(fileExtension) || rejectedMimeTypes.includes(mimeType)) {
      this.toastr.error('File type not acceptable Only it has Accept the Excel');
      console.error('File type not acceptable');
      inputElement.value = ''; // Reset input field
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
      this.arrayExcel = this.arrayExcel.map((row:any) => {
       
 
          return {
            emailAddress: row.emailAddress || '',
           
          };
      });
  };
 
  fileReader.onerror = (error) => {
      console.error('Error reading file:', error);
  };
}
 
 
   
 

    save() {
     const formData = new FormData();
     formData.append('image', this.uploadidentityfront);
     formData.append('emailContent', this.contents?.value);
     formData.append('subject', this.subject?.value);
     formData.append('emailDate', this.startDate?.value);
     formData.append('createdBy', this.createdBy);
     formData.append('merchantId', '0');
 
     formData.append('flag', '1');
 
     const emailAddresses = this.arrayExcel.flatMap((item: any) => item.emailAddress);
     formData.append('emailAddress', emailAddresses.join(','));
   
   
     this.service.addcampagin(formData).subscribe((res: any) => {
         this.campagin = res.response;
         
         if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          this.dialog.closeAll();
        } else {
          this.toastr.error(res.responseMessage);
        }
     });
 }
 
}
