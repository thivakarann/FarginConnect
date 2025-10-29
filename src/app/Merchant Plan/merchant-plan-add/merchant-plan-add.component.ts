import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MerchantplanCreate } from '../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-merchant-plan-add',
  templateUrl: './merchant-plan-add.component.html',
  styleUrl: './merchant-plan-add.component.css',
})
export class MerchantPlanAddComponent implements OnInit {
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');
  myForm!: FormGroup;
  numberValue: number | any = null;
  numberValues: number | any = null;
  numberValue2: number | any = null;
  numberValues2: number | any = null;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public Merchantplanadd: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      planName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      technicalAmount: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),
      maintenanceAmount: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),
      frequency: new FormControl('', Validators.required),
      renewalAmount: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),
      voiceBoxAdvRent: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),
      voiceBoxSetupFee: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),
      countLimit: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
    });
  }

  get planName() {
    return this.myForm.get('planName');
  }

  get technicalAmount() {
    return this.myForm.get('technicalAmount');
  }

  get maintenanceAmount() {
    return this.myForm.get('maintenanceAmount');
  }

  get frequency() {
    return this.myForm.get('frequency');
  }

  get renewalAmount() {
    return this.myForm.get('renewalAmount');
  }

  get voiceBoxAdvRent() {
    return this.myForm.get('voiceBoxAdvRent');
  }

  get voiceBoxSetupFee() {
    return this.myForm.get('voiceBoxSetupFee');
  }
  get countLimit() {
    return this.myForm.get('countLimit');
  }
  submit() {
    let submitModel: MerchantplanCreate = {
      planName: this.planName?.value.trim(),
      technicalAmount: this.technicalAmount?.value,
      maintenanceAmount: this.maintenanceAmount?.value,
      voiceBoxAdvRent: this.voiceBoxAdvRent?.value,
      voiceBoxSetupFee: this.voiceBoxSetupFee?.value,
      frequency: this.frequency?.value,
      renewalAmount: this.renewalAmount?.value,
      countLimit: this.countLimit?.value,
      createdBy: this.adminName,
    };
    this.Merchantplanadd.merchantplanadd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
