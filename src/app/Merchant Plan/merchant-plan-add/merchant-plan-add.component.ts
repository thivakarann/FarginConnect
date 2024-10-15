import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MerchantplanCreate } from '../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-merchant-plan-add',
  templateUrl: './merchant-plan-add.component.html',
  styleUrl: './merchant-plan-add.component.css'
})
export class MerchantPlanAddComponent implements OnInit {

  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  numberValue: number | any = null;
  numberValues:number|any=null

  numberValue2: number | any = null;
  numberValues2:number|any=null
  constructor(
    public Merchantplanadd: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {

    this.myForm = new FormGroup({
      planName: new FormControl('', Validators.required),
      technicalAmount: new FormControl('', Validators.required),
      maintenanceAmount: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
      renewalAmount: new FormControl('', Validators.required),

    });
  }

  get planName() {
    return this.myForm.get('planName')

  }

  get technicalAmount() {
    return this.myForm.get('technicalAmount')

  }

  get maintenanceAmount() {
    return this.myForm.get('maintenanceAmount')

  }

  get frequency() {
    return this.myForm.get('frequency')

  }

  get renewalAmount() {
    return this.myForm.get('renewalAmount')

  }

  submit() {
    let submitModel: MerchantplanCreate = {
      planName: this.planName?.value,
      technicalAmount: this.technicalAmount?.value,
      maintenanceAmount: this.maintenanceAmount?.value,
      frequency: this.frequency?.value,
      renewalAmount:this.renewalAmount?.value,
      createdBy: this.getadminname
    }

    this.Merchantplanadd.merchantplanadd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);

      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }


}
