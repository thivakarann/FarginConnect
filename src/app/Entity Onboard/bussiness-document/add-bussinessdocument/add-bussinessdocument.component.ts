import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bussinessdocument',
  templateUrl: './add-bussinessdocument.component.html',
  styleUrl: './add-bussinessdocument.component.css'
})
export class AddBussinessdocumentComponent implements OnInit {
  fourthFormGroup!: FormGroup;
  selectElement4: any;
  kycValue: any;
  errorMessage: any;
  file8!: any;
  file9!: any;
  close: any;
  merchantid: any;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  emptyBlob = new Blob([], { type: 'application/pdf' })
  uploadImage: any;
  uploadImage8: any;
  uploadImage9: any;
  uploaddocfront: any;
  uploaddocback: any;
  bussinessid: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.bussinessid = this.data.value;
    

    // this.service.activeViewall().subscribe((res: any) => {
    //   this.kycValue = res.response;
      
    // })

    this.service.EntityGetKYCbybussinessid(this.bussinessid).subscribe((res: any) => {
      this.kycValue = res.response;
    })


    this.fourthFormGroup = this._formBuilder.group({
      kycCategoryId: ['', Validators.required],
      docNumber: [''],
      docFrontPath: ['', Validators.required],
      docBackPath: ['']
    })

  }

  get kycCategoryId() {
    return this.fourthFormGroup.get('kycCategoryId')
  }

  get docNumber() {
    return this.fourthFormGroup.get('docNumber')
  }

  get docFrontPath() {
    return this.fourthFormGroup.get('docFrontPath')
  }

  get docBackPath() {
    return this.fourthFormGroup.get('docBackPath')
  }

  docProofChange(event: any) {
    this.selectElement4 = event.target.value;
    
    const docNumbers = this.fourthFormGroup.get('docNumber');
    docNumbers?.clearValidators();
    if (this.selectElement4 === 'Aadhar Card') {
      docNumbers?.setValidators([Validators.required, Validators.pattern("^[0-9]{12}$")]); // 12 digits for Aadhar
    } else if (this.selectElement4 === 'Pancard') {
      docNumbers?.setValidators([Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$")]); // PAN format
    } else if (this.selectElement4 === 'Voter Id Proof') {
      docNumbers?.setValidators([Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{7}$")]); // Voter ID format
    } else if (this.selectElement4 === 'Passport') {
      docNumbers?.setValidators([Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]); // Passport format
    } else if (this.selectElement4 === 'Driving License') {
      docNumbers?.setValidators([Validators.required, Validators.pattern("^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$")]); // Driving license format
    }
    docNumbers?.updateValueAndValidity();
  }

  docfront(event: any) {
    this.uploaddocfront = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploaddocfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploaddocfront.type)) {
        if (this.uploaddocfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.docFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.docFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
 
  }
 
 
  docback(event: any) {
    this.uploaddocback = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploaddocback) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploaddocback.type)) {
        if (this.uploaddocback.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.docBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.docBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
 
  }

  docSubmit() {
    const formData = new FormData();
    formData.append('merchantId', this.merchantid);
    formData.append('docFrontPath', this.uploaddocfront);
    formData.append('docBackPath', this.uploaddocback || this.emptyBlob);
    formData.append('kycCategoryId', this.kycCategoryId?.value);
    formData.append('docNumber', this.docNumber?.value);
    formData.append('createdBy', this.getadminname);
    this.service.documentAdd(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

}
