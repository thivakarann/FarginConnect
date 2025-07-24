import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Providercreate } from '../../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-serviceprovider-add',
  templateUrl: './serviceprovider-add.component.html',
  styleUrl: './serviceprovider-add.component.css'
})
export class ServiceproviderAddComponent implements OnInit {
  AdminForm!: FormGroup;
  showPassword: boolean = false;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toaster: ToastrService, private router: Router) { }


  ngOnInit(): void {

    this.AdminForm = new FormGroup({
      providerName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'), Validators.maxLength(50)]),
      serviceProviderLink: new FormControl('', [
        Validators.required,
        Validators.pattern(/^https?:\/\/(?:[\w-]+\.)+[a-z]{2,6}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#\S*)?$/i)
      ])

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
      serviceProviderName: this.providerName?.value.trim(),
      serviceProviderLink: this.serviceProviderLink?.value.trim(),
      createdBy: this.getadminname
    }

    this.service.ServiceProviderCreate(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll()

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
