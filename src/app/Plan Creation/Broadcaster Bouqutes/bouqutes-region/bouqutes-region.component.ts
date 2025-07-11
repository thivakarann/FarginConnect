import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BouqetsEditComponent } from '../bouqets-edit/bouqets-edit.component';
import { BouqutesRegioneditComponent } from '../bouqutes-regionedit/bouqutes-regionedit.component';
import { AddExtraRegionComponent } from '../add-extra-region/add-extra-region.component';
import { Console } from 'console';
import { Location } from '@angular/common';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { msoregionstatus } from '../../../fargin-model/fargin-model.module';

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
  broadCasterRegionIds: any[] = [];
  broadCasterAlcotsss: any[] = [];
  perValueObject: any;
  value2: any;
  serviceid: any;
  broadCasterRegionId: any;
  isChecked: boolean = false;

  constructor(
    public viewdetails: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location

  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;

    });
    this.viewdetails.BroadcasterBoucatebyidregionall(this.id).subscribe((res: any) => {
      if (res.response && res.response.length > 0) {
        res.response.forEach((item: any) => {
        });
        // Optionally, if you need to store these IDs in a variable
        this.broadCasterRegionIds = res.response.map((item: any) => item.broadCasterRegionId);
      }
      if (res.response && res.response.length > 0) {
        this.details = res.response[0].broadCasterBouquet.bouquetId;
      }
      this.channelslist = res.response.broadCasterAlcot;
      this.ServiceProvideregions = res.response;
      if (res.response && res.response.length > 0) {
        this.serviceid = res.response[0].broadCasterRegion.service.serviceId;
      }

      if (res.response && res.response.length > 0) {
        this.serviceid = res.response[0].broadCasterRegion.service.serviceId;
      }
    });

  }


  Viewdata(id: any, id1: any) {
    this.router.navigate([`dashboard/bouqutes-view/${id}/${id1}`], {
      queryParams: { Alldata: id, value: id1 },
    });


  }
  close() {
    // this.router.navigateByUrl('dashboard/bouquets-viewall');
    this.location.back()
  }
  Edit(id: any, id1: any) {

    this.valueid = id
    this.value2 = id1;
    this.broadCasterRegionsss = []
    this.broadCasterRegionIds = []

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

          const dialogRef = this.dialog.open(BouqutesRegioneditComponent, {
            data: { services: this.services, broadCasterRegionsss: this.broadCasterRegionsss, valueid: this.details, broadCasterRegionIds: this.broadCasterRegionIds, value2: this.value2 },
            disableClose: true,
            enterAnimationDuration: '1000ms',
            exitAnimationDuration: '1000ms',
          });
          dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {

            this.fetch();

          });
        } else if (res.flag == 2) {

          this.errorMessage = res.responseMessage;
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

  }

  addExtraChannels(id: any, id1: any) {
    const dialogRef = this.dialog.open(AddExtraRegionComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { value: id, value2: id1 }

    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {

      this.fetch();

    });
  }

  fetch() {
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

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: msoregionstatus = {
      status: this.isChecked ? 1 : 0,
      broadCasterRegionId: id
    };

    this.viewdetails.Broadcastermsoregion(submitModel).subscribe((res: any) => {
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        this.fetch();
      }, 500);
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
