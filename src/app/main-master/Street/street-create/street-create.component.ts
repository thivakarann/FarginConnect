import { Component } from '@angular/core';
import { createStreet } from '../../../fargin-model/fargin-model.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-street-create',
  templateUrl: './street-create.component.html',
  styleUrl: './street-create.component.css'
})
export class StreetCreateComponent {

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

constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,) { }
ngOnInit(): void {
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
  const inputValue = this.pincodeformGroup.get('street').value;
   this.streetLists = inputValue.split(',').map((item: any) => item.trim());

  let submitModel: createStreet = {
    merchantAreaId: this.area?.value,
    createdBy: this.entityname,
    streetList: this.streetLists
  }
  this.service.StreetCreate(this.merchantId,submitModel).subscribe((res: any) => {

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