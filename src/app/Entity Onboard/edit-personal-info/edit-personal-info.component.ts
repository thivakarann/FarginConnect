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
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');

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
  constructor(private router: Router, private service: FarginServiceService, private toastr: ToastrService, private ActivateRoute: ActivatedRoute,private Location:Location) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
    this.myForm = new FormGroup({
      // entityName: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z0-9 ]*$')
      // ]),
      // merchantLegalName: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z0-9 ]*$')
      // ]),
      // accountDisplayName: new FormControl('',
      //   [
      //     Validators.required,
      //     Validators.pattern('^[a-zA-Z0-9 ]*$')
      //   ]
      // ),
      contactName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      // contactMobile: new FormControl('', [
      //   Validators.required,
      //   Validators.maxLength(10),
      //   Validators.pattern('^[0-9]{10}$')
      // ]),
      secondaryMobile: new FormControl('',
        [

          Validators.maxLength(10),
          Validators.pattern('^[0-9]{10}$')
        ]),

      // contactEmail: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
      // ]),
      website: new FormControl('', [
        Validators.pattern("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")
      ]),
      gstIn: new FormControl('', [
        Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")
      ]),
      billingAddress: new FormControl("", [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
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
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      contactPerson: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      merchantPlanId: new FormControl('', Validators.required),

      businessCategoryIds: new FormControl('', Validators.required),
      mccCode: new FormControl(''),
    });


    this.service.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
      this.businessCategoryId = res.response.merchantpersonal.businessCategoryModel.businessCategoryId;
      console.log('BussinessCategoryId', this.businessCategoryId);
      console.log(this.detaislone);
    })
    this.service.Bussinesscategoryactivelist().subscribe((res: any) => {
      this.categorydetails = res.response;
    });

    this.service.merchantplanactive().subscribe((res: any) => {
      this.entittyplanviewall = res.response;
    })


  }





  // First Form

  // get entityName() {
  //   return this.myForm.get('entityName')

  // }
  // get merchantLegalName() {
  //   return this.myForm.get('merchantLegalName')

  // }

  // get accountDisplayName() {
  //   return this.myForm.get('accountDisplayName')

  // }

  get contactName() {
    return this.myForm.get('contactName')

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
  get mccCode() {
    return this.myForm.get('mccCode')

  }
  get merchantPlanId() {
    return this.myForm.get('merchantPlanId')
  }


  submit() {
    const formData = new FormData;
    // formData.append('contactEmail',this.contactEmail?.value,);
    // formData.append('contactMobile', this.contactMobile?.value,);
    // formData.append('entityName', this.entityName?.value);
    // formData.append('merchantLegalName', this.merchantLegalName?.value)
    // formData.append('accountDisplayName',  this.accountDisplayName?.value);
    formData.append('gstIn', this.gstIn?.value || '-');
    formData.append('contactName', this.contactName?.value);
    formData.append('secondaryMobile', this.secondaryMobile?.value || '-');
    formData.append('billingAddress', this.billingAddress?.value);
    formData.append('area', this.area?.value,)
    formData.append('stateName', this.stateName?.value);
    formData.append('country', this.country?.value);
    formData.append('zipcode', this.zipcode?.value);
    formData.append('city', this.city?.value)
    formData.append('businessCategoryId', this.businessCategoryIds?.value)
    formData.append('merchantPlanId', this.merchantPlanId?.value)
    formData.append('mccCode', this.mccCode?.value)
    formData.append('website', this.website?.value || '-')


    this.service.UpdatePersonalEntity(this.id, formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.merchantid = res.response.merchantId;
        this.bussinessid = res.response.businessCategoryModel.businessCategoryId;
        this.toastr.success(res.responseMessage);
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

      console.log(res);
    })
  }

  close() {
  this.Location.back();
  }
}
