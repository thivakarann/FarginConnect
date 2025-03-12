import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-damaged-customer-view',
  templateUrl: './damaged-customer-view.component.html',
  styleUrl: './damaged-customer-view.component.css'
})
export class DamagedCustomerViewComponent {
  stbId: any;
  view: any;
  id:any;
  viewcustomer: any;
  stbres: any;
  constructor( private service: FarginServiceService, private toastr: ToastrService, private ActivateRoute: ActivatedRoute,private location:Location)
  {
 
  }
 
 
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
      console.log(this.id)
     
    });
   
 
    this.service.Damagecustomerview(this.id).subscribe((res:any)=>{
      if(res.flag==1){
        this.viewcustomer=res.response[0];
        console.log(this.viewcustomer)
        // this.stbres=res.response[0].stbId;
      }
    })
  }
 
close(){
this.location.back()
}
}

