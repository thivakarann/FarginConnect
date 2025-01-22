import { Component, OnInit, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { roles, subpermission } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit {
  @ViewChild('select') select: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;
  allSelected = false;
  allSelected1 = false;
  roleformGroup: any = FormGroup;
  getpermissionvalue: any;
  subpermissionValue: any;
  merchantId: any = localStorage.getItem('merchantId');
  entityname: any = localStorage.getItem('adminName')
    rolevalue: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,) { }
  ngOnInit(): void {
    this.service.viewallPermission().subscribe((res: any) => {
      this.getpermissionvalue = res.response;
      
    })

    this.roleformGroup = this.fb.group({
      roleName: ['', Validators.required],
      merchantPermission: ['', Validators.required],
      merchantSubPermission: ['', Validators.required],
    })
  }

  sendPermissionId(id: any) {
    
    let submitModel: subpermission = {
      permissionIds: id,
    }
    this.service.subpermissionValue(submitModel).subscribe((res: any) => {
      this.subpermissionValue = res.response;
      
    })
  }



  get roleName() {
    return this.roleformGroup.get('roleName')
  }

  get merchantPermission() {
    return this.roleformGroup.get('merchantPermission')
  }

  get merchantSubPermission() {
    return this.roleformGroup.get('merchantSubPermission')
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
    let submitModel: roles = {
      roleName: this.roleName.value.trim(),
      merchantPermission: this.merchantPermission.value,
      merchantSubPermission: this.merchantSubPermission.value,
      createdBy: this.entityname,
      merchantId: this.merchantId
    }
    this.service.createroles(submitModel).subscribe((res: any) => {
      this.rolevalue = res.response;
      
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
       
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }

  close(){
    this.dialog.closeAll()
  }
}
