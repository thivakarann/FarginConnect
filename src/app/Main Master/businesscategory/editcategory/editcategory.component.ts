import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Businessedit } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrl: './editcategory.component.css'
})
export class EditcategoryComponent implements OnInit {

  editcategory: any = FormGroup;
  businessCategoryId: any;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  categorys: any;
  mccCodes: any;

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // Generates days 1 to 31
  autoDebitDates: any;



  constructor(private fb: FormBuilder, private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.businessCategoryId = data.value.businessCategoryId;
    
  }



  ngOnInit(): void {

    this.editcategory = this.fb.group({
      categoryName: new FormControl('', [Validators.required]),
      // mccCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$'),]),
      mccCode: new FormControl('', [Validators.required,Validators.pattern('^[A-Za-z0-9]{4}$')]),
      autoDebitDate: new FormControl('', [Validators.required]),
      modifiedBy: new FormControl(''),
    });

    this.categorys = this.data.value.categoryName
    this.editcategory.controls['categoryName'].value = this.categorys

    this.mccCodes = this.data.value.mccCode
    this.editcategory.controls['mccCode'].value = this.mccCodes

    this.autoDebitDates = this.data.value.autoDebitDate
    this.editcategory.controls['autoDebitDate'].value = this.autoDebitDates

  }




  get categoryName() {
    return this.editcategory.get('categoryName');
  }

  get autoDebitDate() {
    return this.editcategory.get('autoDebitDate');
  }

  get mccCode() {
    return this.editcategory.get('mccCode');
  }

  Editsubmit() {

    let submitModel: Businessedit = {
      categoryName: this.categoryName.value.trim(),
      mccCode: this.mccCode.value.trim(),
      modifiedBy: this.getadminname,
      autoDebitDate: this.autoDebitDate?.value
    }

    this.service.BusinessEdit(this.businessCategoryId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
    
      } else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}


