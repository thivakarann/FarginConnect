import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { SmsUpdate } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-edit-sms',
  templateUrl: './edit-sms.component.html',
  styleUrl: './edit-sms.component.css'
})
export class EditSmsComponent {
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  id: any;
  myForm!: FormGroup;
  payId: any;
 
  @ViewChild('selects') selects: any = MatSelect;
  allSelected = false;
 
  merchantsmsId: any;
  options: any;
  Smsdetails: any;
 
  constructor(private router: Router, private Approval: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
 
    this.Approval.SmsDropdownGetAll().subscribe((res:any)=>{
      if(res.flag==1){
        this.options=res.response;
      }
    })
    this.Smsdetails = this.data.value
    this.merchantsmsId=this.data.value.merchantSmsId;
   
    
 
    this.myForm = new FormGroup({
      smsFor: new FormControl('', [Validators.required,]),
     
 
    });
  }
 
  get smsFor() {
    return this.myForm.get('smsFor')
 
  }
 
 
  submit() {
    let submitModel: SmsUpdate = {
      smsType: this.smsFor?.value,
      modifedBy: this.getadminname
    }
    this.Approval.smsUpdate(this.merchantsmsId,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);  
           }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
  toggleAllSelection(){
    if (this.allSelected) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }
}
