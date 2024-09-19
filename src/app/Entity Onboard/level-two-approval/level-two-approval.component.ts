import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { LevelTwoApproval } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-level-two-approval',
  templateUrl: './level-two-approval.component.html',
  styleUrl: './level-two-approval.component.css'
})
export class LevelTwoApprovalComponent {
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');

  myForm!: FormGroup;
  merchantId: any;
  approval: any;

  constructor(private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {

    this.merchantId = this.data.value
    console.log(this.merchantId);


    this.myForm = new FormGroup({
      approvalStatus: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
    })
  }


  get approvalStatus() {
    return this.myForm.get('approvalStatus');
  }
  get remarks() {
    return this.myForm.get('remarks');
  }


  submit() {
    let submitModel: LevelTwoApproval = {

      approvalStatusL2: this.approvalStatus?.value,
      approvedByL2: this.createdBy,
      commentL2: this.remarks?.value,
    }
    this.service.MerchantLevel2ApprovalTwo(this.merchantId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.approval = res.response;
        this.dialog.closeAll();
        window.location.reload();
        this.toaster.success(res.responseMessage)
      }
      else {
        this.toaster.error(res.responseMessage)

      }

    })
  }
}
