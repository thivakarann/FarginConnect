import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Upadteadmins } from '../../fargin-model/fargin-model.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editadmin',
  templateUrl: './editadmin.component.html',
  styleUrl: './editadmin.component.css'
})
export class EditadminComponent {
  adminFormGroup: any = FormGroup;
  integerRegex = /^\d+$/;
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  fullname: any = localStorage.getItem('fullname')
  id: any;
  adminNames: any;
  adminEmails: any;
  addresss: any;
  ages: any;
  genders: any;
  mobileNumbers: any;
  countryNames: any;
  stateNames: any;
  cityNames: any;
  pincodeNames: any;
  merchantAdminId: any;
  merchantAdmin: any;
  viewactive: any;
  merchantId: any = localStorage.getItem('merchantId')
  merchantName: any = localStorage.getItem('merchantname');
  viewbeneficiary: any;
  viewemployeebyId: any;

  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private ActivateRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;

    });


    this.adminFormGroup = this.formBuilder.group({
      adminName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
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
      // password: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required]),
      countryName: new FormControl('', [Validators.required]),
      stateName: new FormControl('', [Validators.required]),
      cityName: new FormControl('', [Validators.required]),
      pincodeName: new FormControl('', [Validators.required]),
      // modifiedBy: new FormControl(''),
      merchantRoleId: new FormControl(''),
      merchantroletype: new FormControl('', [Validators.required]),
    });

    this.service.getactiveRole(this.merchantId).subscribe({
      next: (res: any) => {
        this.viewactive = res.response;

      }
    });
    this.service.BeneficiaryEmployeeView(this.id).subscribe((res: any) => {
      this.viewemployeebyId = res.response;

    })



  }

  numbers(event: any) {
    const charcode = (event.which) ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
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

  get merchantroletype() {
    return this.adminFormGroup.get('merchantroletype');
  }
  get merchantRoleId() {
    return this.adminFormGroup.get('merchantRoleId');
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
  //   return this.adminFormGroup.get('password')
  // }

  

  OnSubmit() {
    let submitModel: Upadteadmins = {
      merchantRoleId: this.merchantRoleId?.value || "0",
      adminName: this.adminName?.value.trim(),
      age: this.age?.value.trim(),
      gender: this.gender?.value,
      mobileNumber: this.mobileNumber?.value.trim(),
      email: this.email?.value.trim(),
      address: this.address?.value.trim(),
      countryName: this.countryName?.value.trim(),
      stateName: this.stateName?.value.trim(),
      city: this.cityName?.value.trim(),
      pincodeName: this.pincodeName?.value.trim(),
      modifiedBy: this.merchantName,
      roleType: this.merchantroletype?.value

    };
    this.service.editadmins(this.id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.router.navigateByUrl('dashboard/view-admin');


      }
      else {
        this.toastr.warning(res.responseMessage);
        this.dialog.closeAll()
      }
    });
  }

  close() {
    this.router.navigateByUrl('dashboard/view-admin');
  }
}
