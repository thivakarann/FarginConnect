import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddticketComponent } from '../addticket/addticket.component';
import { ViewDescriptionComponent } from '../view-description/view-description.component';
import { ViewCommentComponent } from '../view-comment/view-comment.component';
import { TicketImageComponent } from '../ticket-image/ticket-image.component';
import { UpdateStickerTicketComponent } from '../update-sticker-ticket/update-sticker-ticket.component';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrl: './viewticket.component.css'
})
export class ViewticketComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  displayedColumns: string[] = [
    'Sno',
    'raiseTicketId',
    'merchantName',
    'subject',
    'stickerCount',
    'Criticallity',
    'Status',
    'description',
    'image',
    'action',
    'stickeraction',
    'Comments',
    'createdDateTime',
    'UpdatedBy',
    'UpdatedAt',
    'UpdatedBys',
    'UpdatedAts',
  ];
  tickets: any;
  businesscategory: any;
  valueTicketExport: any;
  valueTicketImage: any;
  valueTicketEdit: any;
  valueDescriptionView: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  valuestickeredit: any;
  searchPerformed: any;

  constructor(private service: FarginServiceService, private dialog: MatDialog,private cryptoService:EncyDecySericeService,
) { }

  ngOnInit(): void {
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valueDescriptionView = 'Entity Request-View';
            this.valueTicketEdit = 'Entity Request-Edit';
            this.valueTicketExport = 'Entity Request-Export';
            this.valueTicketImage = 'Entity Request-Image';
            this.valuestickeredit = 'Entity Request-EditSticker-Count'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity Request-Export') {
                this.valueTicketExport = 'Entity Request-Export';
              }
              if (this.actions == 'Entity Request-Edit') {
                this.valueTicketEdit = 'Entity Request-Edit';
              }
              if (this.actions == 'Entity Request-Image') {
                this.valueTicketImage = 'Entity Request-Image'
              }
              if (this.actions == 'Entity Request-View') {
                this.valueDescriptionView = 'Entity Request-View'
              }
              if (this.actions == 'Entity Request-EditSticker-Count') {
                this.valuestickeredit = 'Entity Request-EditSticker-Count'
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
  }

  Getall() {
    this.service.viewTicket().subscribe((res: any) => {
      this.tickets = res.response;
      this.dataSource = new MatTableDataSource(this.tickets?.reverse())
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  description(id: any) {
    this.dialog.open(ViewDescriptionComponent, {
      data: { value: id },
      disableClose: true,
      width: '90vw',
      maxHeight: '500px',
      maxWidth: '500px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    })
  }

  comment(id: any) {
    this.dialog.open(ViewCommentComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '90vw',
      maxHeight: '500px',
      maxWidth: '500px',
    })
  }

  image(id: any) {
    this.dialog.open(TicketImageComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    })
  }

  update(id: any) {
    const dialogRef = this.dialog.open(AddticketComponent, {
      data: { value: id },
      disableClose: true,
      width: "50%",
      maxHeight: '500px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }
  stickerupdate(id: any) {
    const dialogRef = this.dialog.open(UpdateStickerTicketComponent, {
      data: { value: id },
      disableClose: true,
      width: "35%",
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }
}
