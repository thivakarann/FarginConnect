import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatOption, MatSelect } from '@angular/material/select';
import { PlanCalculation, PlanCreationAdd } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-lcopadd',
  templateUrl: './lcopadd.component.html',
  styleUrl: './lcopadd.component.css'
})
export class LCOPAddComponent implements OnInit {
  getadminname = localStorage.getItem('fullname');
  merchantid: any = localStorage.getItem('merchantId');
  myForm!: FormGroup;
  myForm2!: FormGroup;
  Freechannels: any;
  PaidChannels: any;
  ActivePlans: any;
  emptyarray:any[]=[];

  viewForm: any = false
  @ViewChild('select') select: any = MatSelect;
  allSelected = false;

  @ViewChild('select1') select1: any = MatSelect;
  allSelected1 = false;

  @ViewChild('select2') select2: any = MatSelect;
  allSelected2 = false;
  CalculatedAmount!: number;
  totalpackageAmount: any;
  ADD: boolean = false;
  Viewamount: boolean = false;
  Check: any;
  Pricess!: number;

  constructor(
    public LCOPadd: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    
    this.LCOPadd.FreechannelsActive().subscribe((res: any) => {
      this.Freechannels = res.response;
    });
 
    this.LCOPadd.PaidChannelsActive().subscribe((res: any) => {
      this.PaidChannels = res.response;
    });

    this.LCOPadd.ActiveBouquetePlans().subscribe((res: any) => {
      this.ActivePlans = res.response;
    })

    this.myForm = new FormGroup({
      freeChannel: new FormControl([]),
      paidChannel: new FormControl([]),
      bouquetId: new FormControl('', Validators.required),
    });

    this.myForm2 = new FormGroup({
      plan: new FormControl(null, Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*(\.[0-9]{1,2})?$')]),

    });
  }

  // First Form

  get freeChannel() {
    return this.myForm.get('freeChannel')
  }

  get paidChannel() {
    return this.myForm.get('paidChannel')
  }

  get bouquetId() {
    return this.myForm.get('bouquetId')
  }

  // Second Form

  get plan() {
    return this.myForm2.get('plan')
  }

  get price() {
    return this.myForm2.get('price')
  }


  showToggle() {
    this.viewForm = !this.viewForm;
  }






  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
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


  selectss(id: any) {
    this.ADD = id
  }


  Calculate() {
    let submitModel: PlanCalculation = {
      freeChannel: this.freeChannel?.value || this.emptyarray,
      paidChannel: this.paidChannel?.value || this.emptyarray,
      bouquetId: this.bouquetId?.value
    }

    this.LCOPadd.LCOPPlanCalculation(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewamount = true;
        this.CalculatedAmount = res.response;
        
        this.toastr.success(res.responseMessage);
      }

      else if (res.flag == 2) {
        this.toastr.success(res.responseMessage);
        this.Viewamount = false;

      }


    })
  }

  CreatePlans() {
    const totalpackageAmount = (Number(this.CalculatedAmount) + Number(this.Pricess));
    

    let submitModel: PlanCreationAdd = {
      freeChannel: this.freeChannel?.value,
      paidChannel: this.paidChannel?.value,
      bouquetId: this.bouquetId?.value,
      totalAmount: this.CalculatedAmount,
      price: this.price?.value.trim(),
      overallAmount: totalpackageAmount,
      plan: this.plan?.value.trim(),
      createdBy: this.getadminname,
      merchantId: this.merchantid
    }

    this.LCOPadd.LcopPlanCreation(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {

        this.toastr.success(res.responseMessage);
        this.router.navigateByUrl('dashboard/lcopviewall');
      }

      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }


  close() {
    this.router.navigateByUrl('dashboard/lcopviewall');
  }
}
