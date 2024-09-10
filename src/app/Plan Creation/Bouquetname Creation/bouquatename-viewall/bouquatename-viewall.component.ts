import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { BouquateNameAddComponent } from '../bouquate-name-add/bouquate-name-add.component';
import { BouquatenameEditComponent } from '../bouquatename-edit/bouquatename-edit.component';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { broadcasterstatus } from '../../../fargin-model/fargin-model.module';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-bouquatename-viewall',
  templateUrl: './bouquatename-viewall.component.html',
  styleUrl: './bouquatename-viewall.component.css'
})
export class BouquatenameViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'bundleChannelId',
    'broadCasterName',
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
    public boardcasternameviewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.boardcasternameviewall.BouquetnameViewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.viewall);
    });
  }

  add() {
    this.dialog.open(BouquateNameAddComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms'
    })
  }

  Edit(id: any) {
    console.log(id);
    this.dialog.open(BouquatenameEditComponent, {
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

    let submitModel: broadcasterstatus = {
      bundleChannelId: id,
      status: this.isChecked ? 1 : 0
    };
    this.boardcasternameviewall.Bouquetstatusforbroadcaster(submitModel).subscribe((res: any) => {
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
