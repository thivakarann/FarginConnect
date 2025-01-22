import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { updateCategory } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
  pincodeformGroup: any = FormGroup;
  boxnumber: any;
  entityname: any = localStorage.getItem('entityname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  PincodeLists:any[]=[];
  viewData: any;
  additionalcatId: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA)public data:any) { }
  ngOnInit(): void {

this.additionalcatId=this.data.value;

this.viewData=this.data.value1;

    this.pincodeformGroup = this.fb.group({
      servicename: ['', [Validators.required]],
    });
  }
  get servicename() {
    return this.pincodeformGroup.get('servicename')
  }

  submit() {
    let submitModel: updateCategory = {
      modifiedBy: this.entityname,
      serviceName: this.servicename?.value
    }
    this.service.UpdateCategory(this.additionalcatId,submitModel).subscribe((res: any) => {
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
