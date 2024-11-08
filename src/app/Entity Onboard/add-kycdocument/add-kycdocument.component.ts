import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  selectElement: any;
  selectElements: any;
  select: any;
  file5!: any;
  file6!: any;
  kycValue: any;
  file8!: any;
  file9!: any;
  id: any;
  selectperiod: any;
  errorMessage: any;
  file1: any;
  file2: any;
  file3: any;
  file4: any;
  merchantid: any;
  uploadImage: any;
  uploadImage2: any;
  uploadImage3: any;
  uploadImage4: any;
  uploadImage5: any;
  uploadImage6: any;
  uploadidentityfront: any;
  uploadidentityback: any;
  uploadaddressfront: any;
  uploadaddressback: any;
  uploadsignfront: any;
  uploadsignback: any;
  today: string;


  constructor(private service: FarginServiceService, private dialog: MatDialog, private toastr: ToastrService,
    private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
      const todayDate = new Date();
      this.today = todayDate.toISOString().split('T')[0];
  }
  ngOnInit(): void {

    this.merchantid = this.data.value;
    
    this.firstFormGroup = this._formBuilder.group({
      identityProof: ['', Validators.required],
      identityProofNo: ['', Validators.required],
      identityFrontPath: [null, Validators.required],
      identityBackPath: [null, Validators.required],
      drivingLicenceDob: [''],
      passportDob: [''],

    });
    this.secondFormGroup = this._formBuilder.group({
      addressProof: ['', Validators.required],
      addressProofNo: ['', Validators.required],
      addressFrontPath: [null, Validators.required],
      addressBackPath: [null, Validators.required],
      drivingLicenceDobs: [''],
      passportDobs: [''],
    });

    this.thirdFormGroup = this._formBuilder.group({
      signatureProof: ['', Validators.required],
      signatureProofNo: ['', Validators.required],
      signatureFrontPath: [null, Validators.required],
      signatureBackPath: [null, Validators.required],
      drivingLicenceDobss: [''],
      passportDobss: [''],
    });

    this.service.KycDocName(this.businessCategoryId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.categorydetails = res.response;
        
      }
    })
  }
  get identityProof() {
    return this.firstFormGroup.get('identityProof')
  }
  get identityProofNo() {
    return this.firstFormGroup.get('identityProofNo')
  }
  get identityFrontPath() {
    return this.firstFormGroup.get('identityFrontPath')
  }

  get identityBackPath() {
    return this.firstFormGroup.get('identityBackPath')
  }

  get drivingLicenceDob() {
    return this.firstFormGroup.get('drivingLicenceDob')
  }
  get passportDob() {
    return this.firstFormGroup.get('passportDob')
  }

  get addressProof() {
    return this.secondFormGroup.get('addressProof')
  }

  get addressProofNo() {
    return this.secondFormGroup.get('addressProofNo')
  }

  get addressFrontPath() {
    return this.secondFormGroup.get('addressFrontPath')
  }

  get addressBackPath() {
    return this.secondFormGroup.get('addressBackPath')
  }
  get drivingLicenceDobs() {
    return this.secondFormGroup.get('drivingLicenceDobs')
  }
  get passportDobs() {
    return this.secondFormGroup.get('passportDobs')
  }

  get signatureProof() {
    return this.thirdFormGroup.get('signatureProof')
  }
  get signatureProofNo() {
    return this.thirdFormGroup.get('signatureProofNo')
  }
  get signatureFrontPath() {
    return this.thirdFormGroup.get('signatureFrontPath')
  }
  get signatureBackPath() {
    return this.thirdFormGroup.get('signatureBackPath')
  }
  get drivingLicenceDobss() {
    return this.thirdFormGroup.get('drivingLicenceDobss')
  }
  get passportDobss() {
    return this.thirdFormGroup.get('passportDobss')
  }
  onFileSelected(event: any) {
    this.uploadidentityfront = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadidentityfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadidentityfront.type)) {
        if (this.uploadidentityfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.identityFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.identityFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
 
  }
 
  onFileSelected2(event: any) {
    this.uploadidentityback = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadidentityback) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadidentityback.type)) {
        if (this.uploadidentityback.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } 
        else {
          this.toastr.error("Max Image size exceeded");
          this.identityBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.identityBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
 
  }
  onaddressfront(event: any) {
   
    this.uploadaddressfront = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadaddressfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadaddressfront.type)) {
        if (this.uploadaddressfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.addressFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.addressFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
  }
  onaddressback(event: any) {
    this.uploadaddressback = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadaddressback) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadaddressback.type)) {
        if (this.uploadaddressback.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.addressBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.addressBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
  }
  onasignfront(event: any) {
    this.uploadsignfront = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadsignfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadsignfront.type)) {
        if (this.uploadsignfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.signatureFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.signatureFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
  }
  onasignback(event: any) {
    this.uploadsignback = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadsignback) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadsignback.type)) {
        if (this.uploadsignback.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.signatureBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        this.toastr.error("File type not acceptable");
        this.signatureBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
 
  }
 


  onIdentityProofChange(event: any) {
    this.selectElement = event.target.value;
    const identityProofNoControl = this.firstFormGroup.get('identityProofNo');


    identityProofNoControl?.clearValidators();


    if (this.selectElement === 'Aadhar Card') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[0-9]{12}$")]); // 12 digits for Aadhar
    } else if (this.selectElement === 'Pancard') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$")]); // PAN format
    } else if (this.selectElement === 'Voter Id Proof') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{7}$")]); // Voter ID format
    } else if (this.selectElement === 'Passport') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Passport format
    } else if (this.selectElement === 'Driving License') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Driving license format
    }
    identityProofNoControl?.updateValueAndValidity();
  }


  onAddressProofChange(event: any) {
    this.selectElements = event.target.value;
    const addressProofNoControl = this.secondFormGroup.get('addressProofNo');

    addressProofNoControl?.clearValidators();
    if (this.selectElements === 'Aadhar Card') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[0-9]{12}$")]); // 12 digits for Aadhar
    } else if (this.selectElements === 'Voter Id Proof') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{7}$")]); // Voter ID format
    } else if (this.selectElements === 'Passport') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Passport format
    } else if (this.selectElements === 'Driving License') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Driving license format
    }
    addressProofNoControl?.updateValueAndValidity();
  }

  onasignproof(event: any) {
    this.select = event.target.value;
    const signatureProofNoControl = this.thirdFormGroup.get('signatureProofNo');
    signatureProofNoControl?.clearValidators();
    if (this.select === 'Pancard') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$")]);
    } else if (this.select === 'Passport') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Passport format
    } else if (this.select === 'Driving License') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Driving license format
    }
    signatureProofNoControl?.updateValueAndValidity();
  }
  kycsubmit() {
    const formData = new FormData();
    formData.append('merchantId', this.merchantid);
    formData.append('identityFrontPath', this.uploadidentityfront);
    formData.append('identityBackPath', this.uploadidentityback);
    formData.append('identityProof', this.identityProof?.value);
    formData.append('identityProofNo', this.identityProofNo?.value);
    formData.append('addressFrontPath', this.uploadaddressfront);
    formData.append('addressBackPath', this.uploadaddressback);
    formData.append('addressProof', this.addressProof?.value);
    formData.append('addressProofNo', this.addressProofNo?.value);
    formData.append('signatureFrontPath', this.uploadsignfront);
    formData.append('signatureBackPath', this.uploadsignback);
    formData.append('signatureProof', this.signatureProof?.value);
    formData.append('signatureProofNo', this.signatureProofNo?.value);
    formData.append('drivingLicenceDob', this.drivingLicenceDob?.value || this.drivingLicenceDobs?.value || this.drivingLicenceDobss?.value);
    formData.append('passportDob', this.passportDob?.value || this.passportDobs?.value || this.passportDobss?.value);
    this.service.entitykycs(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 400);

      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

}



