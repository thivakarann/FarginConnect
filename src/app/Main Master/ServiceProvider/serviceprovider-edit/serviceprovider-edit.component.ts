import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
  getadmin = JSON.parse(sessionStorage.getItem('adminname') || '');
  serviceId: any;
  viewdata: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toaster: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {


    this.serviceId = this.data.value
    this.AdminForm = new FormGroup({
      providerName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'), Validators.maxLength(50)]),
      serviceProviderLink: new FormControl('', [
        Validators.required,
        Validators.pattern(/^https?:\/\/(?:[\w-]+\.)+[a-z]{2,6}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#\S*)?$/i)
      ])
    })

    this.service.ProviderViewById(this.serviceId).subscribe((res: any) => {
      this.viewdata = res.response;
    })
  }

  get providerName() {
    return this.AdminForm.get('providerName');
  }

  get serviceProviderLink() {
    return this.AdminForm.get('serviceProviderLink');
  }

  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  submit() {
    let submitmodel: Providerupdate = {
      serviceProviderName: this.providerName?.value.trim(),
      serviceProviderLink: this.serviceProviderLink?.value.trim(),
      modifiedBy: this.getadmin,
      serviceId: this.serviceId
    }

    this.service.ServiceProviderUpdate(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
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
