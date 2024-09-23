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

    this.EditAlcart.RegionGetAllActive().subscribe((res: any) => {
      this.regiondetails = res.response;
    });

    this.EditAlcart.BoucatenamesActive().subscribe((res: any) => {
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
      this.amount = res.response.price;
      this.ChannelNumber = res.response.channelNo
      console.log(this.amount);
    })

    this.myForm = new FormGroup({
      regionId: new FormControl('', Validators.required),
      channelName: new FormControl('', Validators.required),
      price: new FormControl('',),
      type: new FormControl('', Validators.required),
      bundleChannelId: new FormControl('', Validators.required),
      generic: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      channelNo: new FormControl('', Validators.required),


    });

    this.myForm.get('type')?.valueChanges.subscribe(value => {
      if (value !== '1') {
        this.myForm.get('price')?.reset();
      }
    });
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





  submit() {
    let submitModel: UpdateAlcart = {
      alcotId: this.id,
      regionId: this.regionId?.value,
      bundleChannelId: this.bundleChannelId?.value,
      channelName: this.channelName?.value,
      type: this.type?.value,
      generic: this.generic?.value,
      language: this.language?.value,
      price: this.price?.value,
      modifiedBy: this.getadminname,
      channelNo: this.channelNo?.value
    }

    this.EditAlcart.AlcardUpdate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
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
