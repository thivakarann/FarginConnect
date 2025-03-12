import { Component, Inject, numberAttribute, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LCOPcalculationforEdit, lcopedit, PlanCalculation } from '../../../fargin-model/fargin-model.module';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-lcop-edit',
  templateUrl: './lcop-edit.component.html',
  styleUrl: './lcop-edit.component.css'
})
export class LcopEditComponent implements OnInit {
  lcopedit!: FormGroup;
  lcopid: any;
  totalAmounts: any;
  prices: any;
  editRoleForm: any = FormGroup;
  getRoleName: any;
  @ViewChild('select') select: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;
  @ViewChild('selectsplan') selectsplan: any = MatSelect;
  allSelected = false;
  allSelected1 = false;
  allSelected2 = false;
  getPerValue: any;
  getSubValue: any;
  permissionValue: any;
  values2: any[] = [];
  getRoleId: any;
  subpermissionValue: any;
  errorMessage: any;
  values: any[] = [];
  entityname: any = localStorage.getItem('adminName');
  updateValue: any;
  getadminname = localStorage.getItem('fullname');
  values3: any[] = [];
  paidplan: any;
  broadcasterplan: any;
  values4: any[] = [];
  Viewamount: boolean = true;
  CalculatedAmount!: number;
  getid: any;
  ssssTest: any[] = [];
  ADD: any;
  Check: any;
  viewForm: any = false;
  getamt: any;
  lcopplamnames: any;
  getoverall: any;
  getlpamount: any;
  modifiedBy: any;
  overallAmount: any;
  getlpids: any;
  lcopidss: any
  Lcopdetails: any;
  plannames: any;
  price: any;
  totalAmount: any;
  SelectedPackageAmount: any;
  OverplanAmount: any;
  FreeChannelsforEdit: any;
  PaidChannelsforEdit: any;
  BouquetsforEdit: any;


  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.lcopidss = this.data.value;

    console.log("jfewjkf" + this.lcopidss)


    this.service.LCOPViewbyid(this.data.value).subscribe((res: any) => {
      this.Lcopdetails = res.response;
      this.plannames = res.response.planName;
      console.log("plannames" + this.plannames)
      this.price = res.response.price;
      console.log("price" + this.price)
      this.SelectedPackageAmount = res.response.totalAmount;
      console.log("SelectedPackageAmount" + this.SelectedPackageAmount)
      this.OverplanAmount = res.response.overallAmount;
      console.log("OverplanAmount" + this.OverplanAmount)
    });

    this.service.FreeChannelForEdit(this.lcopidss).subscribe((res: any) => {
      if (res.flag == 1) {
        this.FreeChannelsforEdit = res.response
      }
    });

    this.service.PaidChannelForEdit(this.lcopidss).subscribe((res: any) => {
      if (res.flag == 1) {
        this.PaidChannelsforEdit = res.response
      }
    });

    this.service.BouqueteForEdit(this.lcopidss).subscribe((res: any) => {
      if (res.flag == 1) {
        this.BouquetsforEdit = res.response
      }
    });




    this.service.FreechannelsActive().subscribe((res: any) => {
      if (res.flag == 1) {
        this.permissionValue = res.response;
        // this.permissionValue.forEach((element: any) => {
        //   this.values2.push({
        //     value: element.alcotId,
        //     viewValue: element.channelName,
        //   });
        // });
      }
    });
    this.service.PaidChannelsActive().subscribe((res: any) => {
      if (res.flag == 1) {
        this.paidplan = res.response;
        // this.paidplan.forEach((element: any) => {
        //   this.values3.push({
        //     values: element.alcotId,
        //     viewValues: element.channelName,
        //   });
        // });
      }
    });

    this.service.ActiveBouquetePlans().subscribe((res: any) => {
      if (res.flag == 1) {
        this.broadcasterplan = res.response;
        console.log(this.broadcasterplan);
        this.broadcasterplan.forEach((element: any) => {
          this.values4.push({
            valuesplan: element.bouquetCreation?.boqCreationId,
            viewValuesplan: element.bouquetCreation?.bouquetName,
            viewbouquetid: element.bouquetId,
          });
        });
      }
    });



    // this.ActivateRoute.params.subscribe((param: any) => {
    //   this.getRoleId = param.values;
    //   console.log("getRoleId" + this.getRoleId )
    //   this.getRoleId = this.data.values;
    //   console.log("getRoleId" + this.getRoleId )
    // });

    // this.ActivateRoute.params.subscribe((param: any) => {
    //   this.getRoleName = param.sub;
    //   this.getRoleName = this.data.sub;
    //   console.log("dbfbhdc" + this.getRoleName )
    // });



    // this.ActivateRoute.params.subscribe((param: any) => {
    //   this.getPerValue = param.bouqt;
    //   this.getPerValue = this.data.bouqt;

    // });
    // this.ActivateRoute.params.subscribe((param: any) => {
    //   this.getamt = param.amt;
    //   this.getamt = this.data.amt;

    // });

    // this.ActivateRoute.params.subscribe((param: any) => {
    //   this.getid = param.id;
    //   console.log(this.getid);
    //   this.getid = this.data.id;
    // });

    // this.ActivateRoute.params.subscribe((param: any) => {
    //   this.getoverall = this.data.overallamount;

    // });
    // this.ActivateRoute.params.subscribe((param: any) => {
    //   this.getlpamount = this.data.lcoptotalamount;

    // });

    // this.ActivateRoute.params.subscribe((param: any) => {
    //   this.getlpids = this.data.lpsid;

    // });
    // this.ActivateRoute.params.subscribe((param: any) => {
    //   this.getid = param.id;
    //   console.log(this.getid);
    //   this.lcopplamnames = this.data.lcopplan;
    //   console.log(this.lcopplamnames);
    // });

    this.lcopedit = new FormGroup({
      free: new FormControl([], []),
      paid: new FormControl([], []),
      plans: new FormControl([], [Validators.required]),
      lcop: new FormControl('', [Validators.required]),
      lpamount: new FormControl('', [Validators.required]),
      lpoverall: new FormControl(null, [Validators.required]),
    });
  }

  get free() {
    return this.lcopedit.get('free');
  }

  get paid() {
    return this.lcopedit.get('paid');
  }
  get plans() {
    return this.lcopedit.get('plans');
  }
  get lcop() {
    return this.lcopedit.get('lcop');
  }

  get lpamount() {
    return this.lcopedit.get('llpamountcop');
  }
  get lpoverall() {
    return this.lcopedit.get('lpoverall');
  }
  close() { }


  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }


  toggleAllSelection1() {
    if (this.allSelected1) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }

  selectss(id: any) {
    this.ADD = id;
  }

  showToggle() {
    this.viewForm = !this.viewForm;
  }

  toggleAllSelection2() {
    if (this.allSelected2) {
      this.selectsplan.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectsplan.options.forEach((item: MatOption) => item.deselect());
    }
  }
  Calculate() {
    // let selectedBouquetIds = this.plans?.value.map((selectedPlanId: any) => {
    //   return this.values4.find((plan: any) => plan.valuesplan == selectedPlanId)
    //     .viewbouquetid;
    // });
    let submitModel: LCOPcalculationforEdit = {
      freeChannel: this.free?.value,
      paidChannel: this.paid?.value,
      bouquetId: this.plans?.value,
    };

    this.service.LCOPCalculationForEdit(this.lcopidss, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewamount = true;
        this.CalculatedAmount = res.response;
        console.log('ejfwkejf' + this.CalculatedAmount)

        this.toastr.success(res.responseMessage);
      } else if (res.flag == 2) {
        this.toastr.success(res.responseMessage);
        this.Viewamount = false;
      }
    });
  }
  getmethod() {
    this.Viewamount = false;
    this.SelectedPackageAmount = ''
  }

  Lcopedit() {

    // let selectedBouquetIds = this.plans?.value.map((selectedPlanId: any) => {
    //   return this.values4.find((plan: any) => plan.valuesplan == selectedPlanId)
    //     .viewbouquetid;
    // });

    const totalpackageAmount = (Number(this.CalculatedAmount == undefined ? 0 : this.CalculatedAmount) + Number(this.SelectedPackageAmount) + Number(this.lpoverall?.value == null ? this.price : this.lpoverall?.value));
    console.log("totalpackageAmount" + totalpackageAmount)
    // console.log(typeof(totalpackageAmount))
    let submitModel: lcopedit = {
      lcopId: this.lcopidss,
      plan: this.lcop?.value.trim(),
      totalAmount: this.CalculatedAmount,
      price: this.lpoverall?.value || this.price,
      overallAmount: totalpackageAmount || this.OverplanAmount,
      modifiedBy: this.getadminname,
      freeChannel: this.free?.value,
      paidChannel: this.paid?.value,
      bouquetId: this.plans?.value,
    }
    this.service.Lcopedit(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll();
    
      } else {
        this.toastr.warning(res.responseMessage)
      }
    })
  }
}
