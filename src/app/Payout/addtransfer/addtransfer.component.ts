import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-addtransfer',
  templateUrl: './addtransfer.component.html',
  styleUrl: './addtransfer.component.css'
})
export class AddtransferComponent {
  withdrawalFormGroup: any;
    merchantId = sessionStorage.getItem('merchantId') || '';
    viewbank: any;
    withdrawal: any;
    primaryAccount: string | null = null; 
    constructor(
      private service: FarginServiceService,
      private router: Router,
      private dialog: MatDialog,
      private toastr: ToastrService
    ) {}

    ngOnInit(): void {
      this.withdrawalFormGroup = new FormGroup({
        LedgerId: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required]),
        note: new FormControl('', [Validators.required]),
      });


      // this.service.viewbymerchantids(this.merchantId).subscribe({
      //   next: (res: any) => {
      //     this.viewbank = res.response.merchantbank;
      //     this.primaryAccount = this.viewbank.find((account: any) => account.primaryAccountStatus === 1)?.accountNumber;
          
      //     
      //   },
      // });
    }

    get amount() {
      return this.withdrawalFormGroup.get('amount');
    }

    get note() {
      return this.withdrawalFormGroup.get('note');
    }

    get LedgerId() {
      return this.withdrawalFormGroup.get('LedgerId');
    }

    // createWithdrawalModel(from: string, to: string): AddWithdrawal {
    //   return {
    //     merchantId: this.merchantId,
    //     tresholdId: undefined,
    //     fromLedgerId: from,
    //     toLedgerId: to,
    //     amount: this.amount.value,
    //     type: 'PAYOUT',
    //     currency: 'INR',
    //     fee: undefined,
    //     note: this.note.value
    //   };
    // }
    // submit() {
    //   const selectedAccountNumber = this.LedgerId.value;
    //   const fromLedgerId = selectedAccountNumber !== this.primaryAccount ? this.primaryAccount : selectedAccountNumber;
    //   const toLedgerId = selectedAccountNumber !== this.primaryAccount ? selectedAccountNumber : this.primaryAccount;
    //   const submitModel = this.createWithdrawalModel(fromLedgerId, toLedgerId);
  
    //   this.service.addwithdrawals(submitModel).subscribe((res: any) => {
    //     this.withdrawal = res.response;
    //     if (res.flag == 1) {
    //       this.toastr.success(res.responseMessage);
    //       this.dialog.closeAll();
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 2000);
    //     } else {
    //       this.toastr.error(res.responseMessage);
    //     }
    //   });
    // }

}
