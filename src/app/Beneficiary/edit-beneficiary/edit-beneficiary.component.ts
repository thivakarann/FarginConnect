import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { editbenificiary } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-edit-beneficiary',
  templateUrl: './edit-beneficiary.component.html',
  styleUrl: './edit-beneficiary.component.css'
})
export class EditBeneficiaryComponent {
  beneficiaryForm: any = FormGroup;
  beneficiaryForm1: any = FormGroup;
  setupBoxNumber: any;
  data: any;
  close: any;
  viewbeneficiary: any;
  addValue: any;
  fullname: any = localStorage.getItem('fullname');
  merchantId: any = localStorage.getItem('merchantId')
  employeeBeneficiaryId: any;
  viewbyidvalue: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder, private activeRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.activeRouter.queryParams.subscribe((param: any) => {
      this.employeeBeneficiaryId = param.Alldata;
      
    })


    this.beneficiaryForm = this.fb.group({
      accountHolderName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
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


    this.service.BeneficiaryEmployeeView(this.merchantId).subscribe((res: any) => {
      this.viewbeneficiary = res.response;
    })
//beneficiary get byid 
    this.service.BeneficiaryViewbyId(this.employeeBeneficiaryId).subscribe((res: any) => {
      this.viewbyidvalue = res.response;
      

    })
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
  back() {
    this.router.navigateByUrl('/dashboard/view-beneficiary')
  }

  submit() {
    let submitModel: editbenificiary;
    if (this.data == 1) {
      submitModel = {
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
    this.service.BeneficiaryEmployeeEdit(this.employeeBeneficiaryId,submitModel).subscribe((res: any) => {
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
}
