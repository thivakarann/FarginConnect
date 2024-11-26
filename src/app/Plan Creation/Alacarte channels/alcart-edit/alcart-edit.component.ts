import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateAlcart } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-alcart-edit',
  templateUrl: './alcart-edit.component.html',
  styleUrl: './alcart-edit.component.css'
})
export class AlcartEditComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  id: any;
  regiondetails: any;
  alcardsdetails: any;
  regionname: any;
  ChennelName: any;
  BroadCaster: any;
  Generic: any;
  Language: any;
  Type: any;
  amount: any;
  ChannelNumber: any;
  Broadcasters: any;
  show: any;
  typesign: any;

  constructor(
    public EditAlcart: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    // this.EditAlcart.RegionGetAllActive().subscribe((res: any) => {
    //   this.regiondetails = res.response;
    // });

    this.EditAlcart.activeprovider().subscribe((res: any) => {
      this.Broadcasters = res.response;
    })

    this.EditAlcart.Alcardviewbyid(this.id).subscribe((res: any) => {
      this.alcardsdetails = res.response;
      this.regionname = res.response.region.regionId;
      this.ChennelName = res.response.channelName;
      this.BroadCaster = res.response.bundleChannelId.bundleChannelId;
      this.Generic = res.response.generic;
      this.Language = res.response.language;
      this.Type = res.response.type;
      if (this.Type == 1) {
        this.show = true;
      }
      else {
        this.show = false;
      }
      this.amount = res.response.price;
      if (this.amount == 0) {
        this.amount = ""
      }
      this.ChannelNumber = res.response.channelNo

    })

    this.myForm = new FormGroup({
      regionId: new FormControl('', Validators.required),
      channelName: new FormControl('', Validators.required),
      price: new FormControl('', Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?$')),
      type: new FormControl('', Validators.required),
      bundleChannelId: new FormControl('', Validators.required),
      generic: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      channelNo: new FormControl('', Validators.required),


    });


  }
  typeevent(event: any) {
    this.typesign = event.target.value;
    if (event.target.value == '0') {
      this.show = false;

    } else {
      this.show = true;
    }
  }
  get regionId() {
    return this.myForm.get('regionId')

  }
  get channelName() {
    return this.myForm.get('channelName')

  }

  get price() {
    return this.myForm.get('price')

  }
  get type() {
    return this.myForm.get('type')

  }

  get bundleChannelId() {
    return this.myForm.get('bundleChannelId')

  }
  get generic() {
    return this.myForm.get('generic')

  }

  get language() {
    return this.myForm.get('language')

  }

  get channelNo() {
    return this.myForm.get('channelNo')

  }


  getbuddlechanneld(id: any) {
    this.EditAlcart.ActiveRegionsbyserviceprovider(id).subscribe((res: any) => {
      this.regiondetails = res.response;
    });
  }





  submit() {
    let submitModel: UpdateAlcart = {
      alcotId: this.id,
      regionId: this.regionId?.value,
      bundleChannelId: this.bundleChannelId?.value,
      channelName: this.channelName?.value.trim(),
      type: this.type?.value,
      generic: this.generic?.value.trim(),
      language: this.language?.value.trim(),
      price: this.price?.value,
      modifiedBy: this.getadminname,
      channelNo: this.channelNo?.value
    }

    this.EditAlcart.AlcardUpdate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
        this.router.navigateByUrl('dashboard/alacarte-viewall');
      }
      else {
        this.toastr.error(res.errorMessage);
      }
    })
  }


  close() {
    this.router.navigateByUrl('dashboard/alacarte-viewall');
  }


}
