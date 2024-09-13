import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-overall-individual-customerview',
  templateUrl: './overall-individual-customerview.component.html',
  styleUrl: './overall-individual-customerview.component.css'
})
export class OverallIndividualCustomerviewComponent implements OnInit {
  id: any;
  customerview: any;
  customerviewalcot: any
  customer: any;
  selectedTab: string = 'customer-info'; // Default to 'customer-info'
  items: any[] = []; // The array of items to paginate
  currentPage: any = 1; // The current page number
  itemsPerPage = 5; //
  page: number = 1;
  term: any;
  selected: any;
  selecteded: string = '5';
  dataSource: any;
  searchText: any;
  selectTab(tab: string) {
    this.selectedTab = tab;
  }


  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute) { }

  ngOnInit(): void {


    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.MerchantView.EntityIndividualCustomerview(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.customerview = res.response.customerdetail;
        console.log(this.customerview)
        this.customerviewalcot = res.response.alcot;

        //   for (let i = 0; i < this.customerview.length; i++) {
        //     const element = this.customerview[i];
        //     this.customerview = element.alcot.alcotId;
        //   console.log(this.customerview)
        // } 
      }
    });
  }


  // image(id: any) {
  //   this.dialog.open(EntityViewLogoComponent, {
  //     data: { value: id },
  //     disableClose: true,
  //     enterAnimationDuration:'1000ms',      
  //     exitAnimationDuration:'1000ms',
  //   })
  // }



}
