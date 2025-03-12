import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { customerbouquetadd } from '../../fargin-model/fargin-model.module';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-bouquetadd',
  templateUrl: './bouquetadd.component.html',
  styleUrl: './bouquetadd.component.css'
})
export class BouquetaddComponent implements OnInit{
  myForm!: FormGroup;
  details: any;
  customerStbId: any;
  Channels: any;
  ActivePlans: any;
  ActiveLCOP: any;
bouquet: any;
allSelected2=false;
  @ViewChild('select2') select2: any = MatSelect;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
    this.customerStbId = this.data.value
    
 
 
    this.service.PaidChannels().subscribe((res: any) => {
      this.Channels = res.response;
      
    });
    this.service.ActiveBouquetePlans().subscribe((res: any) => {
      this.ActivePlans = res.response;
    });
    // this.service.ActiveLcop(this.merchantId).subscribe((res: any) => {
    //   this.ActiveLCOP = res.response;
    // });

    this.myForm = new FormGroup({
      bundleChannelId: new FormControl('', Validators.required),
    });
  }



  get bundleChannelId() {
    return this.myForm.get('bundleChannelId')

  }

  submit() {
    let submitModel: customerbouquetadd = {
      customerStbId: this.customerStbId,
      bouquetId: Array.from(new Set(this.bundleChannelId?.value)),
    }

    this.service.PlanBouequetAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }

  toggleAllSelection2() {
    if (this.allSelected2) {
      this.select2.options.forEach((item: MatOption) => item.select());
    } else {
      this.select2.options.forEach((item: MatOption) => item.deselect());
    }
  }
}
