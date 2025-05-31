import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { AgreementCommerical } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-addagreementplan',
  templateUrl: './addagreementplan.component.html',
  styleUrl: './addagreementplan.component.css',
})
export class AddagreementplanComponent {
  myForm!: FormGroup;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  merchantId: any = sessionStorage.getItem('merchantId');
  createagreementplan: any;
  constructor(
    private service: FarginServiceService,
    private location: Location,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      planName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]{1,50}$'),
      ]),
      settlementCycle: new FormControl('', [Validators.required]),
      servicefee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // netBankingAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      netBankingPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      netBankingFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // rupaydebitcardmaxAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      rupaydebitcardmaxFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      rupaydebitcardmaxPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // rupaydebitcardminAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      rupaydebitcardminPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      rupaydebitcardminFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // otherdebitcardmaxAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      otherdebitcardmaxPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      otherdebitcardmaxFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // otherdebitcardminAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      otherdebitcardminPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      otherdebitcardminFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // ecollectAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      ecollectPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      ecollectFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // disbursementAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      disbursementPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      disbursementFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // internationalAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      internationalPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      internationalFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // amexAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      amexPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      amexFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // dinnerscardAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      dinnerscardPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      dinnerscardFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // corporateAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      corporatePercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      corporateFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // prepaidcardAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      prepaidcardPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      prepaidcardFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // upiAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      upiPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      upiFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // dynamicqrAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      dynamicqrPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      dynamicqrFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // phonepeAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      phonepePercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      phonepeFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // freechargeAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      freechargePercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      freechargeFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // payzappAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      payzappPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      payzappFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // paytmAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      paytmPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      paytmFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // OlamoneyAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      OlamoneyPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      OlamoneyFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // mobikwikAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      mobikwikPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      mobikwikFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // reliancejiomoneyAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      reliancejiomoneyPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      reliancejiomoneyFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // airtelmoneyAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      airtelmoneyPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      airtelmoneyFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // creditCardAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      creditCardPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      creditCardFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      mmcAmount: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      securityDepositAmount: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      // nbOtherBankAmount: new FormControl('', [Validators.required, Validators.pattern(/^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/)]),
      nbOtherBankPercentage: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
      nbOtherBankFixedFee: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((0|[1-9][0-9]*)(\.[0-9]{1,2})?$|^0\.[0-9]{1,2}$|^N\/A$|^-)$/
        ),
      ]),
    });
  }

  get planName() {
    return this.myForm.get('planName');
  }
  get settlementCycle() {
    return this.myForm.get('settlementCycle');
  }
  get servicefee() {
    return this.myForm.get('servicefee');
  }
  get netBankingAmount() {
    return this.myForm.get('netBankingAmount');
  }

  get netBankingPercentage() {
    return this.myForm.get('netBankingPercentage');
  }
  get netBankingFixedFee() {
    return this.myForm.get('netBankingFixedFee');
  }
  get rupaydebitcardmaxAmount() {
    return this.myForm.get('rupaydebitcardmaxAmount');
  }

  get rupaydebitcardmaxPercentage() {
    return this.myForm.get('rupaydebitcardmaxPercentage');
  }
  get rupaydebitcardmaxFixedFee() {
    return this.myForm.get('rupaydebitcardmaxFixedFee');
  }
  get rupaydebitcardminAmount() {
    return this.myForm.get('rupaydebitcardminAmount');
  }
  get rupaydebitcardminPercentage() {
    return this.myForm.get('rupaydebitcardminPercentage');
  }
  get rupaydebitcardminFixedFee() {
    return this.myForm.get('rupaydebitcardminFixedFee');
  }
  get otherdebitcardmaxAmount() {
    return this.myForm.get('otherdebitcardmaxAmount');
  }
  get otherdebitcardmaxPercentage() {
    return this.myForm.get('otherdebitcardmaxPercentage');
  }

  get otherdebitcardmaxFixedFee() {
    return this.myForm.get('otherdebitcardmaxFixedFee');
  }

  get otherdebitcardminAmount() {
    return this.myForm.get('otherdebitcardminAmount');
  }
  get otherdebitcardminPercentage() {
    return this.myForm.get('otherdebitcardminPercentage');
  }
  get otherdebitcardminFixedFee() {
    return this.myForm.get('otherdebitcardminFixedFee');
  }

  get ecollectAmount() {
    return this.myForm.get('ecollectAmount');
  }
  get ecollectPercentage() {
    return this.myForm.get('ecollectPercentage');
  }

  get ecollectFixedFee() {
    return this.myForm.get('ecollectFixedFee');
  }
  get disbursementAmount() {
    return this.myForm.get('disbursementAmount');
  }
  get disbursementPercentage() {
    return this.myForm.get('disbursementPercentage');
  }
  get disbursementFixedFee() {
    return this.myForm.get('disbursementFixedFee');
  }
  get internationalAmount() {
    return this.myForm.get('internationalAmount');
  }
  get internationalPercentage() {
    return this.myForm.get('internationalPercentage');
  }
  get internationalFixedFee() {
    return this.myForm.get('internationalFixedFee');
  }
  get amexAmount() {
    return this.myForm.get('amexAmount');
  }
  get amexPercentage() {
    return this.myForm.get('amexPercentage');
  }
  get amexFixedFee() {
    return this.myForm.get('amexFixedFee');
  }
  get dinnerscardAmount() {
    return this.myForm.get('dinnerscardAmount');
  }
  get dinnerscardPercentage() {
    return this.myForm.get('dinnerscardPercentage');
  }
  get dinnerscardFixedFee() {
    return this.myForm.get('dinnerscardFixedFee');
  }
  get corporateAmount() {
    return this.myForm.get('corporateAmount');
  }
  get corporatePercentage() {
    return this.myForm.get('corporatePercentage');
  }
  get corporateFixedFee() {
    return this.myForm.get('corporateFixedFee');
  }
  get prepaidcardAmount() {
    return this.myForm.get('prepaidcardAmount');
  }
  get prepaidcardPercentage() {
    return this.myForm.get('prepaidcardPercentage');
  }
  get prepaidcardFixedFee() {
    return this.myForm.get('prepaidcardFixedFee');
  }
  get upiAmount() {
    return this.myForm.get('upiAmount');
  }
  get upiPercentage() {
    return this.myForm.get('upiPercentage');
  }
  get upiFixedFee() {
    return this.myForm.get('upiFixedFee');
  }
  get dynamicqrAmount() {
    return this.myForm.get('dynamicqrAmount');
  }
  get dynamicqrPercentage() {
    return this.myForm.get('dynamicqrPercentage');
  }
  get dynamicqrFixedFee() {
    return this.myForm.get('dynamicqrFixedFee');
  }
  get phonepeAmount() {
    return this.myForm.get('phonepeAmount');
  }
  get phonepePercentage() {
    return this.myForm.get('phonepePercentage');
  }
  get phonepeFixedFee() {
    return this.myForm.get('phonepeFixedFee');
  }
  get freechargeAmount() {
    return this.myForm.get('freechargeAmount');
  }
  get freechargePercentage() {
    return this.myForm.get('freechargePercentage');
  }
  get freechargeFixedFee() {
    return this.myForm.get('freechargeFixedFee');
  }
  get payzappAmount() {
    return this.myForm.get('payzappAmount');
  }
  get payzappPercentage() {
    return this.myForm.get('payzappPercentage');
  }
  get payzappFixedFee() {
    return this.myForm.get('payzappFixedFee');
  }
  get paytmAmount() {
    return this.myForm.get('paytmAmount');
  }
  get paytmPercentage() {
    return this.myForm.get('paytmPercentage');
  }
  get paytmFixedFee() {
    return this.myForm.get('paytmFixedFee');
  }
  get OlamoneyAmount() {
    return this.myForm.get('OlamoneyAmount');
  }
  get OlamoneyPercentage() {
    return this.myForm.get('OlamoneyPercentage');
  }
  get OlamoneyFixedFee() {
    return this.myForm.get('OlamoneyFixedFee');
  }
  get mobikwikAmount() {
    return this.myForm.get('mobikwikAmount');
  }
  get mobikwikPercentage() {
    return this.myForm.get('mobikwikPercentage');
  }
  get mobikwikFixedFee() {
    return this.myForm.get('mobikwikFixedFee');
  }

  get reliancejiomoneyAmount() {
    return this.myForm.get('reliancejiomoneyAmount');
  }
  get reliancejiomoneyPercentage() {
    return this.myForm.get('reliancejiomoneyPercentage');
  }
  get reliancejiomoneyFixedFee() {
    return this.myForm.get('reliancejiomoneyFixedFee');
  }

  get airtelmoneyAmount() {
    return this.myForm.get('airtelmoneyAmount');
  }
  get airtelmoneyPercentage() {
    return this.myForm.get('airtelmoneyPercentage');
  }
  get airtelmoneyFixedFee() {
    return this.myForm.get('airtelmoneyFixedFee');
  }
  get creditCardAmount() {
    return this.myForm.get('creditCardAmount');
  }
  get creditCardPercentage() {
    return this.myForm.get('creditCardPercentage');
  }
  get creditCardFixedFee() {
    return this.myForm.get('creditCardFixedFee');
  }
  get mmcAmount() {
    return this.myForm.get('mmcAmount');
  }
  get securityDepositAmount() {
    return this.myForm.get('securityDepositAmount');
  }

  get nbOtherBankAmount() {
    return this.myForm.get('nbOtherBankAmount');
  }

  get nbOtherBankPercentage() {
    return this.myForm.get('nbOtherBankPercentage');
  }

  get nbOtherBankFixedFee() {
    return this.myForm.get('nbOtherBankFixedFee');
  }

  submit() {
    let submitModel: AgreementCommerical = {
      planName: this.planName?.value.trim(),
      serviceFee: this.servicefee?.value,
      settlementCycle: this.settlementCycle?.value,
      createdBy: this.createdBy,
      netBankingAmount: this.netBankingAmount?.value || '-',
      netBankingPercentage: this.netBankingPercentage?.value.trim(),
      netBankingFixedFee: this.netBankingFixedFee?.value.trim(),
      rupayDebitCardMaxAmount:
        this.rupaydebitcardmaxAmount?.value.trim() || '-',
      rupayDebitCardMaxPercentage:
        this.rupaydebitcardmaxPercentage?.value.trim(),
      rupayDebitCardMaxFixedFee: this.rupaydebitcardmaxFixedFee?.value.trim(),
      rupayDebitCardMinAmount:
        this.rupaydebitcardminAmount?.value.trim() || '-',
      rupayDebitCardMinPercentage:
        this.rupaydebitcardminPercentage?.value.trim(),
      rupayDebitCardMinFixedFee: this.rupaydebitcardminFixedFee?.value.trim(),
      otherDebitCardMaxAmount:
        this.otherdebitcardmaxAmount?.value.trim() || '-',
      otherDebitCardMaxPercentage:
        this.otherdebitcardmaxPercentage?.value.trim(),
      otherDebitCardMaxFixedFee: this.otherdebitcardmaxFixedFee?.value.trim(),
      otherDebitCardMinAmount:
        this.otherdebitcardminAmount?.value.trim() || '-',
      otherDebitCardMinPercentage:
        this.otherdebitcardminPercentage?.value.trim(),
      otherDebitCardMinFixedFee: this.otherdebitcardminFixedFee?.value.trim(),
      eCollectAmount: this.ecollectAmount?.value.trim() || '-',
      eCollectPercentage: this.ecollectPercentage?.value.trim(),
      eCollectFixedFee: this.ecollectFixedFee?.value.trim(),
      disbursementApiAmount: this.disbursementAmount?.value.trim() || '-',
      disbursementApiPercentage: this.disbursementPercentage?.value.trim(),
      disbursementApiFixedFee: this.disbursementFixedFee?.value.trim(),
      internationalApiAmount: this.internationalAmount?.value.trim() || '-',
      internationApiPercentage: this.internationalPercentage?.value.trim(),
      internationApiFixedFee: this.internationalFixedFee?.value.trim(),
      amexCardAmount: this.amexAmount?.value.trim() || '-',
      amexCardPercentage: this.amexPercentage?.value.trim(),
      amexCardFixedFee: this.amexFixedFee?.value.trim(),
      dinnersCardAmount: this.dinnerscardAmount?.value.trim() || '-',
      dinnersCardPercentage: this.dinnerscardPercentage?.value.trim(),
      dinnersCardFixedFee: this.dinnerscardFixedFee?.value.trim(),
      corporateOrCommercialCardAmount:
        this.corporateAmount?.value.trim() || '-',
      corporateOrCommercialCardPercentage:
        this.corporatePercentage?.value.trim(),
      corporateOrCommercialCardFixedFee: this.corporateFixedFee?.value.trim(),
      prepaidCardAmount: this.prepaidcardAmount?.value.trim() || '-',
      prepaidCardPercentage: this.prepaidcardPercentage?.value.trim(),
      prepaidCardFixedFee: this.prepaidcardFixedFee?.value.trim(),
      upiAmount: this.upiAmount?.value.trim() || '-',
      upiPercentage: this.upiPercentage?.value.trim(),
      upiFixedFee: this.upiFixedFee?.value.trim(),
      dynamicQrAmount: this.dynamicqrAmount?.value.trim() || '-',
      dynamicQrPercentage: this.dynamicqrPercentage?.value.trim(),
      dynamicQrFixedFee: this.dynamicqrFixedFee?.value.trim(),
      walletPhonepeAmount: this.phonepeAmount?.value.trim() || '-',
      walletPhonepePercentage: this.phonepePercentage?.value.trim(),
      walletPhonepeFixedFee: this.phonepeFixedFee?.value.trim(),
      walletFreeChargeAmount: this.freechargeAmount?.value.trim() || '-',
      walletFreeChargePercentage: this.freechargePercentage?.value.trim(),
      walletFreeChargeFixedFee: this.freechargeFixedFee?.value.trim(),
      walletPayzappAmount: this.payzappAmount?.value.trim() || '-',
      walletPayzappPercentage: this.payzappPercentage?.value.trim(),
      walletPayzappFixedFee: this.payzappFixedFee?.value.trim(),
      walletPaytmAmount: this.paytmAmount?.value.trim() || '-',
      walletPaytmPercentage: this.paytmPercentage?.value.trim(),
      walletPaytmFixedFee: this.paytmFixedFee?.value.trim(),
      walletOlaMoneyAmount: this.OlamoneyAmount?.value.trim() || '-',
      walletOlaMoneyPercentage: this.OlamoneyPercentage?.value.trim(),
      walletOlaMoneyFixedFee: this.OlamoneyFixedFee?.value.trim(),
      walletMobikwikkAmount: this.mobikwikAmount?.value.trim() || '-',
      walletMobikwikkPercentage: this.mobikwikPercentage?.value.trim(),
      walletMobikwikkFixedFee: this.mobikwikFixedFee?.value.trim(),
      walletRelianceJioMoneyAmount:
        this.reliancejiomoneyAmount?.value.trim() || '-',
      walletRelianceJioMoneyPercentage:
        this.reliancejiomoneyPercentage?.value.trim(),
      walletRelianceJioMoneyFixedFee:
        this.reliancejiomoneyFixedFee?.value.trim(),
      walletAirtelMoneyAmount: this.airtelmoneyAmount?.value.trim() || '-',
      walletAirtelMoneyPercentage: this.airtelmoneyPercentage?.value.trim(),
      walletAirtelMoneyFixedFee: this.airtelmoneyFixedFee?.value.trim(),
      creditCardAmount: this.creditCardAmount?.value.trim() || '-',
      creditCardPercentage: this.creditCardPercentage?.value.trim(),
      creditCardFixedFee: this.creditCardFixedFee?.value.trim(),
      mmcAmount: this.mmcAmount?.value.trim(),
      securityDepositAmount: this.securityDepositAmount?.value.trim(),
      nbOtherBankAmount: this.nbOtherBankAmount?.value.trim() || '-',
      nbOtherBankPercentage: this.nbOtherBankPercentage?.value.trim(),
      nbOtherBankFixedFee: this.nbOtherBankFixedFee?.value.trim(),
    };
    this.service.createagreementplan(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.createagreementplan = res.response;
        this.toaster.success(res.responseMessage);
        this.router.navigateByUrl('dashboard/agreementplan');
      } else {
        this.toaster.error(res.responseMessage);
      }
    });
  }

  close() {
    this.location.back();
  }
}
