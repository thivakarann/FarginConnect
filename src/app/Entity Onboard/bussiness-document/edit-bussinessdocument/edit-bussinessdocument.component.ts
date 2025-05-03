import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { documentupdate } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-edit-bussinessdocument',
  templateUrl: './edit-bussinessdocument.component.html',
  styleUrl: './edit-bussinessdocument.component.css'
})
export class EditBussinessdocumentComponent {
  fourthFormGroup!: FormGroup;
  selectElement4: any;
  kycValue: any;
  errorMessage: any;
  close: any;
  documentdata: any;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  merchantDocumentId: any;
  docNumbers: any;
  categoryvalue: any;
  bussinessid: any;
  expiryDates: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.documentdata = this.data.value;
    this.bussinessid = this.data.value.merchantId?.businessCategoryModel?.businessCategoryId;
    console.log(this.bussinessid)

    this.merchantDocumentId = this.data.value.merchantDocumentId
    console.log(this.merchantDocumentId)
    this.categoryvalue = this.data.value.entityKycCategory.kycCategoryId

    this.docNumbers = this.data.value.docNumber
    this.expiryDates = this.data.value.expiryDate

    this.service.EntityGetKYCbybussinessid(this.bussinessid).subscribe((res: any) => {
      this.kycValue = res.response.reverse();
    })


    this.fourthFormGroup = this._formBuilder.group({
      kycCategoryId: ['', Validators.required],
      docNumber: ['', Validators.maxLength(35)],
      expiryDate: [''],
    })

  }

  get kycCategoryId() {
    return this.fourthFormGroup.get('kycCategoryId')
  }

  get docNumber() {
    return this.fourthFormGroup.get('docNumber')
  }

  get expiryDate() {
    return this.fourthFormGroup.get('expiryDate')
  }

  docProofChange(event: any) {
    this.selectElement4 = event.target.value;

    const docNumbers = this.fourthFormGroup.get('docNumber');
    docNumbers?.clearValidators();
    if (this.selectElement4 === 'Aadhar') {
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

  docSubmit() {

    const formData = new FormData;
    formData.append('merchantDocumentId ', this.merchantDocumentId);
    formData.append('kycCategoryId', this.kycCategoryId?.value);
    formData.append('docNumber', this.docNumber?.value.trim());
    formData.append('modifiedBy', this.getadminname);
    formData.append('expiryDate', this.expiryDate?.value);

    this.service.documentEdit(formData).subscribe((res: any) => {
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
