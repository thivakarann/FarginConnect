import { Component, Inject, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { customeralcotadd } from '../../fargin-model/fargin-model.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-alcot',
  templateUrl: './add-alcot.component.html',
  styleUrl: './add-alcot.component.css'
})
export class AddAlcotComponent {
  myForm!: FormGroup;
  details: any;
  customerStbId: any;
  Channels: any;
  ActivePlans: any;
  ActiveLCOP: any;
  bouquet: any;
  allSelected1 = false;
  @ViewChild('select1') select1: any = MatSelect;

  andssss: any;

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
      paidChannel: new FormControl('', Validators.required),
    });
  }



  get paidChannel() {
    return this.myForm.get('paidChannel')

  }

  submit() {
    let submitModel: customeralcotadd = {
      customerStbId: this.customerStbId,
      alcotId: Array.from(new Set(this.paidChannel?.value)),
    }

    this.service.PlanAlcotAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }



  toggleAllSelection1() {
    if (this.allSelected1) {
      this.select1.options.forEach((item: MatOption) => item.select());
    } else {
      this.select1.options.forEach((item: MatOption) => item.deselect());
    }
  }

}
