import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DPOCrate } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-dpobouquete-add',
  templateUrl: './dpobouquete-add.component.html',
  styleUrl: './dpobouquete-add.component.css'
})
export class DPOBouqueteAddComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  details: any;
  channelslist: any;
  @ViewChild('select') select: any = MatSelect;
  allSelected = false;
  Plandetails: any;
  channleid: any;
  DpoType: any;
  statename: any;
  Regions: any;

  constructor(
    public DPOBouquetAdd: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {

    this.DPOBouquetAdd.BoucatenamesActive().subscribe((res: any) => {
      this.details = res.response;
    });

    this.DPOBouquetAdd.ActiveAlcards().subscribe((res: any) => {
      this.channelslist = res.response;
    });

    this.DPOBouquetAdd.Activeregions().subscribe((res: any) => {
      this.Regions = res.response
    })
    
    
    this.myForm = new FormGroup({
      bundleChannelId: new FormControl('', Validators.required),
      regionId: new FormControl('',),
      boqCreationId: new FormControl('',),
      amount: new FormControl('', Validators.required),
      alcotId: new FormControl('', Validators.required),
    });
  }

  get bundleChannelId() {
    return this.myForm.get('bundleChannelId')

  }

  get regionId() {
    return this.myForm.get('regionId')

  }

  get boqCreationId() {
    return this.myForm.get('boqCreationId')

  }

  get amount() {
    return this.myForm.get('amount')

  }

  get alcotId() {
    return this.myForm.get('alcotId')

  }


  name(id: any) {
    
    this.DPOBouquetAdd.BouqueteNameByBroadcasterid(id).subscribe((res: any) => {
      this.Plandetails = res.response;
    })
  }


  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  DpoNames(id: any) {
    if (id == "Region") {
      this.statename = "Region"
    }

    else {
      this.statename = "Plan"
    }
  }



  submit() {
    let submitModel: DPOCrate = {
      bundleChannelId: this.bundleChannelId?.value,
      boqCreationId: this.boqCreationId?.value || '0',
      regionId: this.regionId?.value || '0',
      alcotId: this.alcotId?.value,
      amount: this.amount?.value
    }

    this.DPOBouquetAdd.DPOAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
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
