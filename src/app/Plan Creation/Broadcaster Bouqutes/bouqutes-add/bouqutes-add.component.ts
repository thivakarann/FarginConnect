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
  @ViewChild('selects') selects: any = MatSelect;
  allselected = false;
  Plandetails: any;
  channleid: any;
  ActiveRegions: any;
  ActiveMSO: any;
  serviceproviderid: any;

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
    });

    // this.BroadcasterBouquetAdd.RegionGetAllActive().subscribe((res: any) => {
    //   this.ActiveRegions = res.response;
    // });


    this.BroadcasterBouquetAdd.activeprovider().subscribe((res: any) => {
      this.ActiveMSO = res.response;
    })


    this.myForm = new FormGroup({
      bundleChannelId: new FormControl('', Validators.required),
      alcotId: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      boqCreationId: new FormControl('', Validators.required),
      serviceId: new FormControl('', Validators.required),
      regId: new FormControl('', Validators.required),
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

  get boqCreationId() {
    return this.myForm.get('boqCreationId')

  }

  get regId() {
    return this.myForm.get('regId')

  }

  get serviceId() {
    return this.myForm.get('serviceId')

  }

  name(id: any) {
    console.log(id)
    this.BroadcasterBouquetAdd.BouqueteNameByBroadcasterid(id).subscribe((res: any) => {
      this.Plandetails = res.response;
    })
  }

  getregions(id: any) {
    this.BroadcasterBouquetAdd.ActiveRegionsbyserviceprovider(id).subscribe((res: any) => {
      this.ActiveRegions = res.response;
    })
  }


  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  toggleAllSelections() {
    if (this.allselected) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }

  close() {
    this.router.navigateByUrl('dashboard/bouquets-viewall')
  }

  submit() {
    let submitModel: BroadcasterBouquetadd = {
      bundleChannelId: Number(this.bundleChannelId?.value),
      alcotId: this.alcotId?.value,
      amount: Number(this.amount?.value),
      boqCreationId: Number(this.boqCreationId?.value),
      serviceId: Number(this.serviceId?.value),
      regId: this.regId?.value,
      createdBy: this.getadminname
    }

    this.BroadcasterBouquetAdd.BroadcasterBoucateadd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.router.navigateByUrl('/dashboard/bouquets-viewall')

      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }


}
