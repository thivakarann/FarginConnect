import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-plan-configuration-channelview',
  templateUrl: './plan-configuration-channelview.component.html',
  styleUrl: './plan-configuration-channelview.component.css'
})
export class PlanConfigurationChannelviewComponent implements OnInit {

  id: any;
  details: any;
  channelslist: any;
  page: number = 1;
  term: any;
  currentPage: any = 1; // The current page number
  itemsPerPage = 5; //
  isChecked: boolean = false;
  ServiceProvideregions: any;
  items: any[] = []; // The array of items to paginate
  selected: any;
  selecteded: string = '5';
  searchText: any;
  valueid: any;
  value2: any;
  broadCasterRegionsss: any[] = [];
  broadCasterRegionIds:any[]=[];
  broadCasterAlcotsss: any[] = [];
  back:any;
  broadCasterRegion: any;
  broadCasterBouquet:any;
  channel:any;


  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private location:Location
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.service.BroadcasterBoucatebyidchannel(this.id).subscribe((res: any) => {
      this.details = res.response;
    
      if (res.response && res.response.length > 0) {
        this.details = res.response[0].broadCasterBouquet;
        console.log(this.details);
    } 

    if(res.response && res.response.length > 0){
      this.back=res.response.broadCasterRegion
    }
 
      this.channelslist = res.response;

      this.broadCasterRegion = res.response[0].broadCasterRegion;

      this.broadCasterBouquet = res.response[0].broadCasterBouquet;

      this.ServiceProvideregions = res.response;
      if (res.response && res.response.length > 0) {
        this.channel = res.response[0].broadCasterRegion.broadCasterRegion;
        console.log(this.details);
    } 
      
    });
  
  }

  
 
  close() {
    this.location.back()
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
