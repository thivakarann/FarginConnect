import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Addsigner } from '../../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signer-add',
  templateUrl: './signer-add.component.html',
  styleUrl: './signer-add.component.css'
})
export class SignerAddComponent {
  MyForm!: FormGroup;
  showPassword: boolean = false;
  createdBy: any = JSON.parse(localStorage.getItem('adminname') || '');
  activeRole: any;

  constructor(private service: FarginServiceService, private toaster: ToastrService, private router: Router,private dialog:MatDialog) { }


  ngOnInit(): void {
    this.MyForm = new FormGroup({

      signAdminName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),

      signAdminEmail: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
      ]),

      signAdminMobile: new FormControl('', [
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),


    })
  }

  get signAdminName() {
    return this.MyForm.get('signAdminName');
  }

  get signAdminEmail() {
    return this.MyForm.get('signAdminEmail');
  }

  get signAdminMobile() {
    return this.MyForm.get('signAdminMobile');
  }


  submit() {
    let submitModel: Addsigner = {
      signAdminEmail: this.signAdminEmail?.value.trim(),
      signAdminMobile: this.signAdminMobile?.value.trim(),
      signAdminName: this.signAdminName?.value.trim(),
      createdBy: this.createdBy
    }

    this.service.signeradd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
      else {
        this.toaster.error(res.responseMessage);

      }
    })
  }



}
