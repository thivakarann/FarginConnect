import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreatePlan } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import moment from 'moment';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-add-agreements',
  templateUrl: './add-agreements.component.html',
  styleUrl: './add-agreements.component.css',
})
export class AddAgreementsComponent {
  merchantid: any;
  myForm4!: FormGroup;
  adminName: any = this.cryptoService.decrypt(
    sessionStorage.getItem('Three') || ''
  );
  options: any;
  plans: any;
  todayDate: string = '';
  Expirydate: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.merchantid = this.data.value;
    const today = new Date();
    this.todayDate = today.toISOString().slice(0, 16);

    this.myForm4 = new FormGroup({
      // commercialId: new FormControl('', [Validators.required]),
      // linkdate: new FormControl('', [Validators.required]),
      merchantPosition: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      authorizedName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      stampAmount: new FormControl('', [Validators.required]),

      considerationAmount: new FormControl('', [Validators.required, Validators.pattern("^(?!0+(\\.0{1,2})?$)\\d+(\\.\\d{1,2})?$")])
    });

    this.service.EstampGetActive().subscribe((res: any) => {
      if (res.flag == 1) {
        this.plans = res.response.reverse();
      }
    });
  }

  // get commercialId() {
  //   return this.myForm4.get('commercialId');
  // }

  // get linkdate() {
  //   return this.myForm4.get('linkdate');
  // }

  get merchantPosition() {
    return this.myForm4.get('merchantPosition');
  }

  get authorizedName() {
    return this.myForm4.get('authorizedName');
  }

  get stampAmount() {
    return this.myForm4.get('stampAmount');
  }

  get considerationAmount() {
    return this.myForm4.get('considerationAmount');
  };

  AmountChange(event: Event) {
    const selectedStampAmount = (event.target as HTMLSelectElement).value;
    const selectedPlan = this.plans.find((plan: { stampAmount: string; }) => plan.stampAmount === selectedStampAmount);
    if (selectedPlan) {
      this.myForm4.patchValue({ considerationAmount: selectedPlan.considerationAmount });
    }
  }


  Submit() {
    // this.Expirydate = this.linkdate?.value;
    // let startdate = moment(this.Expirydate).format('yyyy-MM-DD HH:mm:ss').toString();
    let submitModel: CreatePlan = {
      merchantId: this.merchantid,
      // commercialId: this.commercialId?.value,
      createdBy: this.adminName,
      authorizedName: this.authorizedName?.value.trim(),
      merchantPosition: this.merchantPosition?.value.trim(),
      // expiryLink: startdate,
      stampAmount: this.stampAmount?.value,
      considerationAmount: this.considerationAmount?.value,
    };

    this.service.createplans(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
    });
  }
}
