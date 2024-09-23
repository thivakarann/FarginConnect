import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addentity, AddEntityBank } from '../../fargin-model/fargin-model.module';

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
  entittyplanviewall: any;
  kycdetails: any;
  kycDocname: any;
  kycDocname1: any;
  kycDocname2: any;
  kycDocname3: any;
  kycDocname4: any;
  kycDocname5: any;
  kycDocname6: any;

  constructor(
    public AddEntity: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {

    this.AddEntity.Bussinesscategoryactivelist().subscribe((res: any) => {
      this.categorydetails = res.response;
    });

    this.AddEntity.merchantplanactive().subscribe((res: any) => {
      this.entittyplanviewall = res.response;
    })

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
      website: new FormControl('', [
        Validators.required,
        Validators.pattern("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")
      ]),
      gstIn: new FormControl('', [
        Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")
      ]),
      billingAddress: new FormControl("", [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]),
      area: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")

      ]),
      stateName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      contactPerson: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      locationServed: new FormControl(''),
      serviceOffered: new FormControl(''),
      businessCategoryIds: new FormControl('', Validators.required),
      mccCode: new FormControl('', Validators.required),
      merchantPlanId: new FormControl('', Validators.required)
    });

    this.myForm2 = new FormGroup({
      accountHolderName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      accountNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]{9,18}$")
      ]),
      bankName: new FormControl("", [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      ifscCode: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")
      ]),
      branchName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      accountType: new FormControl("", [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
    })

    this.myForm3 = new FormGroup({
      docFrontPath: new FormControl(null, Validators.required),
      docBackPath: new FormControl(null, Validators.required),
      docName: new FormControl(null, Validators.required),
      documentNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{12}$")]),
      panNumber: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$")]),
      passportNumber: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]),
      gstNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$")]),
      drivingLicenseNumber: new FormControl('', [Validators.required,  Validators.pattern("^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$")]),
      cinch: new FormControl('', [Validators.required,Validators.pattern("^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$")]),
      voterid: new FormControl('', [Validators.required,  Validators.pattern("^[A-Z]{3}[0-9]{7}$")]),
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

  get merchantPlanId() {
    return this.myForm.get('merchantPlanId')
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

  get documentNumber() {
    return this.myForm3.get('documentNumber');
  }

  get panNumber() {
    return this.myForm3.get('panNumber');
  }
  get passportNumber() {
    return this.myForm3.get('passportNumber');
  }

  get gstNumber() {
    return this.myForm3.get('gstNumber');
  }

  get drivingLicenseNumber() {
    return this.myForm3.get('drivingLicenseNumber');
  }

  get cinch() {
    return this.myForm3.get('cinch');
  }
  get voterid() {
    return this.myForm3.get('voterid');
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
      console.log(this.file2);

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
      website: this.website?.value,
      merchantPlanId: this.merchantPlanId?.value
    }
    this.AddEntity.EntityAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.merchantid = res.response.merchantId;
        console.log(this.merchantid)

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
    if (this.docName?.value == 'Aadhaar') {
      const formData = new FormData;
      formData.append('merchantId',this.merchantid);
      formData.append('docFrontPath', this.file1);
      formData.append('docBackPath', this.file2);
      formData.append('docName', this.docName?.value);
      formData.append('docNumber', this.documentNumber?.value);
      formData.append('createdBy', this.getadminname)
     console.log(this.merchantid)

      this.AddEntity.KycAdd(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.kycdetails = res.response;
          this.kycDocname=res.response.docName;
          this.toastr.success(res.message)
          this.myForm3.reset();

        }
        else {
          this.toastr.error(res.message)

        }
      })
    }
    if (this.docName?.value == 'PAN') {
      const formData = new FormData;
      formData.append('merchantId',this.merchantid);
      formData.append('docFrontPath', this.file1);
      formData.append('docBackPath', this.file2);
      formData.append('docName', this.docName?.value);
      formData.append('docNumber', this.panNumber?.value);
      formData.append('createdBy', this.getadminname)
      console.log(this.merchantid)
      this.AddEntity.KycAdd(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.kycdetails = res.response;
          this.toastr.success(res.message);
          this.kycDocname1=res.response.docName;
          this.myForm3.reset();

        }
        else {
          this.toastr.error(res.message)

        }
      })
    }
     if (this.docName?.value == 'Passport') {
      const formData = new FormData;
      formData.append('merchantId',this.merchantid);
      formData.append('docFrontPath', this.file1);
      formData.append('docBackPath', this.file2);
      formData.append('docName', this.docName?.value);
      formData.append('docNumber', this.passportNumber?.value);
      formData.append('createdBy', this.getadminname);
      console.log(this.merchantid)
      this.AddEntity.KycAdd(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.kycdetails = res.response;
          this.kycDocname2=res.response.docName;
          this.toastr.success(res.message)
          this.myForm3.reset();

        }
        else {
          this.kycdetails = res.response;
          this.toastr.error(res.message)

        }
      })
    }
    if (this.docName?.value == 'GST') {
      const formData = new FormData;
      formData.append('merchantId',this.merchantid);
      formData.append('docFrontPath', this.file1);
      formData.append('docBackPath', this.file2);
      formData.append('docName', this.docName?.value);
      formData.append('docNumber', this.gstNumber?.value);
      formData.append('createdBy', this.getadminname);
      console.log(this.merchantid)
      this.AddEntity.KycAdd(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.kycdetails = res.response;
          this.kycDocname3=res.response.docName;
          this.toastr.success(res.message);
          this.myForm3.reset();
        }
        else {
          this.toastr.error(res.message)

        }
      })
    }
    if (this.docName?.value == 'Driving License') {
      const formData = new FormData;
      formData.append('merchantId',this.merchantid);
      formData.append('docFrontPath', this.file1);
      formData.append('docBackPath', this.file2);
      formData.append('docName', this.docName?.value);
      formData.append('docNumber', this.drivingLicenseNumber?.value);
      formData.append('createdBy', this.getadminname);
      console.log(this.merchantid)
      this.AddEntity.KycAdd(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.kycdetails = res.response;
          this.kycDocname4=res.response.docName;
          this.toastr.success(res.message);
          this.myForm3.reset();

        }
        else {
          this.toastr.error(res.message)
        }
      })
    }
     if (this.docName?.value == 'Cin') {
      const formData = new FormData;
      formData.append('merchantId',this.merchantid);
      formData.append('docFrontPath', this.file1);
      formData.append('docBackPath', this.file2);
      formData.append('docName', this.docName?.value);
      formData.append('docNumber', this.cinch?.value);
      formData.append('createdBy', this.getadminname)
      console.log(this.merchantid)
      this.AddEntity.KycAdd(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.kycdetails = res.response;
          this.kycDocname5=res.response.docName;
          this.toastr.success(res.message);
          this.myForm3.reset();

        }
        else {
          this.toastr.error(res.message)

        }
      })
    }
    if (this.docName?.value == 'VoterId') {
      const formData = new FormData;
      formData.append('merchantId',this.merchantid);
      formData.append('docFrontPath', this.file1);
      formData.append('docBackPath', this.file2);
      formData.append('docName', this.docName?.value);
      formData.append('docNumber', this.voterid?.value);
      formData.append('createdBy', this.getadminname)
      console.log(this.merchantid)
      this.AddEntity.KycAdd(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.kycdetails = res.response;
          this.kycDocname6=res.response.docName;
          this.toastr.success(res.message);
          this.myForm3.reset();

        }
        else {
          this.toastr.error(res.message)
        }
      })
    }
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
