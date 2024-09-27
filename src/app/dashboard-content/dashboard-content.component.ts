import { Component } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);
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
 
  chart: any;
  toastr: any;
  initialCategoryId = 1;
  viewmerchant: any;
  merchantIds: any;
  startdates: string = '';
  enddates: string = '';
  transactionData: any;
  constructor(private service: FarginServiceService) {}
 
  ngOnInit(): void {
    this.service.dashboardCount().subscribe((res: any) => {
      this.counts = res.response;
      console.log(this.counts);
    })
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          
          if (this.roleId == 1) {
            this.valueDashboard = 'Dashboard-View';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              

              if (this.actions == 'Dashboard-View') {
                this.valueDashboard = 'Dashboard-View';
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })
    
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
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart('myCanvas', {
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
    this.service.dashboardtransactions(this.businessCategoryIds,  this.merchantIds, this.startdates, this.enddates)
      .subscribe((res: any) => {
        if (res.flag === 1) {
          this.transactionData = res.response;
         
        } else {
          console.error('Error fetching transaction data:', res.responseMessage);
        }
      });
  }
 
}