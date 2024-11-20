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
    var expression = '^(?!mailto:)(?:(?:https|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    this.AdminForm = new FormGroup({
      providerName: new FormControl('', [Validators.required]),
      serviceProviderLink: new FormControl('', [Validators.required, Validators.pattern("((http|https)://)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,6})+(/[-a-zA-Z0-9@:%._\\+~#?&//=]*)?")]),

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
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
