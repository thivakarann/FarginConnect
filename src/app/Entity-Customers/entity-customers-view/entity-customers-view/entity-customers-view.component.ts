import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
import { ChannelViewComponent } from '../../../Overall-Customer/channel-view/channel-view.component';

@Component({
  selector: 'app-entity-customers-view',
  templateUrl: './entity-customers-view.component.html',
  styleUrl: './entity-customers-view.component.css'
})
export class EntityCustomersViewComponent {
  id: any;
  customerview: any;
  customerviewalcot: any
  customer: any;
  selectedTab: string = 'customer-info'; // Default to 'customer-info'
 
  items: any[] = []; // The array of items to paginate
  currentPage: any = 1; // The current page number
  itemsPerPage = 3; //
  page: number = 1;
 
  page1: number = 1;
  page2:number = 1;
 
 
  term: any;
  selected: any;
  selecteded: string = '5';
  dataSource: any;
  searchText: any;
  data: any;
  status: any;
  viewcustomer: any;
  alcotchannel: any;
  bouquetPlan: any;
  lcopChannel: any;
  transaction: any;
  showData:boolean=false;
  viewData:boolean=false;
  totalAmount: number=0;
  totalbouqet: number=0;
  totallcop: number=0;
  overallAmount: number=0;
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
 
 
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,private location:Location
 
  ) { }
 
  ngOnInit(): void {
 
 
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.value;
      console.log(this.id)
    });
 
    this.service.ViewCustomerDetails(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewcustomer = res.response.customerdetail;
        this.alcotchannel = res.response.alcotList;
        console.log(this.alcotchannel);
        this.bouquetPlan = res.response.bouquetList;
        this.lcopChannel = res.response.lcopList;
       
        let totalAmount = 0;
        const alcotList = res.response.alcotList;
 
   
        for (let i = 0; i < alcotList.length; i++) {
          totalAmount += alcotList[i].price;
        }
   
        this.totalAmount = totalAmount;
       this.viewData=true;
 
 
       let totalbouqet=0;
       const bouquetList=res.response.bouquetList;
 
       for (let i = 0; i < bouquetList.length; i++) {
         totalbouqet += bouquetList[i].broadCasterId.amount;
       }
   
       this.totalbouqet = totalbouqet;
      this.viewData=true;
 
 
      let totallcop=0;
      const lcopList=res.response.lcopList;
 
      for (let i = 0; i < lcopList.length; i++) {
        totallcop += lcopList[i].overallAmount;
      }
 
      this.totallcop = totallcop;
 
     this.viewData=true;
     this.overallAmount = this.totalAmount + this.totalbouqet + this.totallcop;
     }
      else{
        this.viewData=false;
 
      }
 
    })
 
 
    this.service.CustomerTransaction(this.id).subscribe((res: any) => {
      if(res.flag==1){
        this.transaction = res.response;
        this.showData=true;
 
      }
   else{
  this.showData=false
   }
    })
  }
 
  close(){
  this.location.back()
  }
  viewChannel(id:any){
    console.log('alcot'  ,this.id)
    this.dialog.open(ChannelViewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      data: { value: id }
    })
  }
}
