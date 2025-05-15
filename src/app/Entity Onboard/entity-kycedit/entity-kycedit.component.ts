import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-entity-kycedit',
  templateUrl: './entity-kycedit.component.html',
  styleUrl: './entity-kycedit.component.css'
})
export class EntityKyceditComponent implements OnInit {
  value1: any;
  value2: any;
  KycIdentityForm: any = FormGroup
  KycAddressForm: any = FormGroup
  categorydetails: any;
  identityvalue: any;
  identitydata: any;
  proofId: any;
  identityProofNos: any;
  selectElement: any;
  selectElements: any;
  KycsignatureForm: any = FormGroup;
  select: any;
  addressProofvalue: any;
  addressProofNovalue: any;
  signatureProofvalue: any;
  signatureProofNovalue: any;
  identityProofs: any;
  selectkyc: any;
  driving: any;
  pass: any;
  DrivingDob: any;
  PassportDob: any;
  eighteenYearsAgo: Date;
  getadminname: any = JSON.parse(sessionStorage.getItem('adminname') || '');
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    const today = new Date();
    this.eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  }

  ngOnInit(): void {

    this.value1 = this.data.value
    this.identitydata = this.data.value1
    this.proofId = this.data.value1.proofId
    this.identityProofs = this.data.value1.identityProof
    this.identityProofNos = this.data.value1.identityProofNo
    this.addressProofvalue = this.data.value1.addressProof
    this.addressProofNovalue = this.data.value1.addressProofNo
    this.DrivingDob = this.data.value1.drivingLicenceDob;
    this.PassportDob = this.data.value1.passportDob;
    this.driving = this.DrivingDob ? moment(this.DrivingDob).format('DD-MM-YYYY') : '';
    this.pass = this.PassportDob ? moment(this.PassportDob).format('DD-MM-YYYY') : '';
    this.signatureProofvalue = this.data.value1.signatureProof
    this.signatureProofNovalue = this.data.value1.signatureProofNo;


    


    this.KycIdentityForm = this.fb.group({
      identityProof: ['', [
        Validators.required,
      ]],
      identityProofNo: ['', [
        Validators.required,
      ]],
      drivingLicenceDob: [''],
      passportDob: [''],
    })

    this.KycAddressForm = this.fb.group({
      addressProof: ['', [Validators.required]],
      addressProofNo: ['', [Validators.required]],
      drivingLicenceDobs: [''],
      passportDobs: [''],
    })

    this.KycsignatureForm = this.fb.group({
      signatureProof: ['', [Validators.required]],
      signatureProofNo: ['', [Validators.required]],
      drivingLicenceDobss: [''],
      passportDobss: [''],
    });

  }

  dateFilter = (d: Date | null): boolean => {
    return d ? d <= this.eighteenYearsAgo : false;
  }



  get identityProof() {
    return this.KycIdentityForm.get('identityProof')
  }

  get identityProofNo() {
    return this.KycIdentityForm.get('identityProofNo')
  }
  get drivingLicenceDob() {
    return this.KycIdentityForm.get('drivingLicenceDob')
  }
  get passportDob() {
    return this.KycIdentityForm.get('passportDob')
  }
  get addressProof() {
    return this.KycAddressForm.get('addressProof')
  }

  get addressProofNo() {
    return this.KycAddressForm.get('addressProofNo')
  }
  get drivingLicenceDobs() {
    return this.KycAddressForm.get('drivingLicenceDobs')
  }
  get passportDobs() {
    return this.KycAddressForm.get('passportDobs')
  }
  get signatureProof() {
    return this.KycsignatureForm.get('signatureProof')
  }
  get signatureProofNo() {
    return this.KycsignatureForm.get('signatureProofNo')
  }
  get drivingLicenceDobss() {
    return this.KycsignatureForm.get('drivingLicenceDobss')
  }
  get passportDobss() {
    return this.KycsignatureForm.get('passportDobss')
  }
  onIdentityProofChange(event: any) {
    this.selectElement = event.target.value;

    console.log("jenfwejkfn" + this.selectElement)
    const identityProofNoControl = this.KycIdentityForm.get('identityProofNo');
    const identityProofDOBControl1 = this.KycIdentityForm.get('passportDob');
    const identityProofDOBControl2 = this.KycIdentityForm.get('drivingLicenceDob');

    if (this.selectElement == 'Passport' || this.selectElement == 'Driving License') {
      this.PassportDob = ''
      this.DrivingDob = ''
      console.log("PassportDob" + this.PassportDob)
      console.log("DrivingDob" + this.DrivingDob)
    }
    else {
      this.passportDob
      this.DrivingDob
      console.log("PassportDob" + this.PassportDob)
      console.log("DrivingDob" + this.DrivingDob)

    }

    identityProofNoControl?.clearValidators();
    identityProofDOBControl1?.clearValidators();
    identityProofDOBControl2?.clearValidators();


    if (this.selectElement === 'Aadhar Card') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[0-9]{12}$")]);
    }
    else if (this.selectElement === 'Pancard') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]$")]);
    }
    else if (this.selectElement === 'Voter Id Proof') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{7}$")]);
    }
    else if (this.selectElement === 'Passport') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]);
      identityProofDOBControl1?.setValidators([Validators.required]);
      identityProofDOBControl2?.clearValidators();
    }
    else if (this.selectElement === 'Driving License') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]);
      identityProofDOBControl2?.setValidators([Validators.required]);
      identityProofDOBControl1?.clearValidators();
    }

    identityProofNoControl?.reset();
    identityProofDOBControl1?.reset();
    identityProofDOBControl2?.reset();

    identityProofNoControl?.updateValueAndValidity();
    identityProofDOBControl1?.updateValueAndValidity();
    identityProofDOBControl2?.updateValueAndValidity();
  }


  change(event: any) {
    this.selectkyc = event.target.value;
  }
  onAddressProofChange(event: any) {
    this.selectElements = event.target.value;
    const addressProofNoControl = this.KycAddressForm.get('addressProofNo');

    // Clear existing validators
    addressProofNoControl?.clearValidators();

    // Set validators based on the selected address proof
    if (this.selectElements === 'Aadhar Card') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[0-9]{12}$")]); // 12 digits for Aadhar
    } else if (this.selectElements === 'Voter Id Proof') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{7}$")]); // Voter ID format
    } else if (this.selectElements === 'Passport') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]); // Passport format
    } else if (this.selectElements === 'Driving License') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Driving license format
    }




    this.KycAddressForm.get('addressProofNo')?.reset();

    this.KycAddressForm.get('drivingLicenceDobs')?.reset();
    this.KycAddressForm.get('passportDobs')?.reset();

    // Check if the input already has a value
    if (addressProofNoControl?.value) {
      addressProofNoControl?.updateValueAndValidity();
    } else {
      addressProofNoControl?.updateValueAndValidity({ onlySelf: true });
    }
  }

  onasignproof(event: any) {
    this.select = event.target.value;
    const signatureProofNoControl = this.KycsignatureForm.get('signatureProofNo');

    // Clear existing validators
    signatureProofNoControl?.clearValidators();

    // Set validators based on the selected signature proof type
    if (this.select === 'Pancard') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]$")]);
    } else if (this.select === 'Passport') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]); // Passport format
    } else if (this.select === 'Driving License') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Driving license format
    }

    this.KycsignatureForm.get('signatureProofNo')?.reset();

    this.KycsignatureForm.get('drivingLicenceDobss')?.reset();
    this.KycsignatureForm.get('passportDobss')?.reset();


    // Check if the input already has a value
    if (signatureProofNoControl?.value) {
      signatureProofNoControl?.updateValueAndValidity();
    } else {
      signatureProofNoControl?.updateValueAndValidity({ onlySelf: true });
    }
  }


  submit() {
    const formData = new FormData;
    formData.append('identityProof', this.identityProof.value);
    formData.append('proofId', this.proofId);
    formData.append('modifiedBy', this.getadminname);
    formData.append('identityProofNo', this.identityProofNo.value);
    formData.append('drivingLicenceDob', this.drivingLicenceDob.value || this.DrivingDob);
    formData.append('passportDob', this.passportDob.value || this.PassportDob);
    this.service.editIdentity(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.identityvalue = res.response;
        this.toastr.success(res.responseMessage)
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.responseMessage)

      }
    })


  }

  submit1() {
    const formData = new FormData;
    formData.append('addressProof', this.addressProof.value);
    formData.append('proofId', this.proofId);
    formData.append('addressModifiedBy', this.getadminname);
    formData.append('addressProofNo', this.addressProofNo.value);
    formData.append('drivingLicenceDob', this.drivingLicenceDobs.value || this.DrivingDob);
    formData.append('passportDob', this.passportDobs.value || this.PassportDob);
    this.service.editAddress(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.identityvalue = res.response;
        this.toastr.success(res.responseMessage)
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.responseMessage)

      }
    })


  }
  submit2() {

    const formData = new FormData;
    formData.append('signatureProof', this.signatureProof.value);
    formData.append('proofId', this.proofId);
    formData.append('signatureModifiedBy', this.getadminname);
    formData.append('signatureProofNo', this.signatureProofNo.value);
    formData.append('drivingLicenceDob', this.drivingLicenceDobss.value || this.DrivingDob);
    formData.append('passportDob', this.passportDobss.value || this.PassportDob);


    this.service.editSignature(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.identityvalue = res.response;
        this.toastr.success(res.responseMessage)
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.responseMessage)

      }
    })

  }
}
