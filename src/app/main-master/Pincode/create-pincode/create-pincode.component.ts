import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { CreatePincode } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-create-pincode',
  templateUrl: './create-pincode.component.html',
  styleUrl: './create-pincode.component.css'
})
export class CreatePincodeComponent  implements OnInit{
  pincodeformGroup: any = FormGroup;
  boxnumber: any;
  entityname: any = localStorage.getItem('entityname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  PincodeLists:any[]=[];

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,) { }
  ngOnInit(): void {
    this.pincodeformGroup = this.fb.group({
      pincode: ['', [Validators.required]],
      
    });




  }



  get pincode() {
    return this.pincodeformGroup.get('pincode')
  }

  submit() {
    const inputValue = this.pincodeformGroup.get('pincode').value;
     this.PincodeLists = inputValue.split(',').map((item: any) => item.trim());

    let submitModel: CreatePincode = {
      createdBy: this.entityname,
      pincodeList: this.PincodeLists
    }
    this.service.CreatePincode(this.merchantId,submitModel).subscribe((res: any) => {

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
