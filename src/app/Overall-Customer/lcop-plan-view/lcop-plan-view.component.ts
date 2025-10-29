import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelViewComponent } from '../channel-view/channel-view.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-lcop-plan-view',
  templateUrl: './lcop-plan-view.component.html',
  styleUrl: './lcop-plan-view.component.css'
})
export class LcopPlanViewComponent implements OnInit {
  id: any;
  details: any;
  channelslist: any;
  page: any = 1;
  pagepaid: any = 1;
  pageplans: any = 1;
  term: any;

  currentPage: any = 1; // The current page number
  page1: number = 1;
  itemsPerPage = 3; //
  isChecked: boolean = false;
  ServiceProvideregions: any;
  Lcopdetails: any;
  activeTab: string = 'free';
  Freechannels: any;
  PaidChanneels: any;
  plansnames: any;
  valuelcopgeneral: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  valuelcopfree: any;
  valuelcopplan: any;
  valuelcopPaid: any;
  roleName = sessionStorage.getItem('roleName')
  searchText: any;
  term1: any;
  id1: any;
  lcopid: any;
  planname: any;

  selectTab(tab: string): void {
    this.activeTab = tab;
    this.term = '';
  };

  constructor(
    public LCOPView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location,
    private cryptoService:EncyDecySericeService,
  ) { }

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.lcopid = param.Alldata;
      this.planname = param.Alldata1;
    });
    this.Getall();
  }

  Getall() {
    this.LCOPView.LCOPViewbyidcust(this.lcopid).subscribe((res: any) => {
      this.Lcopdetails = res.response;
      this.Freechannels = res.response?.alcotFreeList;
      this.PaidChanneels = res.response?.alcotPaidList;
      this.plansnames = res.response?.bouquetExportList;
    });
  };

  Viewchannels(id: any) {
    this.dialog.open(ChannelViewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { value: id }
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    })
  };

  close() {
    this.location.back()
  };

  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter(item =>
      item.Lcopdetails.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.page = 1;
  }
  onSearchText(): void {
    // Reset to the first page whenever the search text changes
    this.pagepaid = 1;
  }
  onSearch(): void {
    // Reset to the first page whenever the search text changes
    this.pageplans = 1;
  }
}
