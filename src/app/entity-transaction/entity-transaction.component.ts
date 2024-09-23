import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entity-transaction',
  templateUrl: './entity-transaction.component.html',
  styleUrl: './entity-transaction.component.css'
})
export class EntityTransactionComponent {

  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
    }
    exportexcel() {
    throw new Error('Method not implemented.');
    }
      dataSource!: MatTableDataSource<any>;
      displayedColumns: string[] = [
        'settlementId',
        'payoutId',
        'amount',
        'reference',
        'txnItem',
        'createdAt',
        'View',
       
      ];
      viewall: any;
      @ViewChild('tableContainer') tableContainer!: ElementRef;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      isChecked: boolean = false;
        id: any;
    showcategoryData: boolean = false;
    viewdata: any;
      details: any;
      detaislone: any;
      bankdetails: any;
      accountid: any;
      Viewall: any;
       
      constructor(
        public service: FarginServiceService,
        private router: Router,
        private toastr: ToastrService,
        private ActivateRoute:ActivatedRoute,
        private location :Location
      ) { }
      ngOnInit(): void {
     
        this.ActivateRoute.queryParams.subscribe((param: any) => {
          this.id = param.Alldata;
        });
     
        this.service.EntityTraansaction(this.id).subscribe((res: any) => {
          this.details = res.response;
          console.log(this.details);
          this.dataSource = new MatTableDataSource(this.details.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          
        })}
     
  
       

    
    close(){
     this.location.back()
    } 
  }