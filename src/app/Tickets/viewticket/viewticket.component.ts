import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddticketComponent } from '../addticket/addticket.component';
import { EditticketComponent } from '../editticket/editticket.component';
import { ViewDescriptionComponent } from '../view-description/view-description.component';
import { ViewCommentComponent } from '../view-comment/view-comment.component';
import { TicketImageComponent } from '../ticket-image/ticket-image.component';

@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrl: './viewticket.component.css'
})
export class ViewticketComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  displayedColumns: string[] = ["raiseTicketId", "subject", "Criticallity", "description", "image", "Status", 'Comments', "createdDateTime", "action"]
  tickets: any;
  constructor(private router: Router, private service: FarginServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.viewTicket().subscribe((res: any) => {
      this.tickets = res.response;
      console.log(this.tickets);
      this.dataSource = new MatTableDataSource(this.tickets?.reverse())
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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


  description(id: any) {
    this.dialog.open(ViewDescriptionComponent,{
      data:{value:id},
      disableClose:true,
      width:"50%"
    })
  }

  comment(id:any){
    this.dialog.open(ViewCommentComponent,{
      data:{value:id},
      disableClose:true,
      width:"50%"
    })
  }

  image(id: any) {
    this.dialog.open(TicketImageComponent,{
      data:{value:id},
      disableClose:true,
      width:"50%"
    })
  }

  
  update(id:any){
    this.dialog.open(AddticketComponent,{
      data:{value:id},
      disableClose:true,
      width:"50%"
    })
  }
  response(){
    this.dialog.open(AddticketComponent, {
    
      disableClose: true,
      width: "50%",
    })
  }
}
