import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatOption, MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { role, subpermission } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit {
  addcategory: any = FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');

  categoryName: any;
  permissionValue: any;

  @ViewChild('select') select: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;

  allSelected = false;
  allSelected1 = false;
  subpermissionValue: any;
  roleValue: any;
  roleformGroup: any = FormGroup;
  getpermission: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,) { }

  ngOnInit(): void {



    this.service.permissionget().subscribe((res: any) => {
      this.permissionValue = res.response;

    })

    this.roleformGroup = this.fb.group({
      roleName: ['', [Validators.required]],
      permission: ['', [Validators.required]],
      subPermission: ['', [Validators.required]]

    })
  }

  get roleName() {
    return this.roleformGroup.get('roleName')
  }

  get permission() {
    return this.roleformGroup.get('permission')
  }

  get subPermission() {
    return this.roleformGroup.get('subPermission')
  }
  sendPermissionId(id: any) {


    let submitModel: subpermission = {
      permissionsId: id,
    }


    this.service.subPermission(submitModel).subscribe((res: any) => {
      this.subpermissionValue = res.response;


    })
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

  submit() {
    let submitModel: role = {
      roleName: this.roleName.value.trim(),
      createdBy: this.createdBy,
      permission: this.permission?.value,
      subPermission: this.subPermission?.value
    }
    this.service.addRoles(submitModel).subscribe((res: any) => {
      this.roleValue = res.response;

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()

      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
