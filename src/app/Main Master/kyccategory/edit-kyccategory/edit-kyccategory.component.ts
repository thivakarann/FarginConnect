import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Businessedit, kycedit } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-edit-kyccategory',
  templateUrl: './edit-kyccategory.component.html',
  styleUrl: './edit-kyccategory.component.css'
})
export class EditKyccategoryComponent {
  editcategory: any = FormGroup;
  businessCategoryId: any;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  categorys: any;
  mccCodes: any;
  kycCategoryId: any;
  kycCategoryNames: any;


  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    

    this.editcategory = new FormGroup({
      kycCategoryName: new FormControl('', [Validators.required,  Validators.pattern('^[A-Za-z]+$')]),
    });

    this.kycCategoryId = this.data.value.kycCategoryId
    

    this.kycCategoryNames = this.data.value.kycCategoryName
    this.editcategory.controls['kycCategoryName'].value = this.kycCategoryNames
  }

  get kycCategoryName() {
    return this.editcategory.get('kycCategoryName');
  }

  Editsubmit() {

    let submitModel: kycedit = {
      modifiedBy: this.getadminname,
      kycCategoryName: this.kycCategoryName.value.trim(),
      kycCategoryId: this.kycCategoryId
    }

    this.service.editkycCategory(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
     
      } else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
