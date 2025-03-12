import { Component } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-channelconfiguration-singleview',
  templateUrl: './channelconfiguration-singleview.component.html',
  styleUrl: './channelconfiguration-singleview.component.css'
})
export class ChannelconfigurationSingleviewComponent {

  id: any;
  regiondetails: any;
  alcardsdetails: any;
  regionname: any;
  ChennelName: any;
  BroadCaster: any;
  Generic: any;
  Language: any;
  Type: any;
  amount: any;
  valueChannellogo: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  constructor(
    public AlcartView: FarginServiceService,
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

    this.AlcartView.Alcardviewbyid(this.id).subscribe((res: any) => {
      this.alcardsdetails = res.response;
    });
    if (this.roleName == 'Merchant Super admin'){
      this.valueChannellogo = 'Channel Configuration-Channel Logo'
    }
    else{
      this.AlcartView.viewRole(this.roleId).subscribe((res: any) => {
      
        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions
            if (this.actions == 'Channel Configuration-Channel Logo') {
              this.valueChannellogo = 'Channel Configuration-Channel Logo'
            }
          }
        
     } })
    }


  }


  Viewimage(id: any) {

    this.AlcartView.AlcartImageview(id).subscribe({
      next: (res: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          var downloadURL = URL.createObjectURL(res);
          window.open(downloadURL);
        }
      }

    });
  }


  close() {
    this.location.back()
  }
}
