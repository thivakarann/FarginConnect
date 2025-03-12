import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-create-settopboxbulkupdate',
  templateUrl: './create-settopboxbulkupdate.component.html',
  styleUrl: './create-settopboxbulkupdate.component.css'
})
export class CreateSettopboxbulkupdateComponent {
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
   
    if (fileExtension === 'pdf' || mimeType === 'application/pdf') {
        this.toastr.error('PDF files are not accepted');
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
        this.arrayExcel = this.arrayExcel.map((row) => {
         
   
            return {
                mobileNumber: row.mobileNumber || '',
   
                setupBoxNumber: String(row.setupBoxNumber || ''),
                channelName: row.channelName
                    ? row.channelName.split(',').map((value: string) => value.trim())
                    : [],
                    broadCasterName: row.broadCasterName
                    ? row.broadCasterName.split(',').map((value: string) => value.trim())
                    : [],
                bouquetName: row.bouquetName
                    ? row.bouquetName.split(',').map((value: string) => value.trim())
                    : [],
                    planName: row.planName
                    ? row.planName.split(',').map((value: string) => value.trim())
                    : [],
                    updateType: row.updateType !== undefined && row.updateType !== null ? row.updateType : '',
            };
        });
    };
   
    fileReader.onerror = (error) => {
        console.error('Error reading file:', error);
    };
  }
 
 
 
 
 
  submit() {
    if (this.arrayExcel.length) {
      this.service
      .customersetupBulkupdate(this.merchantId, this.entityname, this.arrayExcel)
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
