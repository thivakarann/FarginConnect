import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Businessadd } from '../../../Fargin Model/fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent implements OnInit {

  addcategory:any=FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');



  constructor(private fb: FormBuilder,private dialog:MatDialog,private service:FarginServiceService,private toastr:ToastrService) {}
   

  ngOnInit(): void {

    
    this.addcategory = this.fb.group({
      categoryName: new FormControl('', [Validators.required]),
      mccCode: new FormControl('', [Validators.required]),
      createdBy: new FormControl(''),
     
    });

  }


  
get  categoryName() {
  return this.addcategory.get('categoryName');
}

get  mccCode() {
  return this.addcategory.get('mccCode');
}

submit(){
  let submitModel: Businessadd = {
    categoryName: this.categoryName.value,
    mccCode: this.mccCode.value,
    createdBy: this.createdBy
  };
  
    
    this.service.BusinessCreate(submitModel).subscribe((res: any) => {
      if(res.flag==1){
        // this.previlegememberCreate= res.response;
        this.toastr.success(res.responseMessage)   
        window.location.reload()
  
      }
      else{ 
        this.toastr.warning(res.responseMessage);
        this.dialog.closeAll()
      }  
      
  });

}


}
