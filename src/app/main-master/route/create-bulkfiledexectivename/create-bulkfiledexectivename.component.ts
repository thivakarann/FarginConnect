import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import * as XLSX from 'xlsx';
@Component({                 
  selector: 'app-create-bulkfiledexectivename',
  templateUrl: './create-bulkfiledexectivename.component.html',
  styleUrl: './create-bulkfiledexectivename.component.css'
})
export class CreateBulkfiledexectivenameComponent {
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
  this.file = event.target.files[0];

  if (!this.file) {
    this.toastr.error('No file selected');
    console.error('No file selected');
    return;
  }

  // Check if the file is a PDF
  const fileExtension = this.file.name.split('.').pop()?.toLowerCase();
  const mimeType = this.file.type;

  if (fileExtension === 'pdf' || mimeType === 'application/pdf') {
    this.toastr.error("PDF files are not accepted");
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
    this.arrayExcel = this.arrayExcel.map((row: any) => ({

      mobileNumber: String(row.mobileNumber || ''),
      merchantAdminMobileNo: String(row.merchantAdminMobileNo || ''),
      updateType: row.updateType !== undefined && row.updateType !== null ? row.updateType : '',
    }));

    console.log("Formatted Data:", this.arrayExcel);
  };

  fileReader.onerror = (error) => {
    console.error('Error reading file:', error);
  };
}




submit() {
  if (this.arrayExcel.length) {
    this.service.customerroutefieldBulk(this.merchantId, this.entityname, this.arrayExcel).subscribe((res: any) => {
      this.uploadFiles = res.responseMessage;


      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
     
      } else if (res.flag == 2) {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll();
       
      }
    });
  }

}


close() {
  this.dialog.closeAll()
}
}
