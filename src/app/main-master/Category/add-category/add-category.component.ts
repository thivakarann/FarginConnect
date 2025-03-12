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
  entityname: any = localStorage.getItem('fullname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  PincodeLists: any[] = [];
  stocktype:any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,) { }
  ngOnInit(): void {

    this.pincodeformGroup = this.fb.group({
      inventoryNameId: ['', [Validators.required]],
      inventoryStock: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$')]],
    });

      this.service.StockCategoryType(this.merchantId).subscribe((res: any) => {
            this.stocktype = res.response;
       })
    
  }
  get inventoryNameId() {
    return this.pincodeformGroup.get('inventoryNameId')
  }

  get inventoryStock() {
    return this.pincodeformGroup.get('inventoryStock')
  }

  submit() {
    let submitModel: createCategory = {
      createdBy: this.entityname,
      inventoryNameId: this.inventoryNameId?.value,
      merchantId: this.merchantId,
      openingStock: "",
      inventoryStock: this.inventoryStock?.value
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
