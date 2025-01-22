import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { log } from 'console';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { roleStatus } from '../../fargin-model/fargin-model.module';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { ViewSubpermissionComponent } from '../view-subpermission/view-subpermission.component';
import { ViewPermissionComponent } from '../view-permission/view-permission.component';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrl: './view-role.component.css'
})
export class ViewRoleComponent implements OnInit {
  dataSource: any;
  rolevalue: any;
  merchantId: any = localStorage.getItem('merchantId');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: any[] = ["merchantRoleId", "roleName", "permissionName", "actionName", "status", "action", "CreatedBy", "createdAt"];
  viewPermission: any;
  viewSubpermission: any;
  isChecked: any;
  values: any[] = [];
  values2: any[] = [];
  subId: any[] = [];
  perValueArray: any[] = [];
  moduleName: any[] = [];
  errorMessage: any;
  getAction: any;
  roleName: any;
  permissionview: any;
  subpermission: any;
  perValueObject: any;
  permissionvalue: any;
  subpermissionValue: any;
  valueroleadd: any;
  valuepermissonView: any;
  valuepermissonStatus: any;
  valuepermissonEdit: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleNames = localStorage.getItem('roleName')
searchPerformed: boolean=false;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getallRole(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.rolevalue = res.response; 
        this.dataSource = new MatTableDataSource(this.rolevalue?.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.rolevalue.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
    if (this.roleNames == 'Merchant Super admin')
      {
      this.valueroleadd = "Role-Add"
      this.valuepermissonEdit = 'Role-Edit'
      this.valuepermissonStatus = 'Role-Status'
      this.valuepermissonView = 'Role-View'

    }
    else{
      this.service.viewRole(this.roleId).subscribe((res: any) => {
        
        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
         
  
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions
  
              if (this.actions == 'Role-Add') {
                this.valueroleadd = 'Role-Add'
              }
              if (this.actions == 'Role-Edit') {
                this.valuepermissonEdit = 'Role-Edit'
              }
              if (this.actions == 'Role-Status') {
                this.valuepermissonStatus = 'Role-Status'
              }
              if (this.actions == 'Role-View') {
                this.valuepermissonView = 'Role-View'
              }
  
            }
          
        }
      })
    }
  
  }

  onSubmit(event: MatSlideToggleChange, id: any) {
    

    this.isChecked = event.checked;

    let submitModel: roleStatus = {
      status: this.isChecked ? 1 : 0,
      merchantRoleId: id
    };

    this.service.statusRoles(submitModel).subscribe((res: any) => {
      
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
      this.service.getallRole(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.rolevalue = res.response; 
        this.dataSource = new MatTableDataSource(this.rolevalue?.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.rolevalue.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
      }, 1000);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload(){
    window.location.reload()
  }
  exportexcel() {

  }

  edit(id: any) {
    this.values = [];
    this.subId = [];
    this.perValueArray = [];
    this.service.viewRole(id).subscribe((res: any) => {
      this.rolevalue = res.response;
      if (res.flag == 1) {
        this.getAction = res.response;
        this.roleName = this.getAction.roleName;
        this.permissionview = this.getAction.merchantPermission
        this.subpermission = this.getAction.merchantSubPermission
        for (let data of this.permissionview) {
          this.values.push(data.permissionId)
        }

        this.perValueObject = new Set(this.values)
        for (let value of this.perValueObject) {
          this.perValueArray.push(value)
        }


        for (let data1 of this.subpermission) {
          this.subId.push(data1.subPermissionId)
        }

        this.dialog.open(EditRoleComponent, {
          data: { per: this.perValueArray, roleName: this.roleName, role: id, sub: this.subId },
          disableClose: true,
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '1000ms',
        });
        this.dialog.afterAllClosed.subscribe(()=>{
          this.service.getallRole(this.merchantId).subscribe((res: any) => {
            if(res.flag==1)
            {
              this.rolevalue = res.response; 
              this.dataSource = new MatTableDataSource(this.rolevalue?.reverse())
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
            else if(res.flag==2){
              this.dataSource = new MatTableDataSource([]);
              this.dataSource = new MatTableDataSource(this.rolevalue.reverse());
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }
          })
        })
      } else if (res.flag == 2) {

        this.errorMessage = res.responseMessage;
      } else {
        this.errorMessage = res.responseMessage;
      }
    });
  }

  create() {
    this.dialog.open(AddRoleComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.getallRole(this.merchantId).subscribe((res: any) => {
        if(res.flag==1)
        {
          this.rolevalue = res.response; 
          this.dataSource = new MatTableDataSource(this.rolevalue?.reverse())
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else if(res.flag==2){
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.rolevalue.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      })
    })
  }

  permissionView(id: any) {
    this.dialog.open(ViewPermissionComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    });
  }

  subpermissionView(id: any) {
    this.dialog.open(ViewSubpermissionComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    });
  }

  viewrole(id:any,filterValue: string) {
    if (!filterValue) {
        this.toastr.error('Please enter a value to search');
        return;
    }
 
    this.service.MerchantRole(id,filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.rolevalue = res.response;  
          this.rolevalue.reverse();
          this.dataSource = new MatTableDataSource(this.rolevalue);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
         
        }
        else if (res.flag === 2) {
          this.rolevalue = [];  
          this.dataSource = new MatTableDataSource(this.rolevalue);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      }
      },
     
    });
  }

}
