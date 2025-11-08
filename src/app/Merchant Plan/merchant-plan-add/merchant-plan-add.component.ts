import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MerchantplanCreate, Payload } from '../../fargin-model/fargin-model.module';
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
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  details: any;


  constructor(
    public Merchantplanadd: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      businessCategoryId: new FormControl('', [
        Validators.required,
      ]),
      planName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      oneTimeSetupFee: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),
      cloudFee: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),
      cloudFeeFrequency: new FormControl('', Validators.required),
      yearlyRenewalFee: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),
      voiceBoxRent: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),
      voiceBoxSetupFee: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),
      customerOnboardLimit: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
    });
    this.Businnescat();
  }

  Businnescat() {
    const payload = {
      status: 1,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.Merchantplanadd.ActiveBus(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.details = JSON.parse(this.cryptoService.decrypt(res.data));;
      }
    })
  }

  get businessCategoryId() {
    return this.myForm.get('businessCategoryId');
  }

  get planName() {
    return this.myForm.get('planName');
  }

  get oneTimeSetupFee() {
    return this.myForm.get('oneTimeSetupFee');
  }

  get cloudFee() {
    return this.myForm.get('cloudFee');
  }

  get cloudFeeFrequency() {
    return this.myForm.get('cloudFeeFrequency');
  }

  get yearlyRenewalFee() {
    return this.myForm.get('yearlyRenewalFee');
  }

  get voiceBoxRent() {
    return this.myForm.get('voiceBoxRent');
  }

  get voiceBoxSetupFee() {
    return this.myForm.get('voiceBoxSetupFee');
  }
  get customerOnboardLimit() {
    return this.myForm.get('customerOnboardLimit');
  }
  submit() {
    let submitModel: MerchantplanCreate = {
      businessCategoryId: this.businessCategoryId?.value,
      planName: this.planName?.value.trim(),
      oneTimeSetupFee: this.oneTimeSetupFee?.value,
      cloudFee: this.cloudFee?.value,
      voiceBoxRent: this.voiceBoxRent?.value,
      voiceBoxSetupFee: this.voiceBoxSetupFee?.value,
      cloudFeeFrequency: this.cloudFeeFrequency?.value,
      yearlyRenewalFee: this.yearlyRenewalFee?.value,
      customerOnboardLimit: this.customerOnboardLimit?.value,
      createdby: this.adminName,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.Merchantplanadd.merchantplanadd(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.messageDescription);
      }
    });
  }
}
