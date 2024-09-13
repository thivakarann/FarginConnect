import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-kycdocument',
  templateUrl: './add-kycdocument.component.html',
  styleUrl: './add-kycdocument.component.css'
})
export class AddKycdocumentComponent implements OnInit {
  KycForm!: FormGroup;
  imageFile!: File;
  imageFile1!: File;
  errorShow!: boolean;
  clearImage: any = '';
  createdBy: any = localStorage.getItem('adminname');
  details: any;
  merchantId: any;
  categorydetails: any;
  businessCategoryId: any;
  businesscreationId: any;
  kycDocName: any;


  constructor(private service: FarginServiceService, private dialog: MatDialog, private toaster: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {


    this.merchantId = this.data.value
    console.log(this.merchantId);
    this.businessCategoryId = this.data.value1
    console.log("Business", this.businessCategoryId)


    this.KycForm = new FormGroup({
      documentname: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{12}$")]),
      panNumber: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$")]),
      passportNumber: new FormControl('', [Validators.required, Validators.pattern("/^[A-Z]{2}\d{6}$/")]),
      gstNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$")]),
      drivingLicenseNumber: new FormControl('', [Validators.required,  Validators.pattern("^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$")]),
      cinch: new FormControl('', [Validators.required]),
      documentfront: new FormControl('', [Validators.required]),
      documentback: new FormControl('', [Validators.required]),
    })
    this.service.KycDocName(this.businessCategoryId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.categorydetails = res.response;
        console.log(this.categorydetails)
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
  get documentfront() {
    return this.KycForm.get('documentfront');
  }
  get documentback() {
    return this.KycForm.get('documentback');
  }


  getdocument(event: any) {
    this.imageFile = event.target.files[0];
    if ((this.imageFile.type == 'image/png') || (this.imageFile.type == 'image/jpeg') || (this.imageFile.type == 'image/jpg')) {
      console.log(this.imageFile.type)
      if (this.imageFile.size <= 20 * 1024 * 1024) {
        this.errorShow = false;
      } else {
        this.errorShow = true;
        this.clearImage = '';
      }
    }
    else {
      console.log(this.imageFile.type)
      this.clearImage = '';
    }
  }

  getBackdocument(event: any) {
    this.imageFile1 = event.target.files[0];
    if ((this.imageFile1.type == 'image/png') || (this.imageFile1.type == 'image/jpeg') || (this.imageFile1.type == 'image/jpg')) {
      console.log(this.imageFile1.type)
      if (this.imageFile1.size <= 20 * 1024 * 1024) {
        this.errorShow = false;
      } else {
        this.errorShow = true;
        this.clearImage = '';
      }
    }
    else {
      console.log(this.imageFile1.type)
      this.clearImage = '';
    }
  }


  submit() {
    if (this.documentname?.value == 'Aadhar Card') {
      const formData = new FormData;
      formData.append('merchantId', this.merchantId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.documentNumber?.value);
      formData.append('createdBy', this.createdBy)



      this.service.KycAdd(formData).subscribe((res: any) => {
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
    else if (this.documentname?.value == 'PAN') {
      const formData = new FormData;
      formData.append('merchantId', this.merchantId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.panNumber?.value);
      formData.append('createdBy', this.createdBy)



      this.service.KycAdd(formData).subscribe((res: any) => {
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
      formData.append('merchantId', this.merchantId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.passportNumber?.value);
      formData.append('createdBy', this.createdBy)



      this.service.KycAdd(formData).subscribe((res: any) => {
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
      formData.append('merchantId', this.merchantId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.gstNumber?.value);
      formData.append('createdBy', this.createdBy)



      this.service.KycAdd(formData).subscribe((res: any) => {
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
      formData.append('merchantId', this.merchantId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.drivingLicenseNumber?.value);
      formData.append('createdBy', this.createdBy)



      this.service.KycAdd(formData).subscribe((res: any) => {
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
    else if (this.documentname?.value == 'Cinch') {
      const formData = new FormData;
      formData.append('merchantId', this.merchantId);
      formData.append('docFrontPath', this.imageFile);
      formData.append('docBackPath', this.imageFile1);
      formData.append('docName', this.documentname?.value);
      formData.append('docNumber', this.cinch?.value);
      formData.append('createdBy', this.createdBy)

      this.service.KycAdd(formData).subscribe((res: any) => {
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