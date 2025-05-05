import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
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
  countlimit: any;
  VoiceBoxAdv: any;
  VoiceBoxSet: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public merchantplanedit: FarginServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {


    this.myForm = new FormGroup({
      planName: new FormControl('', [Validators.required,Validators.pattern('^[A-Za-z ]*$'),Validators.maxLength(50)]),
      technicalAmount: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$')]),
      maintenanceAmount: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$')]),
      frequency: new FormControl('', Validators.required),
      voiceBoxAdvRent: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$')]),
      voiceBoxSetupFee: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$')]),
      renewalAmount: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$')]),
      countLimit:new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$')]),
    });


    this.details = this.data.value;
    this.id = this.data.value.merchantPlanId;
    this.planame = this.data.value.planName;
    this.onetimeamount = this.data.value.technicalAmount;
    this.MaintenanceAmount = this.data.value.maintenanceAmount;
    this.Frequency = this.data.value.frequency;
    this.RenewelAmount = this.data.value.renewalAmount;
    this.VoiceBoxAdv = this.data.value.voiceBoxAdvRent;
    this.VoiceBoxSet = this.data.value.voiceBoxSetupFee;
    this.countlimit= this.data.value.countLimit;
    console.log(" VoiceBoxAdv" +   this.VoiceBoxAdv)
    


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
  get countLimit() {
    return this.myForm.get('countLimit')
 
  }

  get voiceBoxAdvRent() {
    return this.myForm.get('voiceBoxAdvRent')

  }

  get voiceBoxSetupFee() {
    return this.myForm.get('voiceBoxSetupFee')

  }
 

  submit() {
    let submitModel: MerchantplanUpdate = {
      planName: this.planName?.value.trim(),
      technicalAmount: this.technicalAmount?.value,
      maintenanceAmount: this.maintenanceAmount?.value,
      frequency: this.frequency?.value,
      voiceBoxAdvRent: this.voiceBoxAdvRent?.value,
      voiceBoxSetupFee: this.voiceBoxSetupFee?.value,
      renewalAmount: this.renewalAmount?.value,
      countLimit:this.countLimit?.value,
      modifiedBy: this.getadminname
    }

    this.merchantplanedit.merchantplanUpdate(this.id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
