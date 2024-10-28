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
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // Generates days 1 to 31
  uploadImage: any;
  uploadImage1: any;
  uploadImage2: any;
  uploadImage3: any;
  uploadImage4: any;
  uploadImage5: any;
  uploadImage6: any;
  uploadImage7: any;
  uploadImage8: any;
  uploadidentityfront: any;
  uploadidentityback: any;
  uploadaddressfront: any;
  uploadaddressback: any;
  uploadsignfront: any;
  uploadsignback: any;
  uploaddocfront: any;
  uploaddocback: any;
  today: string;

  constructor(
    public AddEntity: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder) { 
      const todayDate = new Date();
      this.today = todayDate.toISOString().split('T')[0];
    }
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
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),
      contactEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
      ]),
      website: new FormControl('', [Validators.pattern(/^(https ?: \/\/)?(www\.)?[ a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/)]),
      gstIn: new FormControl("", [Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$")]),
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
      autoDebitStatus: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
      billingMode: new FormControl("", [
        Validators.required
      ]),
      customerDuesEnable: new FormControl('', [Validators.required]),

      customerDuesDate: new FormControl('',),

      dueDate: new FormControl('',),


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

      ledgerId: new FormControl('',[Validators.required,]),
    })

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


    this.fourthFormGroup = this._formBuilder.group({
      kycCategoryId: ['', Validators.required],
      docNumber: [''],
      docFrontPath: ['', Validators.required],
      docBackPath: ['']
    })




  }


  get(event: any) {
    this.selectperiod = event.target.value;
  }

  // First Form

  get entityName() {
    return this.myForm.get('entityName')

  }
  get autoDebitStatus() {
    return this.myForm.get('autoDebitStatus')

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
  get dueDate() {
    return this.myForm.get('dueDate')

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

  get contactMobile() {
    return this.myForm.get('contactMobile')

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

  get customerDuesEnable() {
    return this.myForm.get('customerDuesEnable')
  }

  get customerDuesDate() {
    return this.myForm.get('customerDuesDate')
  }

  // onCategoryChange(event: any): void {
  //   
  //   this.selectedCategoryId = event.target.value;
  //   
  //   const selectedCategory = this.categorydetails.find((category: { businessCategoryId: any; }) => category.businessCategoryId === +this.selectedCategoryId);

  //   if (selectedCategory) {
  //     this.myForm.patchValue({
  //       mccCode: selectedCategory.mccCode


  //     });
  //     
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

  get drivingLicenceDob() {
    return this.firstFormGroup.get('drivingLicenceDob')
  }
  get passportDob() {
    return this.firstFormGroup.get('passportDob')
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
  get drivingLicenceDobs() {
    return this.secondFormGroup.get('drivingLicenceDobs')
  }
  get passportDobs() {
    return this.secondFormGroup.get('passportDobs')
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
  get drivingLicenceDobss() {
    return this.thirdFormGroup.get('drivingLicenceDobss')
  }
  get passportDobss() {
    return this.thirdFormGroup.get('passportDobss')
  }

  // Bussiness form 

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
  onFileSelected(event: any) {
    this.uploadidentityfront = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadidentityfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'application/pdf'];
 
      if (acceptableTypes.includes(this.uploadidentityfront.type)) {
        if (this.uploadidentityfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.identityFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.identityFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
 
  }
 
  onFileSelected2(event: any) {
    this.uploadidentityback = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadidentityback) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadidentityback.type)) {
        if (this.uploadidentityback.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.identityBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.identityBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
 
  }
  onaddressfront(event: any) {
   
    this.uploadaddressfront = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadaddressfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadaddressfront.type)) {
        if (this.uploadaddressfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.addressFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.addressFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
  }
  onaddressback(event: any) {
    this.uploadaddressback = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadaddressback) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadaddressback.type)) {
        if (this.uploadaddressback.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.addressBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.addressBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
  }
  onasignfront(event: any) {
    this.uploadsignfront = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadsignfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadsignfront.type)) {
        if (this.uploadsignfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.signatureFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.signatureFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
  }
  onasignback(event: any) {
    this.uploadsignback = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadsignback) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploadsignback.type)) {
        if (this.uploadsignback.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.signatureBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.signatureBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
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
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Passport format
    } else if (this.selectElement === 'Driving License') {
      identityProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Driving license format
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
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Passport format
    } else if (this.selectElements === 'Driving License') {
      addressProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Driving license format
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
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Passport format
    } else if (this.select === 'Driving License') {
      signatureProofNoControl?.setValidators([Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[0-9]{11}$")]); // Driving license format
    }

    signatureProofNoControl?.updateValueAndValidity();
  }
  getlogo(event: any) {
    this.uploadImage = event.target.files[0];

    // Ensure this.uploadImage is not null
    if (this.uploadImage) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

      if (acceptableTypes.includes(this.uploadImage.type)) {
        if (this.uploadImage.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.logo?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.logo?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
  }




  docfront(event: any) {
    this.uploaddocfront = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploaddocfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','application/pdf'];
 
      if (acceptableTypes.includes(this.uploaddocfront.type)) {
        if (this.uploaddocfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.docFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.docFrontPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }
 
 
  }
 
 
  docback(event: any) {
    this.uploaddocback = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploaddocback) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'application/pdf'];
 
      if (acceptableTypes.includes(this.uploaddocback.type)) {
        if (this.uploaddocback.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.docBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.docBackPath?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
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
    formData.append('autoDebitStatus', this.autoDebitStatus?.value);
    formData.append('customerDuesEnable', this.customerDuesEnable?.value);
    formData.append('customerDuesDate', this.customerDuesDate?.value || 0);
    formData.append('dueDate', this.dueDate?.value || 0);

    this.AddEntity.EntityAdd(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.merchantid = res.response.merchantId;
        

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

      
    })
  }




  kycsubmit() {
    const formData = new FormData();
    formData.append('merchantId', this.merchantid);
    formData.append('identityFrontPath', this.uploadidentityfront);
    formData.append('identityBackPath', this.uploadidentityback);
    formData.append('identityProof', this.identityProof?.value);
    formData.append('identityProofNo', this.identityProofNo?.value);
    formData.append('addressFrontPath', this.uploadaddressfront);
    formData.append('addressBackPath', this.uploadaddressback);
    formData.append('addressProof', this.addressProof?.value);
    formData.append('addressProofNo', this.addressProofNo?.value);
    formData.append('signatureFrontPath', this.uploadsignfront);
    formData.append('signatureBackPath', this.uploadsignback);
    formData.append('signatureProof', this.signatureProof?.value);
    formData.append('signatureProofNo', this.signatureProofNo?.value);
    formData.append('drivingLicenceDob', this.drivingLicenceDob?.value || this.drivingLicenceDobs?.value || this.drivingLicenceDobss?.value);
    formData.append('passportDob', this.passportDob?.value || this.passportDobs?.value || this.passportDobss?.value);
    this.AddEntity.entitykycs(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.KYCdetails = false;
        this.BussinessDocument = true;
       
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
 
 
 
 
  docSubmit() {
    const formData = new FormData();
    formData.append('merchantId', this.merchantid);
    formData.append('docFrontPath', this.uploaddocfront);
    formData.append('docBackPath', this.uploaddocback || this.emptyBlob);
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


  close() {
    this.router.navigateByUrl('dashboard/entity-viewall');
  }


}
