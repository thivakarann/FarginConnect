import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddEntityBank } from '../../fargin-model/fargin-model.module';

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
  KYCdetails: boolean = false;
  BussinessDoc: boolean = false;
  BussinessDocument: boolean = false;
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
  emptyBlob = new Blob([], { type: 'application/pdf' })
  fileType: any;
  error!: boolean;
  file3!: File;
  businessId: any;
  mcccode: any;
  BankNames: any;
  file4!: File;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!:FormGroup;
  selectElement: any;
  selectElements: any;
  select: any;
  file5!: any;
  file6!: any;
  kycValue: any;
  file8!: any;
  file9!: any;
  constructor(
    public AddEntity: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder) { }
  ngOnInit(): void {

    this.AddEntity.Bussinesscategoryactivelist().subscribe((res: any) => {
      this.categorydetails = res.response;
    });

    this.AddEntity.merchantplanactive().subscribe((res: any) => {
      this.entittyplanviewall = res.response;
    });

    this.AddEntity.activebankdetails().subscribe((res: any) => {
      this.BankNames = res.response;
    });

    this.AddEntity.activeViewall().subscribe((res: any) => {
      this.kycValue = res.response;
      console.log(this.kycValue);
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
      businessCategoryIds: new FormControl('', [Validators.required]),
      MccCode: new FormControl(''),
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
        // Validators.maxLength(10),
        // Validators.pattern('^[0-9]{10}$')
      ]),
      contactEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
      ]),
      website: new FormControl(''),
      gstIn: new FormControl(''),
      billingAddress: new FormControl("", [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
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
      country: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      merchantPlanId: new FormControl('', [Validators.required]),
      periodName: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
      billingMode: new FormControl("", [
        Validators.required
      ]),

    });
    console.log('Form Valid on Init:', this.myForm.valid);
    console.log('Form Valid:', this.myForm.valid);
    console.log('Form Errors:', this.myForm.errors);
    console.log('Form Controls:', this.myForm.controls);
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
        // Validators.pattern('^[a-zA-Z0-9 ]*$')
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

      ledgerId: new FormControl("", [
        Validators.required,
      ]),
    })

    this.firstFormGroup = this._formBuilder.group({
      identityProof: ['', Validators.required],
      identityProofNo: ['', Validators.required],
      identityFrontPath: [null, Validators.required],
      identityBackPath: [null, Validators.required]

    });
    this.secondFormGroup = this._formBuilder.group({
      addressProof: ['', Validators.required],
      addressProofNo: ['', Validators.required],
      addressFrontPath: [null, Validators.required],
      addressBackPath: [null, Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      signatureProof: ['', Validators.required],
      signatureProofNo: ['', Validators.required],
      signatureFrontPath: [null, Validators.required],
      signatureBackPath: [null, Validators.required]
    });

    this.fourthFormGroup=this._formBuilder.group({
      kycCategoryId:['',Validators.required],
      docNumber:[''],
      docFrontPath :['',Validators.required],
      docBackPath :['']
    })




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

  get billingMode() {
    return this.myForm.get('billingMode')
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

  get businessCategoryIds() {
    return this.myForm.get('businessCategoryIds')

  }
  get mccCode() {
    return this.myForm.get('mccCode')

  }

  get merchantPlanId() {
    return this.myForm.get('merchantPlanId')
  }
  get periodName() {
    return this.myForm.get('periodName')
  }
  get logo() {
    return this.myForm.get('logo')
  }

  // onCategoryChange(event: any): void {
  //   console.log(event)
  //   this.selectedCategoryId = event.target.value;
  //   console.log(this.selectedCategoryId)
  //   const selectedCategory = this.categorydetails.find((category: { businessCategoryId: any; }) => category.businessCategoryId === +this.selectedCategoryId);

  //   if (selectedCategory) {
  //     this.myForm.patchValue({
  //       mccCode: selectedCategory.mccCode


  //     });
  //     console.log(this.myForm.value.mccCode)
  //   }
  // }

  onCategoryChange(event: any) {
    this.businessId = event.target.value;
    this.AddEntity.EntityBusinessCategoryId(this.businessId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.mcccode = res.response.mccCode
      }
    })
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

  get ledgerId() {
    return this.myForm2.get('ledgerId')
  }

  // third Form

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

  // Bussiness form 

  get kycCategoryId(){
    return this.fourthFormGroup.get('kycCategoryId')
  }
   
  get docNumber(){
    return this.fourthFormGroup.get('docNumber')
  }
   
  get docFrontPath (){
    return this.fourthFormGroup.get('docFrontPath')
  }
   
  get docBackPath(){
    return this.fourthFormGroup.get('docBackPath')
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
  onaddressfront(event: any) {
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
      this.file3 = files;
    }


  }
  onaddressback(event: any) {
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
      this.file4 = files;
    }
  }
  onasignfront(event: any) {
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
      this.file5 = files;
    }


  }
  onasignback(event: any) {
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
      this.file6 = files;
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
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]); // Passport format
    } else if (this.selectElement === 'Driving License') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$")]); // Driving license format
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
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]); // Passport format
    } else if (this.selectElements === 'Driving License') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{7}$")]); // Driving license format
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
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Za-z0-9]{8,15}$")]); // Passport format
    } else if (this.select === 'Driving License') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{7}$")]); // Driving license format
    }

    signatureProofNoControl?.updateValueAndValidity();
  }
  getlogo(event: any) {
    const files = event.target.files[0];
    if (files) {
      if (!files.type.startsWith('image/')) {
        this.errorMessage = 'Only Images are allowed';
        return;
      }
      this.errorMessage = ''
      this.file3 = files;
      console.log(this.file3);
      console.log(' file 3 id success' + files);

    }
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

  Submit() {
    const formData = new FormData;
    formData.append('contactEmail', this.contactEmail?.value.trim());
    formData.append('contactMobile', this.contactMobile?.value.trim());
    formData.append('entityName', this.entityName?.value.trim());
    formData.append('merchantLegalName', this.merchantLegalName?.value.trim())
    formData.append('accountDisplayName', this.accountDisplayName?.value.trim());
    formData.append('gstIn', this.gstIn?.value || '-');
    formData.append('contactName', this.contactName?.value.trim());
    formData.append('secondaryMobile', this.secondaryMobile?.value.trim());
    formData.append('billingAddress', this.billingAddress?.value.trim());
    formData.append('area', this.area?.value.trim())
    formData.append('stateName', this.stateName?.value.trim());
    formData.append('country', this.country?.value.trim());
    formData.append('zipcode', this.zipcode?.value.trim());
    formData.append('city', this.city?.value.trim())
    formData.append('businessCategoryId', this.businessId);
    formData.append('merchantPlanId', this.merchantPlanId?.value);
    formData.append('mccCode', this.mcccode);
    formData.append('periodName', this.periodName?.value);
    formData.append('website', this.website?.value || '-');
    formData.append('merchantLogo', this.file3 || this.emptyBlob);
    formData.append('billingMode', this.billingMode?.value);

    this.AddEntity.EntityAdd(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.merchantid = res.response.merchantId;
        console.log(this.merchantid)

        this.bussinessid = res.response.businessCategoryModel.businessCategoryId;
        this.AddEntity.EntityGetKYCbybussinessid(this.bussinessid).subscribe((res: any) => {
          this.KYCDocNames = res.response;
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
  // bjhb?

  BankSubmit() {
    let submitModel: AddEntityBank = {
      accountHolderName: this.accountHolderName?.value,
      accountNumber: this.accountNumber?.value,
      bankId: this.bankName?.value,
      ifscCode: this.ifscCode?.value,
      branchName: this.branchName?.value,
      accountType: this.accountType?.value,
      merchantId: this.merchantid,
      ledgerId: this.ledgerId?.value
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


  close() {
    this.router.navigateByUrl('dashboard/entity-viewall');
  }

  kycsubmit() {
    const formData = new FormData();
    formData.append('merchantId', this.merchantid);
    formData.append('identityFrontPath', this.file1);
    formData.append('identityBackPath', this.file2);
    formData.append('identityProof', this.identityProof?.value);
    formData.append('identityProofNo', this.identityProofNo?.value);
    formData.append('addressFrontPath', this.file3);
    formData.append('addressBackPath', this.file4);
    formData.append('addressProof', this.addressProof?.value);
    formData.append('addressProofNo', this.addressProofNo?.value);
    formData.append('signatureFrontPath', this.file5);
    formData.append('signatureBackPath', this.file6);
    formData.append('signatureProof', this.signatureProof?.value);
    formData.append('signatureProofNo', this.signatureProofNo?.value);

    this.AddEntity.entitykycs(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }


  docSubmit() {
    const formData = new FormData();
    formData.append('merchantId', this.merchantid);
    formData.append('docFrontPath', this.file8);
    formData.append('docBackPath', this.file9 || this.emptyBlob);
    formData.append('kycCategoryId', this.kycCategoryId?.value);
    formData.append('docNumber', this.docNumber?.value);
    formData.append('createdBy', this.getadminname);
    this.AddEntity.documentAdd(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }


}
