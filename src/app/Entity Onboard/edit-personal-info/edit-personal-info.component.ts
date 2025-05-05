import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrl: './edit-personal-info.component.css'
})
export class EditPersonalInfoComponent implements OnInit {

  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  emptyBlob = new Blob([], { type: 'application/pdf' })

  entittyplanviewall: any;
  categorydetails: any;
  myForm!: FormGroup;
  selectedCategoryId: any;
  merchantid: any;
  bussinessid: any;
  id: any;
  details: any;
  detaislone: any;
  businessCategoryId: any;
  businessId: any;
  mcccode: any;
  file3: any;
  errorShow!: boolean;
  clearImage!: string;
  entityname: any;
  selectperiod: any;
  typesign: any;
  show: any;
  websites = ""
  customerDuesEnabled: any;
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // Generates days 1 to 31
  smstag: any;
  smsduedate: any;
  smsdate: any;

  constructor(private router: Router, private service: FarginServiceService, private toastr: ToastrService, private ActivateRoute: ActivatedRoute, private Location: Location) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
    this.myForm = new FormGroup({

      entityName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(30)
      ]),
      merchantLegalName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(30)
      ]),
      accountDisplayName: new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
          Validators.maxLength(30)
        ]
      ),
      businessCategoryIds: new FormControl('', [Validators.required]),
      MccCode: new FormControl(''),
      contactName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(30)
      ]),
      contactMobile: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),
      secondaryMobile: new FormControl('', [
        // Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),
      contactEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
        Validators.maxLength(40),
      ]),
      website: new FormControl('', [Validators.pattern("((http|https)://)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,6})+(/[-a-zA-Z0-9@:%._\\+~#?&//=]*)?")]),
      gstIn: new FormControl(''),
      billingAddress: new FormControl("", [
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      area: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")

      ]),
      stateName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(30)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(30)
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(30)
      ]),
      merchantPlanId: new FormControl('', [Validators.required]),
      // periodName: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
      billingMode: new FormControl("", [
        Validators.required
      ]),

      autoDebitStatus: new FormControl('', [Validators.required]),
      customerDuesEnable: new FormControl('', [Validators.required]),

      customerDuesDate: new FormControl(''),

      dueDate: new FormControl(''),
      customerSmsTag: new FormControl(''),


      offlineQrEnable: new FormControl('', [Validators.required]),

      // payoutEnable: new FormControl('', [Validators.required]),


      // platformfee: new FormControl('', [Validators.pattern('(0|[1-9][0-9]*)(\.[0-9]+)?$')]),

      // withdrawalDailylimit: new FormControl('', [Validators.pattern('(0|[1-9][0-9]*)(\.[0-9]+)?$')]),

      // withdrawalDailyCount: new FormControl('', [Validators.pattern('^[0-9]+$')]),

      // withdrawalMonthlyCount: new FormControl('', [Validators.pattern('^[0-9]+$')]),

      customerManualStatus: new FormControl('', [Validators.required]),
      customerPaymentMode: new FormControl('', [Validators.required],),

      smsMerchantName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
        Validators.maxLength(25)

      ]),



    });


    this.service.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
      this.smstag = this.detaislone?.customerSmsTag;
      this.smsduedate = this.detaislone?.customerDuesDate;
      this.smsdate = this.detaislone?.dueDate

      if (this.detaislone?.customerDuesEnable == '1') {
        this.myForm.get('customerDuesDate')?.setValue(this.detaislone?.customerDuesDate);
        this.myForm.get('dueDate')?.setValue(this.detaislone?.dueDate);
        this.myForm.get('customerSmsTag')?.setValue(this.detaislone?.customerSmsTag);
      }


      if (this.detaislone.customerDuesEnable == 1) {
        this.show = true;
      }
      else {
        this.show = false;
      }
      this.entityname = this.detaislone.entityName;
      this.mcccode = this.detaislone.mccCode

      this.businessCategoryId = res.response.merchantpersonal.businessCategoryModel.businessCategoryId;


    })
    this.service.Bussinesscategoryactivelist().subscribe((res: any) => {
      this.categorydetails = res.response;
    });

    this.service.merchantplanactive().subscribe((res: any) => {
      this.entittyplanviewall = res.response;
    })

  }
  // First Form

  get entityName() {
    return this.myForm.get('entityName')
  }
  get merchantLegalName() {
    return this.myForm.get('merchantLegalName')
  }
  get accountDisplayName() {
    return this.myForm.get('accountDisplayName')
  }
  get contactName() {
    return this.myForm.get('contactName')

  }

  get dueDate() {
    return this.myForm.get('dueDate')

  }

  get autoDebitStatus() {
    return this.myForm.get('autoDebitStatus')

  }
  get contactMobile() {
    return this.myForm.get('contactMobile')
  }
  get secondaryMobile() {
    return this.myForm.get('secondaryMobile')
  }
  get contactEmail() {
    return this.myForm.get('contactEmail')
  }
  get website() {
    return this.myForm.get('website')
  }
  get customerPaymentMode() {
    return this.myForm.get('customerPaymentMode')
  }
  get gstIn() {
    return this.myForm.get('gstIn')
  }
  get billingAddress() {
    return this.myForm.get('billingAddress')
  }
  get area() {
    return this.myForm.get('area')
  }
  get zipcode() {
    return this.myForm.get('zipcode')

  } get stateName() {
    return this.myForm.get('stateName')

  }
  get city() {
    return this.myForm.get('city')
  }
  get contactPerson() {
    return this.myForm.get('contactPerson')

  }
  get country() {
    return this.myForm.get('country')
  }
  get businessCategoryIds() {
    return this.myForm.get('businessCategoryIds')
  }
  get merchantPlanId() {
    return this.myForm.get('merchantPlanId')
  }
  // get periodName() {
  //   return this.myForm.get('periodName')
  // }
  get logo() {
    return this.myForm.get('logo')
  }
  get billingMode() {
    return this.myForm.get('billingMode')
  }
  get MccCode() {
    return this.myForm.get('MccCode')
  }
  get customerDuesEnable() {
    return this.myForm.get('customerDuesEnable')
  }

  get customerDuesDate() {
    return this.myForm.get('customerDuesDate')
  }

  get offlineQrEnable() {
    return this.myForm.get('offlineQrEnable')
  }

  // get payoutEnable() {
  //   return this.myForm.get('payoutEnable')
  // }

  get customerSmsTag() {
    return this.myForm.get('customerSmsTag')
  }

  // get withdrawalLimit() {
  //   return this.myForm.get('withdrawalLimit')
  // }

  // get withdrawalDailylimit() {
  //   return this.myForm.get('withdrawalDailylimit')
  // }

  // get withdrawalDailyCount() {
  //   return this.myForm.get('withdrawalDailyCount')
  // }

  // get platformfee() {
  //   return this.myForm.get('platformfee')
  // }

  get customerManualStatus() {
    return this.myForm.get('customerManualStatus')
  }


  get smsMerchantName() {
    return this.myForm.get('smsMerchantName')
  }





  getlogo(event: any) {
    this.file3 = event.target.files[0];
    if ((this.file3.type == 'image/png') || (this.file3.type == 'image/jpeg') || (this.file3.type == 'image/jpg')) {

      if (this.file3.size <= 20 * 1024 * 1024) {
        this.errorShow = false;
      } else {
        this.errorShow = true;
        this.clearImage = '';
      }
    }
    else {

      this.clearImage = '';
    }
  }
  submit() {
    const formData = new FormData;
    formData.append('contactEmail', this.contactEmail?.value.trim());
    formData.append('contactMobile', this.contactMobile?.value.trim());
    formData.append('entityName', this.entityName?.value.trim());
    formData.append('merchantLegalName', this.merchantLegalName?.value.trim())
    formData.append('accountDisplayName', this.accountDisplayName?.value.trim());
    formData.append('planModifyBy', this.getadminname);
    formData.append('gstIn', this.gstIn?.value || '-');
    formData.append('contactName', this.contactName?.value.trim());
    formData.append('secondaryMobile', this.secondaryMobile?.value.trim());
    formData.append('billingAddress', this.billingAddress?.value.trim());
    formData.append('area', this.area?.value.trim())
    formData.append('stateName', this.stateName?.value.trim());
    formData.append('country', this.country?.value.trim());
    formData.append('zipcode', this.zipcode?.value.trim());
    formData.append('city', this.city?.value.trim())
    formData.append('businessCategoryId', this.businessCategoryIds?.value);
    formData.append('merchantPlanId', this.merchantPlanId?.value);
    formData.append('mccCode', this.MccCode?.value.trim());
    formData.append('periodName', 'NA');
    formData.append('website', this.website?.value || this.websites.trim());
    formData.append('merchantLogo', this.file3 || this.emptyBlob);
    formData.append('billingMode', this.billingMode?.value);
    formData.append('offlineQrEnable', this.offlineQrEnable?.value);
    formData.append('payoutEnable', '0');
    formData.append('autoDebitStatus', this.autoDebitStatus?.value);
    formData.append('customerPaymentMode', this.customerPaymentMode?.value);
    formData.append('customerDuesEnable', this.customerDuesEnable?.value);
    formData.append('customerManualStatus', this.customerManualStatus?.value);
    formData.append('smsMerchantName', this.smsMerchantName?.value);
    // formData.append('withdrawalLimit', this.withdrawalLimit?.value || "");
    // formData.append('withdrawalDailylimit', this.withdrawalDailylimit?.value || 0);
    formData.append('platformfee', "0");

    formData.append('merchantId', this.id);
    // formData.append('withdrawalMonthlyCount', this.withdrawalMonthlyCount?.value || 0);

    this.customerDuesEnabled = this.customerDuesEnable?.value;
    this.customerDuesEnabled = this.customerDuesEnable?.value;
    if (this.customerDuesEnabled === '0') {
      formData.append('customerDuesDate', '0');
      formData.append('dueDate', '0');
      formData.append('customerSmsTag', 'NA');
    } else {
      formData.append('customerDuesDate', this.customerDuesDate?.value);
      formData.append('dueDate', this.dueDate?.value);
      formData.append('customerSmsTag', this.customerSmsTag?.value || '');

    }

    this.service.UpdatePersonalEntity(this.id, formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.merchantid = res.response.merchantId;
        this.bussinessid = res.response.businessCategoryModel.businessCategoryId;
        this.toastr.success(res.responseMessage);
        this.close();
        // setTimeout(() => {
        //   window.location.reload()
        // }, 500);
        // this.AddEntity.EntityGetKYCbybussinessid(this.bussinessid).subscribe((res: any) => {
        //   this.KYCDocNames = res.response
        // })
        // this.Bankdetails = true;
        // this.personeldetails = false;

      } else {
        this.toastr.error(res.responseMessage);
      }

    })
  }
  onCategoryChange(event: any) {
    this.businessId = event.target.value;
    this.service.EntityBusinessCategoryId(this.businessId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.mcccode = res.response.mccCode;

      }
    })
  }
  close() {
    this.Location.back();
  }


}
