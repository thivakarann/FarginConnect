import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminCreate } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrl: './admin-add.component.css'
})
export class AdminAddComponent implements OnInit {
  AdminForm!: FormGroup;
  showPassword: boolean = false;
  createdBy :any = JSON.parse(localStorage.getItem('adminname') || '');
  activeRole: any;


  constructor(private service: FarginServiceService, private toaster: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.AdminForm = new FormGroup({
      adminName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      gender: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      address: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      state: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      city: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      pincode: new FormControl('', [Validators.required,Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]),
      roleId:new FormControl('',[Validators.required])
    })

    this.service.roleactiveViewall().subscribe((res:any)=>{
      this.activeRole=res.response;
      console.log(this.activeRole);
    })
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
  get password() {
    return this.AdminForm.get('password');
  }
  get roleId(){
    return this.AdminForm.get('roleId')
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

  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  submit() {
    let submitmodel: AdminCreate = {
      roleId: '2',
      emailAddress: this.emailAddress?.value,
      userPassword: this.password?.value,
      mobileNumber: this.mobileNumber?.value,
      adminName: this.adminName?.value,
      address: this.address?.value,
      city: this.city?.value,
      state: this.state?.value,
      pincode: this.pincode?.value,
      country: this.country?.value,
      gender: this.gender?.value,
      createdBy: this.createdBy
    }

    this.service.AdminCreate(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
        this.router.navigateByUrl(`/dashboard/admindetails`);
      }
      else {
        this.toaster.error(res.responseMessage);

      }
    })

  }

  close() {
    this.router.navigate([`/dashboard/admindetails`], {
      // queryParams: { blockId:  this.blockId},
    });
  }
}
