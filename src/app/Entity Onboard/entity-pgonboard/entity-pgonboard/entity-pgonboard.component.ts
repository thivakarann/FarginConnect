import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { PgOnboard } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-entity-pgonboard',
  templateUrl: './entity-pgonboard.component.html',
  styleUrl: './entity-pgonboard.component.css'
})
export class EntityPgonboardComponent implements OnInit {
  addcategory: any = FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  merchantid: any;
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any,) { }
  ngOnInit(): void {
    this.merchantid = this.data.value
    console.log(this.merchantid);
    this.addcategory = new FormGroup({
      expiryDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      Url: new FormControl('', [
        Validators.required,
        Validators.pattern("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")
      ]),
    });
  }
  get expiryDate() {
    return this.addcategory.get('expiryDate');
  }

  get description() {
    return this.addcategory.get('description');
  }
  get Url() {
    return this.addcategory.get('Url');
  }

  submit() {
    let submitmodel: PgOnboard = {
      merchantId: this.merchantid,
      linkExpiry: this.expiryDate?.value,
      description: this.description?.value,
      returnUrl: this.Url?.value
    }
    this.service.PgOnboard(submitmodel).subscribe((res: any) => {
      if (res.response.flag == 1) {
        this.toastr.success(res.response.message);
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.response.message)
      }
    })
  }
}

