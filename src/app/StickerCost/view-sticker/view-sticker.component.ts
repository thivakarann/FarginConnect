import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { AddStickerComponent } from '../add-sticker/add-sticker.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { stickerstatus } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-view-sticker',
  templateUrl: './view-sticker.component.html',
  styleUrl: './view-sticker.component.css'
})
export class ViewStickerComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'stickerId',
    'stickerPerAmount',
    'deliveryDays',
    'date',
    'createdBy',
    'createdDateTime',
    "View"
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
  valuesmsadd: any;
  valuesmsstatus: any;
  valuesmsedit: any;
  getdashboard: any[] = [];
roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  valuestickeradd: any;
  valuestickerstatus: any;


  constructor(
    public service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,
  ) { }

  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuestickeradd = 'Sticker-Update';
            this.valuestickerstatus = 'Sticker-History';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;

              if (this.actions == 'Sticker-Update') {
                this.valuestickeradd = 'Sticker-Update';
              }
              if (this.actions == 'Sticker-History') {
                this.valuestickerstatus = 'Sticker-History';
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
    this.Getall();
  };

  Getall() {
    this.service.Sticker().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  AddSticker() {
    const dialogRef = this.dialog.open(AddStickerComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  view(id: any) {
    this.router.navigate([`dashboard/sticker-history/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  ActiveStatus(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: stickerstatus = {
      activeStatus: this.isChecked ? 'Active' : 'Inactive',
    };
    this.service.StickerStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.Getall();
        }, 200);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}

