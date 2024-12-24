import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MerchantplanUpdate } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-edit-merchant-plan',
  templateUrl: './edit-merchant-plan.component.html',
  styleUrl: './edit-merchant-plan.component.css'
})
export class EditMerchantPlanComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  details: any;
  id: any;
  planame: any;
  onetimeamount: any;
  MaintenanceAmount: any;
  Frequency: any;
  numberValue: number | any = null;
  numberValues: number | any = null
  RenewelAmount: any;

  constructor(
    public merchantplanedit: FarginServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {


    this.myForm = new FormGroup({
      planName: new FormControl('', Validators.required),
      technicalAmount: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$')]),
      maintenanceAmount: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$')]),
      frequency: new FormControl('', Validators.required),
      renewalAmount: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$')]),

    });


    this.details = this.data.value;
    this.id = this.data.value.merchantPlanId;
    this.planame = this.data.value.planName;
    this.onetimeamount = this.data.value.technicalAmount;
    this.MaintenanceAmount = this.data.value.maintenanceAmount;
    this.Frequency = this.data.value.frequency;
    this.RenewelAmount = this.data.value.renewalAmount;
    


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
    let submitModel: MerchantplanUpdate = {
      planName: this.planName?.value.trim(),
      technicalAmount: this.technicalAmount?.value,
      maintenanceAmount: this.maintenanceAmount?.value,
      frequency: this.frequency?.value,
      renewalAmount: this.renewalAmount?.value,
      modifiedBy: this.getadminname
    }

    this.merchantplanedit.merchantplanUpdate(this.id, submitModel).subscribe((res: any) => {
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
