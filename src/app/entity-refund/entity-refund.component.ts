import { Component, ElementRef, ViewChild } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entity-refund',
  templateUrl: './entity-refund.component.html',
  styleUrl: './entity-refund.component.css'
})
export class EntityRefundComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'customerId',
    'Customer Refund',
    'Type',
    'Customer Name',
    'Payment ID',
    'Request ID',
    'Activity ID',
    'Paid Amount',
    'Refund Amount',
    'Total Refunded Amount',
    'Refund Status',
    'Refund Date & Time'
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
    id: any;
    showcategoryData: boolean = false;
  refundValue: any;
   
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute:ActivatedRoute,
    private Location:Location
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
   
    this.service.Entityrefund(this.id).subscribe((res: any) => {
      console.log(res);
      this.refundValue = res.response;
      this.dataSource=new MatTableDataSource(this.refundValue)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
   
   
 
   
   
   
 
   
 
   
   
   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
 
  close(){
    this.Location.back()
   }
}