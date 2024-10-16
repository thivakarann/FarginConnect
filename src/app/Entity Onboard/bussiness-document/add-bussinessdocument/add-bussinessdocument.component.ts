import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.merchantid = this.data.value;
    console.log(this.merchantid);

    this.service.activeViewall().subscribe((res: any) => {
      this.kycValue = res.response;
      console.log(this.kycValue);
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
    console.log(this.selectElement4);
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
    const files = event.target.files[0];
    if (files) {
      const fileName: string = files.name;
      const fileextension: any = fileName.split('.').pop()?.toLowerCase();
      const dotcount = fileName.split('.').length - 1;
      if (dotcount > 1) {
        this.errorMessage = 'Files with multiple extensions are not allowed';
        return;
      }
      if (!files.type.startsWith('image/')) {
        this.errorMessage = 'Only Images  are  allowed';
        return;
      }
      this.errorMessage = ''
      this.file8 = files;
      console.log(this.file8);

      console.log(' file 1 id success' + files);

    }


  }


  docback(event: any) {
    const files = event.target.files[0];
    if (files) {
      const fileName: string = files.name;
      const fileextension: any = fileName.split('.').pop()?.toLowerCase();
      const dotcount = fileName.split('.').length - 1;
      if (dotcount > 1) {
        this.errorMessage = 'Files with multiple extensions are not allowed';
        return;
      }
      if (!files.type.startsWith('image/')) {
        this.errorMessage = 'Only Images  are  allowed';
        return;
      }
      this.errorMessage = ''
      this.file9 = files;
      console.log(this.file9);
      console.log(' file 1 id success' + files);
    }
  }
  docSubmit() {
    const formData = new FormData();
    formData.append('merchantId', this.merchantid);
    formData.append('docFrontPath', this.file8);
    formData.append('docBackPath', this.file9|| this.emptyBlob);
    formData.append('kycCategoryId', this.kycCategoryId?.value);
    formData.append('docNumber', this.docNumber?.value);
    formData.append('createdBy', this.getadminname);
    this.service.documentAdd(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

}
