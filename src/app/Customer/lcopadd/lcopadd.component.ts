import { Component, Inject, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { customerlcopadd } from '../../fargin-model/fargin-model.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-lcopadd',
  templateUrl: './lcopadd.component.html',
  styleUrl: './lcopadd.component.css'
})
export class LcopaddComponent {
  merchantId: any = localStorage.getItem('merchantId');

  myForm!: FormGroup;
  details: any;
  customerStbId: any;
  Channels: any;
  ActivePlans: any;
  ActiveLCOP: any;
  bouquet: any;
  allSelected2: any;
  allSelected1: any;
  select1: any;
  select2: any;
  andssss: any;
  lcp: any;
  allSelected3=false;
  @ViewChild('select3') select3: any = MatSelect;

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
    this.service.ActiveLcop(this.merchantId).subscribe((res: any) => {
      this.ActiveLCOP = res.response;
    });

    this.myForm = new FormGroup({
      lcop: new FormControl('', Validators.required),
    });
  }



  get lcop() {
    return this.myForm.get('lcop')

  }

  submit() {
    let submitModel: customerlcopadd = {
      customerStbId: this.customerStbId,
      lcopId: Array.from(new Set(this.lcop?.value)),
    }

    this.service.PlanlcopAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }



  toggleAllSelection3() {
    if (this.allSelected3) {
      this.select3.options.forEach((item: MatOption) => item.select());
    } else {
      this.select3.options.forEach((item: MatOption) => item.deselect());
    }
  }
}
