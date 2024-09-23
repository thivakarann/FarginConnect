import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LeveloneApproval } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-level-one-approval',
  templateUrl: './level-one-approval.component.html',
  styleUrl: './level-one-approval.component.css'
})
export class LevelOneApprovalComponent implements OnInit{
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');

 myForm!:FormGroup;
 merchantId: any;
  approval: any;

constructor(private service:FarginServiceService,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private toaster:ToastrService,
  private dialog:MatDialog
){

}
  ngOnInit(): void {
    
    this.merchantId = this.data.value
    console.log(this.merchantId);

    
    this.myForm = new FormGroup({
      approvalStatus:new FormControl('', [Validators.required]),
      remarks:new FormControl('', [Validators.required]),
    })
  }


  get approvalStatus() {
    return this.myForm.get('approvalStatus');
  }
  get remarks() {
    return this.myForm.get('remarks');
  }
 

  submit(){
    let submitModel:LeveloneApproval={
      merchantId: this.merchantId,
      approvalStatusL1: this.approvalStatus?.value,
      approvedByL1: this.createdBy,
      comment: this.remarks?.value
    }
    this.service.MerchantLevelApprovalOne(submitModel).subscribe((res:any)=>{
      if(res.flag==1){
        this.approval=res.response; 
        this.toaster.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
      else if(res.flag==2){
        this.toaster.error(res.responseMessage)
       }
   })
  }
}
