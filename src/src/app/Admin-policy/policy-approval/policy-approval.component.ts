import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { KycApproval, policyApproval } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-policy-approval',
  templateUrl: './policy-approval.component.html',
  styleUrl: './policy-approval.component.css'
})
export class PolicyApprovalComponent {
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');

  myForm!:FormGroup;
   id: any;
   approval: any;
 
 constructor(private service:FarginServiceService,
   @Inject(MAT_DIALOG_DATA) public data:any,
   private toaster:ToastrService,
   private dialog: MatDialog,
 ){
 
 }
   ngOnInit(): void {
     
     this.id = this.data.value
     
 
     
     this.myForm = new FormGroup({
       approvalStatus:new FormControl('', [Validators.required]),
     })
   }
 
 
   get approvalStatus() {
     return this.myForm.get('approvalStatus');
   }
   
  
 
   submit() {
     let submitModel: policyApproval = {
      approvedStatus: this.approvalStatus?.value,
      approvedBy: this.createdBy,
     };
   
     this.service.ApprovalForPolicy(this.id,submitModel).subscribe((res: any) => {
       if (res.flag === 1) {
         this.toaster.success(res.responseMessage);
         this.dialog.closeAll();  // Close the dialog
         setTimeout(() => {
           window.location.reload()
         }, 500);
       } else {
         this.toaster.error(res.responseMessage);  
       }
     }, );
   }
}
