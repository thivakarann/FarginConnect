import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-branch-terminal-view',
  templateUrl: './branch-terminal-view.component.html',
  styleUrl: './branch-terminal-view.component.css'
})
export class BranchTerminalViewComponent implements OnInit {
  terminal: any;
  isChecked: any;
  dataSource: any;
  displayedColumns: string[] = ["sno", "accountId", "terminalNumber", "View", "createdBy", "createdAt", "modifiedBy", "modifiedAt"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roleId: any = localStorage.getItem('roleId')
  errorMessage: any;
  searchPerformed: boolean = false;
  id: any;
  merchantId: any;
  getdashboard: any[] = [];
  actions: any;
  valuebranchTerminalAdd: any;
  valuebranchTerminalStatus: any;
  valuebranchTerminalEdit: any;
  valuebranchTerminalView: any

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit() {




    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
      this.merchantId = param.All;
    });

    this.service.BranchTerminal(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.terminal = res.response;
        this.dataSource = new MatTableDataSource(this.terminal.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.terminal.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });

  }

  // onSubmit(event: MatSlideToggleChange, id: any) {
  //   this.isChecked = event.checked;
  //   let submitModel: branchstatus = {
  //     activeStatus: this.isChecked ? 1 : 0,
  //   };
  //   this.service.BranchTerminalStatus(id, submitModel).subscribe((res: any) => {

  //     this.toastr.success(res.responseMessage);
  //     setTimeout(() => {
  //       this.service.BranchTerminal().subscribe((res: any) => {
  //         if (res.flag == 1) {
  //           this.terminal = res.response;
  //           this.dataSource = new MatTableDataSource(this.terminal.reverse());
  //           this.dataSource.sort = this.sort;
  //           this.dataSource.paginator = this.paginator;
  //         }
  //         else if (res.flag == 2) {
  //           this.dataSource = new MatTableDataSource([]);
  //           this.dataSource = new MatTableDataSource(this.terminal.reverse());
  //           this.dataSource.sort = this.sort;
  //           this.dataSource.paginator = this.paginator;
  //         }
  //       });
  //     }, 1000);
  //   });
  // }

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

  transactions(id: any, id1: any) {
    this.router.navigate([`dashboard/Branch-transactions/${id}`], {
      queryParams: {
        Alldata: id,
        Alldata1: id1

      },
    });
  }
}

