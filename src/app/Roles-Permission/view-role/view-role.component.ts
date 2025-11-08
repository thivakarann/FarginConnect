import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { Payload, roleactiveInactive } from '../../fargin-model/fargin-model.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { ViewSubpermissionComponent } from '../view-subpermission/view-subpermission.component';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

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
  businessvalues: any[] = [];
  values2: any[] = [];
  subId: any[] = [];
  perValueArray: any[] = [];
  moduleName: any[] = [];
  roleName: any;
  permissionview: any;
  subpermission: any;
  perValueObject: any;
  searchPerformed: boolean = false;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  currentfilvalShow: boolean = false;
  currentfilval: any;
  getdashboard: any;
  viewall: any;
  businessid: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
  ) { }

  ngOnInit(): void {
    this.Getall();
  };

  Getall() {
    const payload = {
      pageNumber: 0,
      pageSize: 5,
      fromDate: '',
      toDate: '',
      status: -1,
      searchContent: ''
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.viewRoles(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.roledata = JSON.parse(this.cryptoService.decrypt(res.data));;
        this.dataSource = new MatTableDataSource(this.roledata.content);
        this.totalPages = this.roledata.totalElements;
        this.totalpage = this.roledata.size;
        this.currentpage = this.roledata.number;
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.roledata = [];
        this.dataSource = new MatTableDataSource(this.roledata.content);
        this.totalPages = this.roledata.totalElements;
        this.totalpage = this.roledata.size;
        this.currentpage = this.roledata.number;
        this.currentfilvalShow = false;
      }
    });
  };

  Search(filterValue: string) {
    if (filterValue == '' || filterValue == null) {
      this.toastr.error('Please Enter the Text');
    }
    else {
      const payload = {
        pageNumber: 0,
        pageSize: 5,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: filterValue
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.service.viewRoles(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.roledata = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.dataSource = new MatTableDataSource(this.roledata.content);
          this.totalPages = this.roledata.totalElements;
          this.totalpage = this.roledata.size;
          this.currentpage = this.roledata.number;
          this.currentfilvalShow = true;
        } else {
          this.roledata = [];
          this.dataSource = new MatTableDataSource(this.roledata.content);
          this.totalPages = this.roledata.totalElements;
          this.totalpage = this.roledata.size;
          this.currentpage = this.roledata.number;
          this.currentfilvalShow = true;
        }
      });
    }
  };
  create() {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  edit(id: string, rolename: any) {
    this.values = [];
    this.subId = [];
    this.perValueArray = [];
    this.businessvalues = [];
    this.moduleName = [];

    const payload = {
      roleId: id,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.RolebyIDnew(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getAction = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.businessid = this.getAction.CategoryAccess;
          this.permissionview = this.getAction.PermissionsAccess;
          this.subpermission = this.getAction.SubPermissionsAccess;

          for (let data2 of this.businessid) {
            this.businessvalues.push(data2.businessCategoryId);
          }

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
              roleName: rolename,
              role: id,
              sub: this.subId,
              Busid: this.businessvalues,
              moduleNames: this.moduleName,
            },

            disableClose: true,
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '500ms',
          });

          dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
            this.Getall();
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

  onSubmit(id: any) {
    let submitModel: roleactiveInactive = {
      roleId: id,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.rolesStatus(datamodal).subscribe((res: any) => {
      this.toastr.success(res.messageDescription);
      setTimeout(() => { this.Getall() }, 200);
    });
  };

  subpermissionView(id: any) {
    const payload = {
      roleId: id,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.RolebyIDnew(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.viewall?.SubPermissionsAccess;
          this.dialog.open(ViewSubpermissionComponent, {
            data: { value: this.getdashboard },
            disableClose: true,
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '500ms',
          });
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
  }



  getData(event: any) {
    if (this.currentfilvalShow) {
      const payload = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: ''
      };
      let datamodal: Payload = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.service.viewRoles(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.roledata = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.dataSource = new MatTableDataSource(this.roledata.content);
          this.totalPages = this.roledata.totalElements;
          this.totalpage = this.roledata.size;
          this.currentpage = this.roledata.number;
          this.currentfilvalShow = false;
        } else {
          this.roledata = [];
          this.dataSource = new MatTableDataSource(this.roledata.content);
          this.totalPages = this.roledata.totalElements;
          this.totalpage = this.roledata.size;
          this.currentpage = this.roledata.number;
          this.currentfilvalShow = false;
        }
      });
    } else {
      const payload = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: this.currentfilval
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.service.viewRoles(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.roledata = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.dataSource = new MatTableDataSource(this.roledata.content);
          this.totalPages = this.roledata.totalElements;
          this.totalpage = this.roledata.size;
          this.currentpage = this.roledata.number;
          this.currentfilvalShow = true;
        } else {
          this.roledata = [];
          this.dataSource = new MatTableDataSource(this.roledata.content);
          this.totalPages = this.roledata.totalElements;
          this.totalpage = this.roledata.size;
          this.currentpage = this.roledata.number;
          this.currentfilvalShow = true;
        }
      });
    }

  }
}
