import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Providercreate } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-serviceprovider-add',
  templateUrl: './serviceprovider-add.component.html',
  styleUrl: './serviceprovider-add.component.css'
})
export class ServiceproviderAddComponent implements OnInit {
  AdminForm!: FormGroup;
  showPassword: boolean = false;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');

  constructor(private service: FarginServiceService, private toaster: ToastrService, private router: Router) { }


  ngOnInit(): void {
    this.AdminForm = new FormGroup({
      providerName: new FormControl('', [Validators.required]),
      serviceProviderLink: new FormControl('', [Validators.required, Validators.pattern("^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+\/?$")]),

    })
  }


  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }


  get providerName() {
    return this.AdminForm.get('providerName');
  }

  get serviceProviderLink() {
    return this.AdminForm.get('serviceProviderLink');
  }


  submit() {
    let submitmodel: Providercreate = {
      serviceProviderName: this.providerName?.value,
      serviceProviderLink: this.serviceProviderLink?.value,
      createdBy: this.getadminname
    }

    this.service.ServiceProviderCreate(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        window.location.reload();
      }
      else if (res.flag == 2) {
        this.toaster.error(res.responseMessage);
      }
      else {
        this.toaster.error(res.responseMessage);
      }
    })

  }


}
