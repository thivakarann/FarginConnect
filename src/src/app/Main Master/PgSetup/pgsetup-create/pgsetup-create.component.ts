import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Addfacheckkey, pgsetupadd } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';


@Component({
  selector: 'app-pgsetup-create',
  templateUrl: './pgsetup-create.component.html',
  styleUrl: './pgsetup-create.component.css'
})
export class PgsetupCreateComponent implements OnInit{

  pgsetupform: any = FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  facheckkey: any;
  constructor(
    private service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
 
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.pgsetupform = new FormGroup({
      pgMode: new FormControl('', [Validators.required]),
      apiKey: new FormControl('', [Validators.required]),
      secretKey: new FormControl('', [Validators.required]),
      createdBy:new FormControl(''),
    });
  }

  
  get pgMode() {
    return this.pgsetupform.get('pgMode');
  }
  get apiKey() {
    return this.pgsetupform.get('apiKey');
  }
  get secretKey() {
    return this.pgsetupform.get('secretKey');
  }


  submit() {
    let submitModel: pgsetupadd = {
      pgMode: this.pgMode.value,
      secretKey: this.secretKey.value,
      apiKey: this.apiKey.value,
      createdBy: this.createdBy
    }
    this.service.Pgsetupcreate(submitModel).subscribe((res: any) => {
      this.facheckkey = res.response;


      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
  cancel() {
    this.router.navigateByUrl('dashboard/Pgsetup-view');
  }

}
