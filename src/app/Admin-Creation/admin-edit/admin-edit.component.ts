import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { AdminUpdate, Payload } from '../../fargin-model/fargin-model.module';
import { ActivatedRoute, Router } from '@angular/router';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css',
})
export class AdminEditComponent implements OnInit {
  AdminForm!: FormGroup;
  showPassword: boolean = false;
  adminNames: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  adminuserId: any;
  viewData: any;
  data: any;
  activeRole: any;
  role: any;

  constructor(
    private service: FarginServiceService,
    private toaster: ToastrService,
    private activeRouter: ActivatedRoute,
    private cryptoService: EncyDecySericeService,
    private router: Router
  ) { }
  ngOnInit(): void {

    this.activeRouter.queryParams.subscribe((param: any) => {
      this.adminuserId = param.AdminUserId;
    });

    this.Details();
    this.ActiveRoles();

    this.AdminForm = new FormGroup({
      adminName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      genders: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z ]{1,50}$/),
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z ]{1,50}$/),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z ]{1,50}$/),
      ]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$'),
      ]),
      roleId: new FormControl('', [Validators.required]),
    });
  }

  get adminName() {
    return this.AdminForm.get('adminName');
  }
  get genders() {
    return this.AdminForm.get('genders');
  }

  get address() {
    return this.AdminForm.get('address');
  }
  get country() {
    return this.AdminForm.get('country');
  }
  get state() {
    return this.AdminForm.get('state');
  }
  get city() {
    return this.AdminForm.get('city');
  }

  get pincode() {
    return this.AdminForm.get('pincode');
  }
  get roleId() {
    return this.AdminForm.get('roleId');
  }

  Details() {
    const payload = {
      userId: this.adminuserId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.AdminView(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewData = JSON.parse(this.cryptoService.decrypt(res.data));;
        this.AdminForm.patchValue({
          adminName: this.viewData?.name,
          genders: this.viewData?.gender,
          address: this.viewData?.address,
          country: this.viewData?.country,
          state: this.viewData?.state,
          city: this.viewData?.city,
          pincode: this.viewData?.pincode,
          roleId: this.viewData?.roleEntity?.roleId
        });
      }
    });
  }

  ActiveRoles() {
    const payload = {
      status: 1,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.roleactiveViewall(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.activeRole = JSON.parse(this.cryptoService.decrypt(res.data));;
      }
    })
  }

  submit() {
    let submitmodel: AdminUpdate = {
      userId: this.adminuserId,
      name: this.adminName?.value.trim(),
      address: this.address?.value.trim(),
      city: this.city?.value.trim(),
      state: this.state?.value.trim(),
      pincode: this.pincode?.value.trim(),
      country: this.country?.value.trim(),
      gender: this.genders?.value,
      modifiedBy: this.adminNames,
      roleId: this.roleId?.value,
      emailAddress: this.viewData?.emailAddress,
      mobileNumber: this.viewData?.mobileNumber
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitmodel))
    }
    this.service.AdminUpdate(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.messageDescription);
        this.router.navigateByUrl(`/dashboard/admindetails`);
      } else {
        this.toaster.error(res.messageDescription);
      }
    });
  }

  close() {
    this.router.navigate([`/dashboard/admindetails`], {});
  }
}
