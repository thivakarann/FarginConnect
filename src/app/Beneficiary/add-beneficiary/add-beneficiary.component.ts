import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { addbeneficiary } from '../../fargin-model/fargin-model.module';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrl: './add-beneficiary.component.css'
})
export class AddBeneficiaryComponent implements OnInit {
  beneficiaryForm: any = FormGroup;
  beneficiaryForm1: any = FormGroup;
  setupBoxNumber: any;
 
  close: any;
  viewbeneficiary: any;
  addValue: any;
  fullname: any = localStorage.getItem('fullname');
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  merchantId:any=localStorage.getItem('merchantId')
confirmaccnumber: any;
accnumber: any;
  error: any;
  isPasswordMatch:boolean=false;
  passwordsMatch: boolean = true;
  isConformPassword:boolean=false;
  data: number=1;
  employee: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {


    this.beneficiaryForm = this.fb.group({
      accountHolderName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      emailAddress: ['', Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*'),],
      mobileNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      ifscCode: ['', Validators.required],
      confirmAccountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      employeeId: ['', Validators.required],
      type: ['', Validators.required],
      upiName: ['', Validators.required]
    });

    this.beneficiaryForm1 = this.fb.group({
      accountHolderNames: ['', Validators.required],
      emailAddresss: ['', Validators.required,],
      mobileNumbers: ['', Validators.required],
      employeeIds: ['', Validators.required],
      types: ['', Validators.required],
      upiNames: ['', Validators.required],
      accountNumber: [''],
      accountType: ['', Validators.required],
      ifscCode: ['', Validators.required],
      confirmAccountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],

    });

    this.service.activeEmployees(this.merchantId).subscribe((res:any)=>{
      this.employee=res.response;
      
    })

  }
  changeDataValue(){
    if (this.data == 1 ) {
      this.data = 0;
    }else{
      this.data = 1
    }
  }

  numbers(event: any) {
    const charcode = (event.which) ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }

  get accountHolderName() {
    return this.beneficiaryForm.get('accountHolderName')
  }

  get accountNumber() {
    return this.beneficiaryForm.get('accountNumber')
  }

  get emailAddress() {
    return this.beneficiaryForm.get('emailAddress')
  }

  get mobileNumber() {
    return this.beneficiaryForm.get('mobileNumber')
  }

  get accountType() {
    return this.beneficiaryForm.get('accountType')
  }

  get ifscCode() {
    return this.beneficiaryForm.get('ifscCode')
  }

  get confirmAccountNumber() {
    return this.beneficiaryForm.get('confirmAccountNumber')
  }

  get bankName() {
    return this.beneficiaryForm.get('bankName')
  }

  get branchName() {
    return this.beneficiaryForm.get('branchName')
  }

  get employeeId() {
    return this.beneficiaryForm.get('employeeId')
  }
  get type() {
    return this.beneficiaryForm.get('type')
  }
  get upiName() {
    return this.beneficiaryForm.get('upiName')
  }
  //second form
  get accountHolderNames() {
    return this.beneficiaryForm1.get('accountHolderNames')
  }

  get employeeIds() {
    return this.beneficiaryForm1.get('employeeIds')
  }
  get types() {
    return this.beneficiaryForm1.get('types')
  }

  get upiNames() {
    return this.beneficiaryForm1.get('upiNames')
  }

  get emailAddresss() {
    return this.beneficiaryForm1.get('emailAddresss')
  }

  get mobileNumbers() {
    return this.beneficiaryForm1.get('mobileNumbers')
  }
  viewTypes(id: any) {
    

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
  submit() {
    let submitModel: addbeneficiary;
    if (this.data == 1) {
      submitModel = {
        employeeId: this.beneficiaryForm.get('employeeId')?.value || null,
        bankName: this.beneficiaryForm.get('bankName')?.value,
        accountNumber: this.beneficiaryForm.get('accountNumber')?.value,
        accountHolderName: this.beneficiaryForm.get('accountHolderName')?.value,
        emailAddress: this.beneficiaryForm.get('emailAddress')?.value,
        ifscCode: this.beneficiaryForm.get('ifscCode')?.value,
        accountType: this.beneficiaryForm.get('accountType')?.value,
        mobileNumber: this.beneficiaryForm.get('mobileNumber')?.value,
        createdBy: this.fullname || '',
        branchName: this.beneficiaryForm.get('branchName')?.value,
        upiName: this.beneficiaryForm.get('upiName')?.value,
        type: this.beneficiaryForm.get('type')?.value,
      };
    } else {
      submitModel = {
        employeeId: this.beneficiaryForm1.get('employeeIds')?.value || null,
        bankName: this.beneficiaryForm1.get('bankName')?.value,
        accountNumber: this.beneficiaryForm1.get('accountNumber')?.value,
        accountHolderName: this.beneficiaryForm1.get('accountHolderNames')?.value,
        emailAddress: this.beneficiaryForm1.get('emailAddresss')?.value,
        ifscCode: this.beneficiaryForm1.get('ifscCode')?.value,
        accountType: this.beneficiaryForm1.get('accountType')?.value,
        mobileNumber: this.beneficiaryForm1.get('mobileNumbers')?.value,
        createdBy: this.fullname || '',
        branchName: this.beneficiaryForm1.get('branchName')?.value,
        upiName: this.beneficiaryForm1.get('upiNames')?.value,
        type: this.beneficiaryForm1.get('types')?.value,
      }
    }
    this.service.beneficiaryAdd(submitModel).subscribe((res: any) => {
      this.addValue = res.response;
      
      if (res.flag == 1) {
        this.router.navigateByUrl('/dashboard/view-beneficiary')
        this.toastr.success(res.responseMessage)
      }
      else {
        this.toastr.error(res.responseMessage)
      }

    })
  }
  back() {
    this.router.navigateByUrl('/dashboard/view-beneficiary')
  }

}
