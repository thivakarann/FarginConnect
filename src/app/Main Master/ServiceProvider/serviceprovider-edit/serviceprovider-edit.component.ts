import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Providerupdate } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-serviceprovider-edit',
  templateUrl: './serviceprovider-edit.component.html',
  styleUrl: './serviceprovider-edit.component.css'
})
export class ServiceproviderEditComponent implements OnInit {
  AdminForm!: FormGroup;
  showPassword: boolean = false;
  getadmin = JSON.parse(localStorage.getItem('adminname') || '');
  serviceId: any;
  viewdata: any;

  constructor(private service: FarginServiceService, private toaster: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {


    this.serviceId = this.data.value
    console.log(this.serviceId);


    this.AdminForm = new FormGroup({
      providerName: new FormControl('', [Validators.required]),
    });

    this.service.ProviderViewById(this.serviceId).subscribe((res: any) => {
      this.viewdata = res.response;
    })
  }

  get providerName() {
    return this.AdminForm.get('providerName');
  }
  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  submit() {
    let submitmodel: Providerupdate = {
      serviceProviderName: this.providerName?.value,
      modifiedBy: this.getadmin,
      serviceId:this.serviceId
    }

    this.service.ServiceProviderUpdate(submitmodel).subscribe((res: any) => {
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

  close() {
    this.router.navigate([`/dashboard/admindetails`], {
      // queryParams: { blockId:  this.blockId},
    });
  }
}
