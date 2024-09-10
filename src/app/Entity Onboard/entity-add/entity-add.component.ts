import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addentity, AddEntityBank } from '../../Fargin Model/fargin-model/fargin-model.module';

@Component({
  selector: 'app-entity-add',
  templateUrl: './entity-add.component.html',
  styleUrl: './entity-add.component.css'
})
export class EntityAddComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  myForm2!: FormGroup;
  myForm3!: FormGroup;
  file1!: File;
  file2!: File;
  categorydetails: any;
  GetMcccode: any;
  businessCategoryIddata: any;
  Mcccode: any;
  Bankdetails: boolean = false;
  personeldetails: boolean = true;
  KYCdetails: boolean = false
  merchantid: any;
  bussinessid: any;
  errorMessage: any;
  errormessagetwo: any;
  KYCDocNames: any;
  selectedCategoryId: any;

  constructor(
    public AddEntity: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.AddEntity.Bussinesscategoryactivelist().subscribe((res: any) => {
      this.categorydetails = res.response;
    });

    this.myForm = new FormGroup({
      entityName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      merchantLegalName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      accountDisplayName: new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 ]*$')
        ]
      ),
      contactName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      contactMobile: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),
      secondaryMobile: new FormControl('', [
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),
      contactEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
      ]),
      website: new FormControl(''),
      gstIn: new FormControl('', [
        // Validators.pattern('^[A-Z]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[A-Z]{1}$')
      ]),
      billingAddress: new FormControl(''),
      area: new FormControl('', Validators.required),
      zipcode: new FormControl('', Validators.required),
      stateName: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      contactPerson: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      locationServed: new FormControl(''),
      serviceOffered: new FormControl(''),
      businessCategoryIds: new FormControl('', Validators.required),
      mccCode: new FormControl('', Validators.required),
    });

    this.myForm2 = new FormGroup({
      accountHolderName: new FormControl(null, Validators.required),
      accountNumber: new FormControl(null, Validators.required),
      bankName: new FormControl(null, Validators.required),
      ifscCode: new FormControl(null, Validators.required),
      branchName: new FormControl(null, Validators.required),
      accountType: new FormControl(null, Validators.required),
    })

    this.myForm3 = new FormGroup({
      docFrontPath: new FormControl(null, Validators.required),
      docBackPath: new FormControl(null, Validators.required),
      docName: new FormControl(null, Validators.required),
      docNumber: new FormControl(null, Validators.required),
    });

  }



  // First Form

  get entityName() {
    return this.myForm.get('entityName')

  }
  get merchantLegalName() {
    return this.myForm.get('merchantLegalName')

  }

  get accountDisplayName() {
    return this.myForm.get('accountDisplayName')

  }

  get contactName() {
    return this.myForm.get('contactName')

  }
  get contactMobile() {
    return this.myForm.get('contactMobile')

  }
  get secondaryMobile() {
    return this.myForm.get('secondaryMobile')

  }
  get contactEmail() {
    return this.myForm.get('contactEmail')

  }
  get website() {
    return this.myForm.get('website')

  }
  get gstIn() {
    return this.myForm.get('gstIn')

  }
  get billingAddress() {
    return this.myForm.get('billingAddress')

  }
  get area() {
    return this.myForm.get('area')

  }
  get zipcode() {
    return this.myForm.get('zipcode')

  } get stateName() {
    return this.myForm.get('stateName')

  }
  get city() {
    return this.myForm.get('city')

  }
  get contactPerson() {
    return this.myForm.get('contactPerson')

  }
  get country() {
    return this.myForm.get('country')

  }
  get locationServed() {
    return this.myForm.get('locationServed')

  } get serviceOffered() {
    return this.myForm.get('serviceOffered')

  }
  get businessCategoryIds() {
    return this.myForm.get('businessCategoryIds')

  }
  get mccCode() {
    return this.myForm.get('mccCode')

  }

  onCategoryChange(event: any): void {
    console.log(event)
    this.selectedCategoryId = event.target.value;
    console.log(this.selectedCategoryId)
    const selectedCategory = this.categorydetails.find((category: { businessCategoryId: any; }) => category.businessCategoryId === +this.selectedCategoryId);

    if (selectedCategory) {
      this.myForm.patchValue({
        mccCode: selectedCategory.mccCode


      });
      console.log(this.myForm.value.mccCode)
    }
  }



  // second Form

  get accountHolderName() {
    return this.myForm2.get('accountHolderName')
  }

  get accountNumber() {
    return this.myForm2.get('accountNumber')
  }
  get bankName() {
    return this.myForm2.get('bankName')
  }

  get ifscCode() {
    return this.myForm2.get('ifscCode')
  }

  get branchName() {
    return this.myForm2.get('branchName')
  }

  get accountType() {
    return this.myForm2.get('accountType')
  }

  // third Form

  get docFrontPath() {
    return this.myForm3.get('docFrontPath')

  }
  get docBackPath() {
    return this.myForm3.get('docBackPath')
  }

  get docName() {
    return this.myForm3.get('docName')
  }

  get docNumber() {
    return this.myForm3.get('docNumber')
  }

  onFileSelected(event: any) {
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
      this.file1 = files;
      console.log(this.file1);

      console.log(' file 1 id success' + files);

    }


  }

  onFileSelected2(event: any) {
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
      this.file2 = files;
      console.log(this.file1);

      console.log(' file 1 id success' + files);

    }


  }

  Submit() {
    let submitModel: addentity = {
      entityName: this.entityName?.value,
      merchantLegalName: this.merchantLegalName?.value,
      accountDisplayName: this.accountDisplayName?.value,
      contactName: this.contactName?.value,
      contactMobile: this.contactMobile?.value,
      secondaryMobile: this.secondaryMobile?.value,
      contactEmail: this.contactEmail?.value,
      gstIn: this.gstIn?.value,
      billingAddress: this.billingAddress?.value,
      area: this.area?.value,
      zipcode: this.zipcode?.value,
      stateName: this.stateName?.value,
      city: this.city?.value,
      contactPerson: '',
      country: this.country?.value,
      locationServed: this.locationServed?.value,
      serviceOffered: this.serviceOffered?.value,
      businessCategoryId: this.selectedCategoryId,
      mccCode: this.mccCode?.value,
      website: this.website?.value
    }
    this.AddEntity.EntityAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.merchantid = res.response.merchantId;
        this.bussinessid = res.response.businessCategoryModel.businessCategoryId;
        this.AddEntity.EntityGetKYCbybussinessid(this.bussinessid).subscribe((res: any) => {
          this.KYCDocNames = res.response
        })
        this.toastr.success(res.responseMessage);
        this.Bankdetails = true;
        this.personeldetails = false;

      } else {
        this.toastr.error(res.responseMessage);
      }

      console.log(res);
    })
  }


  BankSubmit() {
    let submitModel: AddEntityBank = {
      accountHolderName: this.accountHolderName?.value,
      accountNumber: this.accountNumber?.value,
      bankName: this.bankName?.value,
      ifscCode: this.ifscCode?.value,
      branchName: this.branchName?.value,
      accountType: this.accountType?.value,
      merchantId: this.merchantid
    }
    this.AddEntity.EntitybankAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.Bankdetails = false;
        this.personeldetails = false;
        this.KYCdetails = true;

      } else {
        this.toastr.error(res.responseMessage);
      }

      console.log(res);
    })
  }

  AddKYC(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('merchantId', this.merchantid);
    formData.append('docName', this.docName?.value);
    formData.append('docFrontPath', this.file1);
    formData.append('docBackPath', this.file2);
    formData.append('docNumber', this.docNumber?.value);
    formData.append('createdBy  ', this.getadminname);

    this.AddEntity.KycAdd(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    })

  }


  close() {
    this.router.navigateByUrl('dashboard/entity-viewall');
  }











  Mccode(id: any) {
    // console.log(id.businessCategoryId)

    // this.businessCategoryIddata = id.businessCategoryId
    // this.Mcccode = id.mccCode
    // console.log( this.Mcccode);

  }
}
