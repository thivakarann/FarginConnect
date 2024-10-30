import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { UpdateBankdetails, UpdateBankdetailStatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-edit-bank-details',
  templateUrl: './edit-bank-details.component.html',
  styleUrl: './edit-bank-details.component.css'
})
export class EditBankDetailsComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  id: any;
  details: any;
  banks: any;

  constructor(
    public Bankdetailsupdate: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    this.details = this.data.value;
    this.id = this.data.value.bankId;
    this.banks = this.data.value.bankName;
    

    this.myForm = new FormGroup({
      bankName: new FormControl('', Validators.required),
    });
  }

  get bankName() {
    return this.myForm.get('bankName')

  }

  Edit() {
    let submitModel: UpdateBankdetails = {
      bankId: this.id,
      bankName: this.bankName?.value,
      modifiedBy: this.getadminname
    }

    this.Bankdetailsupdate.bankdetailsUpdate(submitModel).subscribe((res:any)=>{
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
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
