import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BouqetsEditComponent } from '../bouqets-edit/bouqets-edit.component';
import { BouqutesRegioneditComponent } from '../bouqutes-regionedit/bouqutes-regionedit.component';
import { AddExtraRegionComponent } from '../add-extra-region/add-extra-region.component';
import { Console } from 'console';

@Component({
  selector: 'app-bouqutes-region',
  templateUrl: './bouqutes-region.component.html',
  styleUrl: './bouqutes-region.component.css'
})
export class BouqutesRegionComponent {
  detailss: any;
  page: number = 1;
  term: any;
  currentPage: any = 1; // The current page number
  itemsPerPage = 2; //
  searchText: any;
  id: any;
  details: any;
  channelslist: any;
  ServiceProvideregions: any;
  valueid: any;

  Bouquetviewall: any;
  getAction: any;
  bouquet: any;
  creation: any;
  services: any;
  amount: any;
  broadCasterRegions: any;
  broadCasterAlcot: any;


  errorMessage: any;
  values: any[] = [];
  actions: any;

  subId: any[] = [];
  perValueArray: any[] = [];
  moduleName: any[] = [];
  service: any;

  roleName: any;
  permissionview: any;
  subpermission: any;
  broadCasterRegionsss: any[] = [];
  broadCasterRegionIds:any[]=[];
  broadCasterAlcotsss: any[] = [];

  perValueObject: any;
  value2: any;
  serviceid:any;
  broadCasterRegionId:any
  constructor(
    public viewdetails: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog

  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;

    });

    this.viewdetails.BroadcasterBoucatebyidregion(this.id).subscribe((res: any) => {
  
  if (res.response && res.response.length > 0) {
      // Loop through the response and log each broadCasterRegionId
      res.response.forEach((item: any) => {
        console.log(item.broadCasterRegionId);  // This will log all region IDs (Assam, Tamil Nadu, etc.)
      });
      
      // Optionally, if you need to store these IDs in a variable
      this.broadCasterRegionIds = res.response.map((item: any) => item.broadCasterRegionId);
      console.log(this.broadCasterRegionIds); // Array of all regionIds
    }

    if (res.response && res.response.length > 0) {
      this.details = res.response[0].broadCasterBouquet.bouquetId;
      console.log(this.details);
  } 
  
      this.channelslist = res.response.broadCasterAlcot;
      this.ServiceProvideregions = res.response;
      if (res.response && res.response.length > 0) {
        this.serviceid = res.response[0].broadCasterRegion.service.serviceId;
        console.log(this.serviceid);
    } 

    if (res.response && res.response.length > 0) {
      this.serviceid = res.response[0].broadCasterRegion.service.serviceId;
      console.log(this.serviceid);
  } 
     
      console.log(this.serviceid)
      
   
    });
    
  }


  Viewdata(id: any) {
    this.router.navigate([`dashboard/bouqutes-view/${id}`], {
      queryParams: { Alldata: id },
    });
    

  }
  close() {
    this.router.navigateByUrl('dashboard/bouquets-viewall');
  }
  Edit(id: any,id1:any) {

    this.valueid = id
    this.value2=id1;
    this.broadCasterRegionsss = []
    this.broadCasterRegionIds=[]

    this.viewdetails.BroadcasterBoucatebyid(this.details).subscribe({
      next: (res: any) => {
        
        if (res.flag == 1) {
          this.getAction = res.response;

          this.services = res.response.serviceProvider.serviceId
  
          this.broadCasterRegions = this.getAction.broadCasterRegion
          
          // for (let data of this.broadCasterRegions) {
          //   this.broadCasterRegionsss.push(data.broadCasterRegion.regionId)
          // }

          // for (let data of this.broadCasterRegions) {
          //   this.broadCasterRegionIds.push(data.broadCasterRegion.broadCasterRegionId)
            
          // }

      
          this.perValueObject = new Set(this.values)
          for (let value of this.perValueObject) {
            this.perValueArray.push(value)
          }
          
          this.dialog.open(BouqutesRegioneditComponent, {
            data: {services: this.services,broadCasterRegionsss: this.broadCasterRegionsss,  valueid: this.details, broadCasterRegionIds:this.broadCasterRegionIds,value2:this.value2},
            disableClose: true,
            enterAnimationDuration: '1000ms',
            exitAnimationDuration: '1000ms',
          });
        } else if (res.flag == 2) {

          this.errorMessage = res.responseMessage;
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

  }
  

  addExtraChannels(id:any){
    this.dialog.open(AddExtraRegionComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { value: id }

    })
  }

}
