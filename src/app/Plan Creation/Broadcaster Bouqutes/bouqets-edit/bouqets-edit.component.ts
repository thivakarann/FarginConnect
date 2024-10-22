import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { BroadcasterBouquetadd, BroadcasterBouquetupdate } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-bouqets-edit',
  templateUrl: './bouqets-edit.component.html',
  styleUrl: './bouqets-edit.component.css'
})
export class BouqetsEditComponent implements OnInit {
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
  getRoleId: any;
  getcreation: any;
  getservices: any;
  getvalues: any;
  getvalues11: any;
  getalcot: any;
  getamount: any;
  getId: any;

  constructor(
    public BroadcasterBouquetAdd: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activeRouter: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    this.BroadcasterBouquetAdd.BoucatenamesActive().subscribe((res: any) => {
      this.details = res.response;
    });

    this.BroadcasterBouquetAdd.ActiveAlcards().subscribe((res: any) => {
      this.channelslist = res.response;
    });


    this.BroadcasterBouquetAdd.activeprovider().subscribe((res: any) => {
      this.ActiveMSO = res.response;
    })


    this.myForm = new FormGroup({
      bundleChannelId: new FormControl('', Validators.required),
      alcotId: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9]\\d*)$')]),      boqCreationId: new FormControl('', Validators.required),
      serviceId: new FormControl('', Validators.required),
      regId: new FormControl('', Validators.required),
    });


    this.activeRouter.params.subscribe((param: any) => {
      this.getId = param.valueid;
      this.getId = this.data.valueid;
      console.log('getRoleName ' + this.getRoleId);
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.getRoleId = param.bouquet;
      this.getRoleId = this.data.bouquet;
      console.log('getRoleName ' + this.getRoleId);
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.getcreation = param.creation;
      this.getcreation = this.data.creation;
      console.log('getcreation ' + this.getcreation);
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.getservices = param.services;
      this.getservices = this.data.services;
      console.log('getcreation ' + this.getcreation);
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.getvalues = param.broadCasterRegionsss;
      this.getvalues11 = this.data.broadCasterRegionsss;
      console.log('getvalues ' + this.getvalues);
      console.log('getvalues11 ' + this.getvalues11);
    });

    this.activeRouter.params.subscribe((param: any) => {
      this.getalcot = param.broadCasterAlcotsss;
      this.getalcot = this.data.broadCasterAlcotsss;
      console.log('getcreation ' + this.getcreation);
    });


    this.activeRouter.params.subscribe((param: any) => {
      this.getamount = param.amount;
      this.getamount = this.data.amount;
      console.log('getcreation ' + this.getcreation);
    });


    this.BroadcasterBouquetAdd.BouqueteNameByBroadcasterid(this.getRoleId).subscribe((res: any) => {
      this.Plandetails = res.response;
      console.log(this.Plandetails)
    })

    this.BroadcasterBouquetAdd.ActiveRegionsbyserviceprovider(this.getservices).subscribe((res: any) => {
      this.ActiveRegions = res.response;
    })
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

    this.BroadcasterBouquetAdd.BouqueteNameByBroadcasterid(id.target.value).subscribe((res: any) => {
      this.Plandetails = res.response;
    })
  }

  getregions(id: any) {
    this.BroadcasterBouquetAdd.ActiveRegionsbyserviceprovider(id.target.value).subscribe((res: any) => {
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
    let submitModel: BroadcasterBouquetupdate = {
      bouquteId: this.getId,
      bundleChannelId: Number(this.bundleChannelId?.value),
      alcotId: this.alcotId?.value,
      amount: Number(this.amount?.value),
      boqCreationId: Number(this.boqCreationId?.value),
      serviceId: Number(this.serviceId?.value),
      regId: this.regId?.value,
      modifiedBy: this.getadminname
    }

    this.BroadcasterBouquetAdd.BroadcasterBoucatesEdit(submitModel).subscribe((res: any) => {
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
