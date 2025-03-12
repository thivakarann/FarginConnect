import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admincustomerdetails',
  templateUrl: './admincustomerdetails.component.html',
  styleUrl: './admincustomerdetails.component.css'
})
export class AdmincustomerdetailsComponent {
  currentPage: any = 1;

searchText: any;
  routeid:any; 
  customerviews: any;
constructor(private dialog: MatDialog, private service: FarginServiceService,private activatedRoute: ActivatedRoute,private router:Router,private location: Location) { }
 
  ngOnInit(): void {
    this.routeid = this.activatedRoute.snapshot.paramMap.get('id');

    this.service.viewcustomerbtstreet(this.routeid).subscribe((res:any)=>
      {
         this.customerviews=res.response;
      })
  }
  close() {
    this.location.back()     
  }
  customerViews(id: any) {
    this.router.navigate([`dashboard/admincustomertransactionroute/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }
}
