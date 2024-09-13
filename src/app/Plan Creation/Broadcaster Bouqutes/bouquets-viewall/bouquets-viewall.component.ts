import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { BouqutesAddComponent } from '../bouqutes-add/bouqutes-add.component';
import { BroadcasterBouquetStatus } from '../../../fargin-model/fargin-model.module';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BouqetsEditComponent } from '../bouqets-edit/bouqets-edit.component';

@Component({
  selector: 'app-bouquets-viewall',
  templateUrl: './bouquets-viewall.component.html',
  styleUrl: './bouquets-viewall.component.css'
})
export class BouquetsViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'bouquetId',
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
    public Bouquetviewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.Bouquetviewall.BroadcasterBoucateviewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.viewall);
    });
  }

  add() {
    this.dialog.open(BouqutesAddComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms'
    })
  }

  Edit(id: any) {
    this.dialog.open(BouqetsEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id }
    })
  }

  Viewdata(id: any) {
    this.router.navigate([`dashboard/bouqutes-view/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportexcel() {

  }



  ActiveStatus(event: MatSlideToggleChange, id: any) {
    console.log(id)
    this.isChecked = event.checked;

    let submitModel: BroadcasterBouquetStatus = {
      status: this.isChecked ? 1 : 0,
      bouquteId: id
    };
    this.Bouquetviewall.BroadcasterBoucateStatus(submitModel).subscribe((res: any) => {
      console.log(res);
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        window.location.reload();
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }

}
