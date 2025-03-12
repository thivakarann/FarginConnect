import { Component, Inject, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiveInactiveCustomer } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-inactive-status',
  templateUrl: './inactive-status.component.html',
  styleUrl: './inactive-status.component.css'
})
export class InactiveStatusComponent implements OnInit{
  status: any;
  isChecked: any;
  customer: any;
  ActiveButton:any;
  myForm!:FormGroup;
  merchantName: any = localStorage.getItem('merchantname');


  constructor(private service:FarginServiceService,@Inject(MAT_DIALOG_DATA) public data: any,private dialog:MatDialog,private toastr:ToastrService){
    

  }
  ngOnInit(): void {
    this.customer =this.data.value
    this.status=this.data.value1
    
    this.myForm = new FormGroup({
      remarks:new FormControl('', [Validators.required]),
    })
  }

  get remarks() {
    return this.myForm.get('remarks');
  }
activeStatus(value:any){
   
      let submitmodel:ActiveInactiveCustomer={
        activeStatus:value.target.value,
        modifiedBy:this.merchantName,
        statusRemarks:this.remarks?.value
      }
        this.service.ActiveStatusCustomer(this.customer,submitmodel).subscribe((res: any) => {
          this.toastr.success(res.response);
          setTimeout(() => {
            window.location.reload()
          }, 500); 
        });
      }
  inactiveStatus(value:any){
   
   
      let submitmodel:ActiveInactiveCustomer={
        activeStatus:value.target.value,
        modifiedBy:this.merchantName,
        statusRemarks:this.remarks?.value
      }
        this.service.ActiveStatusCustomer( this.customer,submitmodel).subscribe((res: any) => {
            this.toastr.success(res.response);
            setTimeout(() => {
              window.location.reload()
            }, 500);
          });
      }
     


 close(){
  this.dialog.closeAll() 
  }
    }
  

