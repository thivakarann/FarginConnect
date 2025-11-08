import { Component } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController, registerables, ChartData, } from 'chart.js';
import { DashboardData, Payload } from '../fargin-model/fargin-model.module';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';
import { SessionValidatorService } from '../Session storage Validator/session-validator.service';
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
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  category: any;
  businessCategoryIds: any;
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
  todayamount: any;
  sevenday: any;
  valueDashboardTransactionOverview: any;
  valuetotalmerchants: any;
  valuetransactionoverview: any;
  valueTransactionDetails: any;
  valuetoppay: any;
  valueTotalcount: any;
  sevenper: any;
  topseven: any;
  catgry: any;
  businessCategoryId: any;
  categorydetails: any;
  valuetoppaymentmethod: any;
  transactionform: any = FormGroup;
  one: any[] = [];
  setCount: any[] = [];
  private charts: { [key: string]: Chart | null } = {
    maintenanceChartCanvas: null,
    oneTimeChartCanvas: null,
    otherPaymentChartCanvas: null,
  };
  Roledetails: any;

  constructor(private service: FarginServiceService, private cryptoService: EncyDecySericeService, private sessionValidator: SessionValidatorService) { }

  ngOnInit(): void {

    this.sessionValidator.startSessionMonitor();
    this.transactionform = new FormGroup({
      selectperiods: new FormControl('', []),
      selecttransaction: new FormControl('', []),
    });
    this.Role();
    this.createEmptyCharts();
    this.service.dashboardCount().subscribe((res: any) => {
      this.counts = res.response;
    });

    this.service.dashboardoverallamounts().subscribe((res: any) => {
      this.amount = res.response;
    });

    this.service.dashbaordcustomerdayTransaction().subscribe((res: any) => {
      this.todayamount = res.response;
    });

    this.service.dashboardoverallonetimes().subscribe((res: any) => {
      this.amountonetime = res.response;
    });

    this.service.dashboardcustomersevenday().subscribe((res: any) => {
      this.sevenday = res.response;
    });


    this.service.dashboardcustomersevenday().subscribe((res: any) => {
      this.topseven = res.response.method;
    });

    this.service.dashboardcustomersevenday().subscribe((res: any) => {
      this.sevenper = res.response;
    });

    this.service.EntityViewallExport().subscribe((res: any) => {
      if (res && res.response) {
        this.viewall = res.response;
        if (this.viewall.length > 0) {
          this.selectedmerchant = this.viewall[0].merchantId;
          this.fetchMerchantData(this.selectedmerchant);
        }
        else { }
      }
      else { }
    });

    this.service.Bussinesscategoryactivelist().subscribe((res: any) => {
      this.categorydetails = res.response;
    });

  }

  get selectperiods() {
    return this.transactionform.get('selectperiods');
  }

  get selecttransaction() {
    return this.transactionform.get('selecttransaction');
  }

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valueDashboard = 'Overall-View';
            this.valueDashboardTransactionOverview = 'Today Transaction Overview'
            this.valuetotalmerchants = 'Total Merchants'
            this.valuetransactionoverview = 'Transaction Overview'
            this.valueTransactionDetails = 'Transaction Details'
            this.valuetoppay = 'Top Payment Methods'
            this.valueTotalcount = 'Total Count'
            this.valuetoppaymentmethod = 'Seven Days Payment Method'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              if (this.actions == 'Overall-View') {
                this.valueDashboard = 'Overall-View';
              }
              if (this.actions == 'Today Transaction Overview') {
                this.valueDashboardTransactionOverview = 'Today Transaction Overview'
              }
              if (this.actions == 'Total Merchants') {
                this.valuetotalmerchants = 'Total Merchants'
              }
              if (this.actions == 'Transaction Overview') {
                this.valuetransactionoverview = 'Transaction Overview'
              }
              if (this.actions == 'Transaction Details') {
                this.valueTransactionDetails = 'Transaction Details'
              }
              if (this.actions == 'Top Payment Methods') {
                this.valuetoppay = 'Top Payment Methods'
              }
              if (this.actions == 'Total Count') {
                this.valueTotalcount = 'Total Count'
              }
              if (this.actions == 'Seven Days Payment Method') {
                this.valuetoppaymentmethod = 'Seven Days Payment Method'

              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
  }


  categorybusiness(event: any) {
    this.catgry = [];
    this.selectedmerchant = [];
    this.businessCategoryId = event.target.value;
    this.service.dashboardbusinesscategorys(this.businessCategoryId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.catgry = res.response
      }
    })
  }

  fetchMerchantData(merchantId: string) {
    this.service.dashboardbusinessgetalls().subscribe((res: any) => {
      this.category = res.response;
      this.businessCategoryIds = res.response.businessCategoryId;
    });
    this.createWithCategory(this.initialCategoryId);
    this.service.EntityViewallExport().subscribe((res: any) => {
      this.viewmerchant = res.response;
      this.merchantIds = res.response.merchantId;
    });
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
        for (let index = 0; index < 7; index++) {
          const element = res.response[index];
          this.one.push(moment(element.date).format('MMM D'))
          this.setCount.push(element.totalCount)
        }
        this.createseven(res.response);
      }
      if (res.flag == 2) {
        this.createseven(res.response);
      }
    });
  }

  onMerchantChange(event: any) {
    this.selectedmerchant = +event.target.value;
    this.service.dashboardoverallmerchantids(this.selectedmerchant).subscribe((res: any) => {
      if (res.flag === 1 || res.flag === 2) {
        this.creatememberchart(res);
      }
    });
  }

  createEmptyCharts(): void {
    const emptyData = [0, 0, 0, 0]; // Representing empty data (Total, Success, Pending, Failed)
    const emptyChartData = {
      labels: ['Total', 'Success', 'Pending', 'Failed'],
      datasets: [
        {
          label: 'Payment Amount Overview',
          data: emptyData,
          backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#F44336'],
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 80,
        },
      ],
    };
    // Initialize empty charts for all categories
    this.renderChart('maintenanceChartCanvas', emptyChartData);
    this.renderChart('oneTimeChartCanvas', emptyChartData);
    this.renderChart('otherPaymentChartCanvas', emptyChartData);
  }


  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.businessCategoryIds = selectElement.value;
    this.createWithCategory(this.businessCategoryIds);
  }


  createWithCategory(categoryId: number) {
    this.service.dashboardbusinesscategorybyids(categoryId).subscribe((res: any) => {
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
            legend: { display: true, position: 'top', labels: { padding: 20, }, },
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
    this.service.dashboardtransactions(this.businessCategoryIds, this.merchantIds, this.startdates, this.enddates).subscribe((res: any) => {
      if (res.flag === 1) {
        this.transactionData = res.response;
      }
      else {
        console.error('Error fetching transaction data:', res.responseMessage);
      }
    });
  }

  customranges() {
    this.service.dashboardcustomerstartenddates(this.fromDate, this.toDate).subscribe((res: any) => {
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
  };

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
              text: 'Transaction Status', // Optional: add a title to the x-axis
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
  };

  createMixedChart(data: any): void {
    const { totalCount, successCount, failedCount, pendingCount } = data;
    const chartData = {
      labels: ['Total', 'Success', 'Failed', 'Pending'],
      datasets: [
        {
          label: 'Total',
          data: [totalCount, 0, 0, 0],
          backgroundColor: '#4CAF50',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 50,

        },
        {
          label: 'Success',
          data: [0, successCount, 0, 0],
          backgroundColor: '#2196F3',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 50,
        },
        {
          label: 'Failed',
          data: [0, 0, failedCount, 0],
          backgroundColor: '#f44336',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 50,
        },
        {
          label: 'Pending',
          data: [0, 0, 0, pendingCount],
          backgroundColor: '#FFC107',
          borderWidth: 1,
          borderColor: '#000',
          barThickness: 50,

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
            type: 'logarithmic',
            stacked: true,
            title: {
              display: true,
              text: 'Count', // Optional: add a title to the y-axis
            },
          },
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Transaction Status', // Optional: add a title to the x-axis
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

  // Create empty charts with zero values

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
          label: 'Cloud fee Payments Overview',
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
          label: 'Customized Payments Overview',
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
            type: 'logarithmic',
            title: {
              display: true,
              text: 'Amount',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Transaction Status',
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
    const labels = data.map((item: DashboardData) => {
      const date = new Date(item.date);
      return moment(date).add(2, 'days').subtract(1, 'days').format('yyyy-MM-DD').toString()
      return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    });
    const totalCount = data.map((item: DashboardData) => item.totalCount);
    const chartData: ChartData<'bar', number[], string> = {
      labels: this.one,
      datasets: [
        {
          label: 'Total Count',
          data: this.setCount,
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
            type: 'logarithmic',
            title: {
              display: true,
              text: 'Count',
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
                return `Total Count: ${totalCount[index]}`;
              },
            },
          },
        },
      },
    });
  }

  resetTransactionForm(): void {
    this.transactionform.reset({ selectperiods: '', selecttransaction: '' });
    this.service.dashboardcustomeroveralls().subscribe((res: any) => {
      if (res.flag == 1) {
        this.createMixedChart(res.response);
      }
      if (res.flag == 2) {
        this.createMixedChart(res.response);
      }
    });
  };
}