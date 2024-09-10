import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { BroadcasterBouquetadd } from '../../../fargin-model/fargin-model.module';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-bouqutes-add',
  templateUrl: './bouqutes-add.component.html',
  styleUrl: './bouqutes-add.component.css'
})
export class BouqutesAddComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  details: any;
  channelslist: any;
  @ViewChild('select') select: any = MatSelect;
  allSelected = false;

  constructor(
    public BroadcasterBouquetAdd: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.BroadcasterBouquetAdd.BoucatenamesActive().subscribe((res: any) => {
      this.details = res.response;
    });

    this.BroadcasterBouquetAdd.ActiveAlcards().subscribe((res: any) => {
      this.channelslist = res.response;
    })


    this.myForm = new FormGroup({
      bundleChannelId: new FormControl('', Validators.required),
      alcotId: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      bouquetName: new FormControl('', Validators.required),
    });
  }

  get bundleChannelId() {
    return this.myForm.get('bundleChannelId')

  }

  get alcotId() {
    return this.myForm.get('alcotId')

  }

  get amount() {
    return this.myForm.get('amount')

  }

  get bouquetName() {
    return this.myForm.get('bouquetName')

  }


  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  submit() {
    let submitModel: BroadcasterBouquetadd = {
      bundleChannelId: this.bundleChannelId?.value,
      alcotId: this.alcotId?.value,
      amount: this.amount?.value,
      bouquetName: this.bouquetName?.value
    }

    this.BroadcasterBouquetAdd.BroadcasterBoucateadd(submitModel).subscribe((res: any) => {
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
