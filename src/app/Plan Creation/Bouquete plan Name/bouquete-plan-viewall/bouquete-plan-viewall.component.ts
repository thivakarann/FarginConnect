import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BouquetenameAddComponent } from '../bouquetename-add/bouquetename-add.component';
import { BouquetenameEditComponent } from '../bouquetename-edit/bouquetename-edit.component';
import { BouquetenameStatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-bouquete-plan-viewall',
  templateUrl: './bouquete-plan-viewall.component.html',
  styleUrl: './bouquete-plan-viewall.component.css'
})
export class BouquetePlanViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'boqCreationId',
    'broadCasterName',
    'bouquetName',
    'status',
    'createdBy',
    'createdAt',
    'Edit',
    'modifiedBy',
    'modifiedAt',
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
    public Bouqutenameviewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.Bouqutenameviewall.Bouqetenameviewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.viewall);
    });
  }

  add() {
    this.dialog.open(BouquetenameAddComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms'
    })
  }

  Edit(id: any) {
    console.log(id);
    this.dialog.open(BouquetenameEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {
    console.log(id)
    this.isChecked = event.checked;

    let submitModel: BouquetenameStatus = {
      boqCreationId: id,
      status: this.isChecked ? 1 : 0
    };
    this.Bouqutenameviewall.Bouquetnamestatus(submitModel).subscribe((res: any) => {
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

  exportexcel() {

  }
}
