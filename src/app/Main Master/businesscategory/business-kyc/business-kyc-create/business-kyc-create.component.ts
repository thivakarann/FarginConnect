import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Businesskycadd } from '../../../../fargin-model/fargin-model.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-business-kyc-create',
  templateUrl: './business-kyc-create.component.html',
  styleUrl: './business-kyc-create.component.css'
})
export class BusinessKycCreateComponent implements OnInit {

  addbusinesskyc:any=FormGroup;
createdBy = JSON.parse(localStorage.getItem('adminname') || '');
showcategoryData:boolean =false;
errorMsg: any;
responseDataListnew: any=[];
response: any=[];  
dataSource:any;
  categoryName: any;
     
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private fb: FormBuilder,private dialog:MatDialog,private service:FarginServiceService,private toastr:ToastrService) {}
   

  ngOnInit(): void {

    
    this.addbusinesskyc = this.fb.group({
      kycDocName: new FormControl('', [Validators.required]),
      businessCategoryId: new FormControl('', [Validators.required]),
      createdBy: new FormControl(''),
     
    });

    this.service.BusinesscategoryKycactive().subscribe((res: any) => {
      if(res.flag==1){
        this.categoryName = res.response;
        this.categoryName.reverse();
        this.dataSource = new MatTableDataSource(this.categoryName);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.showcategoryData = false;
        // console.log(this.businesscategory) 
      }
      else{
        this.errorMsg=res.responseMessage;       
        this.showcategoryData = true;
   }    
  });      
 

  }

  
get  kycDocName() {
  return this.addbusinesskyc.get('kycDocName');
}

get  businessCategoryId() {
  return this.addbusinesskyc.get('businessCategoryId');
}



submit(){
  let submitModel: Businesskycadd = {
    kycDocName: this.kycDocName.value,
    businessCategoryId: this.businessCategoryId.value,
    createdBy: this.createdBy
  };
  
    
    this.service.BusinesskycCreate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
        setTimeout(() => {
          window.location.reload()
        }, 1000);

      }
      else {
        this.toastr.error(res.responseMessage);
      
      }

    });

}
}