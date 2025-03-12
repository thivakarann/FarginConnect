import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-setupbox-customerview',
  templateUrl: './setupbox-customerview.component.html',
  styleUrl: './setupbox-customerview.component.css'
})
export class SetupboxCustomerviewComponent {
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
    
 
    this.service.setupboxcustomerview(this.id).subscribe((res:any)=>{
      if(res.flag==1){
        this.viewcustomer=res.response[0];
        this.stbres=res.response[0].stbId;
      }
    })
  }

close(){
this.location.back()
}
  
}
