import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { roleactiveInactive } from '../../fargin-model/fargin-model.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { ViewPermissionComponent } from '../view-permission/view-permission.component';
import { ViewSubpermissionComponent } from '../view-subpermission/view-subpermission.component';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrl: './view-role.component.css',
})
export class ViewRoleComponent implements OnInit {
  showcategoryData: any;
  dataSource: any;
  displayedColumns: any[] = [
    'roleid',
    'rolename',
    // 'permissionName',
    'actionName',
    'status',
    'action',
    'CreatedBy',
    'CreatedAt',
    'modifiedBy',
    'modifiedAt',
  ];
  isChecked: any;
  roledata: any;
  dataValue: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  permissionViews: any;
  subPermissionViews: any;
  roleId: any;
  errorMessage: any;
  getAction: any;
  values: any[] = [];
  values2: any[] = [];
  subId: any[] = [];
  perValueArray: any[] = [];
  moduleName: any[] = [];
  roleName: any;
  permissionview: any;
  subpermission: any;
  perValueObject: any;
  searchPerformed: boolean = false;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.service.viewRoles().subscribe((res: any) => {
      if (res.flag == 1) {
        this.roledata = res.response;
        this.dataSource = new MatTableDataSource(this.roledata?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.flag == 2) {
        this.roledata = [];
        this.dataSource = new MatTableDataSource(this.roledata?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
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

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: roleactiveInactive = {
      roleId: id,
      status: this.isChecked ? 1 : 0,
    };
    this.service.rolesStatus(submitModel).subscribe((res: any) => {
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        this.service.viewRoles().subscribe((res: any) => {
          if (res.flag == 1) {
            this.roledata = res.response;
            this.dataSource = new MatTableDataSource(this.roledata?.reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else if (res.flag == 2) {
            this.roledata = [];
            this.dataSource = new MatTableDataSource(this.roledata?.reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        });
      }, 500);
    });
  }

  edit(id: string) {
    this.values = [];
    this.subId = [];
    this.perValueArray = [];
    this.moduleName = [];
    this.service.rolegetById(id).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getAction = res.response;
          this.roleName = this.getAction.roleName;
          this.permissionview = this.getAction.permission;
          this.subpermission = this.getAction.subPermission;

          for (let data of this.permissionview) {
            this.values.push(data.permissionId);
          }

          //Duplicate Removal start
          this.perValueObject = new Set(this.values);
          for (let value of this.perValueObject) {
            this.perValueArray.push(value);
          }

          //Duplicate Removal end

          for (let data1 of this.subpermission) {
            this.subId.push(data1.subPermissionId);
          }
          const dialogRef = this.dialog.open(EditRoleComponent, {
            data: {
              per: this.perValueArray,
              roleName: this.roleName,
              role: id,
              sub: this.subId,
              moduleNames: this.moduleName,
            },
            disableClose: true,
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '500ms',
          });
          dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
            this.fetchrole();
          });
        }
        else if (res.flag == 2) {
          this.errorMessage = res.responseMessage;
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      },
    });
  }

  fetchrole() {
    this.service.viewRoles().subscribe((res: any) => {
      if (res.flag == 1) {
        this.roledata = res.response;
        this.dataSource = new MatTableDataSource(this.roledata?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.flag == 2) {
        this.roledata = [];
        this.dataSource = new MatTableDataSource(this.roledata?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  create() {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchrole();
    });
  }

  reload() {
    this.service.viewRoles().subscribe((res: any) => {
      if (res.flag == 1) {
        this.roledata = res.response;
        this.dataSource = new MatTableDataSource(this.roledata?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.flag == 2) {
        this.roledata = [];
        this.dataSource = new MatTableDataSource(this.roledata?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  permissionView(id: any) {
    this.dialog.open(ViewPermissionComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  };


  subpermissionView(id: any) {
    this.dialog.open(ViewSubpermissionComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }
}
