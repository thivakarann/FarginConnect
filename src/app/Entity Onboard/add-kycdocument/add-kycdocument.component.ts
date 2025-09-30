import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-kycdocument',
  templateUrl: './add-kycdocument.component.html',
  styleUrl: './add-kycdocument.component.css',
})
export class AddKycdocumentComponent implements OnInit {
  KycForm!: FormGroup;
  imageFile!: File;
  imageFile1!: File;
  errorShow!: boolean;
  clearImage: any = '';
  getadminname: any = JSON.parse(sessionStorage.getItem('adminname') || '');
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
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  isStepCompleted: boolean[] = [false];
  isLinear = false;
  eighteenYearsAgo: Date;
  completeStep(index: number): void {
    this.isStepCompleted[index] = true;
  }


  constructor(
    private service: FarginServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const today = new Date();
    this.eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
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
    });
  }

  dateFilter = (d: Date | null): boolean => {
    return d ? d <= this.eighteenYearsAgo : false;
  }
  get identityProof() {
    return this.firstFormGroup.get('identityProof');
  }
  get identityProofNo() {
    return this.firstFormGroup.get('identityProofNo');
  }
  get identityFrontPath() {
    return this.firstFormGroup.get('identityFrontPath');
  }

  get identityBackPath() {
    return this.firstFormGroup.get('identityBackPath');
  }

  get drivingLicenceDob() {
    return this.firstFormGroup.get('drivingLicenceDob');
  }
  get passportDob() {
    return this.firstFormGroup.get('passportDob');
  }

  get addressProof() {
    return this.secondFormGroup.get('addressProof');
  }

  get addressProofNo() {
    return this.secondFormGroup.get('addressProofNo');
  }

  get addressFrontPath() {
    return this.secondFormGroup.get('addressFrontPath');
  }

  get addressBackPath() {
    return this.secondFormGroup.get('addressBackPath');
  }
  get drivingLicenceDobs() {
    return this.secondFormGroup.get('drivingLicenceDobs');
  }
  get passportDobs() {
    return this.secondFormGroup.get('passportDobs');
  }

  get signatureProof() {
    return this.thirdFormGroup.get('signatureProof');
  }
  get signatureProofNo() {
    return this.thirdFormGroup.get('signatureProofNo');
  }
  get signatureFrontPath() {
    return this.thirdFormGroup.get('signatureFrontPath');
  }
  get signatureBackPath() {
    return this.thirdFormGroup.get('signatureBackPath');
  }
  get drivingLicenceDobss() {
    return this.thirdFormGroup.get('drivingLicenceDobss');
  }
  get passportDobss() {
    return this.thirdFormGroup.get('passportDobss');
  }




  onIdentityProofChange(event: any) {
    this.selectElement = event.target.value;
    const identityProofNoControl = this.firstFormGroup.get('identityProofNo');
    const identityProofNoControl1 = this.firstFormGroup.get('passportDob');
    const identityProofNoControl2 = this.firstFormGroup.get('drivingLicenceDob');

    identityProofNoControl?.clearValidators();
    identityProofNoControl1?.clearValidators();
    identityProofNoControl2?.clearValidators();

    if (this.selectElement == 'Aadhar Card') {
      identityProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{12}$'),
      ]); // 12 digits for Aadhar
      identityProofNoControl1?.setValidators([]);
      identityProofNoControl2?.setValidators([]);
    }
    if (this.selectElement == 'Pancard') {
      identityProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]$'),
      ]); // PAN format
      identityProofNoControl1?.setValidators([]);
      identityProofNoControl2?.setValidators([]);
    }
    if (this.selectElement == 'Voter Id Proof') {
      identityProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{3}[0-9]{7}$'),
      ]); // Voter ID format
      identityProofNoControl1?.setValidators([]);
      identityProofNoControl2?.setValidators([]);
    }
    if (this.selectElement == 'Passport') {
      identityProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{2}[0-9]{2}[0-9]{11}$'),
      ]);
      identityProofNoControl1?.setValidators([Validators.required]);
      identityProofNoControl2?.setValidators([]);
    }
    if (this.selectElement == 'Driving License') {
      identityProofNoControl?.setValidators([Validators.required]);
      identityProofNoControl2?.setValidators([Validators.required]);
      identityProofNoControl1?.setValidators([]);
    }

    // Reset the values of the related fields
    this.firstFormGroup.get('identityProofNo')?.reset();
    this.firstFormGroup.get('identityFrontPath')?.reset();
    this.firstFormGroup.get('identityBackPath')?.reset();
    this.firstFormGroup.get('drivingLicenceDob')?.reset();
    this.firstFormGroup.get('passportDob')?.reset();

    // Recheck the form's validity
    this.firstFormGroup.updateValueAndValidity(); // This is critical to revalidate the whole form group
  }

  onAddressProofChange(event: any) {
    this.selectElements = event.target.value;
    const addressProofNoControl = this.secondFormGroup.get('addressProofNo');
    const addressProofNoControl1 = this.secondFormGroup.get('passportDobs');
    const addressProofNoControl2 = this.secondFormGroup.get('drivingLicenceDobs');

    addressProofNoControl?.clearValidators();
    addressProofNoControl1?.clearValidators();
    addressProofNoControl2?.clearValidators();

    if (this.selectElements == 'Aadhar Card') {
      addressProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{12}$'),
      ]); // 12 digits for Aadhar
      addressProofNoControl1?.clearValidators();
      addressProofNoControl2?.clearValidators();
    }
    if (this.selectElements == 'Voter Id Proof') {
      addressProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{3}[0-9]{7}$'),
      ]);
      addressProofNoControl1?.clearValidators();
      addressProofNoControl2?.clearValidators();
    }
    if (this.selectElements == 'Passport') {
      addressProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{2}[0-9]{2}[0-9]{11}$'),
      ]); // Passport format
      addressProofNoControl1?.setValidators([Validators.required]);
      addressProofNoControl2?.setValidators([]);
    }
    if (this.selectElements == 'Driving License') {
      addressProofNoControl?.setValidators([Validators.required]);
      addressProofNoControl2?.setValidators([Validators.required]);
      addressProofNoControl1?.setValidators([]);
    }

    this.secondFormGroup.get('addressProofNo')?.reset();
    this.secondFormGroup.get('addressFrontPath')?.reset();
    this.secondFormGroup.get('addressBackPath')?.reset();
    this.secondFormGroup.get('drivingLicenceDobs')?.reset();
    this.secondFormGroup.get('passportDobs')?.reset();

    this.secondFormGroup?.updateValueAndValidity();
  }

  onasignproof(event: any) {
    this.select = event.target.value;
    const signatureProofNoControl = this.thirdFormGroup.get('signatureProofNo');
    const signatureProofNoControl1 = this.thirdFormGroup.get('passportDobss');
    const signatureProofNoControl2 = this.thirdFormGroup.get('drivingLicenceDobss'
    );

    signatureProofNoControl?.clearValidators();
    signatureProofNoControl1?.clearValidators();
    signatureProofNoControl2?.clearValidators();

    if (this.select == 'Pancard') {
      signatureProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]$'),
      ]);
      signatureProofNoControl2?.setValidators([]);
      signatureProofNoControl1?.setValidators([]);
    }
    if (this.select == 'Passport') {
      signatureProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{2}[0-9]{2}[0-9]{11}$'),
      ]); // Passport format
      signatureProofNoControl1?.setValidators([Validators.required]); // Driving license format

      signatureProofNoControl2?.setValidators([]);
    }
    if (this.select == 'Driving License') {
      signatureProofNoControl?.setValidators([Validators.required]);
      signatureProofNoControl2?.setValidators([Validators.required]); // Driving license format
      signatureProofNoControl1?.setValidators([]);
      signatureProofNoControl2?.updateValueAndValidity();
    }

    this.thirdFormGroup.get('signatureProofNo')?.reset();
    this.thirdFormGroup.get('signatureFrontPath')?.reset();
    this.thirdFormGroup.get('signatureBackPath')?.reset();
    this.thirdFormGroup.get('drivingLicenceDobss')?.reset();
    this.thirdFormGroup.get('passportDobss')?.reset();

    this.thirdFormGroup?.updateValueAndValidity();
  }



  onFileSelected(event: any) {
    this.uploadidentityfront = event.target.files[0];
    // Ensure this.uploadImage is not null
    if (this.uploadidentityfront) {
      const acceptableTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'application/pdf',
      ];
      if (acceptableTypes.includes(this.uploadidentityfront.type)) {
        if (this.uploadidentityfront.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.identityFrontPath?.reset();
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.identityFrontPath?.reset();
      }
    } else {
      this.toastr.error('No file selected');
    }

  }


  onFileSelected2(event: any) {
    this.uploadidentityback = event.target.files[0];
    // Ensure this.uploadImage is not null
    if (this.uploadidentityback) {
      const acceptableTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadidentityback.type)) {
        if (this.uploadidentityback.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.identityBackPath?.reset();
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.identityBackPath?.reset();
      }
    } else {
      this.toastr.error('No file selected');
    }
  }
  onaddressfront(event: any) {
    this.uploadaddressfront = event.target.files[0];
    // Ensure this.uploadImage is not null
    if (this.uploadaddressfront) {
      const acceptableTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadaddressfront.type)) {
        if (this.uploadaddressfront.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.addressFrontPath?.reset();
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.addressFrontPath?.reset();
      }
    } else {
      this.toastr.error('No file selected');
    }
  }
  onaddressback(event: any) {
    this.uploadaddressback = event.target.files[0];

    // Ensure this.uploadImage is not null
    if (this.uploadaddressback) {
      const acceptableTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadaddressback.type)) {
        if (this.uploadaddressback.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.addressBackPath?.reset();
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.addressBackPath?.reset();
      }
    } else {
      this.toastr.error('No file selected');
    }
  }
  onasignfront(event: any) {
    this.uploadsignfront = event.target.files[0];

    // Ensure this.uploadImage is not null
    if (this.uploadsignfront) {
      const acceptableTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadsignfront.type)) {
        if (this.uploadsignfront.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.signatureFrontPath?.reset();
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.signatureFrontPath?.reset();
      }
    } else {
      this.toastr.error('No file selected');
    }
  }
  onasignback(event: any) {
    this.uploadsignback = event.target.files[0];

    // Ensure this.uploadImage is not null
    if (this.uploadsignback) {
      const acceptableTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadsignback.type)) {
        if (this.uploadsignback.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.signatureBackPath?.reset();
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.signatureBackPath?.reset();
      }
    } else {
      this.toastr.error('No file selected');
    }
  }

  kycsubmit() {
    const formData = new FormData();
    formData.append('merchantId', this.merchantid);
    formData.append('identityFrontPath', this.uploadidentityfront);
    formData.append('identityBackPath', this.uploadidentityback);
    formData.append('identityProof', this.identityProof?.value);
    formData.append('identityProofNo', this.identityProofNo?.value.trim());
    formData.append('addressFrontPath', this.uploadaddressfront);
    formData.append('addressBackPath', this.uploadaddressback);
    formData.append('addressProof', this.addressProof?.value);
    formData.append('addressProofNo', this.addressProofNo?.value.trim());
    formData.append('signatureFrontPath', this.uploadsignfront);
    formData.append('createdBy', this.getadminname);
    formData.append('signatureBackPath', this.uploadsignback);
    formData.append('signatureProof', this.signatureProof?.value);
    formData.append('signatureProofNo', this.signatureProofNo?.value.trim());
    formData.append('drivingLicenceDob', this.drivingLicenceDob?.value || this.drivingLicenceDobs?.value || this.drivingLicenceDobss?.value
    );
    formData.append(
      'passportDob',
      this.passportDob?.value ||
      this.passportDobs?.value ||
      this.passportDobss?.value
    );
    this.service.entitykycs(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
