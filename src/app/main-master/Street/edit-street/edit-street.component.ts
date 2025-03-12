import { Component, Inject } from '@angular/core';
import { updateStreet } from '../../../fargin-model/fargin-model.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-edit-street',
  templateUrl: './edit-street.component.html',
  styleUrl: './edit-street.component.css'
})
export class EditStreetComponent {

  pincodeformGroup: any = FormGroup;
  boxnumber: any;
  entityname: any = localStorage.getItem('entityname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  streetLists:any[]=[];
  areaactive:any;
  pincodeNumber: any;
  merchantStreetId: any;
  viewValues: any;
  
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA)public data:any) { }
  ngOnInit(): void {
    
    this.merchantStreetId = this.data.value;
    this.viewValues=this.data.value1


    this.pincodeformGroup = this.fb.group({
      street: ['', [Validators.required]],
      area: ['', [Validators.required]]
    });
  
    this.service.AreaActiveGetAll().subscribe((res:any)=>{
      if(res.flag==1){
        this.areaactive=res.response;
      }
    })
  }
  
  get street() {
    return this.pincodeformGroup.get('street')
  }
  get area() {
    return this.pincodeformGroup.get('area')
  }
  
  
  submit() {
   
    let submitModel: updateStreet = {
      merchantStreetId: this.merchantStreetId,
      merchantAreaId: this.area?.value,
      merchantId: this.merchantId,
      modifiedBy: this.entityname,
      streetName: this.street?.value
    }
    this.service.UpdateStreet(submitModel).subscribe((res: any) => {
  
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
