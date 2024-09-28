import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KycApproval } from '../../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kyc-approval',
  templateUrl: './kyc-approval.component.html',
  styleUrl: './kyc-approval.component.css'
})
export class KycApprovalComponent implements OnInit{

  createdBy = JSON.parse(localStorage.getItem('adminname') || '');

 myForm!:FormGroup;
  id: any;
  approval: any;
  @Output() dataApproval= new EventEmitter<KycApproval>();

constructor(private service:FarginServiceService,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private toaster:ToastrService,
  private dialogRef: MatDialogRef<KycApprovalComponent>,
){

}
  ngOnInit(): void {
    
    this.id = this.data.value
    console.log(this.id);

    
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
 

  // submit(){
  //   let submitModel:KycApproval={
  //     approvalBy: this.createdBy,
  //     approvalStatus: this.approvalStatus?.value,
  //     reMarks: this.remarks?.value
  //   }
  //   this.service.KycApproval(this.id,submitModel).subscribe((res:any)=>{
  //     if(res.flag==1){
  //       this.approval=res.response;  
  //       this.dataApproval.emit(submitModel);  // Emit the newly added data
  //       this.dialogRef.close();  // Close the dialog
      
  //     }

  //  })
  // }
  submit() {
    let submitModel: KycApproval = {
      approvalBy: this.createdBy,
      approvalStatus: this.approvalStatus?.value,
      reMarks: this.remarks?.value
    };
  
    this.service.KycApproval(this.id, submitModel).subscribe((res: any) => {
      if (res.flag === 1) {
        this.toaster.success(res.responseMessage);
        this.dataApproval.emit(submitModel);  // Emit the newly added data
        this.dialogRef.close();  // Close the dialog
      } else {
        this.toaster.error(res.responseMessage);  
      }
    }, );
  }
  
}
