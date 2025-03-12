import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-configuration-details',
  templateUrl: './plan-configuration-details.component.html',
  styleUrl: './plan-configuration-details.component.css'
})
export class PlanConfigurationDetailsComponent implements OnInit {
  id: any;
  details: any;
  channelslist: any;
  // page: number = 1;
  term: any;
  p: any = 1;
  itemsPerPage = 3; //
  isChecked: boolean = false;
  ServiceProvideregions: any;
  items: any[] = []; // The array of items to paginate
  currentPage: any = 1; // The current page number
  selected: any;
  selecteded: string = '5';
  searchText: any;
  amount: any;
 
  constructor(
    public viewPlandetails: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
 
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
 
    // this.viewPlandetails.BroadcasterBoucatebyid(this.id).subscribe((res: any) => {
     
    // });
    this.viewPlandetails.BroadcasterBoucatebyid(this.id).subscribe((res: any) => {
      this.channelslist = res.response;
      this.details = res.response[0];
 
      // this.ServiceProvideregions = res.response.broadCasterRegion;
     
    });
  }
 
 
  close() {
    this.router.navigateByUrl('dashboard/plan-configuration');
  }
 
  Viewdata(id: any) {
    this.router.navigate([`dashboard/channel-view/${id}`], {
      queryParams: { Alldata: id },
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
}