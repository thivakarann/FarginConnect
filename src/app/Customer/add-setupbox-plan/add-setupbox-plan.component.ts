import { Component, Inject, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateSetupBoxPln } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-add-setupbox-plan',
  templateUrl: './add-setupbox-plan.component.html',
  styleUrl: './add-setupbox-plan.component.css'
})
export class AddSetupboxPlanComponent {
  myForm!: FormGroup;
 
  getadminname = localStorage.getItem('fullname');
  merchantId: any = localStorage.getItem('merchantId');
  Channels: any;
  @ViewChild('select1') select1: any = MatSelect;
  @ViewChild('select2') select2: any = MatSelect;
  @ViewChild('select3') select3: any = MatSelect;
  allSelected3 = false;
  allSelected2 = false;
  allSelected1 = false;
  ActivePlans: any;
  ActiveSetupbox: any;
  Activeserviceprovider: any;
  serviceId: any;
  ActiveLCOP: any;
  customerdetails: any;
  emptyalcot: any[] = [];
  EmptyBouquet: any[] = [];
  customerId: any;
  Activemsostbproviders: any;
  minDate: any = Date;
  maxDate: any = Date;
  constructor(private service: FarginServiceService, private location: Location, private toaster: ToastrService, private router: Router,  @Inject(MAT_DIALOG_DATA) public data: any,private dialog:MatDialog) {
  }
 
  ngOnInit(): void {
    // const today = new Date();
    // this.minDate = today.toISOString().split('T')[0]
 
    // const nextMonth = new Date(today.setMonth(today.getMonth() + 1))
    // this.maxDate = nextMonth.toISOString().split('T')[0]

    this.customerId = this.data.value
    

    this.myForm = new FormGroup({
   
      setupbox: new FormControl('', [
        Validators.required,
 
      ]),
      mso: new FormControl('', [
        Validators.required,
 
      ]),
      paidChannel: new FormControl('',),
      broadcaster: new FormControl('',),
      lcop: new FormControl('', Validators.required),
      billingDate: new FormControl('', Validators.required),
   
 
    });
 
    // this.service.PaidChannels().subscribe((res: any) => {
    //   this.Channels = res.response;
    // });

    this.service.PaidChannelsActive().subscribe((res: any) => {
      this.Channels = res.response;
    });
    this.service.ActiveBouquetePlans().subscribe((res: any) => {
      this.ActivePlans = res.response;
    });
    this.service.ActiveLcop(this.merchantId).subscribe((res: any) => {
      this.ActiveLCOP = res.response;
    });
    this.service.ActiveServiceProvider().subscribe((res: any) => {
      this.Activeserviceprovider = res.response;
     });

     this.service.ActiveMsobySTB(this.merchantId).subscribe((res:any)=>{
      this.Activemsostbproviders = res.response;
      console.log("nsdbksd" + this.Activemsostbproviders)
     })
 
  }
 
 
  // First Form
 
 
 
 
  get setupbox() {
    return this.myForm.get('setupbox')
 
  }
  get mso() {
    return this.myForm.get('mso')
  }
 
  get paidChannel() {
    return this.myForm.get('paidChannel')
 
  }
  get broadcaster() {
    return this.myForm.get('broadcaster')
 
  }
  get lcop() {
    return this.myForm.get('lcop')
  }
  get billingDate() {
    return this.myForm.get('billingDate')
  }
 
  getServiceId(event: any,) {
    this.ActiveSetupbox = [];
    this.serviceId = event.target.value;
    
    this.service.ActiveSetupBoxByMerchantId(this.merchantId,this.serviceId).subscribe((res: any) => {
      this.ActiveSetupbox = res.response;
    });
  }
 
  toggleAllSelection1() {
    if (this.allSelected1) {
      this.select1.options.forEach((item: MatOption) => item.select());
    } else {
      this.select1.options.forEach((item: MatOption) => item.deselect());
    }
  }
  toggleAllSelection2() {
    if (this.allSelected2) {
      this.select2.options.forEach((item: MatOption) => item.select());
    } else {
      this.select2.options.forEach((item: MatOption) => item.deselect());
    }
  }
  toggleAllSelection3() {
    if (this.allSelected3) {
      this.select3.options.forEach((item: MatOption) => item.select());
    } else {
      this.select3.options.forEach((item: MatOption) => item.deselect());
    }
  }
 
  submit() {
    let submitModel: CreateSetupBoxPln = {
     
      alcotId: this.paidChannel?.value || this.emptyalcot,
      bouquetId: this.broadcaster?.value || this.EmptyBouquet,
      lcopId: this.lcop?.value,
      stbId: this.setupbox?.value,
      customerId:this.customerId,
      createdBy:this.getadminname,
      billingDate:this.billingDate?.value,
     
    }
    
    this.service.AddSetupBoxPlan(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.dialog.closeAll()
 
      }
      else {
        this.toaster.error(res.responseMessage)
      }
    })
  }
 
 
 
  close() {
    this.location.back()
  }
}
