import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { EditSetUpbox } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-editcustomer-setupbox',
  templateUrl: './editcustomer-setupbox.component.html',
  styleUrl: './editcustomer-setupbox.component.css'
})
export class EditcustomerSetupboxComponent {
  myForm!: FormGroup;

  getadminname = localStorage.getItem('fullname');
  merchantId: any = localStorage.getItem('merchantId');

  ActivePlans: any;
  ActiveSetupbox: any;
  Activeserviceprovider: any;
  serviceId: any;
  ActiveLCOP: any;
  customerdetails: any;
  customerStbId: any;
  stbIdval: any;
  customerStbres: any;
  stbId: any;
  Serviceid: any;
  customerstbId: any;
  Activemsostbproviders: any;

  constructor(private service: FarginServiceService, private toaster: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.customerStbres = this.data.value;
    console.log(this.customerStbres.stbId?.setupBoxNumber);

    

    // this.Serviceid = this.data.value.stbId.service.serviceId;
    // console.log(this.Serviceid)


    this.stbId = this.data.value.stbId.stbId;
    console.log(this.stbId)

    this.customerstbId = this.data.value.customerStbId;

    this.myForm = new FormGroup({
      setupbox: new FormControl('', [Validators.required]),
      mso: new FormControl('', [Validators.required]),
    });
    this.service.ActiveServiceProvider().subscribe((res: any) => {
      this.Activeserviceprovider = res.response;

    })
    this.service.ActiveMsobySTB(this.merchantId).subscribe((res: any) => {
      this.Activemsostbproviders = res.response;
      console.log("nsdbksd" + this.Activemsostbproviders)
    });

    this.service.ActiveSetupBoxByMerchantId(this.merchantId,this.customerStbres.stbId.service.serviceId).subscribe((res: any) => {
      
      this.ActiveSetupbox = res.response;
    });

  }


  // First Form
  get setupbox() {
    return this.myForm.get('setupbox')
  }

  get mso() {
    return this.myForm.get('mso')
  }


  getServiceId(event: any,) {
    this.ActiveSetupbox=[];
    this.serviceId = event.target.value;

    this.service.ActiveSetupBoxByMerchantId(this.merchantId, this.serviceId).subscribe((res: any) => {
      this.ActiveSetupbox = res.response;
    });
  }


  submit() {
    let submitModel: EditSetUpbox = {
      stbId: this.setupbox?.value,
      modifiedBy: this.getadminname
    }

    this.service.EditSetUpboxonly(this.customerstbId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.dialog.closeAll()
       }
      else {
        this.toaster.error(res.responseMessage)
      }
    })
  }



}
