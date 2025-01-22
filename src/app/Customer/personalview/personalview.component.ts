import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';
import { ChannelViewComponent } from '../channel-view/channel-view.component';
import { ActiveCustomer, setupboxstatus } from '../../fargin-model/fargin-model.module';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LcopaddComponent } from '../lcopadd/lcopadd.component';
import { BouquetaddComponent } from '../bouquetadd/bouquetadd.component';
import { AddAlcotComponent } from '../add-alcot/add-alcot.component';
import { AddSetupboxPlanComponent } from '../add-setupbox-plan/add-setupbox-plan.component';
import { ManuvalpayWithoutOtpComponent } from '../../Transaction/manuvalpay-without-otp/manuvalpay-without-otp.component';
import { ReturnDuesComponent } from '../../Transaction/return-dues/return-dues.component';
import { TransactionManualpayComponent } from '../../Transaction/transaction-manualpay/transaction-manualpay.component';
import { CommentbyComponent } from '../../Transaction/transaction-view/commentby/commentby.component';
import { TransactionViewbyidComponent } from '../../Transaction/transaction-viewbyid/transaction-viewbyid.component';
import { UpdateCusduesComponent } from '../../Transaction/update-cusdues/update-cusdues.component';
import { CreateAdditionalComponent } from '../Additional-Payments/create-additional/create-additional.component';
import { UpdateAdditionalComponent } from '../Additional-Payments/update-additional/update-additional.component';
import { EditcustomerSetupboxComponent } from '../editcustomer-setupbox/editcustomer-setupbox.component';
import { DuestatusonoffComponent } from '../duestatusonoff/duestatusonoff.component';
import { RemainderstatusComponent } from '../remainderstatus/remainderstatus.component';

@Component({
  selector: 'app-personalview',
  templateUrl: './personalview.component.html',
  styleUrl: './personalview.component.css'
})
export class PersonalviewComponent {
  id: any;
  customerview: any;
  customerviewalcot: any
  customer: any;
  selectedTab: string = 'customer-info'; // Default to 'customer-info'
  items: any[] = []; // The array of items to paginate
  page: number = 1;
  page1: number = 1;
  page2: number = 1;
  page3: number = 1;
  page4: number = 1;
  page5: number = 1;

  term: any;
  selected: any;
  // selecteded: string = '5';
  dataSource: any;
  searchText: any;

  data: any;
  status: any;
  viewcustomer: any;
  alcotchannel: any;
  bouquetPlan: any;
  lcopChannel: any;
  transaction: any;
  showData: boolean = false;
  viewData: boolean = false;
  alcotlist: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  getadminname = localStorage.getItem('fullname');
  valuecustomerinfo: any;
  valuecustomerplan: any;
  valuecustomertransaction: any;
  customerId: any;
  isChecked: any;
  totalAmount: number = 0;
  totalbouqet: number = 0;
  totallcop: number = 0;
  overallAmount: number = 0;
  valuealcotadd: any;
  valuealcotstatus: any;
  valuebouqAdd: any;
  valuebouqStatus: any;
  valuelcopaddd: any;
  valuelcopstatus: any;
  setupboxview: any;
  stbId: any;
  roleName = localStorage.getItem('roleName')
  valueaddsetupbox: any;
  valuesetupboxstatus: any;
  valuesetupboxview: any;
  totalamounts: any;
  manuvalpaymentstatus: any = localStorage.getItem('customerManualStatus');
  limit: number = 30;
  isFullPolicyVisible: boolean = false;
  customerid: any;
  dataval: any;
  additionlpay: any;
  valueAdditionalPayments: any;
  valueaddsetupboxhistory: any;
  valuesetupboxedit: any;
  valueAdditionalPaymentsadd: any;
  valueAdditionalPaymentsaction: any;
  valueAdditionalPaymentsInvoice: any;
  valuetransamt: any;
  valuetransview: any;
  valuetransReciept: any;
  valuetransManualPayment: any;
  valuetransRefund: any;
  valuetransReverseDues: any;
  valuesetupboxduestatus: any;
  valuesetupboxReminder: any;
  valuesetupboxDueStatusHistory: any;
  refundval: any;
  valueRefunds: any;
  currentPage: number=1;

  selectTab(tab: string) {
    this.selectedTab = tab;
  }


  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute, private location: Location

  ) { }

  ngOnInit(): void {


    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;

    });

    this.service.ViewCustomerBasicInfo(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewcustomer = res.response;
        // this.alcotchannel = res.response.alcotList;
        // this.bouquetPlan = res.response.bouquetList;
        // this.lcopChannel = res.response.lcopList;
        // this.customerId = res.response.customerdetail.customerId;
        // let totalAmount = 0;
        // const alcotList = res.response.alcotList;


        // for (let i = 0; i < alcotList.length; i++) {
        //   totalAmount += alcotList[i].price;
        // }

        // this.totalAmount = totalAmount;
        // this.viewData = true;


        // let totalbouqet = 0;
        // const bouquetList = res.response.bouquetList;

        // for (let i = 0; i < bouquetList.length; i++) {
        //   totalbouqet += bouquetList[i].broadCasterId.amount;
        // }

        // this.totalbouqet = totalbouqet;
        // this.viewData = true;


        // let totallcop = 0;
        // const lcopList = res.response.lcopList;

        // for (let i = 0; i < lcopList.length; i++) {
        //   totallcop += lcopList[i].overallAmount;
        // }

        // this.totallcop = totallcop;

        // this.viewData = true;
        // this.overallAmount = this.totalAmount + this.totalbouqet + this.totallcop;
      }
      else {
        this.viewData = false;

      }

    });

    this.service.CustomerTotalPlanAmount(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.totalamounts = res.response.totalAmount;
      }
    })


    this.service.ViewCustomersSetupBox(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.setupboxview = res.response.reverse();
      }
    })
    this.service.CustomerTransaction(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response.reverse();
        this.showData = true;

      }
      else {
        this.showData = false
      }
    })
    this.service.AdditionalPaymentsCustomerTransaction(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.additionlpay = res.response.reverse();
      }
    })
    this.service.RefundForCustomerView(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.refundval = res.response.reverse();

      }
      else if (res.flag === 2) {
        this.refundval = [];


      }
    })

    if (this.roleName == 'Merchant Super admin') {
      this.valuecustomerinfo = 'Customer-Customer Information';
      this.valuecustomerplan = 'Customer-Setup-box';
      this.valuecustomertransaction = 'Customer-Transaction';
      this.valueaddsetupbox = 'Customer-Setupbox Add'
      this.valuesetupboxstatus = 'Customer-Setupbox Status'
      this.valuesetupboxview = 'Customer-Setupbox View'
      this.valueaddsetupboxhistory = 'Customer-Setupbox History'
      this.valuesetupboxedit = 'Customer-Setupbox Edit'
      this.valueAdditionalPayments = 'Customer-Additional Payments'
      this.valueAdditionalPaymentsadd = 'Customer-Additional Payments Add'
      this.valueAdditionalPaymentsaction = 'Customer-Additional Payments Edit'
      this.valueAdditionalPaymentsInvoice = 'Customer-Additional Payments Invoice'
      this.valuetransamt = 'Customer-Transaction Updated Amount'
      this.valuetransview = 'Customer-Transaction View'
      this.valuetransReciept = 'Customer-Transaction Reciept'
      this.valuetransManualPayment = 'Customer-Transaction Manual Payment'
      this.valuetransRefund = 'Customer-Transaction Refund'
      this.valuesetupboxduestatus = 'Customer-Setupbox Due Status'
      this.valuesetupboxReminder = 'Customer-Setupbox Reminder'
      this.valuesetupboxDueStatusHistory = 'Customer-Setupbox Due Status History'
      this.valueRefunds = 'Customer-Refunds'


    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Customer-Setupbox Edit') {
              this.valuesetupboxedit = 'Customer-Setupbox Edit'
            }
            if (this.actions == 'Customer-Customer Information') {
              this.valuecustomerinfo = 'Customer-Customer Information'
            }
            if (this.actions == 'Customer-Setup-box') {
              this.valuecustomerplan = 'Customer-Setup-box'
            }
            if (this.actions == 'Customer-Transaction') {
              this.valuecustomertransaction = 'Customer-Transaction'
            }
            if (this.actions == 'Customer-Setupbox Add') {
              this.valueaddsetupbox = 'Customer-Setupbox Add'
            }
            if (this.actions == 'Customer-Setupbox Status') {
              this.valuesetupboxstatus = 'Customer-Setupbox Status'
            }
            if (this.actions == 'Customer-Setupbox View') {
              this.valuesetupboxview = 'Customer-Setupbox View'
            }

            if (this.actions == 'Customer-Setupbox History') {
              this.valueaddsetupboxhistory = 'Customer-Setupbox History'
            }
            if (this.actions == 'Customer-Additional Payments') {
              this.valueAdditionalPayments = 'Customer-Additional Payments'
            }

            if (this.actions == 'Customer-Additional Payments Add') {
              this.valueAdditionalPaymentsadd = 'Customer-Additional Payments Add'
            }
            if (this.actions == 'Customer-Additional Payments Edit') {
              this.valueAdditionalPaymentsaction = 'Customer-Additional Payments Edit'
            }
            if (this.actions == 'Customer-Additional Payments Invoice') {
              this.valueAdditionalPaymentsInvoice = 'Customer-Additional Payments Invoice'
            }
            if (this.actions == 'Customer-Transaction Updated Amount') {
              this.valuetransamt = 'Customer-Transaction Updated Amount'
            }

            if (this.actions == 'Customer-Transaction View') {
              this.valuetransview = 'Customer-Transaction View'
            }

            if (this.actions == 'Customer-Transaction Reciept') {
              this.valuetransReciept = 'Customer-Transaction Reciept'
            }

            if (this.actions == 'Customer-Transaction Manual Payment') {
              this.valuetransManualPayment = 'Customer-Transaction Manual Payment'
            }

            if (this.actions == 'Customer-Transaction Refund') {
              this.valuetransRefund = 'Customer-Transaction Refund'
            }

            if (this.actions == 'Customer-Transaction Reverse Dues') {
              this.valuetransReverseDues = 'Customer-Transaction Reverse Dues'
            }

            if (this.actions == 'Customer-Setupbox Due Status') {
              this.valuesetupboxduestatus = 'Customer-Setupbox Due Status'
            }

            if (this.actions == 'Customer-Setupbox Reminder') {
              this.valuesetupboxReminder = 'Customer-Setupbox Reminder'
            }

            if (this.actions == 'Customer-Setupbox Due Status History') {
              this.valuesetupboxDueStatusHistory = 'Customer-Setupbox Due Status History'
            }

            if (this.actions == 'Customer-Refunds') {
              this.valueRefunds = 'Customer-Refunds'
            }


          }
        }

      })
    }


  }

  close() {
    this.location.back()
  }

  Viewchannels(id: any) {

    this.dialog.open(ChannelViewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      data: { value: id }
    })
  }


  addsetupboxplan(id: any) {
    this.dialog.open(AddSetupboxPlanComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true,
      data: { value: this.id }
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.ViewCustomersSetupBox(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.setupboxview = res.response.reverse();
        }
      })
    })
  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    // let submitmodel: ActiveCustomer = {
    //   activeStatus: this.isChecked ? 1 : 0,

    // }

    let submitmodel: setupboxstatus = {
      modifiedBy: this.getadminname,
      activeStatus: this.isChecked ? 1 : 0,
      statusRemarks: ''
    }
    this.service.ActiveStatusSetupbox(id, submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.service.ViewCustomersSetupBox(this.id).subscribe((res: any) => {
            if (res.flag == 1) {
              this.setupboxview = res.response.reverse();
            }
          });
        }, 500);
      }

      else {
        this.toastr.error(res.responseMessage);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }

    });





  }

  dueStatus(id: any, id1: any) {
    this.dialog.open(DuestatusonoffComponent,
      {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        data: {
          value: id,
          value1: id1
        }
      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.service.ViewCustomersSetupBox(this.id).subscribe((res: any) => {
          if (res.flag == 1) {
            this.setupboxview = res.response.reverse();
          }
        })
      }) 
  }

  remainderstatus(id: any) {
    this.dialog.open(RemainderstatusComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      data: {
        value: id

      }
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.ViewCustomersSetupBox(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.setupboxview = res.response.reverse();
        }
      })
    })
  }
  Viewdata(id: any) {
    this.stbId = id;
    this.router.navigate([`dashboard/plan-particular-setupbox/${id}`], {
      queryParams: {
        Alldata: this.stbId,
        Alldata1: this.id

      },
    });

  }

  comment(id: any) {
    this.dialog.open(CommentbyComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
    });
  }


  view(id: any) {
    this.dialog.open(TransactionViewbyidComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }

  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }

  refund(viewall: any) {
    let submitModel =
    {
      payId: viewall.customerPayId,
      customerId: viewall.customerId.customerId,
      amount: viewall.paidAmount
    }
    this.service.CutsomerRefunds(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
      }
      else {
        this.toastr.error(res.responseMessage
        )
      }
    })
  }


  reload() {
    window.location.reload()
  }

  setuphistory(id: any) {
    this.router.navigate([`dashboard/setupboxhistorys`], {
      queryParams: { Alldata: id },
    })
  }


  dues(id: any) {
    this.dialog.open(ReturnDuesComponent, {
      width: '80vw',// Use percentage to make it responsive
      maxWidth: '400px',
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }

  Updatedue(id: any) {
    this, this.dialog.open(UpdateCusduesComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true,
      data: { value: id },
    })
  }



  manuvalpayments(id: any) {
    if (this.manuvalpaymentstatus == 1) {
      this.dialog.open(TransactionManualpayComponent, {
        data: { value: id },
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
      })

    }

    else if (this.manuvalpaymentstatus == 0) {
      this.dialog.open(ManuvalpayWithoutOtpComponent, {
        data: { value: id },
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
      })
    }
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.CustomerTransaction(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.transaction = res.response.reverse();
          this.showData = true;
  
        }
        else {
          this.showData = false
        }
      })
    })

  }


  addAdditional() {
    this.dialog.open(CreateAdditionalComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      data: { value: this.id }
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.AdditionalPaymentsCustomerTransaction(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.additionlpay = res.response.reverse();
        }
      })
    })
  }

  editpayment(data: any) {
    this.dataval = data
    this.dialog.open(UpdateAdditionalComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      data: {
        value: this.dataval

      }
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.AdditionalPaymentsCustomerTransaction(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.additionlpay = res.response.reverse();
        }
      })
    })
  }

  viewreciept(id: any) {
    this.service.InvoiceAdditionalPayments(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }

  editsetupboxplan(id: any) {
    this.dialog.open(EditcustomerSetupboxComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      data: {
        value: id


      }
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.ViewCustomersSetupBox(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.setupboxview = res.response.reverse();
        }
      })
    })
  }
  Viewhistory(id: any) {
    this.stbId = id;
    this.router.navigate([`dashboard/historyforremainder/${id}`], {
      queryParams: {
        Alldata: this.stbId,
        Alldata1: this.id

      },
    });

  }
  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter(item =>
      item.subpermissionValue.toLowerCase().includes(searchText.toLowerCase())
    );
  }
 
  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }

  setupboxviewhistory(id:any,id1:any) {
    // this.merchantId =merchantId;
    this.router.navigate([`dashboard/setupbox-history/${id}/${id1}`], {
      queryParams: {
        Alldata:id,
        Alldata1:id1,
 
 
      },
    });
 
  }  
}