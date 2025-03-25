import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-kycdocument',
  templateUrl: './edit-kycdocument.component.html',
  styleUrl: './edit-kycdocument.component.css'
})
export class EditKycdocumentComponent implements OnInit {
  KycForm!: FormGroup;
  imageFile!: File;
  imageFile1!: File;
  errorShow!: boolean;
  clearImage: any = '';
  createdBy: any = sessionStorage.getItem('adminname');
  details: any;
  merchantDocumentId: any;
  businessCategoryId: any;
  categorydetails: any;
  kycvalue: any;
  docname: any;
  docs: any;
  docNumbers: any;
  frontpath: any;
  backpath: any;


  constructor(private service: FarginServiceService, private dialog: MatDialog, private toaster: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {

    this.merchantDocumentId = this.data.value2.merchantDocumentId
    
    this.businessCategoryId = this.data.value1
    

    this.docs=this.data.value2.docName
    
    this.docNumbers=this.data.value2.docNumber
    
    this.frontpath=this.data.value2.docFrontPath
    
    this.backpath=this.data.value2.docBackPath



    this.KycForm = new FormGroup({
      documentname: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{12}$")]),
      panNumber: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$")]),
      passportNumber: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]),
      gstNumber: new FormControl('', [Validators.required, Validators.pattern("/^[A-Z]{2}[0-9A-Z]{10}[A-Z0-9]{3}$/")]),
      drivingLicenseNumber: new FormControl('', [Validators.required]),
      cinch: new FormControl('', [Validators.required,Validators.pattern("^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$")]),
      voterid: new FormControl('', [Validators.required,  Validators.pattern("^[A-Z]{3}[0-9]{7}$")]),
      documentfront: new FormControl('', [Validators.required]),
      documentback: new FormControl('', [Validators.required]),
    })

    this.service.KycDocName(this.businessCategoryId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.categorydetails = res.response;
        
      }
    })

  }


  get documentname() {
    return this.KycForm.get('documentname');
  }
  get documentNumber() {
    return this.KycForm.get('documentNumber');
  }

  get panNumber() {
    return this.KycForm.get('panNumber');
  }
  get passportNumber() {
    return this.KycForm.get('passportNumber');
  }

  get gstNumber() {
    return this.KycForm.get('gstNumber');
  }

  get drivingLicenseNumber() {
    return this.KycForm.get('drivingLicenseNumber');
  }

  get cinch() {
    return this.KycForm.get('cinch');
  }
  get voterid() {
    return this.KycForm.get('voterid');
  }
  get documentfront() {
    return this.KycForm.get('documentfront');
  }
  get documentback() {
    return this.KycForm.get('documentback');
  }

  getdocument(event: any) {
    this.imageFile = event.target.files[0];
    if ((this.imageFile.type == 'image/png') || (this.imageFile.type == 'image/jpeg') || (this.imageFile.type == 'image/jpg')) {
      
      if (this.imageFile.size <= 20 * 1024 * 1024) {
        this.errorShow = false;
      } else {
        this.errorShow = true;
        this.clearImage = '';
      }
    }
    else {
      
      this.clearImage = '';
    }
  }

  getBackdocument(event: any) {
    this.imageFile1 = event.target.files[0];
    if ((this.imageFile1.type == 'image/png') || (this.imageFile1.type == 'image/jpeg') || (this.imageFile1.type == 'image/jpg')) {
      
      if (this.imageFile1.size <= 20 * 1024 * 1024) {
        this.errorShow = false;
      } else {
        this.errorShow = true;
        this.clearImage = '';
      }
    }
    else {
      
      this.clearImage = '';
    }
  }


  submit() {


    if (this.documentname?.value == 'Aadhaar') {
      const formData = new FormData;
      formData.append('merchantDocumentId ', this.merchantDocumentId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value.trim());
      formData.append('docNumber', this.documentNumber?.value.trim());
      formData.append('modifiedBy ', this.createdBy);

      this.service.KycUpdate(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.details = res.response;
          this.toaster.success(res.responseMessage)
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload()
          }, 500);        }
        else {
          this.toaster.error(res.responseMessage)

        }
      })
    }
    else if (this.documentname?.value == 'PAN') {
      const formData = new FormData;
      formData.append('merchantDocumentId ', this.merchantDocumentId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.panNumber?.value);
      formData.append('modifiedBy ', this.createdBy);

      this.service.KycUpdate(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.details = res.response;
          this.toaster.success(res.message)
          this.dialog.closeAll();
          window.location.reload();
        }
        else {
          this.toaster.error(res.message)
        }
      })
    }
    else if (this.documentname?.value == 'Passport') {
      const formData = new FormData;
      formData.append('merchantDocumentId ', this.merchantDocumentId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.passportNumber?.value);
      formData.append('modifiedBy ', this.createdBy);
      this.service.KycUpdate(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.details = res.response;
          this.toaster.success(res.message)
          this.dialog.closeAll();
          window.location.reload();
        }
        else {
          this.toaster.error(res.message)

        }
      })
    }
    else if (this.documentname?.value == 'GST') {
      const formData = new FormData;
      formData.append('merchantDocumentId ', this.merchantDocumentId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.gstNumber?.value);
      formData.append('modifiedBy ', this.createdBy);
      this.service.KycUpdate(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.details = res.response;
          this.toaster.success(res.message)
          this.dialog.closeAll();
          window.location.reload();
        }
        else {
          this.toaster.error(res.message)
        }
      })
    }
    else if (this.documentname?.value == 'Driving License') {
      const formData = new FormData;
      formData.append('merchantDocumentId ', this.merchantDocumentId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.drivingLicenseNumber?.value);
      formData.append('modifiedBy ', this.createdBy);
      this.service.KycUpdate(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.details = res.response;
          this.toaster.success(res.message)
          this.dialog.closeAll();
          window.location.reload();
        }
        else {
          this.toaster.error(res.message)

        }
      })
    }
    else if (this.documentname?.value == 'Cin') {
      const formData = new FormData;
      formData.append('merchantDocumentId ', this.merchantDocumentId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.cinch?.value);
      formData.append('modifiedBy ', this.createdBy);
      this.service.KycUpdate(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.details = res.response;
          this.toaster.success(res.message)
          this.dialog.closeAll();
          window.location.reload();
        }
        else {
          this.toaster.error(res.message)
        }
      })
    }
    else if (this.documentname?.value == 'VoterId') {
      const formData = new FormData;
      formData.append('merchantDocumentId ', this.merchantDocumentId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.voterid?.value);
      formData.append('modifiedBy ', this.createdBy);
      this.service.KycUpdate(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.details = res.response;
          this.toaster.success(res.message)
          this.dialog.closeAll();
          window.location.reload();
        }
        else {
          this.toaster.error(res.message)
        }
      })
    }

  }
}
