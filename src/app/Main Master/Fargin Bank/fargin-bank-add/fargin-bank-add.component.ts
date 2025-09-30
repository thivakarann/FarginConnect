import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminCreate, farginadd } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fargin-bank-add',
  templateUrl: './fargin-bank-add.component.html',
  styleUrl: './fargin-bank-add.component.css'
})
export class FarginBankAddComponent {
  BankForm!: FormGroup;
  showPassword: boolean = false;
  createdBy: any = JSON.parse(sessionStorage.getItem('adminname') || '');
  activeRole: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toaster: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.BankForm = new FormGroup({
      accountHolderName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Za-z. ]+$'), 
        Validators.maxLength(50)
      ]),
      accountNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]{9,18}$")
      ]),
      bankName: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[A-Za-z ]{1,50}$/)
      ]),
      ifscCode: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")
      ]),
      branchName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z ]{1,50}$/)
      ]),
      typemode: new FormControl('', [
        Validators.required,

      ]),
      ledgerId: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,10}$/
      )]),
      createdBy: new FormControl(''),

    })



    this.service.roleactiveViewall().subscribe((res: any) => {
      this.activeRole = res.response;

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

  get ifscCode() {
    return this.BankForm.get('ifscCode')
  }
  get branchName() {
    return this.BankForm.get('branchName');
  }
  get ledgerId() {
    return this.BankForm.get('ledgerId');
  }

  get typemode() {
    return this.BankForm.get('typemode');
  }
  submit() {
    let submitmodel: farginadd = {
      accountHolderName: this.accountHolderName?.value.trim(),
      accountNumber: this.accountNumber?.value.trim(),
      bankName: this.bankName?.value.trim(),
      ifscCode: this.ifscCode?.value.trim(),
      branchName: this.branchName?.value.trim(),
      ledgerId: this.ledgerId?.value.trim(),
      typeMode: this.typemode?.value,
      createdBy: this.createdBy
    }

    this.service.FarginCreate(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
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
