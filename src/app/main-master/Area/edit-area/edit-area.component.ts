import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { updateArea } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.component.html',
  styleUrl: './edit-area.component.css'
})
export class EditAreaComponent {
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
  merchantAreaId: any;
  viewValues: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA)public data:any) { }
  
  ngOnInit(): void {
    this.merchantAreaId = this.data.value;
    this.viewValues=this.data.value1



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
    let submitModel: updateArea = {
      merchantPincodeId: this.pincode?.value,
      merchantAreaId: this.merchantAreaId,
      merchantId: this.merchantId,
      modifiedBy: this.entityname,
      areaName: this.area?.value
    }
    this.service.UpdateArea(submitModel).subscribe((res: any) => {

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

