import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrl: './stock-history.component.css'
})
export class StockHistoryComponent {
pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  currentpage: any;
  id: any;
  Customerresponse: any;
  totalpage: any;
  filter: boolean = false;
  searchPerformed: boolean = false;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'sno',
    'serviceName',
    'oldStock',
    'inventoryStock',
    'Count',
   'updatedBy',
    'updatedAt'

  ];
  Viewall: any;
  constructor(
    private service: FarginServiceService,
    private ActivateRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;

    });

    this.service.CategoryStockHistory(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false
      }
      else if (res.flag === 2) {
        this.Viewall = [];
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;

      }

    });
  }

   reload() {
      window.location.reload()
    }
  
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
  
    close() {
      this.location.back()
    }
    renderPage(event: PageEvent) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
  
      console.log('New Page Index:', this.pageIndex);
      console.log('New Page Size:', this.pageSize);
  
      this.ngOnInit()
    }
    changePageIndex(newPageIndex: number) {
      this.pageIndex = newPageIndex;
      this.renderPage({
        pageIndex: newPageIndex,
        pageSize: this.pageSize,
      } as PageEvent);
    }
  
}
