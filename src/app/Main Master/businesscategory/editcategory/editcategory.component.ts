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
export class EditcategoryComponent implements OnInit{

  editcategory:any=FormGroup;
  businessCategoryId: any;
getadminname = JSON.parse(localStorage.getItem('adminname') || '');
Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  categorys: any;
  mccCodes: any;


  constructor(private fb: FormBuilder,private dialog:MatDialog,private service:FarginServiceService,private toastr:ToastrService, @Inject(MAT_DIALOG_DATA) public data: any ) {

    this.businessCategoryId=data.value.businessCategoryId;
console.log(this.businessCategoryId)
  }



  ngOnInit(): void {
       
    this.editcategory = this.fb.group({
      categoryName: new FormControl('', [Validators.required]),
      mccCode: new FormControl('', [Validators.required]),
      modifiedBy: new FormControl(''),
    });

    this.categorys=this.data.value.categoryName
    this.editcategory.controls['categoryName'].value = this.categorys
    
    this.mccCodes=this.data.value.mccCode
    this.editcategory.controls['mccCode'].value = this.mccCodes
    
  }


  
  
get  categoryName() {
  return this.editcategory.get('categoryName');
}

get  mccCode() {
  return this.editcategory.get('mccCode');
}

Editsubmit(){

  let submitModel:Businessedit={
    categoryName: this.categoryName.value,
    mccCode: this.mccCode.value,
    modifiedBy: this.getadminname
  }
    
    this.service.BusinessEdit(this.businessCategoryId,submitModel).subscribe((res:any)=>{
      if(res.flag == 1){
        this.toastr.success(res.responseMessage)
        window.location.reload()
      }else{
        this.toastr.warning(res.responseMessage)
      }
        })
  }
}


