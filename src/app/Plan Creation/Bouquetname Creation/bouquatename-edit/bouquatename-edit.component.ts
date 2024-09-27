import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UpdateBouquetname } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-bouquatename-edit',
  templateUrl: './bouquatename-edit.component.html',
  styleUrl: './bouquatename-edit.component.css'
})
export class BouquatenameEditComponent implements OnInit {
  id: any;
  boutuquename: any;

  constructor(
    public Boutqueedit: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;

  ngOnInit(): void {

    this.id = this.data.value;

    this.Boutqueedit.Bouquetnamebyid(this.id).subscribe((res: any) => {
      this.boutuquename = res.response.broadCasterName;
    })

    this.myForm = new FormGroup({
      broardCaste: new FormControl('', Validators.required),
    });
  }

  get broardCaste() {
    return this.myForm.get('broardCaste')

  }

  submit() {
    let submitModel: UpdateBouquetname = {
      broardCaste: this.broardCaste?.value,
      modifiedBy: this.getadminname,
      bundleChannelId: this.id
    }

    this.Boutqueedit.BouquetnameUpdate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }





}
