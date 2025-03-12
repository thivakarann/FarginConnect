import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Stockcategoryadd, Stockcategoryedit } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-stock-category-edit',
  templateUrl: './stock-category-edit.component.html',
  styleUrl: './stock-category-edit.component.css'
})
export class StockCategoryEditComponent implements OnInit {
  getadminname = localStorage.getItem('fullname');
  Editcategory!: FormGroup;
  merchantId: any = localStorage.getItem('merchantId')
  stockview:any;
  id:any;
  inventory:any;

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
   @Inject(MAT_DIALOG_DATA)public data:any
  ) { }

  ngOnInit(): void {

    this.stockview = this.data.value
    console.log(this.stockview)
    this.id = this.data.value.inventoryNameId
    this.inventory = this.data.value.inventory


    this.Editcategory = new FormGroup({
      inventoryName: new FormControl('', [Validators.required]),
  
    });
  }

  get inventoryName() {
    return this.Editcategory.get('inventoryName')
  }

  submit() {
    let submitModel: Stockcategoryedit = {
      merchantId: this.merchantId,
      modifiedBy: this.getadminname,
      inventoryName: this.inventoryName?.value
     }

    this.service.StockCategoryUpdate(this.id,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }

}
