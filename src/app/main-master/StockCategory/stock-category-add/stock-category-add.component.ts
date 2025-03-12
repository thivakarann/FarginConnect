import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExportReportCreate, Stockcategoryadd } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-stock-category-add',
  templateUrl: './stock-category-add.component.html',
  styleUrl: './stock-category-add.component.css'
})
export class StockCategoryAddComponent implements OnInit {
  getadminname = localStorage.getItem('fullname');
  Addcategory!: FormGroup;
  merchantId: any = localStorage.getItem('merchantId')


  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.Addcategory = new FormGroup({
      inventoryName: new FormControl('', [Validators.required]),
  
    });
  }

  get inventoryName() {
    return this.Addcategory.get('inventoryName')
  }

  submit() {
    let submitModel: Stockcategoryadd = {
      merchantId: this.merchantId,
      createdBy: this.getadminname,
      inventoryName: this.inventoryName?.value
    }

    this.service.StockCategoryAdd(submitModel).subscribe((res: any) => {
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
