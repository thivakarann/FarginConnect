import { Component } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  registerables,
  ChartData,
} from 'chart.js';
import { DashboardData } from '../fargin-model/fargin-model.module';
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);


Chart.register(...registerables);
@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.css',
})
export class DashboardContentComponent {
  counts: any;
  valueDashboard: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  category: any;
  businessCategoryIds: any;
  merchantId = localStorage.getItem('merchantId') || '';
  chart: any;
  toastr: any;
  initialCategoryId = 1;
  viewmerchant: any;
  merchantIds: any;
  startdates: string = '';
  enddates: string = '';
  transactionData: any;
  doughnutChart: any;
  selectedPeriod: any;
  sevendays: any;
  fifteendays: any;
  thirtyday: any;
  customdate: any;
  fromDate: any;
  toDate: any;
  barChart: Chart | null = null;
  sevenChart: Chart | null = null;
  viewall: any;
  selectedmerchant: any;
  amount: any;
  amountonetime: any;
  private charts: { [key: string]: Chart | null } = {
    maintenanceChartCanvas: null,
    oneTimeChartCanvas: null,
    otherPaymentChartCanvas: null,
  };
  todayamount: any;
  sevenday: any;
  valueDashboardTransactionOverview: any;
  valuetotalmerchants: any;
  valuetransactionoverview: any;
  valueTransactionDetails: any;
  valuetoppay: any;
  valueTotalcount: any;
  sevenper: any;

  constructor(private service: FarginServiceService) { }

  ngOnInit(): void {



    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueDashboard = 'Dashboard-View';
            this.valueDashboardTransactionOverview = 'Dashboard-Transaction Overview'
            this.valuetotalmerchants = 'Dashboard-Total Merchants'
            this.valuetransactionoverview = 'Dashboard-Transaction Overview'
            this.valueTransactionDetails = 'Dashboard-Transaction Details'
            this.valuetoppay = 'Dashboard-Top Payment Methods'
            this.valueTotalcount = 'Dashboard-Total Count'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'Dashboard-View') {
                this.valueDashboard = 'Dashboard-View';
              }
              if (this.actions == 'Dashboard-Transaction Overview') {
                this.valueDashboardTransactionOverview = 'Dashboard-Transaction Overview'
              }
              if (this.actions == 'Dashboard-Total Merchants') {
                this.valuetotalmerchants = 'Dashboard-Total Merchants'
              }
              if (this.actions == 'Dashboard-Transaction Overview') {
                this.valuetransactionoverview = 'Dashboard-Transaction Overview'
              }
              if (this.actions == 'Dashboard-Transaction Details') {
                this.valueTransactionDetails = 'Dashboard-Transaction Details'
              }
              if (this.actions == 'Dashboard-Top Payment Methods') {
                this.valuetoppay = 'Dashboard-Top Payment Methods'
              }
              if (this.actions == 'Dashboard-Total Count') {
                this.valueTotalcount = 'Dashboard-Total Count'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })





    this.service.dashboardCount().subscribe((res: any) => {
      this.counts = res.response;
      console.log(this.counts);
    });
    this.service.dashboardoverallamounts().subscribe((res: any) => {
      this.amount = res.response;
      console.log(this.counts);
    });
    this.service.dashbaordcustomerdayTransaction().subscribe((res: any) => {
      this.todayamount = res.response;

    });
    this.service.dashboardoverallonetimes().subscribe((res: any) => {
      this.amountonetime = res.response;
      console.log(this.counts);
    });
    this.service.dashboardcustomersevenday().subscribe((res: any) => {
      this.sevenday = res.response;


    });





    this.service.dashboardcustomersevenday().subscribe((res: any) => {
      this.sevenper = res.response;
      console.log(this.counts);
    });
    this.service.EntityViewall().subscribe((res: any) => {

      if (res && res.response) {
        this.viewall = res.response;


        if (this.viewall.length > 0) {
          this.selectedmerchant = this.viewall[0].merchantId;
          this.fetchMerchantData(this.selectedmerchant);
        } else {
          console.log("No merchants found.");
        }
      } else {
        console.log("Response is undefined or does not contain data.");
      }
    });
  }
  fetchMerchantData(merchantId: string) {
    this.service.dashboardoverallmerchantids(merchantId).subscribe((res: any) => {
      if (res.flag === 1 || res.flag === 2) {
        this.creatememberchart(res);
      }
    });

    this.service.dashboardbusinessgetalls().subscribe((res: any) => {
      this.category = res.response;
      this.businessCategoryIds = res.response.businessCategoryId;
      console.log(this.counts);
    });
    this.createWithCategory(this.initialCategoryId);

    this.service.EntityViewall().subscribe((res: any) => {
      this.viewmerchant = res.response;
      this.merchantIds = res.response.merchantId;
    });



    // this.service.dashbaordcustomerdayTransaction().subscribe((res: any) => {
    //   if (res.flag == 1) {
    //     // this.daytrasanction=res.response;
    //     this.createMixedChartDay(res.response);
    //     console.log(res.response);
    //   }
    //   if (res.flag == 2) {
    //     this.createMixedChartDay(res.response);
    //     console.log(res.response);
    //   }
    // });

    this.service.dashboardcustomeroveralls().subscribe((res: any) => {
      if (res.flag == 1) {
        this.createMixedChart(res.response);
      }
      if (res.flag == 2) {
        this.createMixedChart(res.response);
      }
    });
    this.service.dashboardsevendaysamounts().subscribe((res: any) => {
      if (res.flag == 1) {
        this.createseven(res.response);
      }
      if (res.flag == 2) {
        this.createseven(res.response);
      }
    });
  }
  onMerchantChange(event: any) {
    this.selectedmerchant = +event.target.value;
    this.fetchMerchantData(this.selectedmerchant);
    this.service
      .dashboardoverallmerchantids(this.selectedmerchant)
      .subscribe((res: any) => {
        if (res.flag === 1 || res.flag === 2) {
          this.creatememberchart(res);
        }
      });
  }
  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.businessCategoryIds = selectElement.value;
    this.createWithCategory(this.businessCategoryIds);
  }
  createWithCategory(categoryId: number) {
    this.service
      .dashboardbusinesscategorybyids(categoryId)
      .subscribe((res: any) => {
        console.log(res);

        const label = res.response.categoryName;
        const data = [
          res.response.pendingStatusCount,
          res.response.merchantCount,
          res.response.succuessPgonBoardCount,
          res.response.inActiveMemberCount,
          res.response.approvedStatusCount,
          res.response.activeMemberCount,
        ];
        const labels = [
          'Pending Status',
          'Total Merchants',
          'Successful Onboard Count',
          'Inactive Members',
          'Approved Status',
          'Active Members',
        ];
        console.log('Data:', data);
        console.log('Labels:', labels);
        // Destroy the previous chart if it exists
        if (this.doughnutChart) {
          this.doughnutChart.destroy();
        }
        this.doughnutChart = new Chart('myCanvas', {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [
              {
                label: label,
                data: data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.7)', // Pending Status - soft red
                  'rgba(54, 162, 235, 0.7)', // Total Merchants - blue
                  'rgba(75, 192, 192, 0.7)', // Successful Onboard Count - teal
                  'rgba(201, 203, 207, 0.7)', // Inactive Members - gray
                  'rgba(255, 206, 86, 0.7)', // Approved Status - yellow
                  'rgba(153, 102, 255, 0.7)', // Active Members - purple
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(201, 203, 207, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  padding: 20,
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    return `${label}: ${value}`;
                  },
                },
              },
            },
          },
        });
      });
  }

  onCategoryChangetransaction(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.businessCategoryIds = selectElement.value;
  }
  onCategoryChangeEntity(event: Event) {
    const selectElements = event.target as HTMLSelectElement;
    this.merchantIds = selectElements.value;
  }

  filter() {
    console.log('Start Date:', this.startdates);
    console.log('End Date:', this.enddates);
    this.service
      .dashboardtransactions(
        this.businessCategoryIds,
        this.merchantIds,
        this.startdates,
        this.enddates
      )
      .subscribe((res: any) => {
        if (res.flag === 1) {
          this.transactionData = res.response;
        } else {
          console.error(
            'Error fetching transaction data:',
            res.responseMessage
          );
        }
      });
  }
  customranges() {
    this.service
      .dashboardcustomerstartenddates(this.fromDate, this.toDate)
      .subscribe((res: any) => {
        if (this.barChart) {
          this.barChart.destroy();
        }
        if (res.flag == 1) {
          this.customdate = res.response;
          this.createMixedChart(this.customdate);
        }
        if (res.flag == 2) {
          this.customdate = res.response;
          this.createMixedChart(this.customdate);
        }
      });
  }
  get(event: any) {
    this.selectedPeriod = event;
    if (event == 'Last7Days') {
      this.service.dashboardcustomersevenday().subscribe((res: any) => {
        if (this.barChart) {
          this.barChart.destroy();
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
      this.service.dashboardcustomerfifteenday().subscribe((res: any) => {
        if (this.barChart) {
          this.barChart.destroy();
        }
        if (res.flag == 1) {
          this.fifteendays = res.response;
          this.createMixedChart(this.fifteendays);
        }
        if (res.flag == 2) {
          this.fifteendays = res.response;
          this.createMixedChart(this.fifteendays);
        }
      });
    }

    if (event == 'LastMonth') {
      this.service.dashboardcustomerlastmonth().subscribe((res: any) => {
        if (this.barChart) {
          this.barChart.destroy();
        }
        if (res.flag == 1) {
          this.thirtyday = res.response;
          this.createMixedChart(this.thirtyday);
        }
        if (res.flag == 2) {
          this.thirtyday = res.response;
          this.createMixedChart(this.thirtyday);
        }
      });
    }

    if (event == 'thisMonth') {
      this.service.dashboardcustomerthismonth().subscribe((res: any) => {
        if (this.barChart) {
          this.barChart.destroy();
        }
        if (res.flag == 1) {
          this.thirtyday = res.response;
          this.createMixedChart(this.thirtyday);
        }
        if (res.flag == 2) {
          this.thirtyday = res.response;
          this.createMixedChart(this.thirtyday);
        }
      });
    }
  }

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

    this.chart = new Chart('barCanvas', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true, // Make the chart responsive
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count', // Optional: add a title to the y-axis
            },
          },
          x: {
            title: {
              display: true,
              text: 'Transaction Types', // Optional: add a title to the x-axis
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

  createMixedChart(data: any): void {
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
    if (this.barChart) {
      this.barChart.destroy();
    }
    this.barChart = new Chart('barChartCanvas', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true, // Make the chart responsive
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count', // Optional: add a title to the y-axis
            },
          },
          x: {
            title: {
              display: true,
              text: 'Transaction Types', // Optional: add a title to the x-axis
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

  creatememberchart(data: any): void {
    const response = data.response;

    // Define colors for each category
    const colors = ['#2196F3', '#4CAF50', '#FF9800', '#F44336']; // Total, Success, Pending, Failed

    // Maintenance data
    const maintenanceAmountData = [
      response.maintanaceTotalAmount || 0,
      response.maintananceSuccessAmount || 0,
      response.maintanacePendingAmount || 0,
      response.maintanaceFailedAmount || 0,
    ];

    const maintenanceChartData = {
      labels: ['Total', 'Success', 'Pending', 'Failed'],
      datasets: [
        {
          label: 'Maintenance Amount Overview',
          data: maintenanceAmountData,
          backgroundColor: colors,
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
      ],
    };
    this.renderChart('maintenanceChartCanvas', maintenanceChartData);

    // One-Time Payment data
    const oneTimeAmountData = [
      response.oneTimeTotalAmount || 0,
      response.oneTimeSuccessAmount || 0,
      response.oneTimePendingAmount || 0,
      response.oneTimeFailedAmount || 0,
    ];

    const oneTimeChartData = {
      labels: ['Total', 'Success', 'Pending', 'Failed'],
      datasets: [
        {
          label: 'One-Time Payments Amount Overview',
          data: oneTimeAmountData,
          backgroundColor: colors,
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
      ],
    };
    this.renderChart('oneTimeChartCanvas', oneTimeChartData);

    // Other Payment data
    const otherPaymentAmountData = [
      response.otherPaymentTotalAmount || 0,
      response.otherPaymentSuccessAmount || 0,
      response.otherPaymentPendingAmount || 0,
      response.otherPaymentFailedAmount || 0,
    ];

    const otherPaymentChartData = {
      labels: ['Total', 'Success', 'Pending', 'Failed'],
      datasets: [
        {
          label: 'Other Payments Amount Overview',
          data: otherPaymentAmountData,
          backgroundColor: colors,
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
      ],
    };
    this.renderChart('otherPaymentChartCanvas', otherPaymentChartData);
  }

  renderChart(canvasId: string, chartData: any): void {
    if (this.charts[canvasId]) {
      this.charts[canvasId]?.destroy(); // Safely destroy the existing chart if it exists
    }

    this.charts[canvasId] = new Chart(canvasId, {
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
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
            },
          },
        },
      },
    });
  }




  createseven(data: DashboardData[]): void {
    // Filter out any non-date entries
    const validData = data.filter(item => item.date);

    const labels = validData.map((item: DashboardData) => {
      const date = new Date(item.date);
      return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    });

    const totalCount = validData.map((item: DashboardData) => item.totalCount);

    const chartData: ChartData<'bar', number[], string> = {
      labels: labels,
      datasets: [
        {
          label: 'Total Count',
          data: totalCount,
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
              text: 'Amount',
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
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });
  }

}