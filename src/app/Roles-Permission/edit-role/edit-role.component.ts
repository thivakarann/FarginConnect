import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { subpermission, updaterole } from '../../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent implements OnInit {
  editRoleForm: any = FormGroup;
  getRoleName: any;
  @ViewChild('select') select: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;
  allSelected = false;
  allSelected1 = false;
  getPerValue: any;
  getSubValue: any;
  permissionValue: any;
  values2: any[] = [];
  getRoleId: any;
  subpermissionValue:any;
  errorMessage: any;
  values: any[] = [];
  entityname: any = localStorage.getItem('adminName')
    updateValue: any;
    filteredValues: any[] = [];

  constructor(private dialog: MatDialog, private service: FarginServiceService, 
    private fb: FormBuilder,public activeRouter: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.service.viewallPermission().subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.permissionValue = res.response;
        this.permissionValue.forEach((element: any) => {
          this.values2.push({
            value: element.permissionId, viewValue: element.permissions
          })
          

        });
      }

    })


    this.editRoleForm = this.fb.group({
      roleName: ['', Validators.required],
      merchantPermission: ['', Validators.required],
      merchantSubPermission: ['', Validators.required]
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

  onPermissionChange(selectedPermissions: any[]): void {
    // Get the sub-permissions based on selected permissions
    this.filteredValues = [];
    this.service.subpermissionValue({ permissionIds: selectedPermissions }).subscribe((res: any) => {
      this.subpermissionValue = res.response;
      this.subpermissionValue.forEach((element: any) => {
        this.filteredValues.push({
          value: element.subPermissionId,
          viewValue: element.subPermissions,
          viewValues: element.merchantPermission.permissions
        });
      });
    });
  }

  sendPermissionId(id: any) {
    
    let submitModel: subpermission = {
      permissionIds: id,
    }
    this.service.subpermissionValue(submitModel).subscribe((res: any) => {
      this.subpermissionValue = res.response;
      
      this.subpermissionValue.forEach((element: any) => {
        this.values.push({
          value: element.subPermissionId, viewValue: element.subPermissions, viewValues: element.merchantPermission.permissions
        });
        
        
      });
    })
  }


  get roleName() {
    return this.editRoleForm.get('roleName')
  }

  get merchantPermission() {
    return this.editRoleForm.get('merchantPermission')
  }

  get merchantSubPermission() {
    return this.editRoleForm.get('merchantSubPermission')
  }


  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
 
  // Toggle All Selection for Sub-permissions
  toggleAllSelection1() {
    if (this.allSelected1) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }
  submit(){
    let submitModel:updaterole={
      modifiedBy: this.entityname,
      roleName: this.roleName.value.trim(),
      merchantPermission: this.merchantPermission.value,
      merchantSubPermission: this.merchantSubPermission.value
    }
    this.service.updateRoles(this.getRoleId,submitModel).subscribe((res:any)=>{
      this.updateValue = res.response;
      
      if (res.flag == 1) {
        this.toastr.success("Role has been Updated Successfully");
        this.dialog.closeAll();
    
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }

  close(){
    this.dialog.closeAll()
  }
}
