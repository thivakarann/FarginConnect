import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { areaStatus, pincodeStatus, streetStatus } from '../../../fargin-model/fargin-model.module';
import { AreaViewComponent } from '../area-view/area-view.component';
import { StreetViewComponent } from '../street-view/street-view.component';
import { Location } from '@angular/common';
import { ExtraaddrouteComponent } from '../extraaddroute/extraaddroute.component';

@Component({
  selector: 'app-customerviewroute',
  templateUrl: './customerviewroute.component.html',
  styleUrl: './customerviewroute.component.css'
})
export class CustomerviewrouteComponent {

  dataSource: any;
  merchantId: any = localStorage.getItem('merchantId');
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // displayedColumns: any[] = ["stbId", "adminName", "beatRole", "status", "action","View", "CreatedBy","createdAt"];
  routeid: any;
  route: any;
 searchText: any;
 currentPage: any = 1;
 routeData: any[] = []; 
  isChecked: any;
  MerchantView: any;
  routeId: any;
  areaviews: any;
  routePincodeId: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
valuepincodeadd: any;
valuepincodestatus: any;
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService,private router:Router, private activatedRoute: ActivatedRoute,private location: Location) { }

  ngOnInit(): void {
    
    if (this.roleName == 'Merchant Super admin')
      {
    this.valuepincodeadd = 'Route Configuration-Pincode Add';
    this.valuepincodestatus='Route Configuration-Pincode Status'
   
  
  }
  else{
    this.service.viewRole(this.roleId).subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.getdashboard = res.response?.merchantSubPermission;

   

        for (let datas of this.getdashboard) {
          this.actions = datas.subPermissions
          
          if(this.actions=='Route Configuration-Pincode Add'){
            this.valuepincodeadd='Route Configuration-Pincode Add'
          }
          if(this.actions=='Route Configuration-Pincode Status'){
            this.valuepincodestatus='Route Configuration-Pincode Status'
          }
         
              }
      
    }
    })
  }
   
    this.routeid = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.customerrouteids(this.routeid).subscribe((res: any) => {
      this.routeData =res.response;
      this.routePincodeId=res.response.routePincodeId
  
      this.routeId=res.response

    });
    
    
    
  
  
}
  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // Viewarea(id: any) {
  //   this.merchantsmsId = id;
  //   this.dialog.open(AreaViewComponent, {
  //     enterAnimationDuration: "1000ms",
  //     exitAnimationDuration: "1000ms",
  //     disableClose: true,
  //     data: {
  //       value: this.id,
 
  //     }
  //   })
  // }
  create(id:any) {
    this.dialog.open(ExtraaddrouteComponent, {
      data: { value: id },
      width:'80vw',
      maxWidth:'500px',
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.customerrouteids(this.routeid).subscribe((res: any) => {
        this.routeData =res.response;
        this.routePincodeId=res.response.routePincodeId
    
        this.routeId=res.response
  
      });
      
    })

  }
  // areaView(id: any) {
  //   this.dialog.open(AreaViewComponent, {
  //     data: { value: id },
  //     disableClose: true,
  //     enterAnimationDuration: '1000ms',
  //     exitAnimationDuration: '1000ms',
  //   });

  // }

  areaViews(id: any) {
    this.router.navigate([`dashboard/areaviewroute/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }
  streetView(id: any) {
    this.dialog.open(StreetViewComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
  reload(){
    window.location.reload()
  }
  close() {
    this.location.back()     
  }
  pincodeStatus(event: any, id: any) {
    this.isChecked = event.checked;
    let submitModel: pincodeStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.pinStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
         setTimeout(() => {
          this.service.customerrouteids(this.routeid).subscribe((res: any) => {
            this.routeData =res.response;
            this.routePincodeId=res.response.routePincodeId
        
            this.routeId=res.response
      
          });
        }, 500);

      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
   areaStatuss(event: any, id: any) {
    this.isChecked = event.checked;
    let submitModel: areaStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.areasStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
  streetStatuss(event: any, id: any) {
    this.isChecked = event.checked;
    let submitModel: streetStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.streetsStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
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
