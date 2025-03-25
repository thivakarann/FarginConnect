import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute } from '@angular/router';
import { editroles, subpermission } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent implements OnInit {
  editRole: any = FormGroup;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  categoryName: any;
  @ViewChild('select') select: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;
  allSelected = false;
  allSelected1 = false;
  rolenames: any;
  permissionValue: any;
  getRoleName: any;
  getPerValue: any;
  getSubValue: any;
  roleid: any;
  updateValue: any;
  subpermissionValue: any;
  values2: any[] = [];
  errorMessage: any;
  values: any[] = [];
  getRoleId: any;
  constructor(private service: FarginServiceService, private toastr: ToastrService, public activeRouter: ActivatedRoute,
    private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private formbuilder: FormBuilder
  ) { }
 
  ngOnInit(): void {
    // 
 
    // this.roleid = this.data.value.roleId
    // 
 
    this.service.permissionget().subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.permissionValue = res.response;
        this.permissionValue.forEach((element: any) => {
          this.values2.push({
            value: element.permissionId, viewValue: element.permission
 
 
          })
          
        });
      }
      else if (res.flag == 2) {
        this.errorMessage = res.responseMessage;
      } else {
        this.errorMessage = res.responseMessage;
      }
    })
 
 
    this.editRole = this.formbuilder.group({
      roleName: ['', Validators.required],
      permission: ['', Validators.required],
      subPermission: ['', Validators.required]
    })
 
    this.activeRouter.params.subscribe((param: any) => {
      this.getRoleId = param.role;
      this.getRoleId = this.data.role;
      
    });
 
    this.activeRouter.params.subscribe((param: any) => {
      this.getRoleName = param.roleName;
      this.getRoleName = this.data.roleName;
      
    });
 
 
    this.activeRouter.params.subscribe((param: any) => {
      this.getPerValue = param.per;
      this.getPerValue = this.data.per;
      
    });
 
    this.activeRouter.params.subscribe((param: any) => {
      this.getSubValue = param.sub;
      this.getSubValue = this.data.sub;
      
    });
   
 
 
 
 
 
  }
 
  sendPermissionId(id: any) {
    
    this.values = [];
    let submitModel: subpermission = {
      permissionsId: id,
    }
    
 
    this.service.subPermission(submitModel).subscribe((res: any) => {
      this.subpermissionValue = res.response;
      
      this.subpermissionValue.forEach((element: any) => {
        this.values.push({
          value: element.subPermissionId, viewValue: element.subPermissions, viewValues: element.permission.permission
        });
        
       
      });
    })
  }
 
  get roleName() {
    return this.editRole.get('roleName')
  }
 
  get permission() {
    return this.editRole.get('permission')
  }
 
  get subPermission() {
    return this.editRole.get('subPermission')
  }
 
 
  submit() {
    let submitModel: editroles = {
      roleName: this.roleName.value.trim(),
      modifiedBy: this.createdBy,
      permission: this.permission.value,
      subPermission: this.subPermission.value,
    }
    
 
    this.service.editRole(this.getRoleId, submitModel).subscribe((res: any) => {
      this.updateValue = res.response;
      
      if (res.flag == 1) {
        this.toastr.success("Role has been Updated Successfully");
        this.dialog.closeAll();
     
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
 
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
 
  toggleAllSelection1() {
    if (this.allSelected1) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }
}