import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LcopChannelListComponent } from '../../Channels-Packages/LCOP-Plan-creation/lcop-channel-list/lcop-channel-list.component';
import { Lcopfreechannelstatus, Lcoppaidchannelstatus, LcopBouquetestatus } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lcopchannelview',
  templateUrl: './lcopchannelview.component.html',
  styleUrl: './lcopchannelview.component.css'
})
export class LcopchannelviewComponent implements OnInit{
 getadminname = localStorage.getItem('fullname');
  merchantid: any = localStorage.getItem('merchantId');
  id: any;
  details: any;
  channelslist: any;
  page: any = 1;
  term: any;
  
  currentPage: any = 1; // The current page number
  page1: number = 1;
  itemsPerPage = 5; //
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
  roleId: any = localStorage.getItem('roleId')
  valuelcopfree: any;
  valuelcopplan: any;
  valuelcopPaid: any;
  roleName = localStorage.getItem('roleName')
searchText: any;
term1: any;
  id1: any;
  lcopid: any;
  planname:any;

  selectTab(tab: string): void {
    this.activeTab = tab;
    this.term='';
  }

  constructor(
    public LCOPView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private location:Location
  ) { }
  ngOnInit(): void {

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.lcopid = param.Alldata;
      this.planname = param.Alldata1;

      console.log(this.lcopid)
    });

    
    this.LCOPView.LCOPViewbyidcust(this.lcopid).subscribe((res: any) => {
      this.Lcopdetails = res.response;
      this.Freechannels = res.response?.alcotFreeList;
      this.PaidChanneels = res.response?.alcotPaidList;
      this.plansnames = res.response?.bouquetExportList;
    });

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
    window.location.reload();
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
    window.location.reload();
  },500);
    });
  }

  BouqueteStatus (event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: LcopBouquetestatus = {
      merchantBouquetId: id,
      bouquetChannelStatus:this.channelslist ? 1:0
    };
    this.LCOPView.LCOPBouquteStatus(submitModel).subscribe((res: any) => {
    this.toastr.success(res.responseMessage);
    setTimeout(() => {
    window.location.reload();
  },500);
    });
  }




  





  close() {
    this.location.back()
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
}
