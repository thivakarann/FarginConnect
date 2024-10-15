import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.value1 = this.data.value
    console.log(this.value1);

    this.identitydata = this.data.value1
    console.log(this.identitydata);
    this.proofId = this.data.value1.proofId
    this.identityProofs = this.data.value1.identityProof
    this.identityProofNos = this.data.value1.identityProofNo
    this.addressProofvalue = this.data.value1.addressProof
    this.addressProofNovalue = this.data.value1.addressProofNo
    console.log(this.addressProofvalue, this.addressProofNovalue);


    this.signatureProofvalue = this.data.value1.signatureProof
    this.signatureProofNovalue = this.data.value1.signatureProofNo

    this.KycIdentityForm = this.fb.group({
      identityProof: ['', [
        Validators.required,
      ]],
      identityProofNo: ['', [
        Validators.required,
      ]]
    })

    this.KycAddressForm = this.fb.group({
      addressProof: ['', [Validators.required]],
      addressProofNo: ['', [Validators.required]]
    })

    this.KycsignatureForm = this.fb.group({
      signatureProof: ['', [Validators.required]],
      signatureProofNo: ['', [Validators.required]]
    })
  }

  get identityProof() {
    return this.KycIdentityForm.get('identityProof')
  }

  get identityProofNo() {
    return this.KycIdentityForm.get('identityProofNo')
  }
  get addressProof() {
    return this.KycAddressForm.get('addressProof')
  }

  get addressProofNo() {
    return this.KycAddressForm.get('addressProofNo')
  }
  get signatureProof() {
    return this.KycsignatureForm.get('signatureProof')
  }
  get signatureProofNo() {
    return this.KycsignatureForm.get('signatureProofNo')
  }

  onIdentityProofChange(event: any) {
    this.selectElement = event.target.value;
    console.log(this.selectElement);
    const identityProofNoControl = this.KycIdentityForm.get('identityProofNo');

    identityProofNoControl?.clearValidators();
    if (this.selectElement === 'Aadhar Card') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[0-9]{12}$")]); // 12 digits for Aadhar
    } else if (this.selectElement === 'Pancard') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$")]); // PAN format
    } else if (this.selectElement === 'Voter Id Proof') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{7}$")]); // Voter ID format
    } else if (this.selectElement === 'Passport') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]); // Passport format
    } else if (this.selectElement === 'Driving License') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$")]); // Driving license format
    }


    identityProofNoControl?.updateValueAndValidity();
  }

  onAddressProofChange(event: any) {
    this.selectElements = event.target.value;
    const addressProofNoControl = this.KycAddressForm.get('addressProofNo');

    addressProofNoControl?.clearValidators();


    if (this.selectElements === 'Aadhar Card') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[0-9]{12}$")]); // 12 digits for Aadhar
    } else if (this.selectElements === 'Voter Id Proof') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{7}$")]); // Voter ID format
    } else if (this.selectElements === 'Passport') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]); // Passport format
    } else if (this.selectElements === 'Driving License') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{7}$")]); // Driving license format
    }


    addressProofNoControl?.updateValueAndValidity();

  }
  onasignproof(event: any) {
    this.select = event.target.value;
    const signatureProofNoControl = this.KycsignatureForm.get('signatureProofNo');


    signatureProofNoControl?.clearValidators();


    if (this.select === 'Pancard') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$")]);
    } else if (this.select === 'Passport') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]); // Passport format
    } else if (this.select === 'Driving License') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{7}$")]); // Driving license format
    }

    signatureProofNoControl?.updateValueAndValidity();
  }


  submit() {
    const formData = new FormData;
    formData.append('identityProof', this.identityProof.value);
    formData.append('proofId', this.proofId);
    formData.append('identityProofNo', this.identityProofNo.value)
    console.log(formData);

    this.service.editIdentity(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.identityvalue = res.response;
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 1000);
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
    formData.append('addressProofNo', this.addressProofNo.value)
    this.service.editAddress(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.identityvalue = res.response;
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 1000);
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
    formData.append('signatureProofNo', this.signatureProofNo.value)
    console.log(formData);

    this.service.editSignature(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.identityvalue = res.response;
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }
      else {
        this.toastr.error(res.responseMessage)

      }
    })

  }
}
