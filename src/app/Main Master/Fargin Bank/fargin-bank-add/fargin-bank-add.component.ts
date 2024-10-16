import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminCreate, farginadd } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-fargin-bank-add',
  templateUrl: './fargin-bank-add.component.html',
  styleUrl: './fargin-bank-add.component.css'
})
export class FarginBankAddComponent {
  BankForm!: FormGroup;
  showPassword: boolean = false;
  createdBy :any = JSON.parse(localStorage.getItem('adminname') || '');
  activeRole: any;


  constructor(private service: FarginServiceService, private toaster: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.BankForm = new FormGroup({
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
      console.log(this.activeRole);
    })
  }
  get accountHolderName() {
    return this.BankForm.get('accountHolderName');
  }
  get accountNumber() {
    return this.BankForm.get('accountNumber');
  }
  get bankName() {
    return this.BankForm.get('bankName');
  }
 
  get ifscCode(){
    return this.BankForm.get('ifscCode')
  }
  get branchName() {
    return this.BankForm.get('branchName');
  }
  get ledgerId() {
    return this.BankForm.get('ledgerId');
  }


  submit() {
    let submitmodel: farginadd = {
      accountHolderName: this.accountHolderName?.value,
      accountNumber: this.accountNumber?.value,
      bankName: this.bankName?.value,
      ifscCode: this.ifscCode?.value,
      branchName: this.branchName?.value,
      ledgerId: this.ledgerId?.value,
      createdBy: this.createdBy
    }

    this.service.FarginCreate(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
      else {
        this.toaster.error(res.responseMessage);

      }
    })

  }

  close() {
    this.router.navigate([`/dashboard/fargin-viewall`], {
       });
  }
}
