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
import { Payload, stickerstatus } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { EditStickerComponent } from '../edit-sticker/edit-sticker.component';

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
    'activeStatus',
    'Edit',
    'createdBy',
    'createdAt',
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
  valuestickerUpdate: any;
  valuesmsstatus: any;
  valuesmsedit: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  actions: any;
  errorMessage: any;
  valuestickeradd: any;
  valuestickerstatus: any;
  currentfilval: any;
  totalPages: any;
  totalpage: any;
  currentfilvalShow: boolean = false;
  currentpage: any;
  Roledetails: any;
  valueadd: any;
  valuestickerhistory: any;


  constructor(
    public service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
  ) { }

  ngOnInit(): void {
    this.Role();
    this.Getall();
  };

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;

          if (this.roleId == 1) {
            this.valueadd = 'Sticker-Create';
            this.valuestickerUpdate = 'Sticker-Update';
            this.valuestickerstatus = 'Sticker-Status';
            this.valuestickerhistory = 'Sticker-History';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;

              if (this.actions == 'Sticker-Create') {
                this.valueadd = 'Sticker-Create';
              }
              if (this.actions == 'Sticker-Update') {
                this.valuestickerUpdate = 'Sticker-Update';
              }
              if (this.actions == 'Sticker-Status') {
                this.valuestickerstatus = 'Sticker-Status';
              }
              if (this.actions == 'Sticker-History') {
                this.valuestickerhistory = 'Sticker-History';
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
    this.service.Sticketget().subscribe((res: any) => {
      this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));;
      this.dataSource = new MatTableDataSource(this.viewall.reverse());
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

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

  ActiveStatus(id: any) {
    let submitModel: stickerstatus = {
      stickerId: id
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.StickerStatus(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        setTimeout(() => { this.Getall(); }, 200);
      }
      else {
        this.toastr.error(res.messageDescription);
      }
    });
  }

  Edit(id: any) {
    const dialogRef = this.dialog.open(EditStickerComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "500ms",
      data: { value: id },
      disableClose: true
    })
    dialogRef.componentInstance.stickerDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }
}

