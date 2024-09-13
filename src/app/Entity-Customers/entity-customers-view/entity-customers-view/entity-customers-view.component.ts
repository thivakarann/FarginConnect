import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-entity-customers-view',
  templateUrl: './entity-customers-view.component.html',
  styleUrl: './entity-customers-view.component.css'
})
export class EntityCustomersViewComponent {
  id: any;
  customerview: any;
  customerviewalcot:any
  customer: any;
  selectedTab: string = 'customer-info'; // Default to 'customer-info'
  items: any[] = []; // The array of items to paginate
  currentPage: any = 1; // The current page number
  itemsPerPage = 5; //
  page: number = 1;
  term: any;
  selected: any;
  selecteded: string = '5';
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
      if(res.flag==1){
        this.customerview = res.response.customerdetail;
        console.log(this.customerview)
        this.customerviewalcot = res.response.alcot;
    }  
    });
}
}
