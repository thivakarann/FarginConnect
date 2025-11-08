import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { UpdateBankdetails } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-edit-bank-details',
  templateUrl: './edit-bank-details.component.html',
  styleUrl: './edit-bank-details.component.css'
})
export class EditBankDetailsComponent implements OnInit {
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');

  myForm!: FormGroup;
  id: any;
  details: any;
  banks: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public Bankdetailsupdate: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      bankName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });

    this.myForm.patchValue({
      bankName: this.data?.value.bankName

    })
  }


  get bankName() {
    return this.myForm.get('bankName')
  }

  Edit() {
    let submitModel: UpdateBankdetails = {
      bankDetailsId: this.data?.value.bankDetailsId,
      bankName: this.bankName?.value.trim(),
      modifiedBy: this.adminName,
      modifierRole: this.adminName
    }

    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }

    this.Bankdetailsupdate.bankdetailsUpdate(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.messageDescription);
      }
    })
  }
}
