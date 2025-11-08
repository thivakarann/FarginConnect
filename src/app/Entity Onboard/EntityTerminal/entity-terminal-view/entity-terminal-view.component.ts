import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Entitystatus, Payload } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
import { EntityTerminalAddComponent } from '../entity-terminal-add/entity-terminal-add.component';
import { EntityTerminalEditComponent } from '../entity-terminal-edit/entity-terminal-edit.component';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-entity-terminal-view',
  templateUrl: './entity-terminal-view.component.html',
  styleUrl: './entity-terminal-view.component.css',
})
export class EntityTerminalViewComponent implements OnInit {
  terminal: any;
  isChecked: any;
  dataSource: any;
  displayedColumns: string[] = [
    'sno',
    'accountId',
    'terminalNumber',
    'status',
    'View',
    'edit',
    'createdBy',
    'createdAt',
    'modifiedBy',
    'modifiedAt',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  errorMessage: any;
  actions: any;
  searchPerformed: boolean = false;
  id: any;
  merchantId: any;
  getdashboard: any[] = [];
  valueTerminalAdd: any;
  valueTerminalStatus: any;
  valueTerminalEdit: any;
  valueTerminalview: any;
  Roledetails: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
    private location: Location,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit() {


    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.merchantId = param.Alldata;
    });
    this.Role();
    this.Getall();


  }

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
            this.valueTerminalAdd = 'Terminal Entity-Add';
            this.valueTerminalStatus = 'Terminal Entity-Status';
            this.valueTerminalEdit = 'Terminal Entity-Edit';
            this.valueTerminalview = 'Terminal Entity Transaction-View';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;

              if (this.actions == 'Terminal Entity-Add') {
                this.valueTerminalAdd = 'Terminal Entity-Add';
              }
              if (this.actions == 'Terminal Entity-Status') {
                this.valueTerminalStatus = 'Terminal Entity-Status';
              }
              if (this.actions == 'Terminal Entity-Edit') {
                this.valueTerminalEdit = 'Terminal Entity-Edit';
              }
              if (this.actions == 'Terminal Entity Transaction-View') {
                this.valueTerminalview = 'Terminal Entity Transaction-View';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });
  }

  transactions(id: any, id1: any) {
    this.router.navigate([`dashboard/terminal-transactions/${id}`], {
      queryParams: { Alldata: id, Alldata1: id1 },
    });
  }

  Getall() {
    this.service.EntityTerminalviewMerchant(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.terminal = res.response;
        this.dataSource = new MatTableDataSource(this.terminal.reverse());
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
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.terminal.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: Entitystatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.EntityTerminalStatus(id, submitModel).subscribe((res: any) => {
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        this.Getall();
      }, 1000);
    });
  }



  CreateEntityTerminal(id: any) {
    const dialogRef = this.dialog.open(EntityTerminalAddComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
      data: { value: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  EditTerminal(id: any) {
    const dialogRef = this.dialog.open(EntityTerminalEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
      data: { value: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  close() {
    this.location.back();
  }

}
