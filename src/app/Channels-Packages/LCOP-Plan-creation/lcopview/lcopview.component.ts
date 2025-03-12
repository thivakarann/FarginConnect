import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { LcopChannelListComponent } from '../lcop-channel-list/lcop-channel-list.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LcopBouquetestatus, Lcopfreechannelstatus, Lcoppaidchannelstatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-lcopview',
  templateUrl: './lcopview.component.html',
  styleUrl: './lcopview.component.css'
})
export class LCOPViewComponent implements OnInit {
  getadminname = localStorage.getItem('fullname');
  merchantid: any = localStorage.getItem('merchantId');
  id: any;
  details: any;
  channelslist: any;
  page: any = 1;
  term: any;
  
  currentPage: any = 1; // The current page number
  page1: number = 1;
  itemsPerPage = 3; //
  isChecked: boolean = false;
  ServiceProvideregions: any;
  Lcopdetails: any;
  activeTab: string = 'PlanInfo';
  Freechannels: any;
  PaidChanneels: any;
  plansnames: any;
  valuelcopgeneral: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valuelcopfree: any;
  valuelcopplan: any;
  valuelcopPaid: any;
  roleName = localStorage.getItem('roleName')
searchText: any;
term1: any;
pagepaid: any = 1;
pageplan: any=1;

  selectTab(tab: string): void {
    this.activeTab = tab;
    this.term='';
  }

  constructor(
    public LCOPView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {

    if (this.roleName == 'Merchant Super admin')
      {
    this.valuelcopgeneral = 'LCOP Plan Configuration-General Information';
    this.valuelcopfree = 'LCOP Plan Configuration-Free Channels';
    this.valuelcopPaid = 'LCOP Plan Configuration-Paid Channels';
    this.valuelcopplan = 'LCOP Plan Configuration-Broadcaster Plan'
  }
  else{ this.LCOPView.viewRole(this.roleId).subscribe((res: any) => {
      
    if (res.flag == 1) {
      this.getdashboard = res.response?.merchantSubPermission;
     
 
      for (let datas of this.getdashboard) {
        this.actions = datas.subPermissions

        if (this.actions == 'LCOP Plan Configuration-General Information') {
          this.valuelcopgeneral = 'LCOP Plan Configuration-General Information'
        }
        if (this.actions == 'LCOP Plan Configuration-Free Channels') {
          this.valuelcopfree = 'LCOP Plan Configuration-Free Channels'
        }
        if (this.actions == 'LCOP Plan Configuration-Paid Channels') {
          this.valuelcopPaid = 'LCOP Plan Configuration-Paid Channels'
        }
        if (this.actions == 'LCOP Plan Configuration-Broadcaster Plan') {
          this.valuelcopplan = 'LCOP Plan Configuration-Broadcaster Plan'
        }
      
    }
  }
  })}

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.LCOPView.LCOPViewbyid(this.id).subscribe((res: any) => {
      this.Lcopdetails = res.response;
      this.Freechannels = res.response.merchantFreeChannel;
      this.PaidChanneels = res.response.merchantPaidChannel;
      this.plansnames = res.response.merchantBouquet;
    });

   
  }

  Viewchannels(id: any) {
    this.dialog.open(LcopChannelListComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      data: { value: id }
    })
  }


 
  FreeStatus (event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: Lcopfreechannelstatus = {
      merchantFreeId:id,
      freeChannelStatus:this.isChecked ? 1: 0
    };
    this.LCOPView.LCOPFreeChannelStatus(submitModel).subscribe((res: any) => {
    this.toastr.success(res.responseMessage);
    setTimeout(() => {
    
       
    this.LCOPView.LCOPViewbyid(this.id).subscribe((res: any) => {
      this.Lcopdetails = res.response;
      this.Freechannels = res.response.merchantFreeChannel;
      this.PaidChanneels = res.response.merchantPaidChannel;
      this.plansnames = res.response.merchantBouquet;
    });
     
  },500);
    });
  }


  PaidStatus (event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: Lcoppaidchannelstatus = {
      merchantPaidId: id,
      paidChannelStatus:this.isChecked ? 1:0
    };
    this.LCOPView.LCOPPaidchannelStatus(submitModel).subscribe((res: any) => {
    this.toastr.success(res.responseMessage);
    setTimeout(() => {
      
    this.LCOPView.LCOPViewbyid(this.id).subscribe((res: any) => {
      this.Lcopdetails = res.response;
      this.Freechannels = res.response.merchantFreeChannel;
      this.PaidChanneels = res.response.merchantPaidChannel;
      this.plansnames = res.response.merchantBouquet;
 
      })
  },500);
    });
  }

  BouqueteStatus (event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: LcopBouquetestatus = {
      merchantBouquetId: id,
      bouquetChannelStatus:this.isChecked ? 1:0
    };
    this.LCOPView.LCOPBouquteStatus(submitModel).subscribe((res: any) => {
    this.toastr.success(res.responseMessage);
    setTimeout(() => {

       
        this.LCOPView.LCOPViewbyid(this.id).subscribe((res: any) => {
          this.Lcopdetails = res.response;
          this.Freechannels = res.response.merchantFreeChannel;
          this.PaidChanneels = res.response.merchantPaidChannel;
          this.plansnames = res.response.merchantBouquet;
        });
      
  },500);
    });
  }




  





  close() {
    this.router.navigateByUrl('dashboard/lcopviewall');
  }

  reload(){
    window.location.reload()
  }
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
  onSearchPaid(): void {
    // Reset to the first page whenever the search text changes
    this.pagepaid = 1;
  }
  onSearchPlan(): void {
    // Reset to the first page whenever the search text changes
    this.pageplan = 1;
  }
 
}
