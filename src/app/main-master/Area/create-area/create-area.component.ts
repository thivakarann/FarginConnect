import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { createArea } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.css'
})
export class CreateAreaComponent {
 pincodeformGroup: any = FormGroup;
  boxnumber: any;
  entityname: any = localStorage.getItem('entityname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  areaLists:any[]=[];
  pincodeactive:any;
pincodeNumber: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,) { }
  ngOnInit(): void {
    this.pincodeformGroup = this.fb.group({
      pincode: ['', [Validators.required]],
      area: ['', [Validators.required]]
    });

    this.service.PincodeActiveGetAll().subscribe((res:any)=>{
      if(res.flag==1){
        this.pincodeactive=res.response;
      }
    })
  }

  get pincode() {
    return this.pincodeformGroup.get('pincode')
  }
  get area() {
    return this.pincodeformGroup.get('area')
  }


  submit() {
    const inputValue = this.pincodeformGroup.get('area').value;
     this.areaLists = inputValue.split(',').map((item: any) => item.trim());

    let submitModel: createArea = {
      merchantPincodeId: this.pincode?.value,
      createdBy: this.entityname,
      areaList: this.areaLists
    }
    this.service.AreaCreate(this.merchantId,submitModel).subscribe((res: any) => {

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

