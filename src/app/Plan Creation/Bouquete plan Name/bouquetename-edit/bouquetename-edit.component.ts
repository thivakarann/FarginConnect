import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BouquetenameUpdate } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-bouquetename-edit',
  templateUrl: './bouquetename-edit.component.html',
  styleUrl: './bouquetename-edit.component.css'
})
export class BouquetenameEditComponent implements OnInit {
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  id: any;
  details: any;
  detailss: any;
  Broadcastername: any;
  PlanName: any;


  constructor(
    public Editdetails: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog

  ) { }
  ngOnInit(): void {

    this.detailss = this.data.value;
    this.id = this.data.value.boqCreationId;
    this.Broadcastername = this.data.value.bundleChannel.bundleChannelId;
    this.PlanName = this.data.value.bouquetName;

    this.Editdetails.BoucatenamesActive().subscribe((res: any) => {
      this.details = res.response;
    });


    this.myForm = new FormGroup({
      bundleChannelId: new FormControl('', Validators.required),
      bouquetName: new FormControl('', Validators.required),
    });

  }


  get bouquetName() {
    return this.myForm.get('bouquetName')

  }

  get bundleChannelId() {
    return this.myForm.get('bundleChannelId')

  }

  submit() {
    let submitModel: BouquetenameUpdate = {
      bundleChannelId: this.bundleChannelId?.value,
      boqCreationId: this.id,
      bouquetName: this.bouquetName?.value.trim(),
      modifiedBy: this.getadminname
    }

    this.Editdetails.Bouquetenameupdatae(submitModel).subscribe((res: any) => {
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
