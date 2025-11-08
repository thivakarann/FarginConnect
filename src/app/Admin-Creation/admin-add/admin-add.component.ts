import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminCreate, Payload } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrl: './admin-add.component.css',
})
export class AdminAddComponent implements OnInit {
  AdminForm!: FormGroup;
  showPassword: boolean = false;
  adminNames: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  activeRole: any;
  details: any;

  constructor(
    private service: FarginServiceService,
    private toaster: ToastrService,
    private cryptoService: EncyDecySericeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.AdminForm = new FormGroup({

      adminName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      gender: new FormControl('', [Validators.required]),

      emailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
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
    this.ActiveRoles();
  }

  get adminName() {
    return this.AdminForm.get('adminName');
  }
  get gender() {
    return this.AdminForm.get('gender');
  }
  get emailAddress() {
    return this.AdminForm.get('emailAddress');
  }

  get roleId() {
    return this.AdminForm.get('roleId');
  }
  get mobileNumber() {
    return this.AdminForm.get('mobileNumber');
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

  onMobileNumberInput(event: any): void {
    const value = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = value;
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
    let submitmodel: AdminCreate = {
      roleId: this.roleId?.value,
      emailAddress: this.emailAddress?.value.trim(),
      mobileNumber: this.mobileNumber?.value.trim(),
      name: this.adminName?.value.trim(),
      address: this.address?.value.trim(),
      city: this.city?.value.trim(),
      state: this.state?.value.trim(),
      pincode: this.pincode?.value.trim(),
      country: this.country?.value.trim(),
      gender: this.gender?.value,
      createdby: this.adminNames,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitmodel))
    }
    this.service.AdminCreate(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.messageDescription);
        this.router.navigateByUrl(`/dashboard/admindetails`);
      } else {
        this.toaster.error(res.messageDescription);
      }
    });
  }
  close() {
    this.router.navigate([`/dashboard/admindetails`], {
    });
  }
}
