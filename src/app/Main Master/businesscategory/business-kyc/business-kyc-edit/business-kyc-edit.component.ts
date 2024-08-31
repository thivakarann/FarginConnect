import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Businesskycedit } from '../../../../Fargin Model/fargin-model/fargin-model.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-business-kyc-edit',
  templateUrl: './business-kyc-edit.component.html',
  styleUrl: './business-kyc-edit.component.css'
})
export class BusinessKycEditComponent implements OnInit{

  editbusinesskyc:any=FormGroup;
  businessCategoryId: any;
getadminname = JSON.parse(localStorage.getItem('adminname') || '');
Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  categorys: any;
  mccCodes: any;
  businessCreationId: any;
  kycDocNames: any;
  categoryName: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  errorMsg: any;
  categoryNames: any;
  businessCategoryIds: any;


  constructor(private fb: FormBuilder,private dialog:MatDialog,private service:FarginServiceService,private toastr:ToastrService,@Inject(MAT_DIALOG_DATA) public data: any ) {

    this.businessCreationId=data.value.businessCreationId;
  
  }



  ngOnInit(): void {
       
    this.editbusinesskyc = this.fb.group({
      kycDocName: new FormControl('', [Validators.required]),
      modifiedBy: new FormControl(''),
    });

    this.kycDocNames=this.data.value.kycDocName
    this.editbusinesskyc.controls['kycDocName'].value = this.kycDocNames

    
    // this.businessCategoryIds=this.data.value.businessCategoryId.businessCategoryId
    // this.editbusinesskyc.controls['businessCategoryId'].value = this.businessCategoryIds

    
    this.service.BusinesscategoryKycactive().subscribe((res: any) => {
      if(res.flag==1){
        this.categoryName = res.response;
        this.categoryName.reverse();
        this.dataSource = new MatTableDataSource(this.categoryName);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else{
        this.errorMsg=res.responseMessage;       

   }    
  });      
 

    
    
  }  
  
get  kycDocName() {
  return this.editbusinesskyc.get('kycDocName');
}



Editsubmit(){
  let submitModel:Businesskycedit={
    kycDocName: this.kycDocName.value,
    businessCategoryId:this.businessCategoryId.value,
    modifiedBy: this.getadminname
  }
    
    this.service.Businesskycupdate(this.businessCreationId,submitModel).subscribe((res:any)=>{
      if(res.flag == 1){
        this.toastr.success(res.responseMessage)
        window.location.reload()
      }else{
        this.toastr.warning(res.responseMessage)
      }
        })
  }

}

