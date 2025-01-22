import { Component } from '@angular/core';
import { createCategory } from '../../../fargin-model/fargin-model.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
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
      servicename: ['', [Validators.required]],
    });
  }
  get servicename() {
    return this.pincodeformGroup.get('servicename')
  }

  submit() {
    let submitModel: createCategory = {
      createdBy: this.entityname,
      serviceName: this.servicename?.value,
      merchantId: this.merchantId
    }
    this.service.CreateCategory(submitModel).subscribe((res: any) => {
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
