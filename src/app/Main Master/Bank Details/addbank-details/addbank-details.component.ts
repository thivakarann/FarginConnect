import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddBankdetails } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-addbank-details',
  templateUrl: './addbank-details.component.html',
  styleUrl: './addbank-details.component.css'
})
export class AddbankDetailsComponent implements OnInit {

  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();


  constructor(
    public Bankdetailsadd: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {

    this.myForm = new FormGroup({
      bankName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  get bankName() {
    return this.myForm.get('bankName')

  }

  Submit() {
    let submitModel: AddBankdetails = {
      bankName: this.bankName?.value.trim(),
      createdBy: this.getadminname
    }
    this.Bankdetailsadd.bankdetailsAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);

        // Emit the event to notify parent component
        this.bankDetailsUpdated.emit();


        this.dialog.closeAll();


      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
