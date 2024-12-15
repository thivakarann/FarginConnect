import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branchadd } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrl: './branch-add.component.css'
})
export class BranchAddComponent {
  merchantid: any;
  branch!: FormGroup;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  options: any;
  plans: any;
  todayDate: string = '';
  Expirydate: any;
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.merchantid = this.data.value;

    this.branch = new FormGroup({
      branchName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      apiKey: new FormControl('', [Validators.required]),
      secretKey: new FormControl('', [Validators.required]),
      bankName: new FormControl('', [Validators.required]),
      accountHolderName: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required,Validators.pattern("^[0-9]{9,18}$")]),
      ifscCode: new FormControl('', [Validators.required,Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")]),
      createdBy: new FormControl(''),
      merchantId: new FormControl(''),

    })


  }



  get branchName() {
    return this.branch.get('branchName')

  }

  get apiKey() {
    return this.branch.get('apiKey')

  }

  get secretKey() {
    return this.branch.get('secretKey')

  }

  get bankName() {
    return this.branch.get('bankName')

  }

  get accountHolderName() {
    return this.branch.get('accountHolderName')

  }
  get accountNumber() {
    return this.branch.get('accountNumber')

  }
  get ifscCode() {
    return this.branch.get('ifscCode')

  }


  Submit() {

    let submitModel: Branchadd = {
      branchName: this.branchName?.value,
      apiKey: this.apiKey?.value,
      secretKey: this.secretKey?.value,
      bankName: this.bankName?.value,
      accountHolderName: this.accountHolderName?.value,
      accountNumber: this.accountNumber?.value,
      ifscCode: this.ifscCode?.value,
      createdBy: this.getadminname,
      merchantId: this.merchantid
    }

    this.service.BranchAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
