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
  id:any


  constructor(public loaderService: LoaderService, private router: Router,   private service: FarginServiceService, private cdRef: ChangeDetectorRef) { }
  ngOnInit():void{
 

      this.service.actvemerchant().subscribe((res: any) => {
        this.activemerchant = res.response;
        
  
      });
  

    
      const today = new Date();
      this.maxDate = moment(today).format('yyyy-MM-DD').toString()
  }
 


  getmonthtransaction(event: any) {
    this.selectedPeriods = event;
    if (event == 'LastMonths') {
      this.service.dashboardlastmonthcustomertransactions(this.id).subscribe((res: any) => {
        this.lastmonth = res.response;
      });

    }

    if (event == 'thisMonths') {
      this.service.dashboardthismonthcustomertransactions(this.id).subscribe((res: any) => {
        this.lastmonth = res.response;
      })

    }
  }
  custom() {
    this.service.dashboarddatecustomertransactions(this.id, this.fromDates, this.toDates).subscribe((res: any) => {
      this.lastmonth = res.response
    })

  }

  getadditionalmonthtransaction(event: any) {
    this.selectedadditionalPeriods = event;
    if (event == 'LastaditionalMonths') {
      this.service.dashboardlastmonthadditionaltransactions(this.id).subscribe((res: any) => {
        this.additionalmonth = res.response;
      });

    }

    if (event == 'thisadditionalMonths') {
      this.service.dashboardthismonthadditionaltransactions(this.id).subscribe((res: any) => {
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
    this.id=event.target.value;
    
   
    this.service.dashboardcount(this.id).subscribe((res: any) => {
      this.customercount = res.response;
    });
    this.service
    .dashboardviewpendings(this.id)
    .subscribe((res: any) => {
      this.duepending = res.response;
    });
    this.service
      .dashboardemployeecounts(this.id)
      .subscribe((res: any) => {
        this.dashboardemployecount = res.response;
      });


      this.service.dashbaordcustomerday(this.id).subscribe((res: any) => {
        this.customertotal = res.response;
      });
    
      this.additionalmonth='';
      this.lastmonth=''
      this.fromDates='';
      this.toDates='';
      this.selectedPeriods=''
      this.selectedadditionalPeriods=''

  }
  
}
