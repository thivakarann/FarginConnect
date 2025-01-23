import { Component, Inject } from '@angular/core';
import { farginedit } from '../../../fargin-model/fargin-model.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fargin-bank-edit',
  templateUrl: './fargin-bank-edit.component.html',
  styleUrl: './fargin-bank-edit.component.css'
})
export class FarginBankEditComponent {
  BankFormedit!: FormGroup;
  showPassword: boolean = false;
  createdBy :any = JSON.parse(localStorage.getItem('adminname') || '');
  activeRole: any;
  farginbank: any;
  adminBankId:any;

  constructor(private dialog:MatDialog,  private service: FarginServiceService, private toaster: ToastrService, private router: Router,@Inject(MAT_DIALOG_DATA) public data: any) { 

    this.adminBankId=this.data.value.adminBankId
  }
  ngOnInit(): void {

    this.BankFormedit = new FormGroup({
      accountHolderName : new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required]),
      bankName: new FormControl('', [Validators.required]),
      ifscCode: new FormControl('', [Validators.required]),
      branchName: new FormControl('', [Validators.required]),
      ledgerId: new FormControl('', [Validators.required]),
      createdBy: new FormControl(''),
     
    })

    this.service.roleactiveViewall().subscribe((res:any)=>{
      this.activeRole=res.response;
      
    })

    if (this.data && this.data.value) {
      this.BankFormedit.patchValue({
        accountHolderName: this.data.value.accountHolderName,
        accountNumber: this.data.value.accountNumber,
        bankName: this.data.value.bankName,
        ifscCode: this.data.value.ifscCode,
        branchName: this.data.value.branchName,
        ledgerId: this.data.value.ledgerId,

      });
    } else {
      console.error('Data is not defined');
    }

   
  }
  get accountHolderName() {
    return this.BankFormedit.get('accountHolderName');
  }
  get accountNumber() {
    return this.BankFormedit.get('accountNumber');
  }
  get bankName() {
    return this.BankFormedit.get('bankName');
  }
 
  get ifscCode(){
    return this.BankFormedit.get('ifscCode')
  }
  get branchName() {
    return this.BankFormedit.get('branchName');
  }
  get ledgerId() {
    return this.BankFormedit.get('ledgerId');
  }


  submit() {
    let submitmodel: farginedit = {
      accountHolderName: this.accountHolderName?.value.trim(),
      accountNumber: this.accountNumber?.value.trim(),
      bankName: this.bankName?.value.trim(),
      ifscCode: this.ifscCode?.value.trim(),
      branchName: this.branchName?.value.trim(),
      ledgerId: this.ledgerId?.value.trim(),
      createdBy: this.createdBy
    }

    this.service.FarginCreate(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.dialog.closeAll();
      
      }
      else {
        this.toaster.error(res.responseMessage);

      }
    })

  }

  
}
