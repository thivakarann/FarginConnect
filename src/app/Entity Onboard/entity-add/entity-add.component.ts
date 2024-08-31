import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addentity } from '../../Fargin Model/fargin-model/fargin-model.module';

@Component({
  selector: 'app-entity-add',
  templateUrl: './entity-add.component.html',
  styleUrl: './entity-add.component.css'
})
export class EntityAddComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  categorydetails: any;
  GetMcccode: any;

  constructor(
    public AddEntity: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    // this.AddEntity.Bussinesscategoryactivelist().subscribe((res: any) => {
    //   this.categorydetails = res.response;
    // });

    this.myForm = new FormGroup({
      entityName: new FormControl(null, Validators.required),
      merchantLegalName: new FormControl(null, Validators.required),
      accountDisplayName: new FormControl(null, Validators.required),
      contactName: new FormControl(null, Validators.required),
      contactMobile: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$'),
      ]),
      secondaryMobile: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$'),
      ]),
      contactEmail: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-z0-9.-]+$"),
      ]),
      website: new FormControl(null, Validators.required),
      gstIn: new FormControl(null, Validators.required),
      billingAddress: new FormControl(null, Validators.required),
      area: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, Validators.required),
      stateName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      contactPerson: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      locationServed: new FormControl(null, Validators.required),
      serviceOffered: new FormControl(null, Validators.required),
      businessCategoryId: new FormControl(null, Validators.required),
      mccCode: new FormControl(null, Validators.required),
    })
  }

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
  get contactMobile() {
    return this.myForm.get(' contactMobile')

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
    return this.myForm.get(' gstIn')

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
    return this.myForm.get(' stateName')

  }
  get city() {
    return this.myForm.get(' city')

  }
  get contactPerson() {
    return this.myForm.get('contactPerson')

  }
  get country() {
    return this.myForm.get('country')

  }
  get locationServed() {
    return this.myForm.get('locationServed')

  } get serviceOffered() {
    return this.myForm.get('serviceOffered')

  }
  get businessCategoryId() {
    return this.myForm.get('businessCategoryId')

  }
  get mccCode() {
    return this.myForm.get('mccCode')

  }

  Submit() {
    let submitModel: addentity = {
      entityName: this.entityName?.value,
      merchantLegalName: this.merchantLegalName?.value,
      accountDisplayName: this.accountDisplayName?.value,
      contactName: this.contactName?.value,
      contactMobile: this.contactMobile?.value,
      secondaryMobile: this.secondaryMobile?.value,
      contactEmail: this.contactEmail?.value,
      gstIn: this.gstIn?.value,
      billingAddress: this.billingAddress?.value,
      area: this.area?.value,
      zipcode: this.zipcode?.value,
      stateName: this.stateName?.value,
      city: this.city?.value,
      contactPerson: this.contactPerson?.value,
      country: this.country?.value,
      locationServed: this.locationServed?.value,
      serviceOffered: this.serviceOffered?.value,
      businessCategoryId: this.businessCategoryId?.value,
      mccCode: this.mccCode?.value
    }
    // this.AddEntity.EntityAdd(submitModel).subscribe((res: any) => {
    //   if (res.flag == 1) {
    //     this.toastr.success(res.responseMessage);
    //     this.router.navigateByUrl('dashboard/entity-viewall');
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 2000);
    //   } else this.toastr.error(res.responseMessage);

    //   console.log(res);
    // })
  }


  close() {
    this.router.navigateByUrl('dashboard/entity-viewall');
  }











  Mccode(id: any) {
    console.log(id)
  }
}
