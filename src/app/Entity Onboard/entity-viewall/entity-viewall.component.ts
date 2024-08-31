import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-entity-viewall',
  templateUrl: './entity-viewall.component.html',
  styleUrl: './entity-viewall.component.css'
})
export class EntityViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'merchantId',
    'entityName',
    'merchantLegalName',
    'businessCategoryModel',
    'referenceNo',
    'contactEmail',
    'contactMobile',
    'website',
    'View',
    'createdBy',
    'createdDatetime',


  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;

  constructor(
    public EntityViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    // this.EntityViewall.EntityViewall().subscribe((res: any) => {
    //   this.viewall = res.response;
    //   this.viewall.reverse();
    //   this.dataSource = new MatTableDataSource(this.viewall);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    //   console.log(this.viewall);
    // });
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
