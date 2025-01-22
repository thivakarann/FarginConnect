import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UpdateCustomerdues } from '../../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-cusdues',
  templateUrl: './update-cusdues.component.html',
  styleUrl: './update-cusdues.component.css'
})
export class UpdateCusduesComponent {
  details: any;
  myForm!: FormGroup;
  Amount: any;
  fullname: any = localStorage.getItem('fullname');
  customerpayid: any;


  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private toastr: ToastrService,) { }


  ngOnInit(): void {
    this.details = this.data.value;

    this.Amount = this.details.paidAmount;

    this.customerpayid = this.details.customerPayId

    console.log("Amount" + this.Amount)

    console.log("customerpayid" + this.customerpayid)

    this.myForm = new FormGroup({
      paidAmount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?$')]),
      reason: new FormControl('', [Validators.required]),
    });
  }

  get paidAmount() {
    return this.myForm.get('paidAmount');


  }

  get reason() {
    return this.myForm.get('reason');
  }
 

  Update() {
    let submitModel: UpdateCustomerdues = {
      paidAmount: this.paidAmount?.value,
      modifiedBy: this.fullname,
      reason:this.reason?.value
    }

    this.service.Updatecustomerdues(this.customerpayid,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.responseMessage)
       this.dialog.closeAll();

      }
    })
  }

}
