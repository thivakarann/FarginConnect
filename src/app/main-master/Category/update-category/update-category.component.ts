import { Component, Inject, OnInit } from '@angular/core';
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
export class UpdateCategoryComponent implements OnInit{
  pincodeformGroup: any = FormGroup;
  boxnumber: any;
  entityname: any = localStorage.getItem('fullname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  PincodeLists:any[]=[];
  viewData: any;
  additionalcatId: any;
  isIncreaseClicked: boolean = false;
  isDecreaseClicked: boolean = true;
  flag: number = 0;
 
  stocktype:any;
 
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA)public data:any) { }
  ngOnInit(): void {

    this.service.StockCategoryType(this.merchantId).subscribe((res: any) => {
      this.stocktype = res.response;
      
      
 })

 
this.additionalcatId=this.data.value;
 
this.viewData=this.data.value1;

 
    this.pincodeformGroup = this.fb.group({
      inventoryNameId: ['', [Validators.required]],
      inventoryStock: ['', [Validators.pattern('^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$')]],
      flag:['']
    });
  }
  get inventoryNameId() {
    return this.pincodeformGroup.get('inventoryNameId')
  }
  get inventoryStock() {
    return this.pincodeformGroup.get('inventoryStock')
  }
 
 
  submit() {
    let submitModel: updateCategory = {
      modifiedBy: this.entityname,
      inventoryNameId: this.inventoryNameId?.value,
      inventoryStock: this.isIncreaseClicked ? this.inventoryStock?.value : this.viewData?.inventoryStock,
      flag: this.flag,
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
 
  onIncreaseClicked(): void {
    this.isIncreaseClicked = true;
    this.flag = 1;
  }
 
  onDecreaseClicked(): void {
    this.isIncreaseClicked = true;
    this.flag = 2;
  }
 
}
 