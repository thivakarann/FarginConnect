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

  constructor(
    public merchantplanedit: FarginServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.details = this.data.value;
    this.id = this.data.value.merchantPlanId;
    this.planame = this.data.value.planName;
    this.onetimeamount = this.data.value.technicalAmount;
    this.MaintenanceAmount = this.data.value.maintenanceAmount;
    this.Frequency = this.data.value.frequency;

    this.myForm = new FormGroup({
      planName: new FormControl('', Validators.required),
      technicalAmount: new FormControl('', Validators.required),
      maintenanceAmount: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),

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

  submit() {
    let submitModel: MerchantplanUpdate = {
      planName: this.planName?.value,
      technicalAmount: this.technicalAmount?.value,
      maintenanceAmount: this.maintenanceAmount?.value,
      frequency: this.frequency?.value,
      modifiedBy: this.getadminname
    }

    this.merchantplanedit.merchantplanUpdate(this.id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        window.location.reload();
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
