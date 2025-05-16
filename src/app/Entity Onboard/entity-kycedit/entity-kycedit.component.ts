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
  Hidden: boolean=false;
  Hidden2: boolean=false;
  Hidden3: boolean=false;
  Hidden4: boolean=false;
  Hidden5: boolean=false;
  Hidden6: boolean=false;
   Hidden7: boolean=false;
  Hidden8: boolean=false;
  Hidden9: boolean=false;
    Hidden10: boolean=false;
  Hidden11: boolean=false;
  Hidden12: boolean=false;
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
      drivingLicenceDob: [this.data.value1.drivingLicenceDob],
      passportDob: [this.data.value1.passportDob],
    })

    this.KycAddressForm = this.fb.group({
      addressProof: ['', [Validators.required]],
      addressProofNo: ['', [Validators.required]],
      drivingLicenceDobs: [this.data.value1.drivingLicenceDob],
      passportDobs: [this.data.value1.passportDob],
    })

    this.KycsignatureForm = this.fb.group({
      signatureProof: ['', [Validators.required]],
      signatureProofNo: ['', [Validators.required]],
      drivingLicenceDobss: [this.data.value1.drivingLicenceDob],
      passportDobss: [this.data.value1.passportDob],
    });
this.updateSelectOptions();
this.updateSelectOptionsfordriving();
this.updateSelectOptionsforaadhar();
this.updateSelectOptionsforpan();
this.updateSelectOptionsvoterid();

 if(this.value1==1)
  {
    if(this.data.value1.identityProof=='Aadhar Card')
    {
       const identityProofNoControl = this.KycIdentityForm.get('identityProofNo');
    identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[0-9]{12}$")]);
    }
    else if(this.data.value1.identityProof=='Pancard')
    {
        const identityProofNoControl = this.KycIdentityForm.get('identityProofNo');
           identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]$")]);
    }
    else if(this.data.value1.identityProof=='Voter Id Proof')
    {
              const identityProofNoControl = this.KycIdentityForm.get('identityProofNo');
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{7}$")]);
    }
    else if(this.data.value1.identityProof=='Passport')
    {
       const identityProofNoControl = this.KycIdentityForm.get('identityProofNo');
        identityProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{2}[0-9]{2}[0-9]{11}$'),
      ]);
    }
    else if(this.data.value1.identityProof=='Driving License')
    {
      const identityProofNoControl = this.KycIdentityForm.get('identityProofNo');
            identityProofNoControl?.setValidators([Validators.required]);
    }
  }

   if(this.value1==2)
  {
    if(this.data.value1.addressProof=='Aadhar Card')
    {
          const addressProofNoControl = this.KycAddressForm.get('addressProofNo');
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[0-9]{12}$")]);
    }

    else if(this.data.value1.addressProof=='Voter Id Proof')
    {
          const addressProofNoControl = this.KycAddressForm.get('addressProofNo');
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{7}$")]);
    }
    else if(this.data.value1.addressProof=='Passport')
    {
     const addressProofNoControl = this.KycAddressForm.get('addressProofNo');
            addressProofNoControl?.setValidators([Validators.required,  Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]);
    }
    else if(this.data.value1.addressProof=='Driving License')
    {
     const addressProofNoControl = this.KycAddressForm.get('addressProofNo');
                 addressProofNoControl?.setValidators([Validators.required]); 
    }
  }
  if(this.value1==3)
  {
    if(this.data.value1.signatureProof=='Pancard')
    {
            const signatureProofNoControl = this.KycsignatureForm.get('signatureProofNo');
           signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]$")]);
    }

    else if(this.data.value1.signatureProof=='Passport')
    {
      const signatureProofNoControl = this.KycsignatureForm.get('signatureProofNo');
          signatureProofNoControl?.setValidators([Validators.required,  Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]);
    }
    else if(this.data.value1.signatureProof=='Driving License')
    {
       const signatureProofNoControl = this.KycsignatureForm.get('signatureProofNo');
                     signatureProofNoControl?.setValidators([Validators.required]);  
    }
  }
  }

  dateFilter = (d: Date | null): boolean => {
    return d ? d <= this.eighteenYearsAgo : false;
  }

 

updateSelectOptions() {
  const selectedPassport = this.data.value1?.identityProof === 'Passport' ||
                           this.data.value1?.addressProof === 'Passport' ||
                           this.data.value1?.signatureProof === 'Passport';
 
  this.Hidden = this.data.value1?.identityProof !== 'Passport' && selectedPassport;
  this.Hidden2 = this.data.value1?.addressProof !== 'Passport' && selectedPassport;
  this.Hidden3 = this.data.value1?.signatureProof !== 'Passport' && selectedPassport;
 
  console.log("Hidden:", this.Hidden);
  console.log("Hidden2:", this.Hidden2);
  console.log("Hidden3:", this.Hidden3);
}

updateSelectOptionsfordriving() {
  const selecteddriving = this.data.value1?.identityProof === 'Driving License' ||
                           this.data.value1?.addressProof === 'Driving License' ||
                           this.data.value1?.signatureProof === 'Driving License';
 
  this.Hidden4 = this.data.value1?.identityProof !== 'Driving License' && selecteddriving;
  this.Hidden5 = this.data.value1?.addressProof !== 'Driving License' && selecteddriving;
  this.Hidden6 = this.data.value1?.signatureProof !== 'Driving License' && selecteddriving;
 
  console.log("Hidden:", this.Hidden);
  console.log("Hidden2:", this.Hidden2);
  console.log("Hidden3:", this.Hidden3);
}
updateSelectOptionsforaadhar() {
  const selectedaadhar = this.data.value1?.identityProof === 'Aadhar Card' ||
                           this.data.value1?.addressProof === 'Aadhar Card'
 
  this.Hidden7 = this.data.value1?.identityProof !== 'Aadhar Card' && selectedaadhar;
  this.Hidden8 = this.data.value1?.addressProof !== 'Aadhar Card' && selectedaadhar;
 
  console.log("Hidden:", this.Hidden);
  console.log("Hidden2:", this.Hidden2);
  console.log("Hidden3:", this.Hidden3);
}
updateSelectOptionsforpan() {
  const selectedpan = this.data.value1?.identityProof === 'Pancard' ||
                           this.data.value1?.signatureProof === 'Pancard'
 
  this.Hidden9 = this.data.value1?.identityProof !== 'Pancard' && selectedpan;
  this.Hidden10 = this.data.value1?.signatureProof !== 'Pancard' && selectedpan;
 
  console.log("Hidden:", this.Hidden);
  console.log("Hidden2:", this.Hidden2);
  console.log("Hidden3:", this.Hidden3);
}
updateSelectOptionsvoterid() {
  const selectedvoter = this.data.value1?.identityProof === 'Voter Id Proof' ||
                           this.data.value1?.addressProof === 'Voter Id Proof'
 
  this.Hidden11 = this.data.value1?.identityProof !== 'Voter Id Proof' && selectedvoter;
  this.Hidden12 = this.data.value1?.addressProof !== 'Voter Id Proof' && selectedvoter;
 
  console.log("Hidden:", this.Hidden);
  console.log("Hidden2:", this.Hidden2);
  console.log("Hidden3:", this.Hidden3);
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
   identityProofNoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[A-Z]{2}[0-9]{2}[0-9]{11}$'),
      ]);
      identityProofDOBControl1?.setValidators([Validators.required]);
      identityProofDOBControl2?.clearValidators();
    }
    else if (this.selectElement === 'Driving License') {
      identityProofNoControl?.setValidators([Validators.required]);
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

  onAddressProofChange(event: any) {
    this.selectElements = event.target.value;
    console.log("jenfwejkfn" + this.selectElement)
    const addressProofNoControl = this.KycAddressForm.get('addressProofNo');
    const addressProofNoControl1 = this.KycAddressForm.get('passportDobs');
    const addressProofNoControl2 = this.KycAddressForm.get('drivingLicenceDobs');


     if (this.selectElements == 'Passport' || this.selectElements == 'Driving License') {
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

    // Clear existing validators
    addressProofNoControl?.clearValidators();
  addressProofNoControl1?.clearValidators();
  addressProofNoControl2?.clearValidators();

    // Set validators based on the selected address proof
    if (this.selectElements === 'Aadhar Card') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[0-9]{12}$")]); // 12 digits for Aadhar
    } else if (this.selectElements === 'Voter Id Proof') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{7}$")]); // Voter ID format
    } else if (this.selectElements === 'Passport') {
      addressProofNoControl?.setValidators([Validators.required,  Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]);
     addressProofNoControl1?.setValidators([Validators.required]);
      addressProofNoControl2?.clearValidators(); // Passport format
    } else if (this.selectElements === 'Driving License') {
      addressProofNoControl?.setValidators([Validators.required]); 
      addressProofNoControl2?.setValidators([Validators.required]);
      addressProofNoControl1?.clearValidators();// Driving license format
    }

     addressProofNoControl?.reset();
addressProofNoControl1?.reset();
    addressProofNoControl2?.reset();

   addressProofNoControl?.updateValueAndValidity();
   addressProofNoControl1?.updateValueAndValidity();
   addressProofNoControl2?.updateValueAndValidity();
  }

  onasignproof(event: any) {
    this.select = event.target.value;
    const signatureProofNoControl = this.KycsignatureForm.get('signatureProofNo');
     const signatureProofNoControl1 = this.KycsignatureForm.get('passportDobss');
    const signatureProofNoControl2 = this.KycsignatureForm.get('drivingLicenceDobss');

       if (this.select == 'Passport' || this.select == 'Driving License') {
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

    // Clear existing validators
    signatureProofNoControl?.clearValidators();
    signatureProofNoControl1?.clearValidators();
    signatureProofNoControl2?.clearValidators();

    // Set validators based on the selected signature proof type
    if (this.select === 'Pancard') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]$")]);
    } else if (this.select === 'Passport') {
      signatureProofNoControl?.setValidators([Validators.required,  Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]);
       signatureProofNoControl1?.setValidators([Validators.required]);
    signatureProofNoControl2?.clearValidators(); // Passport format
    } else if (this.select === 'Driving License') {
      signatureProofNoControl?.setValidators([Validators.required]); 
      signatureProofNoControl2?.setValidators([Validators.required]);
      signatureProofNoControl1?.clearValidators();// Driving license format
    }

   signatureProofNoControl?.reset();
   signatureProofNoControl1?.reset();
    signatureProofNoControl2?.reset();

    signatureProofNoControl?.updateValueAndValidity();
    signatureProofNoControl1?.updateValueAndValidity();
   signatureProofNoControl2?.updateValueAndValidity();
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
handleDateChange() {
  const control = this.KycIdentityForm.get(
    this.KycIdentityForm.get('identityProof')?.value === 'Driving License' ? 'drivingLicenceDob' : 'passportDob'
  );

  if (!control?.value || control?.value === '') { // If the date is cleared
    control?.setValue('');  // Set empty string, not null
    control?.markAsTouched();
    control?.markAsDirty();
    control?.setErrors({ required: true });
  } else {
    control?.setErrors(null);
  }

  control?.updateValueAndValidity();
}

clearData(){
  console.log(this.drivingLicenceDob.value);
  console.log(this.DrivingDob);
  
  
}

}
