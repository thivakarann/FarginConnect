import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute } from '@angular/router';
import { ExtraRegion } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-add-extra-region',
  templateUrl: './add-extra-region.component.html',
  styleUrl: './add-extra-region.component.css'
})
export class AddExtraRegionComponent implements OnInit {
  
  id: any;
  channelslist: any;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  @ViewChild('select') select: any = MatSelect;
  allSelected = false;
  regId: any;
  region:any;
  ActiveRegions: any;
ActiveregionID: any;
serviceId:any;
regnId: any;
RegionIds:any
  id1: any;

  constructor(
    public AddExtra: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService,
    // private ActivateRoute: ActivatedRoute,

  ) { }


  ngOnInit(): void {
    // this.id = this.data.value;
    // console.log(this.id)


    // this.ActivateRoute.queryParams.subscribe((param: any) => {
    //   this.id = param.Alldata;

    // });
    this.id=this.data.value;
    console.log(this.id)
    this.id1=this.data.value2;

    // this.AddExtra.ActiveAlcards().subscribe((res: any) => {
    //   this.channelslist = res.response;
    //   console.log(this.channelslist)
     
    // });

    this.AddExtra.ActiveRegionsbyserviceprovider(this.id1).subscribe((res: any) => {
      this.ActiveRegions = res.response;
      console.log( 'region' +this.ActiveRegions)
      console.log(this.ActiveRegions[0].regionId)
   
    })

   

   

    this.myForm = new FormGroup({
      regionId: new FormControl('', Validators.required),
      alcotChannel: new FormControl('', Validators.required),
    });


  }

  get regionId() {
    return this.myForm.get('regionId')
  }

  get alcotChannel() {
    return this.myForm.get('alcotChannel')
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

    

  


  activeregionids(id:any) {
    this.RegionIds=id;
    console.log(this.RegionIds)
   
       this.AddExtra.AlcartChannelregions(this.RegionIds).subscribe((res:any)=>{
        if(res.flag==1)
        {
          // if (Array.isArray(res.response)) {
            this.channelslist = res.response;
            // console.log('Channels list:', this.channelslist);
            // console.error('Unexpected response format:', res.responseMessage);
        }
        else
        {
          this.allSelected = false
    this.alcotChannel?.reset()
    this.channelslist = null
    
          // console.error('Unexpected response format:', res.responseMessage);
        //  this.toastr.error(res.responseMessage)
        }
        })
}
    

  submit() {
    let submitModel: ExtraRegion = {
      boqId: this.id,
      regionId: this.regionId?.value,
      alcotChannel: [this.alcotChannel?.value]
    }
    this.AddExtra.BouquetsRegion(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
