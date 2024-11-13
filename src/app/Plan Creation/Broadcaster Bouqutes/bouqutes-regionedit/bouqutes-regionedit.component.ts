import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { BroadcasterBouquetregionupdate } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-bouqutes-regionedit',
  templateUrl: './bouqutes-regionedit.component.html',
  styleUrl: './bouqutes-regionedit.component.css'
})
export class BouqutesRegioneditComponent {
  details: any;
  channelslist: any;
  ActiveMSO: any;
  myForm!: FormGroup;
  getId: any;
  getRoleId: any;
  getcreation: any;
  getservices: any;
  getvalues: any;
  getvalues11: any;
  getalcot: any;
  getamount: any;
  Plandetails: any;
  ActiveRegions: any;
allselected: any;
  selects: any;
  RegionIds: any;
  Regions: any;
  get: any;
  regionedit:any
  constructor(
    public BroadcasterBouquetAdd: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activeRouter: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    
    this.regionedit=this.data.value2;

    // this.BroadcasterBouquetAdd.BoucatenamesActive().subscribe((res: any) => {
    //   this.details = res.response;
    // });

    // this.BroadcasterBouquetAdd.ActiveAlcards().subscribe((res: any) => {
    //   this.channelslist = res.response;
    // });


    // this.BroadcasterBouquetAdd.activeprovider().subscribe((res: any) => {
    //   this.ActiveMSO = res.response;
    // })
    // this.BroadcasterBouquetAdd.BouqueteNameByBroadcasterid(this.getRoleId).subscribe((res: any) => {
    //   this.Plandetails = res.response;
      
    // })
    this.myForm = new FormGroup({
      regId: new FormControl('', Validators.required),
    });


    this.activeRouter.params.subscribe((param: any) => {
      this.getId = param.valueid;
      this.getId = this.data.valueid;
      
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.get = param.value2;
      this.get = this.data.value2;
      
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.getRoleId = param.bouquet;
      this.getRoleId = this.data.bouquet;
      
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.getcreation = param.creation;
      this.getcreation = this.data.creation;
      
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.getservices = param.services;
      this.getservices = this.data.services;
      
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.getvalues = param.broadCasterRegionsss;
      this.getvalues11 = this.data.broadCasterRegionsss;
      
      
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.getalcot = param.broadCasterAlcotsss;
      this.getalcot = this.data.broadCasterAlcotsss;
      
    });


    this.activeRouter.params.subscribe((param: any) => {
      this.getamount = param.amount;
      this.getamount = this.data.amount;
      
    });

    
    this.activeRouter.params.subscribe((param: any) => {
      this.RegionIds = param.broadCasterRegionIds;
      this.RegionIds = this.data.broadCasterRegionIds;
      
    });

    this.BroadcasterBouquetAdd.ActiveRegionsbyserviceprovider(this.getservices).subscribe((res: any) => {
      this.ActiveRegions = res.response;
    })
    //to fetch for edit 
    this.BroadcasterBouquetAdd.regionbyitsid(this.get).subscribe((res: any) => {
      this.Regions = res.response.broadCasterRegion.regionId;

      console.log(this.Regions)
    })
    
  }
  get regId() {
    return this.myForm.get('regId')

  }
  toggleAllSelections() {
    if (this.allselected) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }
  submit() {
    let submitModel: BroadcasterBouquetregionupdate = {
      broadCasterRegionId:this.get,
      regionIds: this.regId?.value,
    }
    this.BroadcasterBouquetAdd.BroadcasterBoucatesRegionEdit(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }

}
