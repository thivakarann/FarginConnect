import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Broadcastersinglechanelstatus } from '../../../fargin-model/fargin-model.module';
import { BouquetsRegionsviewComponent } from '../bouquets-regionsview/bouquets-regionsview.component';
import { AddExtraChannelsComponent } from '../add-extra-channels/add-extra-channels.component';
import { ChanneleditComponent } from '../channeledit/channeledit.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bouqutes-view',
  templateUrl: './bouqutes-view.component.html',
  styleUrl: './bouqutes-view.component.css'
})
export class BouqutesViewComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
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

  perValueObject: any;
  getAction: any;
  services: any;
  broadCasterRegions: any;
  values: Iterable<unknown> | null | undefined;
  perValueArray: any;
  errorMessage: any;
  channel: any;
  back:any;
  broadCasterRegion: any;
  broadCasterBouquet:any;
  flag: any;
  message: any;

  constructor(
    public viewdetails: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog,private location:Location
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.viewdetails.BroadcasterBoucatebyidchannel(this.id).subscribe((res: any) => {
      if(res.flag==1){
 
   
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
    }
   
    else if(res.flag == 2){
      this.flag=res.flag;
      this.message=res.responseMessage;
      console.log( this.flag);
      console.log( this.message)
    }
    });
  }

  addChaneels(id: any,id1:any) {
    this.dialog.open(AddExtraChannelsComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { value: id ,value1:id1 }
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.viewdetails.BroadcasterBoucatebyidchannel(this.id).subscribe((res: any) => {
        if(res.flag==1){
   
     
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
      }
     
      else if(res.flag == 2){
        this.flag=res.flag;
        this.message=res.responseMessage;
        console.log( this.flag);
        console.log( this.message)
      }
      });
    })
  }

  close() {
// this.router.navigate([`dashboard/bouqutes-region/${id}`], {
//     queryParams: { Alldata: id }
//   });
this.location.back()
  }


  ActiveStatus(event: MatSlideToggleChange, id: any) {
    
    this.isChecked = event.checked;

    let submitModel: Broadcastersinglechanelstatus = {
      broadCasterAlcotId: id,
      channelStatus: this.isChecked ? 1 : 0,
    };
    this.viewdetails.BroadcasterSingleStatus(submitModel).subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.viewdetails.BroadcasterBoucatebyidchannel(this.id).subscribe((res: any) => {
            if(res.flag==1){
       
         
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
          }
         
          else if(res.flag == 2){
            this.flag=res.flag;
            this.message=res.responseMessage;
            console.log( this.flag);
            console.log( this.message)
          }
          });
        }, 1000);
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }

  Viewregions(id: any) {
    
    this.dialog.open(BouquetsRegionsviewComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "100ms",
      data: { value: id }
    })
  }

  Edit(id: any,id1:any) {

    // this.valueid = id


    this.dialog.open(ChanneleditComponent, {
      data: {value:id,value1:id1},
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.viewdetails.BroadcasterBoucatebyidchannel(this.id).subscribe((res: any) => {
        if(res.flag==1){
   
     
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
      }
     
      else if(res.flag == 2){
        this.flag=res.flag;
        this.message=res.responseMessage;
        console.log( this.flag);
        console.log( this.message)
      }
      });
    })

    // this.viewdetails.BroadcasterBoucatebyid(this.valueid).subscribe({
    //   next: (res: any) => {
        
    //     if (res.flag == 1) {
    //       this.getAction = res.response;

   
    //       this.services = res.response.serviceProvider.serviceId
       

    //       this.broadCasterRegions = this.getAction.broadCasterRegion
       
    //       // for (let data of this.broadCasterRegions) {
    //       //   this.broadCasterRegionsss.push(data.broadCasterRegion.regionId)
    //       // }

    //       // for (let data of this.broadCasterRegions) {
    //       //   this.broadCasterRegionIds.push(data.broadCasterRegion.broadCasterRegionId)
            
    //       // }

    //       this.perValueObject = new Set(this.values)
    //       for (let value of this.perValueObject) {
    //         this.perValueArray.push(value)
    //       }
          
        
    //     } else if (res.flag == 2) {

    //       this.errorMessage = res.responseMessage;
    //     } else {
    //       this.errorMessage = res.responseMessage;
    //     }
    //   },
    // });

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
