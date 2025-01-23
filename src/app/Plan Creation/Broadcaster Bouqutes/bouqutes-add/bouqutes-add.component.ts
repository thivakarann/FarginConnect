import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { BroadcasterBouquetadd, Region } from '../../../fargin-model/fargin-model.module';
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
  regionId: any;
  ActiveregionID: any;

  constructor(
    public BroadcasterBouquetAdd: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

      this.BroadcasterBouquetAdd.BoucatenamesActive().subscribe((res: any) => {
      this.details = res.response;
      this.details.sort((a: any, b: any) => a.broadCasterName.localeCompare(b.broadCasterName));
    });



    // this.BroadcasterBouquetAdd.RegionGetAllActive().subscribe((res: any) => {
    //   this.ActiveRegions = res.response;
    // });


    this.BroadcasterBouquetAdd.activeprovider().subscribe((res: any) => {
      this.ActiveMSO = res.response;
      this.ActiveMSO.sort((a: any, b: any) => a.serviceProviderName.localeCompare(b.serviceProviderName));
    })


    this.myForm = new FormGroup({
      bundleChannelId: new FormControl('', Validators.required),
      alcotId: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*(\.[0-9]{1,2})?$')]),
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
      this.Plandetails.sort((a: any, b: any) => a.bouquetName.localeCompare(b.bouquetName));
    })
  }
  // activeregionid(id: any) {

  //   this.BroadcasterBouquetAdd.AlcotChannelActiveRegion(id).subscribe((res: any) => {
  //       if (Array.isArray(res.response)) {

  //         this.channelslist = res.response; // Store channels
  //         console.log('Channels list:', this.channelslist); // Log channels
  //       } else {
  //         console.error('Unexpected response format:', res);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching channels for regionId:', id, error); // Handle error
  //     }
  //   );
  // }


  activeregionids() {
    let submitModel: Region = {
      regionsId: this.regId?.value
    }
    this.BroadcasterBouquetAdd.createAlcotChannelActiveRegion(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        if (Array.isArray(res.response)) {
          this.channelslist = res.response;
          console.log('Channels list:', this.channelslist);
          console.error('Unexpected response format:', res);
        }

      }
    })
  }

  //   this.BroadcasterBouquetAdd.AlcotChannelActiveRegion(id).subscribe((res: any) => {
  //       if (Array.isArray(res.response)) {

  //         this.channelslist = res.response; // Store channels
  //         console.log('Channels list:', this.channelslist); // Log channels
  //       } else {
  //         console.error('Unexpected response format:', res);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching channels for regionId:', id, error); // Handle error
  //     }
  //   );
  // }






  getregions(id: any) {
    this.BroadcasterBouquetAdd.ActiveRegionsbyserviceprovider(id).subscribe((res: any) => {
      this.ActiveRegions = res.response;
      this.ActiveRegions.sort((a: any, b: any) => a.stateName.localeCompare(b.stateName));
      console.log('region' + this.ActiveRegions)


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
      amount: Number(this.amount?.value.trim()),
      boqCreationId: Number(this.boqCreationId?.value),
      serviceId: Number(this.serviceId?.value),
      regId: this.regId?.value,
      createdBy: this.getadminname
    }

    this.BroadcasterBouquetAdd.BroadcasterBoucateadd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        // this.router.navigateByUrl('/dashboard/bouquets-viewall')
        // setTimeout(() => {
        //   window.location.reload()
        // },500)
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}


