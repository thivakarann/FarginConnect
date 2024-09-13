import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entity-customers-view-all',
  templateUrl: './entity-customers-view-all.component.html',
  styleUrl: './entity-customers-view-all.component.css'
})
export class EntityCustomersViewAllComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'customerId',
    'customerName',
    'merchantLegalName',
    'categoryName',
    'emailAddress',
    'mobileNumber',
    'flatNumber',
    'blockNumber',
    'stbNumber',
    'Viewcustomer'
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
    id: any;
    showcategoryData: boolean = false;
   
  constructor(
    public EntityViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute:ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
   
    this.EntityViewall.EntityCustomerview(this.id).subscribe((res: any) => {
 
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.viewall);
   
 
    });
  }
   
   
  add() {
    this.router.navigateByUrl('dashboard/entity-add');
  }
   
   
   
  Viewdata(id: any) {
    this.router.navigate([`dashboard/entity-view/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }
   
   
   
  Viewparticularcustomer(id:any){
    this.router.navigate([`dashboard/entity-Individualcustomer-view/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }
   
   
  exportexcel() {
   
  }
   
   
   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
