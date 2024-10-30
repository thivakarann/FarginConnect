import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DPOBouqueteAddComponent } from '../dpobouquete-add/dpobouquete-add.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DPOStatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-dpoviewall',
  templateUrl: './dpoviewall.component.html',
  styleUrl: './dpoviewall.component.css'
})
export class DPOViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'dpoBouquetId',
    'bouquetName',
    'broadCasterName',
    'amount',
    'status',
    'View',
  ];

  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];

  constructor(
    public DPOviewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.DPOviewall.DPOViewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    });
  }


  add() {
    this.dialog.open(DPOBouqueteAddComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms'
    })
  }


  Viewdata(id: any) {
    this.router.navigate([`dashboard/dpo-view/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  ActiveStatus(event: MatSlideToggleChange, id: any) {
    
    this.isChecked = event.checked;

    let submitModel: DPOStatus = {
      status: this.isChecked ? 1 : 0,
    };
    this.DPOviewall.DpoStatus(id,submitModel).subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        window.location.reload();
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }

  exportexcel(){

  }
}
