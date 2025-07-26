import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branchadds } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrl: './branch-add.component.css',
})
export class BranchAddComponent {
  merchantid: any;
  branch!: FormGroup;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  options: any;
  plans: any;
  todayDate: string = '';
  Expirydate: any;
  Bankdetails: boolean = true;
  id: any;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  selectElement: any;
  selectElements: any;
  select: any;
  uploadsignback: any;
  uploadidentityfront: any;
  uploadidentityback: any;
  uploadaddressfront: any;
  uploadaddressback: any;
  uploadsignfront: any;
  KYCdetails: boolean = false;
  branchId: any;
  eighteenYearsAgo: Date;

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private location: Location
  ) {
    const today = new Date();
    this.eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());


  }

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.branch = new FormGroup({
      branchName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),

        Validators.maxLength(50),
      ]),
      apiKey: new FormControl('', [Validators.required]),
      secretKey: new FormControl('', [Validators.required]),
      bankName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),

        Validators.maxLength(50),
      ]),
      accountHolderName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      accountNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9,18}$'),
      ]),
      ifscCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$'),
      ]),
      accountId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{1,10}$/),
      ]),
      smsmerchantname: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(20),
      ]),
    });

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
  }


  dateFilter = (d: Date | null): boolean => {
    return d ? d <= this.eighteenYearsAgo : false;
  }




  get branchName() {
    return this.branch.get('branchName');
  }
  get smsmerchantname() {
    return this.branch.get('smsmerchantname');
  }

  get apiKey() {
    return this.branch.get('apiKey');
  }

  get secretKey() {
    return this.branch.get('secretKey');
  }

  get bankName() {
    return this.branch.get('bankName');
  }

  get accountId() {
    return this.branch.get('accountId');
  }

  get accountHolderName() {
    return this.branch.get('accountHolderName');
  }
  get accountNumber() {
    return this.branch.get('accountNumber');
  }
  get ifscCode() {
    return this.branch.get('ifscCode');
  }

  // second Form

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
    const identityProofNoControl2 =
      this.firstFormGroup.get('drivingLicenceDob');

    identityProofNoControl?.clearValidators();

    if (this.selectElement == 'Aadhar Card') {
      identityProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{12}$'),
      ]); // 12 digits for Aadhar
      identityProofNoControl2?.setValidators([]); // Driving license format
      identityProofNoControl1?.setValidators([]); // Driving license format
    }
    if (this.selectElement == 'Pancard') {
      identityProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]$'),
      ]); // PAN format
      identityProofNoControl2?.setValidators([]); // Driving license format
      identityProofNoControl1?.setValidators([]); // Driving license format
    }
    if (this.selectElement == 'Voter Id Proof') {
      identityProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{3}[0-9]{7}$'),
      ]); // Voter ID format
      identityProofNoControl2?.setValidators([]); // Driving license format
      identityProofNoControl1?.setValidators([]); // Driving license format
    }
    if (this.selectElement == 'Passport') {
      identityProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{2}[0-9]{2}[0-9]{11}$'),
      ]); // Passport format
      identityProofNoControl1?.setValidators([Validators.required]); // Driving license format

      identityProofNoControl2?.setValidators([]); // Driving license format
    }
    if (this.selectElement == 'Driving License') {
      identityProofNoControl?.setValidators([Validators.required]);
      identityProofNoControl2?.setValidators([Validators.required]); // Driving license format
      identityProofNoControl1?.setValidators([]); // Driving license format
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
    const addressProofNoControl2 =
      this.secondFormGroup.get('drivingLicenceDobs');

    addressProofNoControl?.clearValidators();

    if (this.selectElements == 'Aadhar Card') {
      addressProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{12}$'),
      ]); // 12 digits for Aadhar
      addressProofNoControl2?.setValidators([]);
      addressProofNoControl1?.setValidators([]);
    }
    if (this.selectElements == 'Voter Id Proof') {
      addressProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{3}[0-9]{7}$'),
      ]);
      addressProofNoControl2?.setValidators([]);
      addressProofNoControl1?.setValidators([]);
    }
    if (this.selectElements == 'Passport') {
      addressProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{2}[0-9]{2}[0-9]{11}$'),
      ]); // Passport format
      addressProofNoControl1?.setValidators([Validators.required]); // Driving license format

      addressProofNoControl2?.setValidators([]);
    }
    if (this.selectElements == 'Driving License') {
      addressProofNoControl?.setValidators([Validators.required]);
      addressProofNoControl2?.setValidators([Validators.required]); // Driving license format
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
    const signatureProofNoControl2 = this.thirdFormGroup.get(
      'drivingLicenceDobss'
    );

    signatureProofNoControl?.clearValidators();

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
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadidentityfront.type)) {
        if (this.uploadidentityfront.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.identityFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.identityFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
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
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadidentityback.type)) {
        if (this.uploadidentityback.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.identityBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.identityBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
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
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadaddressfront.type)) {
        if (this.uploadaddressfront.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.addressFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.addressFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
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
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadaddressback.type)) {
        if (this.uploadaddressback.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.addressBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.addressBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
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
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadsignfront.type)) {
        if (this.uploadsignfront.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.signatureFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.signatureFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
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
        'application/pdf',
      ];

      if (acceptableTypes.includes(this.uploadsignback.type)) {
        if (this.uploadsignback.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.signatureBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.signatureBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error('No file selected');
    }
  }

  Submit() {
    let submitModel: Branchadds = {
      branchName: this.branchName?.value.trim(),
      accountId: this.accountId?.value,
      apiKey: this.apiKey?.value.trim(),
      secretKey: this.secretKey?.value.trim(),
      bankName: this.bankName?.value.trim(),
      accountHolderName: this.accountHolderName?.value.trim(),
      accountNumber: this.accountNumber?.value,
      ifscCode: this.ifscCode?.value,
      createdBy: this.getadminname,
      merchantId: this.id,
      smsMerchantName: this.smsmerchantname?.value.trim()
    }

    this.service.BranchAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchId = res.response.branchId;
        this.toastr.success(res.responseMessage);
        this.Bankdetails = false;
        this.KYCdetails = true;
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  kycsubmit() {
    const formData = new FormData();
    formData.append('merchantId', this.id);
    formData.append('branchId', this.branchId);
    formData.append('createdBy', this.getadminname);
    formData.append('identityFrontPath', this.uploadidentityfront);
    formData.append('identityBackPath', this.uploadidentityback);
    formData.append('identityProof', this.identityProof?.value);
    formData.append('identityProofNo', this.identityProofNo?.value.trim());
    formData.append('addressFrontPath', this.uploadaddressfront);
    formData.append('addressBackPath', this.uploadaddressback);
    formData.append('addressProof', this.addressProof?.value);
    formData.append('addressProofNo', this.addressProofNo?.value.trim());
    formData.append('signatureFrontPath', this.uploadsignfront);
    formData.append('signatureBackPath', this.uploadsignback);
    formData.append('signatureProof', this.signatureProof?.value);
    formData.append('signatureProofNo', this.signatureProofNo?.value.trim());
    formData.append(
      'drivingLicenceDob',
      this.drivingLicenceDob?.value ||
      this.drivingLicenceDobs?.value ||
      this.drivingLicenceDobss?.value
    );
    formData.append(
      'passportDob',
      this.passportDob?.value ||
      this.passportDobs?.value ||
      this.passportDobss?.value
    );
    this.service.addkycbranch(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.location.back();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
  close() {
    this.location.back();
  }
}
