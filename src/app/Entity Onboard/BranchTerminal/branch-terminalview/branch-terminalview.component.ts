import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Location } from '@angular/common';
import { branchstatus } from '../../../fargin-model/fargin-model.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BranchTerminalAddComponent } from '../branch-terminal-add/branch-terminal-add.component';
import { BranchTerminalEditComponent } from '../branch-terminal-edit/branch-terminal-edit.component';

@Component({
  selector: 'app-branch-terminalview',
  templateUrl: './branch-terminalview.component.html',
  styleUrl: './branch-terminalview.component.css'
})
export class BranchTerminalviewComponent implements OnInit {
  terminal: any;
  isChecked: any;
  dataSource: any;
  displayedColumns: string[] = ["sno", "accountId", "terminalNumber", "status", "edit", "View", "createdBy", "createdAt", "modifiedBy", "modifiedAt"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roleId: any = sessionStorage.getItem('roleId')
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

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuebranchTerminalAdd = 'Entity View Terminal branch-Add';
            this.valuebranchTerminalStatus = 'Entity View Terminal branch-Status';
            this.valuebranchTerminalEdit = 'Entity View Terminal branch-Edit';
            this.valuebranchTerminalView = 'Entity View Terminal branch Transaction-View';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;

              if (this.actions == 'Entity View Terminal branch-Add') {
                this.valuebranchTerminalAdd = 'Entity View Terminal branch-Add';
              }
              if (this.actions == 'Entity View Terminal branch-Status') {
                this.valuebranchTerminalStatus = 'Entity View Terminal branch-Status';
              }
              if (this.actions == 'Entity View Terminal branch-Edit') {
                this.valuebranchTerminalEdit = 'Entity View Terminal branch-Edit';
              }
              if (this.actions == 'Entity View Terminal branch Transaction-View') {
                this.valuebranchTerminalView = 'Entity View Terminal branch Transaction-View';
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })


    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
      this.merchantId = param.All;
    });

    this.service.Branchterminalbyids(this.id).subscribe((res: any) => {
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

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: branchstatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.BranchTerminalStatus(id, submitModel).subscribe((res: any) => {

      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        this.service.Branchterminalbyids(this.id).subscribe((res: any) => {
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
      }, 1000);
    });
  }

  reload() {
    window.location.reload()
  }

  CreateTerminal(id: any, id1: any) {
    this.dialog.open(BranchTerminalAddComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
      data: { value: id, value2: id1 }
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.Branchterminalbyids(this.id).subscribe((res: any) => {
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
    })
  }

  EditTerminal(id: any) {
    this.dialog.open(BranchTerminalEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
      data: { value: id }
    })

    this.dialog.afterAllClosed.subscribe(() => {
      this.service.Branchterminalbyids(this.id).subscribe((res: any) => {
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
    })
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
    this.router.navigate([`dashboard/branch-transactions/${id}`], {
      queryParams: {
        Alldata: id,
        Alldata1: id1

      },
    });
  }
}
