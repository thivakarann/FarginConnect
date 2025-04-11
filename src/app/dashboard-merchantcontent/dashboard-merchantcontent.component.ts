import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../Loader service/loader.service';
import { FarginServiceService } from '../service/fargin-service.service';
import moment from 'moment';

@Component({
  selector: 'app-dashboard-merchantcontent',
  templateUrl: './dashboard-merchantcontent.component.html',
  styleUrl: './dashboard-merchantcontent.component.css'
})
export class DashboardMerchantcontentComponent {
 customercount: any;
 
  duepending: any;
  dashboardemployecount: any;
  customertotal: any;
  selectedPeriods:string='thisMonths';
  lastmonth: any;
  fromDates: any;
  toDates: any;
  maxDate: any;
  selectedadditionalPeriods: any;
  additionalmonth: any;
  activemerchant:any;
  merchantId:any
  myForm: any;
  viewcustomersearch: any;
  customerInput: string = '';
  isNoDataFound: boolean=false;
  roleId: any = sessionStorage.getItem('roleId');
  getdashboard: any[] = [];
  actions: any;
  errorMessage: any;
  valueCustomerView:any;
  valueTicketsView:any;
  valueEmployeeView:any;
  valuetodaytrans:any;
  Monthtrans:any;
  AdditionTrans:any;



  constructor(public loaderService: LoaderService, private router: Router,   private service: FarginServiceService, private cdRef: ChangeDetectorRef) { }
  ngOnInit():void{
 

      // this.service.actvemerchant().subscribe((res: any) => {
      //   this.activemerchant = res.response;
        
  
      // });

      this.service.rolegetById(this.roleId).subscribe({
        next: (res: any) => {
  
  
          if (res.flag == 1) {
            this.getdashboard = res.response?.subPermission;
  
            if (this.roleId == 1) {
              this.valueCustomerView = 'Customer Overview';
              this.valueTicketsView = 'Ticket Overview';
              this.valueEmployeeView = 'Employee Overview';
              this.valuetodaytrans = 'Today Transactions';
              this.Monthtrans = 'Monthly Collection Analytics';
              this.AdditionTrans = 'Additional Collection Analytics'
              
          
            }
            else {
              for (let datas of this.getdashboard) {
                this.actions = datas.subPermissions;
  
  
                if (this.actions == 'Customer Overview') {
                  this.valueCustomerView = 'Customer Overview';
                }

                if (this.actions == 'Ticket Overview') {
                  this.valueTicketsView = 'Ticket Overview';
                }

                if (this.actions == 'Employee Overview') {
                  this.valueEmployeeView = 'Employee Overview';
                }

                if (this.actions == 'Today Transactions') {
                  this.valuetodaytrans = 'Today Transactions';
                }

                if (this.actions == 'Monthly Collection Analytics') {
                  this.Monthtrans = 'Monthly Collection Analytics';
                }

                if (this.actions == 'Additional Collection Analytics') {
                  this.AdditionTrans = 'Additional Collection Analytics';
                }
            
              }
            }
          }
          else {
            this.errorMessage = res.responseMessage;
          }
        }
      })
  

    
      const today = new Date();
      this.maxDate = moment(today).format('yyyy-MM-DD').toString()


      this.loadInitialSetupBoxes();
  }
 


  getmonthtransaction(event: any) {
    this.selectedPeriods = event;
    if (event == 'LastMonths') {
      this.service.dashboardlastmonthcustomertransactions(this.merchantId).subscribe((res: any) => {
        this.lastmonth = res.response;
      });

    }

    if (event == 'thisMonths') {
      this.service.dashboardthismonthcustomertransactions(this.merchantId).subscribe((res: any) => {
        this.lastmonth = res.response;
      })

    }
  }
  custom() {
    this.service.dashboarddatecustomertransactions(this.merchantId, this.fromDates, this.toDates).subscribe((res: any) => {
      this.lastmonth = res.response
    })

  }

  getadditionalmonthtransaction(event: any) {
    this.selectedadditionalPeriods = event;
    if (event == 'LastaditionalMonths') {
      this.service.dashboardlastmonthadditionaltransactions(this.merchantId).subscribe((res: any) => {
        this.additionalmonth = res.response;
      });

    }

    if (event == 'thisadditionalMonths') {
      this.service.dashboardthismonthadditionaltransactions(this.merchantId).subscribe((res: any) => {
        this.additionalmonth = res.response;
      })

    }
  }
  resetmonth()
  {
    this.fromDates='';
    this.toDates='';
    this.selectedPeriods=''

  }
  future(value: any) {
    value.reset()
  }

  merchant(event:any)
  {
    this.merchantId=event.target.value;
    
   
    

  }


  loadInitialSetupBoxes() {
    this.service.actvemerchant().subscribe((res: any) => {
      this.activemerchant = res.response;
    });

    this.customercount=''
    this.dashboardemployecount=''
    this.duepending=''
    this.additionalmonth='';
    this.lastmonth=''
    this.fromDates='';
    this.toDates='';
    this.selectedPeriods=''
    this.selectedadditionalPeriods=''
    this.customertotal=''

  }

  onInputChange() {
    const input = this.customerInput
      if (!input) {
        this.loadInitialSetupBoxes(); 
        return;
      } 

      for (let index = 0; index < this.activemerchant.length; index++) {
        const element = this.activemerchant[index];
        if (element.entityName == this.customerInput) {
          this.merchantId = element.merchantId
          console.log(this.merchantId);
          
        }
      }

      this.service.dashboardcount(this.merchantId).subscribe((res: any) => {
        this.customercount = res.response;
      });
      this.service
      .dashboardviewpendings(this.merchantId)
      .subscribe((res: any) => {
        this.duepending = res.response;
      });
      this.service
        .dashboardemployeecounts(this.merchantId)
        .subscribe((res: any) => {
          this.dashboardemployecount = res.response;
        });
  
  
        this.service.dashbaordcustomerday(this.merchantId).subscribe((res: any) => {
          this.customertotal = res.response;
        });
      
         this.customercount=''
    this.dashboardemployecount=''
    this.duepending=''
    this.additionalmonth='';
    this.lastmonth=''
    this.fromDates='';
    this.toDates='';
    this.selectedPeriods=''
    this.selectedadditionalPeriods=''
    this.customertotal=''
  }

  fetchSetupBoxData() {
    if (!this.customerInput) {
      this.loadInitialSetupBoxes();
      this.isNoDataFound = false; // Reset the flag
      return;
    }
  
    this.service.actvemerchantsearch(this.customerInput).subscribe((res: any) => {
      if (res.response && res.response.length > 0) {
        this.activemerchant = res.response;
        this.isNoDataFound = false; // Reset the flag as data exists
      } else {
        this.activemerchant = []; // Clear the merchant list
        this.isNoDataFound = true; // Set flag to true to display "No data found"
      }
    }, (error) => {
      console.error('Error fetching merchant data:', error);
      this.isNoDataFound = true; // Handle error scenario
    });
  }
  
}
