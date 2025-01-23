import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreatePlan, CreateSMS } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import moment from 'moment';

@Component({
  selector: 'app-add-agreements',
  templateUrl: './add-agreements.component.html',
  styleUrl: './add-agreements.component.css'
})
export class AddAgreementsComponent {
  merchantid: any;
  myForm4!: FormGroup;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  options: any;
  plans: any;
  todayDate: string = '';
  Expirydate: any;
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.merchantid = this.data.value;
    const today = new Date();
    this.todayDate = today.toISOString().slice(0, 16);

    this.myForm4 = new FormGroup({
      commercialId: new FormControl('', [Validators.required]),
      linkdate: new FormControl('', [Validators.required]),
      merchantPosition: new FormControl('', [Validators.required]),
      authorizedName: new FormControl('', [Validators.required]),
    })

    this.service.viewagreementplan().subscribe((res: any) => {
      if (res.flag == 1) {
        this.plans = res.response;
      }
    })
  }







  get commercialId() {
    return this.myForm4.get('commercialId')

  }

  get linkdate() {
    return this.myForm4.get('linkdate')

  }

  get merchantPosition() {
    return this.myForm4.get('merchantPosition')

  }

  get authorizedName() {
    return this.myForm4.get('authorizedName')

  }


  Submit() {

    this.Expirydate = this.linkdate?.value
    console.log(this.Expirydate)
    let startdate = moment(this.Expirydate).format('yyyy-MM-DD HH:mm:ss').toString();

    console.log(startdate)


    let submitModel: CreatePlan = {
      merchantId: this.merchantid,
      commercialId: this.commercialId?.value,
      createdBy: this.getadminname,
      authorizedName:this.authorizedName?.value.trim(),
      merchantPosition: this.merchantPosition?.value.trim(),
      expiryLink: startdate

    }

    this.service.createplans(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
