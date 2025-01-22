import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { FarginServiceService } from '../../../../service/fargin-service.service';

@Component({
  selector: 'app-create-bulk',
  templateUrl: './create-bulk.component.html',
  styleUrl: './create-bulk.component.css'
})
export class CreateBulkComponent implements OnInit {
  setupformGroup: any = FormGroup;
  file: any;
  ExcelData: any;
  parsedJson: any;
  arrayExcel: any;
  uploadFiles: any;
  merchantId: any = localStorage.getItem('merchantId');
  entityname: any = localStorage.getItem('fullname')

  constructor(private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.setupformGroup = this.fb.group({
      uploadFile: ['', Validators.required]
    })

  }
  get uploadFile() {
    return this.setupformGroup.get('uploadFile')
  }



  // uploadBulkFile(event: any) {
  //   this.file = event.target.files[0];
 
  //   if (!this.file) {
  //     this.toastr.error ('No file selected');
  //     console.error('No file selected');
  //     return;
  //   }
 
  //   const fileExtension = this.file.name.split('.').pop()?.toLowerCase();
  //   const mimeType = this.file.type;
   
  //   if (fileExtension === 'pdf' || mimeType === 'application/pdf') {
  //     this.toastr.error("Pdf files are not accepted");    
  //     console.error('PDF files are not accepted');
  //     return;
  //   }
    
  //   let fileReader = new FileReader();
  //   fileReader.readAsBinaryString(this.file);
  //   fileReader.onload = (e) => {
  //     const rABS = !!fileReader.readAsArrayBuffer;
  //     var workbook = XLSX.read(fileReader.result, {
  //       type: rABS ? 'binary' : 'string',
  //     });
      
  //     var sheetname = workbook.SheetNames;
  //     this.ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[0]]);
      
  //     this.parsedJson = this.ExcelData;
      
  //     this.arrayExcel = this.parsedJson;
      
  //   };
  // }

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
        this.toastr.error('Pdf files are not accepted');
        console.error('PDF files are not accepted');
        return;
    }
 
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(this.file);
    fileReader.onload = (e) => {
        const rABS = !!fileReader.readAsArrayBuffer;
        var workbook = XLSX.read(fileReader.result, {
            type: rABS ? 'binary' : 'string',
        });
 
        var sheetname = workbook.SheetNames;
        this.ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[0]]);
 
        // Trim spaces from serviceProviderName and stateName fields
        this.ExcelData = this.ExcelData.map((data: any) => {
            return {
                ...data,
                serviceProviderName: data.serviceProviderName ? data.serviceProviderName.trim() : '',
                stateName: data.stateName ? data.stateName.trim() : ''
            };
        });
 
        this.parsedJson = this.ExcelData;
        this.arrayExcel = this.parsedJson;
    };
}


  onSubmit() {
    this.service.bulkUploadSetupbox(this.merchantId, this.entityname, this.arrayExcel).subscribe((res: any) => {
      this.uploadFiles = res.response;
      

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll();
      
      }
      else if (res.flag == 2) {
        this.toastr.success(res.responseMessage)
       
      }
      else
        this.toastr.error(res.responseMessage)
    });
  }
}
