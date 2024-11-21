import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Updatesigner } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-signer-update',
  templateUrl: './signer-update.component.html',
  styleUrl: './signer-update.component.css'
})
export class SignerUpdateComponent implements OnInit {
  MyForm!: FormGroup;
  createdBy: any = JSON.parse(localStorage.getItem('adminname') || '');
  Id: any;
  Name: any;
  Email: any;
  Number: any;

  constructor(private service: FarginServiceService, private toaster: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.Id = this.data.value;

    this.service.signerbyid(this.Id).subscribe((res:any)=>{
    this.Name =  res.response.signAdminName,
    this.Email = res.response.signAdminEmail
    this.Number = res.response.signAdminMobile
    });

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


  submit(){
    let submitModel: Updatesigner = {
      signAdminEmail:this.signAdminEmail?.value,
      signAdminMobile:this.signAdminMobile?.value,
      signAdminName:this.signAdminName?.value,
      modifiedBy:this.createdBy,
      signId:this.Id
    }

    this.service.signerupdate(submitModel).subscribe((res:any)=>{
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
