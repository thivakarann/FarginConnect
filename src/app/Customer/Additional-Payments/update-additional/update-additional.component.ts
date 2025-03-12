import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdditionalPayUpdate, updateCategory } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-update-additional',
  templateUrl: './update-additional.component.html',
  styleUrl: './update-additional.component.css'
})
export class UpdateAdditionalComponent {
  pincodeformGroup: any = FormGroup;
  boxnumber: any;
  fullname: any = localStorage.getItem('fullname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  customerid:any;
  categoryview: any;
  viewdata: any;
  additionalcatId: any;
  cusPayId: any;
  addtionalCategoryid: any;
 
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:any) { }
  ngOnInit(): void {
    this.viewdata=this.data.value;
 
    this.cusPayId=this.data.value.customerpaymentId;
 
    this.addtionalCategoryid=this.viewdata.addtionalCategory?.additionalCategoryId
    console.log( this.addtionalCategoryid)
 
 
    this.pincodeformGroup = this.fb.group({
      servicename: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$')]],

      amount: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?$')]],
     
    });
 
    this.service.CategoryGetallActive(this.merchantId).subscribe((res:any)=>{
      if(res.flag==1){
        this.categoryview=res.response;
      }
    })
 
  }
 
  get servicename() {
    return this.pincodeformGroup.get('servicename')
  }

  get quantity() {
    return this.pincodeformGroup.get('quantity')
  }
 
  get amount() {
    return this.pincodeformGroup.get('amount')
  }
 
  submit() {
 
    let submitModel: AdditionalPayUpdate = {
      paidAmount: this.amount?.value,
      modifiedBy: this.fullname,
      quantity:this.quantity?.value,
      inventoryNameId: this.servicename?.value
    }
    this.service.UpdateAdditionalPayments( this.cusPayId,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
      
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
