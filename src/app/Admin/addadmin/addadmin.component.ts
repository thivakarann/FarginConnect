import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Addadmins } from '../../fargin-model/fargin-model.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrl: './addadmin.component.css'
})
export class AddadminComponent implements OnInit {
  adminFormGroup: any = FormGroup;
  integerRegex = /^\d+$/;
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  fullname: any = localStorage.getItem('fullname');
  merchantId: any = localStorage.getItem('merchantId')
  viewactive: any;

  emptyroleId:any[]=[];
  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.adminFormGroup = this.formBuilder.group({
      adminName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required,]),
      gender: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(this.integerRegex),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailRegex),
      ]),
      address: new FormControl('', [Validators.required]),
      countryName: new FormControl('', [Validators.required]),
      stateName: new FormControl('', [Validators.required]),
      cityName: new FormControl('', [Validators.required]),
      pincodeName: new FormControl('', [Validators.required]),
      // password: new FormControl('', [Validators.required]),
      merchantRoleId: new FormControl(''),
      merchantroletype: new FormControl('', [Validators.required]),
    });

    this.service.getactiveRole(this.merchantId).subscribe({
      next: (res: any) => {
        this.viewactive = res.response;
        
      }
    });
  }

  numbers(event: any) {
    const charcode = (event.which) ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }

  get merchantroletype() {
    return this.adminFormGroup.get('merchantroletype');
  }
  get merchantRoleId() {
    return this.adminFormGroup.get('merchantRoleId');
  }
  get adminName() {
    return this.adminFormGroup.get('adminName');
  }

  get age() {
    return this.adminFormGroup.get('age');
  }

  get gender() {
    return this.adminFormGroup.get('gender');
  }

  get mobileNumber() {
    return this.adminFormGroup.get('mobileNumber');
  }


  get email() {
    return this.adminFormGroup.get('email');
  }

  get address() {
    return this.adminFormGroup.get('address');
  }

  get countryName() {
    return this.adminFormGroup.get('countryName');
  }

  get stateName() {
    return this.adminFormGroup.get('stateName');
  }

  get cityName() {
    return this.adminFormGroup.get('cityName');
  }

  get pincodeName() {
    return this.adminFormGroup.get('pincodeName');
  }

  // get password() {
  //   return this.adminFormGroup.get('password');
  // }


  OnSubmit() {
    let submitModel: Addadmins = {

      adminName: this.adminName?.value.trim(),
      age: this.age?.value.trim(),
      gender: this.gender?.value,
      mobileNumber: this.mobileNumber?.value.trim(),
      email: this.email?.value.trim(),
      // password: this.password?.value,
      address: this.address?.value.trim(),
      countryName: this.countryName?.value.trim(),
      stateName: this.stateName?.value.trim(),
      cityName: this.cityName?.value.trim(),
      pincodeName: this.pincodeName?.value.trim(),
      createdBy: this.fullname,
      merchantId: this.merchantId,
      merchantRoleId: this.merchantRoleId.value || "0",
      reqDeviceType: "",
      roleType:this.merchantroletype?.value 

    };
    this.service.addadmins(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.router.navigateByUrl('dashboard/view-admin');

      }
      else {
        this.toastr.warning(res.responseMessage);
       
      }

    });
  }
  close() {
    this.router.navigateByUrl('dashboard/view-admin');
  }
}
