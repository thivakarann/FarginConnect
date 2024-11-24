import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { documentapproval, KycApproval } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-approval-bussinessdocument',
  templateUrl: './approval-bussinessdocument.component.html',
  styleUrl: './approval-bussinessdocument.component.css'
})
export class ApprovalBussinessdocumentComponent {
  myForm!: FormGroup;
  id: any;
  approval: any;
  @Output() dataApproval = new EventEmitter<KycApproval>();
  value: any;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  merchantDocumentId: any;

  constructor(private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private dialog: MatDialog,
  ) {

  }
  ngOnInit(): void {

  
    this.value = this.data.value
    

    this.merchantDocumentId=this.data.value.merchantDocumentId
    
    
    


    this.myForm = new FormGroup({
      approvalStatus: new FormControl('', [Validators.required]),
      reMarks: new FormControl('', [Validators.required]),
    })
  }


  get approvalStatus() {
    return this.myForm.get('approvalStatus');
  }
  get reMarks() {
    return this.myForm.get('reMarks');
  }



  submit() {

 
    let submitModel: documentapproval = {
      approvalBy: this.createdBy,
      approvalStatus: this.approvalStatus?.value,
      reMarks: this.reMarks?.value.trim()
    };

    this.service.documentApproval(this.merchantDocumentId,submitModel).subscribe((res: any) => {
      if (res.flag === 1) {
        this.toaster.success(res.responseMessage);
        this.dialog.closeAll();  // Close the dialog
        setTimeout(() => {
          window.location.reload()
        }, 500);
      } else {
        this.toaster.error(res.responseMessage);
      }
    });
  }
}

