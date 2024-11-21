import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
import { UpdateAgreementCommerical } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-editagreementplan',
  templateUrl: './editagreementplan.component.html',
  styleUrl: './editagreementplan.component.css'
})
export class EditagreementplanComponent {
  myForm!: FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  merchantId: any = localStorage.getItem('merchantId');
  createagreementplan: any;
  id: any;
  commercialId: any;
  viewbyagreement: any;
  constructor( private service: FarginServiceService, private location: Location, private toaster: ToastrService, private router: Router, private activaterouter: ActivatedRoute,) {
  }
 
  ngOnInit(): void {

    this.activaterouter.queryParams.subscribe((param: any) => {
      this.commercialId = param.Alldata;
    });
    this.myForm = new FormGroup({
      planName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')]),
 
      servicefee: new FormControl('', [ Validators.required]),
      netBankingAmount: new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      netBankingPercentage: new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      netBankingFixedFee: new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      rupaydebitcardmaxAmount: new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      rupaydebitcardmaxPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      rupaydebitcardmaxFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      rupaydebitcardminAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      rupaydebitcardminPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      rupaydebitcardminFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      otherdebitcardmaxAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      otherdebitcardmaxPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      otherdebitcardmaxFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      otherdebitcardminAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      otherdebitcardminPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      otherdebitcardminFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      ecollectAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      ecollectPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      ecollectFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      disbursementAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      disbursementPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      disbursementFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      internationalAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      internationalPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      internationalFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      amexAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      amexPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      amexFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      dinnerscardAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      dinnerscardPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      dinnerscardFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      corporateAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      corporatePercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      corporateFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      prepaidcardAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      prepaidcardPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      prepaidcardFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      upiAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      upiPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      upiFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      dynamicqrAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      dynamicqrPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      dynamicqrFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      phonepeAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      phonepePercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      phonepeFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      freechargeAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      freechargePercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      freechargeFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      payzappAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      payzappPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      payzappFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      paytmAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      paytmPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      paytmFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      OlamoneyAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      OlamoneyPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      OlamoneyFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      mobikwikAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      mobikwikPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      mobikwikFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      reliancejiomoneyAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      reliancejiomoneyPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      reliancejiomoneyFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      airtelmoneyAmount:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      airtelmoneyPercentage:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
      airtelmoneyFixedFee:new FormControl('', [Validators.pattern('^(0|[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$')]),
    });
 
  
    this.service.viewbyidagreementplan(this.commercialId).subscribe((res:any)=>
    {
      this.viewbyagreement=res.response;
    })
 
  }
 

  get planName() {
    return this.myForm.get('planName')
 
  }
  get servicefee() {
    return this.myForm.get('servicefee')
 
  }
  get netBankingAmount() {
    return this.myForm.get('netBankingAmount')
  }
 
  get netBankingPercentage() {
    return this.myForm.get('netBankingPercentage')
 
  }
  get netBankingFixedFee() {
    return this.myForm.get('netBankingFixedFee')
 
  }
  get rupaydebitcardmaxAmount() {
    return this.myForm.get('rupaydebitcardmaxAmount')
 
  }
 
 
  get rupaydebitcardmaxPercentage() {
    return this.myForm.get('rupaydebitcardmaxPercentage')
 
  }
  get rupaydebitcardmaxFixedFee() {
    return this.myForm.get('rupaydebitcardmaxFixedFee')
 
  }
  get rupaydebitcardminAmount() {
    return this.myForm.get('rupaydebitcardminAmount')
 
  }
  get rupaydebitcardminPercentage() {
    return this.myForm.get('rupaydebitcardminPercentage')
 
  }
  get rupaydebitcardminFixedFee() {
    return this.myForm.get('rupaydebitcardminFixedFee')
 
  }
  get otherdebitcardmaxAmount() {
    return this.myForm.get('otherdebitcardmaxAmount')
 
  }
  get otherdebitcardmaxPercentage() {
    return this.myForm.get('otherdebitcardmaxPercentage')
 
  }

  get otherdebitcardmaxFixedFee() {
    return this.myForm.get('otherdebitcardmaxFixedFee')
  }

  get otherdebitcardminAmount() {
    return this.myForm.get('otherdebitcardminAmount')
 
  }
  get otherdebitcardminPercentage() {
    return this.myForm.get('otherdebitcardminPercentage')
 
  }
  get otherdebitcardminFixedFee() {
    return this.myForm.get('otherdebitcardminFixedFee')
 
  }
 
  get ecollectAmount() {
    return this.myForm.get('ecollectAmount')
 
  }
  get ecollectPercentage() {
    return this.myForm.get('ecollectPercentage')
  }
 
  get ecollectFixedFee() {
    return this.myForm.get('ecollectFixedFee')
 
  }
  get disbursementAmount() {
    return this.myForm.get('disbursementAmount')
 
  }
  get disbursementPercentage() {
    return this.myForm.get('disbursementPercentage')
  }
  get disbursementFixedFee() {
    return this.myForm.get('disbursementFixedFee')
  }
  get internationalAmount() {
    return this.myForm.get('internationalAmount')
  }
  get internationalPercentage() {
    return this.myForm.get('internationalPercentage')
  }
  get internationalFixedFee() {
    return this.myForm.get('internationalFixedFee')
  }
  get amexAmount() {
    return this.myForm.get('amexAmount')
  }
  get amexPercentage() {
    return this.myForm.get('amexPercentage')
  }
  get amexFixedFee() {
    return this.myForm.get('amexFixedFee')
  }
  get dinnerscardAmount() {
    return this.myForm.get('dinnerscardAmount')
  }
  get dinnerscardPercentage() {
    return this.myForm.get('dinnerscardPercentage')
  }
  get dinnerscardFixedFee() {
    return this.myForm.get('dinnerscardFixedFee')
  }
  get corporateAmount() {
    return this.myForm.get('corporateAmount')
  }
  get corporatePercentage() {
    return this.myForm.get('corporatePercentage')
  }
  get corporateFixedFee() {
    return this.myForm.get('corporateFixedFee')
  }
  get prepaidcardAmount() {
    return this.myForm.get('prepaidcardAmount')
  }
  get prepaidcardPercentage() {
    return this.myForm.get('prepaidcardPercentage')
  }
  get prepaidcardFixedFee() {
    return this.myForm.get('prepaidcardFixedFee')
  }
  get upiAmount() {
    return this.myForm.get('upiAmount')
  }
  get upiPercentage() {
    return this.myForm.get('upiPercentage')
  }
  get upiFixedFee() {
    return this.myForm.get('upiFixedFee')
  }
  get dynamicqrAmount() {
    return this.myForm.get('dynamicqrAmount')
  }
  get dynamicqrPercentage() {
    return this.myForm.get('dynamicqrPercentage')
  }
  get dynamicqrFixedFee() {
    return this.myForm.get('dynamicqrFixedFee')
  }
  get phonepeAmount() {
    return this.myForm.get('phonepeAmount')
  }
  get phonepePercentage() {
    return this.myForm.get('phonepePercentage')
  }
  get phonepeFixedFee() {
    return this.myForm.get('phonepeFixedFee')
  }
  get freechargeAmount() {
    return this.myForm.get('freechargeAmount')
  }
  get freechargePercentage() {
    return this.myForm.get('freechargePercentage')
  }
  get freechargeFixedFee() {
    return this.myForm.get('freechargeFixedFee')
  }
  get payzappAmount() {
    return this.myForm.get('payzappAmount')
  }
  get payzappPercentage() {
    return this.myForm.get('payzappPercentage')
  }
  get payzappFixedFee() {
    return this.myForm.get('payzappFixedFee')
  }
  get paytmAmount() {
    return this.myForm.get('paytmAmount')
  }
  get paytmPercentage() {
    return this.myForm.get('paytmPercentage')
  }
  get paytmFixedFee() {
    return this.myForm.get('paytmFixedFee')
  }
  get OlamoneyAmount() {
    return this.myForm.get('OlamoneyAmount')
  }
  get OlamoneyPercentage() {
    return this.myForm.get('OlamoneyPercentage')
  }
  get OlamoneyFixedFee() {
    return this.myForm.get('OlamoneyFixedFee')
  }
  get mobikwikAmount() {
    return this.myForm.get('mobikwikAmount')
  }
  get mobikwikPercentage() {
    return this.myForm.get('mobikwikPercentage')
  }
  get mobikwikFixedFee() {
    return this.myForm.get('mobikwikFixedFee')
  }

  get reliancejiomoneyAmount() {
    return this.myForm.get('reliancejiomoneyAmount')
  }
  get reliancejiomoneyPercentage() {
    return this.myForm.get('reliancejiomoneyPercentage')
  }
  get reliancejiomoneyFixedFee() {
    return this.myForm.get('reliancejiomoneyFixedFee')
  }

  get airtelmoneyAmount() {
    return this.myForm.get('airtelmoneyAmount')
  }
  get airtelmoneyPercentage() {
    return this.myForm.get('airtelmoneyPercentage')
  }
  get airtelmoneyFixedFee() {
    return this.myForm.get('airtelmoneyFixedFee')
  }
  submit() {
    let submitModel: UpdateAgreementCommerical = {
      planName: this.planName?.value,
      serviceFee: this.servicefee?.value,
      modifiedBy: this.createdBy,     
      netBankingAmount: this.netBankingAmount?.value,
      netBankingPercentage: this.netBankingPercentage?.value,
      netBankingFixedFee: this.netBankingFixedFee?.value,
      rupayDebitCardMaxAmount: this.rupaydebitcardmaxAmount?.value,
      rupayDebitCardMaxPercentage: this.rupaydebitcardmaxPercentage?.value,
      rupayDebitCardMaxFixedFee: this.rupaydebitcardmaxFixedFee?.value,
      rupayDebitCardMinAmount: this.rupaydebitcardminAmount?.value,
      rupayDebitCardMinPercentage: this.rupaydebitcardminPercentage?.value,
      rupayDebitCardMinFixedFee: this.rupaydebitcardminFixedFee?.value,
      otherDebitCardMaxAmount: this.otherdebitcardmaxAmount?.value,
      otherDebitCardMaxPercentage: this.otherdebitcardmaxPercentage?.value,
      otherDebitCardMaxFixedFee: this.otherdebitcardmaxFixedFee?.value,
      otherDebitCardMinAmount: this.otherdebitcardminAmount?.value,
      otherDebitCardMinPercentage: this.otherdebitcardminPercentage?.value,
      otherDebitCardMinFixedFee: this.otherdebitcardminFixedFee?.value,
      eCollectAmount: this.ecollectAmount?.value,
      eCollectPercentage: this.ecollectPercentage?.value,
      eCollectFixedFee: this.ecollectFixedFee?.value,
      disbursementApiAmount: this.disbursementAmount?.value,
      disbursementApiPercentage: this.disbursementPercentage?.value,
      disbursementApiFixedFee: this.disbursementFixedFee?.value,
      internationalApiAmount: this.internationalAmount?.value,
      internationalApiPercentage: this.internationalPercentage?.value,
      internationalApiFixedFee: this.internationalFixedFee?.value,
      amexCardAmount: this.amexAmount?.value,
      amexCardPercentage: this.amexPercentage?.value,
      amexCardFixedFee: this.amexFixedFee?.value,
      dinnersCardAmount: this.dinnerscardAmount?.value,
      dinnersCardPercentage: this.dinnerscardPercentage?.value,
      dinnersCardFixedFee: this.dinnerscardFixedFee?.value,
      corporateOrCommercialCardAmount: this.corporateAmount?.value,
      corporateOrCommercialCardPercentage: this.corporatePercentage?.value,
      corporateOrCommercialCardFixedFee: this.corporateFixedFee?.value,
      prepaidCardAmount: this.prepaidcardAmount?.value,
      prepaidCardPercentage: this.prepaidcardPercentage?.value,
      prepaidCardFixedFee: this.prepaidcardFixedFee?.value,
      upiAmount: this.upiAmount?.value,
      upiPercentage: this.upiPercentage?.value,
      upiFixedFee: this.upiFixedFee?.value,
      dynamicQrAmount: this.dynamicqrAmount?.value,
      dynamicQrPercentage: this.dynamicqrPercentage?.value,
      dynamicQrFixedFee: this.dynamicqrFixedFee?.value,
      walletPhonepeAmount: this.phonepeAmount?.value,
      walletPhonepePercentage: this.phonepePercentage?.value,
      walletPhonepeFixedFee: this.phonepeFixedFee?.value,
      walletFreeChargeAmount: this.freechargeAmount?.value,
      walletFreeChargePercentage: this.freechargePercentage?.value,
      walletFreeChargeFixedFee: this.freechargeFixedFee?.value,
      walletPayzappAmount: this.payzappAmount?.value,
      walletPayzappPercentage: this.payzappPercentage?.value,
      walletPayzappFixedFee: this.payzappFixedFee?.value,
      walletPaytmAmount: this.paytmAmount?.value,
      walletPaytmPercentage: this.paytmPercentage?.value,
      walletPaytmFixedFee: this.paytmFixedFee?.value,
      walletOlaMoneyAmount: this.OlamoneyAmount?.value,
      walletOlaMoneyPercentage: this.OlamoneyPercentage?.value,
      walletOlaMoneyFixedFee: this.OlamoneyFixedFee?.value,
      walletMobikwikkAmount: this.mobikwikAmount?.value,
      walletMobikwikkPercentage: this.mobikwikPercentage?.value,
      walletMobikwikkFixedFee: this.mobikwikFixedFee?.value,
      walletRelianceJioMoneyAmount: this.reliancejiomoneyAmount?.value,
      walletRelianceJioMoneyPercentage: this.reliancejiomoneyPercentage?.value,
      walletRelianceJioMoneyFixedFee: this.reliancejiomoneyFixedFee?.value,
      walletAirtelMoneyAmount: this.airtelmoneyAmount?.value,
      walletAirtelMoneyPercentage: this.airtelmoneyPercentage?.value,
      walletAirtelMoneyFixedFee: this.airtelmoneyFixedFee?.value,
    };
    this.service.editagreementplan(this.commercialId,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.createagreementplan = res.response;
        this.toaster.success(res.responseMessage);
        this.router.navigateByUrl('dashboard/agreementplan')
        setTimeout(() => {
          window.location.reload()
        }, 500);

      }
      else {
        this.toaster.error(res.responseMessage)
      }
    })
  }
 
  close() {
    this.location.back()
  }
}
