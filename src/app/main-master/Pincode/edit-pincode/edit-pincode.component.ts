import { Component, Inject, InjectionToken } from '@angular/core';
import { updatePincode } from '../../../fargin-model/fargin-model.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-edit-pincode',
  templateUrl: './edit-pincode.component.html',
  styleUrl: './edit-pincode.component.css'
})
export class EditPincodeComponent {
  pincodeformGroup: any = FormGroup;
  boxnumber: any;
  entityname: any = localStorage.getItem('entityname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  viewData: any;
  viewValues: any;
  merchantPincodeId: any;
  // PincodeLists:any[]=[];

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA)public data:any) { }
  ngOnInit(): void {


    this.merchantPincodeId = this.data.value;
    this.viewValues=this.data.value1


    this.pincodeformGroup = this.fb.group({
      pincode: ['', [Validators.required]],
    });
  }
  get pincode() {
    return this.pincodeformGroup.get('pincode')
  }

  submit() {
    let submitModel: updatePincode = {
      merchantPincodeId: this.merchantPincodeId,
      merchantId: this.merchantId,
      modifiedBy: this.entityname,
      pincodeNumber: this.pincode?.value
    }
    this.service.UpdatePincode(submitModel).subscribe((res: any) => {

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


