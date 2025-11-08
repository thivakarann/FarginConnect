import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Addbeneficiary } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-addbeneficiary',
  templateUrl: './addbeneficiary.component.html',
  styleUrl: './addbeneficiary.component.css'
})
export class AddbeneficiaryComponent {
 adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  beneficiaryFormGroup: any = FormGroup;
  upiFormGroup: any = FormGroup;
  data: number = 1;
  viewall: any;
  show: any;
  integerRegex = /^\d+$/;
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  addbeneficiary: any;
  confirmaccnumber: any;
  accnumber: any;
    error: any;
    isPasswordMatch:boolean=false;
    passwordsMatch: boolean = true;
    isConformPassword:boolean=false;
  constructor(
    private service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.beneficiaryFormGroup = new FormGroup({
      bankName: new FormControl('', [Validators.required]),
      merchantId: new FormControl(''),
      accountNumber: new FormControl('', [Validators.required]),
      accountHolderName:new FormControl('',[Validators.required]),
      confirmaccountNumber:new FormControl('',[Validators.required]),
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailRegex),
      ]),
      ifscCode:new FormControl('',[Validators.required]),
      accountType:new FormControl('',[Validators.required]),
      mobileNumber:new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(this.integerRegex),
      ]),
      branchName:new FormControl('',[Validators.required]),
      type:new FormControl('',[Validators.required]),
      createdBy:new FormControl(''),
    });

    this.upiFormGroup = new FormGroup({
      bankName: new FormControl(''),
      accountNumber: new FormControl(''),
      ifscCode:new FormControl(''),
      accountType:new FormControl(''),
      branchName:new FormControl(''),

      upiName: new FormControl('', [Validators.required]),
      accountHolderNameUPI: new FormControl('', [Validators.required]),
      types:new FormControl('',[Validators.required]),
      merchantIds: new FormControl('', [Validators.required]),
      mobile:new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(this.integerRegex),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailRegex),
      ]),
      createdBy:new FormControl(''),
    });
    this.service.EntityViewall().subscribe((res: any) => {
      this.viewall = res.response;
   
    });
  }

  changeDataValue(){
    if (this.data == 1 ) {
      this.data = 0;
    }else{
      this.data = 1
    }
  }


  checkConform(accnumber:any,confirmaccnumber:any){
    this.isConformPassword= true;
 
    if(accnumber === confirmaccnumber){
      this.isPasswordMatch=true;
      this.error="";
    }else{
      this.isPasswordMatch=true;
      this.error="Miss Match Account Number";
    }
  }
//BankAccount
  get  merchantId() {
    return this.beneficiaryFormGroup.get('merchantId');
  }
  get  bankName() {
    return this.beneficiaryFormGroup.get('bankName');
  }
  get  confirmaccountNumber() {
    return this.beneficiaryFormGroup.get('confirmaccountNumber');
  }
  get  accountNumber() {
    return this.beneficiaryFormGroup.get('accountNumber');
  }
  get  accountHolderName() {
    return this.beneficiaryFormGroup.get('accountHolderName');
  }
  get  emailAddress() {
    return this.beneficiaryFormGroup.get('emailAddress');
  }
  get  ifscCode() {
    return this.beneficiaryFormGroup.get('ifscCode');
  }
  get  accountType() {
    return this.beneficiaryFormGroup.get('accountType');
  }
  get mobileNumber() {
    return this.beneficiaryFormGroup.get('mobileNumber');
  }

  get branchName() {
    return this.beneficiaryFormGroup.get('branchName');
  }

  get type() {
    return this.beneficiaryFormGroup.get('type');
  }

  //Upi

 get types() {
    return this.upiFormGroup.get('types');
  }
  get accountHolderNameUPI() {
    return this.upiFormGroup.get('accountHolderNameUPI');
  }
  get upiName() {
    return this.upiFormGroup.get('upiName');
  }
  get merchantIds() {
    return this.upiFormGroup.get('merchantIds');
  }
  get mobile() {
    return this.upiFormGroup.get('mobile');
  }
  get email() {
    return this.upiFormGroup.get('email');
  }


  close() {
    this.router.navigateByUrl('dashboard/view-beneficiary');
  }
  getdropdown(event: any) {
    if (event.target.value == 'Merchant' ) {
       this.show=true;
    } else {
      this.show = false;
    }
  }

  Onsubmit()
  {
      let submitModel:Addbeneficiary;
    if(this.data==1){
      submitModel={
        merchantId:  this.beneficiaryFormGroup.get('merchantId')?.value || null,
        bankName:  this.beneficiaryFormGroup.get('bankName')?.value,
        accountNumber:  this.beneficiaryFormGroup.get('accountNumber')?.value,
        accountHolderName:  this.beneficiaryFormGroup.get('accountHolderName')?.value,
        emailAddress:  this.beneficiaryFormGroup.get('emailAddress')?.value,
        ifscCode:  this.beneficiaryFormGroup.get('ifscCode')?.value,
        accountType:  this.beneficiaryFormGroup.get('accountType')?.value,
        mobileNumber:  this.beneficiaryFormGroup.get('mobileNumber')?.value,
        createdBy: this.getadminname,
        branchName:  this.beneficiaryFormGroup.get('branchName')?.value,
        upiName:  this.beneficiaryFormGroup.get('upiName')?.value,
        type:  this.beneficiaryFormGroup.get('type')?.value,
      };
    }else{
      submitModel={
        merchantId:  this.upiFormGroup.get('merchantIds')?.value || null,
        bankName:  this.upiFormGroup.get('bankName')?.value,
        accountNumber:  this.upiFormGroup.get('accountNumber')?.value,
        accountHolderName:  this.upiFormGroup.get('accountHolderNameUPI')?.value,
        emailAddress:  this.upiFormGroup.get('email')?.value,
        ifscCode:  this.upiFormGroup.get('ifscCode')?.value,
        accountType:  this.upiFormGroup.get('accountType')?.value,
        mobileNumber:  this.upiFormGroup.get('mobile')?.value,
        createdBy:  this.getadminname,
        branchName:  this.upiFormGroup.get('branchName')?.value,
        upiName:  this.upiFormGroup.get('upiName')?.value,
        type:  this.upiFormGroup.get('types')?.value,
      }
    }
      this.service.addbeneficiarys(submitModel).subscribe((res:any)=>{
        this.addbeneficiary=res.response;
        if(res.flag==1){
          this.toastr.success(res.responseMessage)
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else{
          this.toastr.error(res.responseMessage)
        }
       
      })
  
    }
  }


