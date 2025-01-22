import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartData, registerables } from 'chart.js';
import { FarginServiceService } from '../../service/fargin-service.service';
import { DashboardData } from '../../fargin-model/fargin-model.module';
import { FormGroup, FormControl } from '@angular/forms';
import moment from 'moment';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboardcontent',
  templateUrl: './dashboardcontent.component.html',
  styleUrl: './dashboardcontent.component.css'
})
export class DashboardcontentComponent {
  emailststaus = Number(localStorage.getItem('emailOtpVerificationStatus')) || '';
  smsstatus = Number(localStorage.getItem('smsOtpVerificationstatus')) || '';
  technical = localStorage.getItem('technicalPayStatus') || '';
  merchantId = Number(localStorage.getItem('merchantId')) || '';
  merchantAdminId = Number(localStorage.getItem('merchantAdminId')) || '';
  customRange: any;
  max: any;
  customercount: any;
  cutsomerange: any;
  selectedPeriod: string = '';
  fromDate: string | null = null;
  toDate: string | null = null;
  transaction: any;
  chartcustomer: Chart | null = null;
  chart: Chart | null = null;
  sevenChart: Chart | null = null;
  chartemployee: Chart | null = null;
  sevendays: any;
  er: any;
  fifteendays: any;
  thirtyday: any;
  customdate: any;
  daytrasanction: any;
  customerdetails: any[] = [];
  searchInput: string = '';
  searchResult: any;
  FourtStataus: boolean = false;
  errorMessage: string = '';
  customerId: any;
  mobilebased: any;
  currentDate: any;
  customerday: any;
  transactionErrorMessage: any;
  valuedashboardcontent: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  bussinessId = localStorage.getItem('bussinessId')
  customertotal: any;
  customersevenday: any;
  sevenss: any;
  terms: any;
  policyId: any;
  approvedstatus: any;
  sms: any;
  announcement: any;
  checkStatus: boolean = false;
  roleName = localStorage.getItem('roleName')
  customertransactionform: any = FormGroup;
  valueannouncements: any;
  valueCustomerOverview: any;
  valueTicketOverview: any;
  valuetodatrans: any;
  valueTransactionDetails: any;
  valuetop: any;
  valuesevendays: any;
  smsactive = Number(localStorage.getItem('smsStatus')) || '';
  selectedPeriods: string = 'thisMonths';
  selectedemployee: string = 'employeetodays';
  lastmonth: any;
  valuetomontlydatrans: any;
  duepending: any;
  dashboardemployecount: any;
  dashboardallcotes: any;
  employeeform: any = FormGroup;
  transactionform: any = FormGroup;
  selected: any;
  adminIdValue: any;
  todayemployee: any;
  sevenemployee: any;
  monthemployee: any;
  viewemployee: any;
  valueemployeeOverview: any;
  valuesetupbox: any;
  valueemployeetrans: any;

  adminName = localStorage.getItem('adminName')
  employeebasedtrasnaction: any;
  selectedonoff: string = 'todayonoff';
  ontoday: any;
  onyesterday: any;
  valuereminder: any;
  maxDate: any;
  valuecustomerwise: any;
  selectedBranch: any;
  branchfromDates: any;
  branchtoDates: any;
  branchmonth: any;
  selectedbranchPeriods: any;
  branchviews: any;
  branchstatus: boolean = false;
  valueBranchwise:any;
  constructor(private router: Router, private service: FarginServiceService, private cdRef: ChangeDetectorRef) { }
  ngOnInit(): void {

    // const time = setTimeout(() => {
    //   if (
    //     this.emailststaus == 1 &&
    //     this.smsstatus == 1 &&
    //     this.technical.toLowerCase() == 'success' &&
    //     this.approvedstatus == 'Approved' &&
    //     this.smsactive !== 1 || this.smsactive == 1 &&
    //     this.sms !== 'Pending') {
    //     this.checkStatus = true;

    //   }

    // }, 500);






    // const time = setTimeout(() => {
    //   console.log(this.sms + "sms")
    //   console.log(this.emailststaus + "emailststaus")
    //   console.log(this.smsstatus + "smsstatus")
    //   console.log(this.technical + "technical")
    //   console.log(this.approvedstatus + "approvedstatus")
    //   console.log(this.smsactive + "smsactive")
    //   if (


    //     this.emailststaus == 1 &&
    //     this.smsstatus == 1 &&
    //     this.technical.toLowerCase() == 'success' &&
    //     this.approvedstatus == 'Approved'

    //   ) {
    //     this.checkStatus = true;


    //     if (this.sms != 'Pending' &&
    //       this.smsactive == 1) {
    //       this.checkStatus = false;


    //     }

    //   }
    //   console.log(this.checkStatus + "fwjekfbjewk")
    //   console.log(this.technical.toLowerCase() + "jsdbkjqewbd")
    // }, 500);
    this.employeeform = new FormGroup({
      periods: new FormControl('', []),
      selectemployee: new FormControl('', []),
    });

    this.transactionform = new FormGroup({
      selectperiods: new FormControl('', []),
      selecttransaction: new FormControl('', []),


    });
    this.customertransactionform = new FormGroup({
      search: new FormControl('', []),
    });

    this.service.viewterm(this.merchantId).subscribe((res: any) => {
      this.terms = res.response;
      this.policyId = res.response?.EntityModel?.policyId;

      this.service.viewapprovepolicy(this.policyId).subscribe((res: any) => {
        this.approvedstatus = res.response.approvalStatus;
        this.checkConditions();
      });
    });
    this.service.smsmerchants(this.merchantId).subscribe((res: any) => {
      this.sms = res.response;
      this.checkConditions();
    });

    setTimeout(() => {
      this.emailststaus = 1;
      this.smsstatus = 1;
      this.technical.toLowerCase() == 'success'
      this.checkConditions();
    }, 300);
    ///condition
    // const time = setTimeout(() => {

    //   console.log(" this.emailststaus" + this.emailststaus)
    //   console.log(" this.smsstatus" + this.smsstatus)
    //   console.log(" this.technical" + this.technical)
    //   console.log(" this.approvedstatus" + this.approvedstatus)
    //   if (
    //     this.emailststaus == 1 &&
    //     this.smsstatus == 1 &&
    //     this.technical.toLowerCase() == 'success' &&
    //     this.approvedstatus == 'Approved'


    //   ) {
    //     this.FourtStataus = true
    //     console.log("this.FourtStataus for condi" + this.FourtStataus)


    //   }
    //   console.log("this.FourtStataus" + this.FourtStataus)
    //   console.log("this.smsactive" + this.smsactive)
    //   console.log("this.sms" + this.sms)

    //   if (this.FourtStataus == true) {
    //     this.checkStatus = true
    //     if (this.smsactive == 1 && this.sms == 'Pending') {
    //       this.checkStatus = false
    //       console.log("checkStatus for sms" + this.checkStatus)

    //     }

    //   }


    //   if (this.FourtStataus == false) {
    //     this.checkStatus = false
    //     console.log("checkStatuses" + this.checkStatus)

    //   }

    //   console.log("checkStatus" + this.checkStatus)
    //   this.cdRef.detectChanges();


    // }, 300);


    // const time = setTimeout(() => {
    //   if (
    //     this.emailststaus == 1 &&
    //     this.smsstatus == 1 &&
    //     this.technical.toLowerCase() == 'success' &&
    //     this.approvedstatus == 'Approved'
    //     // this.smsactive !== 1 || this.smsactive == 1 &&
    //     // this.sms !== 'Pending'

    //   )
    //    if( this.FourtStataus == true) {
    //     if(this.smsactive == 1 &&  this.sms == 'Pending'  ) {

    //     }
    //     {
    //       this.checkStatus == false
    //     }
    //    }

    //    else {
    //     this.checkStatus == true
    //    }



    // }, 500);


    this.service.announcementView(this.bussinessId).subscribe((res: any) => {
      this.announcement = res.response;
    })

    this.service.dashboardcount(this.merchantId).subscribe((res: any) => {
      this.customercount = res.response;
    });
    this.service.ViewCustomerByMerchantDetail(this.merchantId).subscribe((res: any) => {
      this.customerdetails = res.response;
    });
    this.service.dashbaordcustomerdayTransaction(this.merchantId).subscribe((res: any) => {
      this.customertotal = res.response;
    });
    this.service.dashboardcustomersevenday(this.merchantId).subscribe((res: any) => {
      this.sevenss = res.response;
    });
    this.service.dashboardcustomersevenday(this.merchantId).subscribe((res: any) => {
      this.customersevenday = res.response.method;
    });
    this.service.dashboardthismonthcustomertransactions(this.merchantId).subscribe((res: any) => {
      this.lastmonth = res.response;
    })

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

    this.service
      .dashboardsetupboxallcotes(this.merchantId)
      .subscribe((res: any) => {
        this.dashboardallcotes = res.response;
      });
    this.service.dashboardtodayemployees(this.merchantAdminId).subscribe((res: any) => {
      this.employeebasedtrasnaction = res.response;
    });

    this.service.dashboardcustomersevenamounts(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.createseven(res.response);
      }
      if (res.flag == 2) {
        this.createseven(res.response);
      }
    });


    this.service.dashboardcustomeroveralls(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.createMixedChart(res.response)

      }
      if (res.flag == 2) {
        this.createMixedChart(res.response)

      }
    })

    this.service.ViewAdminforcollections(this.merchantId).subscribe((res: any) => {
      this.viewemployee = res.response;
    });
    this.service.dashbaordtodayonoffcounts(this.merchantId).subscribe((res: any) => {
      this.ontoday = res.response;
    });
    this.initializeEmptyChart();
    
    this.service.BranchView(this.merchantId).subscribe((res: any) => {
      if(res.flag==1){
        this.branchviews = res.response;
        this.branchstatus = true;
 
      }
      else if (res.flag == 2) {
        this.branchstatus = false;
      }
    })

    if (this.roleName == 'Merchant Super admin') {
      this.valuedashboardcontent = 'Dashboard-View';
      this.valueannouncements = 'Dashboard-Announcement';
      this.valueCustomerOverview = 'Dashboard-Customer Overview'
      this.valueTicketOverview = 'Dashboard-Ticket Overview'
      this.valuetodatrans = 'Dashboard-Today Transaction'
      this.valueTransactionDetails = 'Dashboard-Transaction Details'
      this.valuetop = 'Dashboard-Top Payment Methods'
      this.valuesevendays = 'Dashboard-Seven Days Payment Method'
      // this.valuetomontlydatrans = 'Dashboard-Monthly Transaction'
      this.valuetomontlydatrans = 'Dashboard-Monthly Collection Amount'
      this.valueemployeeOverview = 'Dashboard-Employee Overview'
      this.valuesetupbox = 'Dashboard-SetupBox'
      this.valueemployeetrans = 'Dashboard-Employee Transaction Details'
      this.valuereminder = 'Dashboard-Reminder Status'
      this.valuecustomerwise = 'Dashboard-Customer Wise Transaction Details'
      this.valueBranchwise = 'Dashboard-Branch Wise Transaction Details'


    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;


          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Dashboard-View') {
              this.valuedashboardcontent = 'Dashboard-View'
            }
            if (this.actions == 'Dashboard-Announcement') {
              this.valueannouncements = 'Dashboard-Announcement'
            }
            if (this.actions == 'Dashboard-Customer Overview') {
              this.valueCustomerOverview = 'Dashboard-Customer Overview'
            }
            if (this.actions == 'Dashboard-Ticket Overview') {
              this.valueTicketOverview = 'Dashboard-Ticket Overview'
            }
            if (this.actions == 'Dashboard-Today Transaction') {
              this.valuetodatrans = 'Dashboard-Today Transaction'
            }
            if (this.actions == 'Dashboard-Transaction Details') {
              this.valueTransactionDetails = 'Dashboard-Transaction Details'
            }
            if (this.actions == 'Dashboard-Top Payment Methods') {
              this.valuetop = 'Dashboard-Top Payment Methods'
            }
            if (this.actions == 'Dashboard-Seven Days Payment Method') {
              this.valuesevendays = 'Dashboard-Seven Days Payment Method'
            }
            // if (this.actions == 'Dashboard-Monthly Transaction') {
            //   this.valuetomontlydatrans = 'Dashboard-Monthly Transaction'
            // }
            if (this.actions == 'Dashboard-Monthly Collection Amount') {
              this.valuetomontlydatrans = 'Dashboard-Monthly Collection Amount'
            }
            if (this.actions == 'Dashboard-Employee Overview') {
              this.valueemployeeOverview = 'Dashboard-Employee Overview'
            }
            if (this.actions == 'Dashboard-SetupBox') {
              this.valuesetupbox = 'Dashboard-SetupBox'
            }
            if (this.actions == 'Dashboard-Employee Transaction Details') {
              this.valueemployeetrans = 'Dashboard-Employee Transaction Details'
            }

            if (this.actions == 'Dashboard-Reminder Status') {
              this.valuereminder = 'Dashboard-Reminder Status'
            }

            if (this.actions == 'Dashboard-Customer Wise Transaction Details') {
              this.valuecustomerwise = 'Dashboard-Customer Wise Transaction Details'
            }
            if (this.actions == 'Dashboard-Branch Wise Transaction Details') {
              this.valueBranchwise = 'Dashboard-Branch Wise Transaction Details'
            }
          }

        }
      })
    }
    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()

  }

  get periods() {
    return this.employeeform.get('periods');
  }

  get selectemployee() {
    return this.employeeform.get('selectemployee');
  }

  get selectperiods() {
    return this.transactionform.get('selectperiods');
  }

  get selecttransaction() {
    return this.transactionform.get('selecttransaction');
  }
  get search() {
    return this.customertransactionform.get('search');
  }


  checkConditions() {
    console.log('this.emailststaus' + this.emailststaus);
    console.log('this.smsstatus' + this.smsstatus);
    console.log('this.technical' + this.technical);
    console.log('this.approvedstatus' + this.approvedstatus);
    if (
      this.emailststaus === 1 &&
      this.smsstatus === 1 &&
      this.technical.toLowerCase() === 'success' &&
      this.approvedstatus === 'Approved'
    ) {
      this.FourtStataus = true;
      console.log('this.FourtStataus for condi' + this.FourtStataus);
    }
    console.log('this.FourtStataus' + this.FourtStataus);
    console.log('this.smsactive' + this.smsactive);
    console.log('this.sms' + this.sms);
    if (this.FourtStataus === true) {
      this.checkStatus = true;
      if (this.smsactive === 1 && this.sms === 'Pending') {
        this.checkStatus = false;
        console.log('checkStatus for sms' + this.checkStatus);
      }
    }
    if (this.FourtStataus === false) {
      this.checkStatus = false;
      console.log('checkStatuses' + this.checkStatus);
    }
    console.log('checkStatus' + this.checkStatus);
    this.cdRef.detectChanges();
  }

  searchCustomer(): void {
    this.errorMessage = '';

    if (this.chartcustomer) {
      this.chartcustomer.destroy();
      this.chartcustomer = null;
    }
    this.searchInput = this.searchInput.trim();
    if (!this.searchInput) {
      this.searchResult = null;
      return;
    }

    const foundCustomer = this.customerdetails.find(
      (customer) => customer.mobileNumber === this.searchInput
    );

    if (foundCustomer) {
      this.searchResult = foundCustomer;
      this.errorMessage = '';
      this.customerId = foundCustomer.customerId;
      this.fetchTransactions(this.customerId);
    } else {
      this.errorMessage = 'Customer not found.';
      this.searchResult = false;  // Ensure searchResult is set to null
    }
  }


  fetchTransactions(customerId: number): void {
    this.service
      .dashbaordcustomermobilenumbers(customerId)
      .subscribe((res: any) => {
        if (this.chartcustomer) {
          this.chartcustomer.destroy();
        }

        if (res.flag === 1) {
          this.createcustomerMixedChart(res.response);
          this.transactionErrorMessage = '';
        } else if (res.flag === 2) {
          this.transactionErrorMessage =
            'No transactions found for this customer.';
          this.chartcustomer = null;
        }
      });
  }

  get(event: any) {
    this.selectedPeriod = event;
    if (event == 'Last7Days') {
      this.service.dashboardcustomersevenday(this.merchantId).subscribe((res: any) => {
        if (this.chart) {
          // this.chart.clear();
          this.chart.destroy();
        }
        if (res.flag == 1) {

          this.sevendays = res.response;
          this.createMixedChart(this.sevendays);
        }
        if (res.flag == 2) {
          this.sevendays = res.response;
          this.createMixedChart(this.sevendays);
        }
      });

    }

    if (event == 'Last14Days') {
      this.service.dashboardcustomerfifteenday(this.merchantId).subscribe((res: any) => {
        if (this.chart) {

          this.chart.destroy();
        }
        if (res.flag == 1) {
          this.fifteendays = res.response;
          this.createMixedChart(this.fifteendays);
        }
        if (res.flag == 2) {
          this.fifteendays = res.response;
          this.createMixedChart(this.fifteendays);
        }
      })

    }

    if (event == 'LastMonth') {
      this.service.dashboardcustomerlastmonths(this.merchantId).subscribe((res: any) => {
        if (this.chart) {
          this.chart.destroy();
        }
        if (res.flag == 1) {
          this.thirtyday = res.response;
          this.createMixedChart(this.thirtyday);
        }
        if (res.flag == 2) {
          this.thirtyday = res.response;
          this.createMixedChart(this.thirtyday);
        }
      })

    }
    if (event == 'thisMonth') {
      this.service.dashboardcustomerthismonths(this.merchantId).subscribe((res: any) => {
        if (this.chart) {
          this.chart.destroy();
        }
        if (res.flag == 1) {
          this.thirtyday = res.response;
          this.createMixedChart(this.thirtyday);
        }
        if (res.flag == 2) {
          this.thirtyday = res.response;
          this.createMixedChart(this.thirtyday);
        }
      })

    }

  }

  customranges() {
    this.service.dashboardcustomerstartenddates(this.merchantId, this.fromDate, this.toDate).subscribe((res: any) => {
      if (this.chart) {
        // this.chart.clear();
        this.chart.destroy();
      }
      if (res.flag == 1) {
        this.customdate = res.response;
        this.createMixedChart(this.customdate);
      }
      if (res.flag == 2) {
        this.customdate = res.response;
        this.createMixedChart(this.customdate);
      }


    })

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
  fromDates(merchantId: string | number, fromDates: any, toDates: any) {
    throw new Error('Method not implemented.');
  }
  toDates(merchantId: string | number, fromDates: any, toDates: any) {
    throw new Error('Method not implemented.');
  }

  //Day trasnaction
  createMixedChartDay(data: any): void {
    const { totalCount, successCount, failedCount, pendingCount } = data;

    const chartData = {
      labels: ['Total', 'Success', 'Failed', 'Pending'],
      datasets: [
        {
          label: 'Transaction Overview',
          data: [totalCount, successCount, failedCount, pendingCount],
          backgroundColor: ['#4CAF50', '#2196F3', '#f44336', '#FFC107'],
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
      ],
    };

    this.chart = new Chart('myCanva', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count'
            },
          },
          x: {
            title: {
              display: true,
              text: 'Transaction Types'
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      },
    });
  }
  createMixedChart(data: any): void {
    const { totalAmount, successAmount, PendingAmount } = data;

    const chartData = {
      labels: ['Total', 'Success', 'Pending'],
      datasets: [
        {
          label: 'Total',
          data: [totalAmount, 0, 0],
          backgroundColor: '#4CAF50',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
        {
          label: 'Success',
          data: [0, successAmount, 0],
          backgroundColor: '#2196F3',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
        {
          label: 'Pending',
          data: [0, 0, PendingAmount],
          backgroundColor: '#FFC107',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
      ],
    };
    this.chart = new Chart('myCanvas', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Transaction Types',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top', // Optional: control the legend position
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });
  }



  createseven(data: DashboardData[]): void {
    if (!data || data.length === 0) {
        console.error('No data provided for the chart');
        return;
    }
 
    const labels = data.map((item: DashboardData) => {
        const date = new Date(item.date);
        return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    });
 
    const totalCount = data.map((item: DashboardData) => item.totalCount);
    const totalAmount = data.map((item: DashboardData) => item.totalAmount);
 
    const chartData: ChartData<'bar', number[], string> = {
        labels: labels,
        datasets: [
            // {
            //     label: 'Total Count',
            //     data: totalCount,
            //     backgroundColor: '#2196F3',
            //     borderWidth: 1,
            //     type: 'bar' as const,
            // },
            {
                label: 'Total Amount',
                data: totalAmount,
                backgroundColor: '#2196F3',
                borderWidth: 1,
                type: 'bar' as const,
            },
        ],
    };
 
    if (this.sevenChart) {
        this.sevenChart.destroy();
    }
 
    this.sevenChart = new Chart('sevenChartCanvas', {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount / Count',
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const index = context.dataIndex;
                            return `Total Count: ${totalCount[index]}, Total Amount: ${totalAmount[index]}`;
                        },
                    },
                },
            },
        },
    });
}
  createcustomerMixedChart(data: any): void {
    const { totalAmount, successAmount, pendingAmount } = data;

    const chartData = {
      labels: ['Total', 'Success', 'Pending'],
      datasets: [
        {
          label: 'Total',
          data: [totalAmount, 0, 0],
          backgroundColor: '#4CAF50',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
        {
          label: 'Success',
          data: [0, successAmount, 0],
          backgroundColor: '#2196F3',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
        {
          label: 'Pending',
          data: [0, 0, pendingAmount],
          backgroundColor: '#FFC107',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
      ],
    };
    this.chartcustomer = new Chart('mycustomerCanvas', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Transaction Types',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top', // Optional: control the legend position
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });
  }
  resetcustomerTransactionForm(): void {
    this.customertransactionform.reset({ search: '' });
    this.errorMessage = '';
    this.transactionErrorMessage = '';
    this.searchResult = null;
    if (this.chartcustomer) {
      this.chartcustomer.destroy();
      this.chartcustomer = null;
    }
  }

  //Employees
  getemployee(event: any) {
    this.selected = event.target.value;
    this.adminIdValue = '';
    this.employeeform.controls['selectemployee'].reset();
  }

  getmerchantadminid(event: any) {
    this.adminIdValue = event.target.value;

    if (this.selected == 'todayEmployee') {
      this.service
        .dashboardtodayemployees(this.adminIdValue)
        .subscribe((res: any) => {
          if (this.chartemployee) {
            // this.chart.clear();
            this.chartemployee.destroy();
          }
          if (res.flag == 1) {
            this.todayemployee = res.response;
            this.createMixedChartEmployee(this.todayemployee);
          }
          if (res.flag == 2) {
            this.todayemployee = res.response;
            this.createMixedChartEmployee(this.todayemployee);
          }
        });
    }

    if (this.selected == 'Last7DaysEmployee') {
      this.service
        .dashboardsevendayemployees(this.adminIdValue)
        .subscribe((res: any) => {
          if (this.chartemployee) {
            this.chartemployee.destroy();
          }
          if (res.flag == 1) {
            this.sevenemployee = res.response;
            this.createEmployee(this.sevenemployee);
          }
          if (res.flag == 2) {
            this.sevenemployee = res.response;
            this.createEmployee(this.sevenemployee);
          }
        });
    }

    if (this.selected == 'thisMonthEmployee') {
      this.service
        .dashboardmonthemployees(this.adminIdValue)
        .subscribe((res: any) => {
          if (this.chartemployee) {
            this.chartemployee.destroy();
          }
          if (res.flag == 1) {
            this.monthemployee = res.response;
            this.createEmployee(this.monthemployee);
          }
          if (res.flag == 2) {
            this.monthemployee = res.response;
            this.createEmployee(this.monthemployee);
          }
        });
    }
  }
  // createMixedChartEmployee(data: any): void {
  //   const { totalAmount, successAmount, PendingAmount } = data;

  //   const chartData = {
  //     labels: ['Total', 'Success', 'Pending'],

  //     datasets: [
  //       {
  //         label: 'Total',
  //         data: [totalAmount, 0, 0],
  //         backgroundColor: '#4CAF50',
  //         borderWidth: 1,
  //         borderColor: '#000',
  //         barThickness: 80,
  //       },
  //       {
  //         label: 'Success',
  //         data: [0, successAmount, 0],
  //         backgroundColor: '#2196F3',
  //         borderWidth: 1,
  //         borderColor: '#000',
  //         barThickness: 80,
  //       },
  //       {
  //         label: 'Pending',
  //         data: [0, 0, PendingAmount],
  //         backgroundColor: '#FFC107',
  //         borderWidth: 1,
  //         borderColor: '#000',
  //         barThickness: 80,
  //       },
  //     ],
  //   };

  //   this.chartemployee = new Chart('myEmployeeCanvas', {
  //     type: 'bar',
  //     data: chartData,
  //     options: {
  //       responsive: true,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           title: {
  //             display: true,
  //             text: 'Amount',
  //           },
  //         },
  //         x: {
  //           title: {
  //             display: true,
  //             text: 'Transaction Types',
  //           },
  //         },
  //       },
  //       plugins: {
  //         legend: {
  //           display: true,
  //           position: 'top', // Optional: control the legend position
  //         },
  //         tooltip: {
  //           callbacks: {
  //             label: function (tooltipItem) {
  //               return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // }


  createMixedChartEmployee(data: any): void {
    const {successAmount} = data;

    const chartData = {
      labels: [ 'Success'],

      datasets: [
      
        {
          label: 'Success',
          data: [successAmount],
          backgroundColor: '#2196F3',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
    
      ],
    };

    this.chartemployee = new Chart('myEmployeeCanvas', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Transaction Types',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top', // Optional: control the legend position
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });
  }
  reset(): void {
    this.employeeform.reset({
      periods: '',
      selectemployee: '',
    });

    this.initializeEmptyChart(); // Reinitialize the chart with empty values
  }


  initializeEmptyChart(): void {
    if (this.chartemployee) {
      this.chartemployee.destroy();
    }
    const emptyData = {
      labels: ['Total','Success', 'Pending'],
      datasets: [
        {
          label: 'Total',
          data: [0],
          backgroundColor: '#4CAF50',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
        {
          label: 'Success',
          data: [0],
          backgroundColor: '#2196F3',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
        {
          label: 'Pending',
          data: [0],
          backgroundColor: '#FFC107',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
      ],
    };
    this.chartemployee = new Chart('myEmployeeCanvas', {
      type: 'bar',
      data: emptyData,
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Amount' } },
          x: { title: { display: true, text: 'Transaction Types' } },
        },
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });
  }
  resetTransactionForm(): void {
    this.transactionform.reset({ selectperiods: '', selecttransaction: '' });
    // this.errorMessage = ''; this.transactionErrorMessage = '';
    this.service
      .dashboardcustomeroveralls(this.merchantId)
      .subscribe((res: any) => {
        if (this.chart) {
          // this.chart.clear();
          this.chart.destroy();
        }
        if (res.flag == 1) {
          this.createMixedChart(res.response);
        }
        if (res.flag == 2) {
          this.createMixedChart(res.response);
        }
      });
    // this.selectedPeriod = '';
    // this.fromDate = '';
    // this.toDate = '';
    // this.searchInput = '';

  }
  getemployeebasedtransaction(event: any) {
    this.selectedemployee = event;
    if (event == 'employeetodays') {
      this.service.dashboardtodayemployees(this.merchantAdminId).subscribe((res: any) => {
        this.employeebasedtrasnaction = res.response;
      });

    }

    if (event == 'employlastdays') {
      this.service.dashboardsevendayemployees(this.merchantAdminId).subscribe((res: any) => {
        this.employeebasedtrasnaction = res.response;
      })

    }

    if (event == 'employthismonth') {
      this.service.dashboardmonthemployees(this.merchantAdminId).subscribe((res: any) => {
        this.employeebasedtrasnaction = res.response;
      })

    }
  }

  getonoffstatus(event: any) {
    this.selectedonoff = event;
    if (event == 'todayonoff') {
      this.service.dashbaordtodayonoffcounts(this.merchantId).subscribe((res: any) => {
        this.ontoday = res.response;
      });

    }

    if (event == 'yesterdayonoff') {
      this.service.dashbaordyesterdayonoffcounts(this.merchantId).subscribe((res: any) => {
        this.onyesterday = res.response;
      })

    }
  }
  createEmployee(data: any): void {
    const { totalAmount, successAmount, PendingAmount } = data;
 
    const chartData = {
      labels: ['Total', 'Success', 'Pending'],
 
      datasets: [
        {
          label: 'Total',
          data: [totalAmount, 0, 0],
          backgroundColor: '#4CAF50',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
        {
          label: 'Success',
          data: [0, successAmount, 0],
          backgroundColor: '#2196F3',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
        {
          label: 'Pending',
          data: [0, 0, PendingAmount],
          backgroundColor: '#FFC107',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
      ],
    };
 
    this.chartemployee = new Chart('myEmployeeCanvas', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Transaction Types',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top', // Optional: control the legend position
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });
  }
  branch(id: any) {
    this.selectedBranch = id.target.value;
    console.log(this.selectedBranch);
    this.getbranchmonthtransaction(this.selectedbranchPeriods);
}
 
 
getbranchmonthtransaction(event: any) {
    this.selectedbranchPeriods = event?.target?.value;
 
    if (this.selectedBranch) {
        if (this.selectedbranchPeriods == 'branchLastMonths') {
            this.service.dashboardbranchlastmonth(this.selectedBranch).subscribe((res: any) => {
                this.branchmonth = res.response;
            });
        } else if (this.selectedbranchPeriods == 'branchthisMonths') {
            this.service.dashboardbranchmonth(this.selectedBranch).subscribe((res: any) => {
                this.branchmonth = res.response;
            });
        }
    } else {
        console.log('Please select a branch first.');
    }
}
 
branchcustom() {
  console.log(this.branchfromDates);
 
    this.service.dashboardbranchcustomerange(this.selectedBranch, this.branchfromDates, this.branchtoDates).subscribe((res: any) => {
        this.branchmonth = res.response;
    });
}

}
