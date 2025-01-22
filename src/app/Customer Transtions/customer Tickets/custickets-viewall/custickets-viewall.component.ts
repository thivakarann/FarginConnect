import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { CusTicketeCreateComponent } from '../cus-tickete-create/cus-tickete-create.component';
import { CusTicketEditComponent } from '../cus-ticket-edit/cus-ticket-edit.component';
import { CustServiceService } from '../../../Customer-service/cust-service.service';
import { CustLogoComponent } from '../cust-logo/cust-logo.component';
import { CustomerDiscriptionComponent } from '../../customer-discription/customer-discription.component';

@Component({
  selector: 'app-custickets-viewall',
  templateUrl: './custickets-viewall.component.html',
  styleUrl: './custickets-viewall.component.css'
})
export class CusticketsViewallComponent {
  strings = "@";
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  MobileNumber: any;
  pag: number = 1;
  displayedColumns: string[] = [
    'sno',
    'merchantLegalName',
    'ticketId',
    'mobileNumber',
    'categoryName',
    'logo',
    'description',
    'Comment',
    'ticketStatus',
    'edit',
    'createdDateTime',

  ];
  Description = "Description";
  comments = "Comments";
  FormSearch!: FormGroup;
  ticket: any;
  currentYear: any;
  searchPerformed: boolean = false;



  constructor(private service: CustServiceService, private dialog: MatDialog, private ActivateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.currentYear = new Date().getFullYear();


    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;

    });

    this.service.CustomerTicketget(this.MobileNumber).subscribe((res: any) => {
      if (res.flag == 1) {
        this.ticket = res.response;

        this.dataSource = new MatTableDataSource(this.ticket.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
         this.dataSource.filterPredicate = (data: any, filter: string) => {
          const transformedFilter = filter.trim().toLowerCase();
          const dataStr = Object.keys(data)
          .reduce((currentTerm: string, key: string) => {
            return (
              currentTerm +
              (typeof data[key] === 'object'
                ? JSON.stringify(data[key])
                : data[key])
            );
          }, '')
          .toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

      }

      else if (res.flag == 2) {
        // this.show=true
        this.ticket = res.response;
        this.dataSource = new MatTableDataSource(this.ticket);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });

  }


  Back(id: any) {
    this.router.navigate([`customer-verify-view/${id}`], {
      queryParams: { Alldata: id },
    });

  }

  ticketcreate() {
    this.dialog.open(CusTicketeCreateComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '90vw',// Use percentage to make it responsive
      maxWidth: '500px',
      disableClose: true,

      // data:{value:id},
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.CustomerTicketget(this.MobileNumber).subscribe((res: any) => {
        if (res.flag == 1) {
          this.ticket = res.response;
 
          this.dataSource = new MatTableDataSource(this.ticket.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
           this.dataSource.filterPredicate = (data: any, filter: string) => {
            const transformedFilter = filter.trim().toLowerCase();
            const dataStr = Object.keys(data)
            .reduce((currentTerm: string, key: string) => {
              return (
                currentTerm +
                (typeof data[key] === 'object'
                  ? JSON.stringify(data[key])
                  : data[key])
              );
            }, '')
            .toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
          };
 
        }
 
        else if (res.flag == 2) {
          // this.show=true
          this.ticket = res.response;
          this.dataSource = new MatTableDataSource(this.ticket);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    })

  }

  TicketEdit(id: any) {
    this.dialog.open(CusTicketEditComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '90vw',// Use percentage to make it responsive
      maxWidth: '500px',
      disableClose: true,
      data: { value: id },
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.CustomerTicketget(this.MobileNumber).subscribe((res: any) => {
        if (res.flag == 1) {
          this.ticket = res.response;
 
          this.dataSource = new MatTableDataSource(this.ticket.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
           this.dataSource.filterPredicate = (data: any, filter: string) => {
            const transformedFilter = filter.trim().toLowerCase();
            const dataStr = Object.keys(data)
            .reduce((currentTerm: string, key: string) => {
              return (
                currentTerm +
                (typeof data[key] === 'object'
                  ? JSON.stringify(data[key])
                  : data[key])
              );
            }, '')
            .toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
          };
 
        }
 
        else if (res.flag == 2) {
          // this.show=true
          this.ticket = res.response;
          this.dataSource = new MatTableDataSource(this.ticket);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
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


  viewlogo(id: any) {
    this.dialog.open(CustLogoComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      width: '500px',
      // disableClose: true,
      data: {
        value: id,
        // value1: Link

      }
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.CustomerTicketget(this.MobileNumber).subscribe((res: any) => {
        if (res.flag == 1) {
          this.ticket = res.response;
 
          this.dataSource = new MatTableDataSource(this.ticket.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
           this.dataSource.filterPredicate = (data: any, filter: string) => {
            const transformedFilter = filter.trim().toLowerCase();
            const dataStr = Object.keys(data)
            .reduce((currentTerm: string, key: string) => {
              return (
                currentTerm +
                (typeof data[key] === 'object'
                  ? JSON.stringify(data[key])
                  : data[key])
              );
            }, '')
            .toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
          };
 
        }
 
        else if (res.flag == 2) {
          // this.show=true
          this.ticket = res.response;
          this.dataSource = new MatTableDataSource(this.ticket);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    })

  }


  description(id: any, id2: any) {
    this.dialog.open(CustomerDiscriptionComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '300px',
      disableClose: true,
      data: { value: id, Title: id2 }
    });
  }


  Ticketcomment(id: any, id2: any) {
    // this.router.navigate([`dashboard/customer-description/${id2}`], {
    //   queryParams: { title2:id2,description3:id3 },
    // });
    this.dialog.open(CustomerDiscriptionComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '300px',
      disableClose: true,
      data: { value: id, Title: id2 }
    });
  }

  reload() {
    window.location.reload()
  }
}

