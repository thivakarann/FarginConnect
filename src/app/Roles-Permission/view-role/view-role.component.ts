import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { roleactiveInactive } from '../../Fargin Model/fargin-model/fargin-model.module';
import { log } from 'console';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrl: './view-role.component.css'
})
export class ViewRoleComponent implements OnInit{
  showcategoryData: any;
  dataSource: any;
  displayedColumns: any[] = ["roleid", "rolename", "permissionName", "actionName", "status", "action", "CreatedBy", "CreatedAt"];
  isChecked: any;
  roledata: any;
  dataValue: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  permissionViews: any;
  subPermissionViews: any;
  roleId: any;
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }
  ngOnInit(): void {

    
    this.service.viewRoles().subscribe((res:any)=>{
      this.roledata=res.response;
      console.log(this.roledata);
      this.dataSource = new MatTableDataSource(this.roledata?.reverse())
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  onSubmit(event: MatSlideToggleChange,id:any) {
    console.log(id);
    
    this.isChecked = event.checked;
   
    let submitModel: roleactiveInactive = {
      roleId: id,
      status: this.isChecked ? 1 : 0,
    };
 
    this.service.rolesStatus(submitModel).subscribe((res: any) => {
      console.log(res);
      this.toastr.success(res.responseMessage);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    });
  }
  edit(id:any) {
    this.dialog.open(EditRoleComponent, {    
      data:{value:id} ,
      width:'80vw',// Use percentage to make it responsive
      maxWidth:'600px',
      height:'480px',
  // Ensure it doesn't get too wide on large screens
      enterAnimationDuration:'1000ms',      
      exitAnimationDuration:'1000ms', });
  }

  create() {
    this.dialog.open(AddRoleComponent, {      
      width:'80vw',// Use percentage to make it responsive
      maxWidth:'600px',
      height:'480px',
  // Ensure it doesn't get too wide on large screens
      enterAnimationDuration:'1000ms',      
      exitAnimationDuration:'1000ms', });
  }

  exportexcel() {

  }
  permissionView(id:any){
    this.service.viewPermissionSubPermission(id).subscribe((res:any)=>{
      this.dataValue=res.response;
      console.log(this.dataValue);
      this.permissionViews=res.response?.permission;
      console.log(this.permissionViews);
      this.subPermissionViews=res.response?.subPermission; 
      console.log(this.subPermissionViews);
        
      

    })
  }
  }

 

