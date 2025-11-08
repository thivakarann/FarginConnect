import { Component, EventEmitter, OnInit, Output, ViewChild, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatOption, MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Payload, role, subpermission } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css',
})
export class AddRoleComponent implements OnInit {
  addcategory: any = FormGroup;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  categoryName: any;
  permissionValue: any;
  @ViewChild('select') select: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;
  @ViewChild('selectssss') selectssss: any = MatSelect;
  allSelected = false;
  allSelected1 = false;
  allSelected3 = false;
  subpermissionValue: any;
  roleValue: any;
  roleformGroup: any = FormGroup;
  getpermission: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  details: any;
  permissiondata: any;
  subpermissiondata: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private cryptoService: EncyDecySericeService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.roleformGroup = this.fb.group({
      businessCategoryId: new FormControl('', [
        Validators.required,
      ]),
      roleName: ['', [Validators.required, Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'), Validators.maxLength(50),],],
      permission: ['', [Validators.required]],
      subPermission: ['', [Validators.required]],
    });

    this.Businnescat();
  }

  get businessCategoryId() {
    return this.roleformGroup.get('businessCategoryId');
  }

  get roleName() {
    return this.roleformGroup.get('roleName');
  }

  get permission() {
    return this.roleformGroup.get('permission');
  }

  get subPermission() {
    return this.roleformGroup.get('subPermission');
  }

  Businnescat() {
    const payload = {
      status: 1,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.ActiveBus(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.details = JSON.parse(this.cryptoService.decrypt(res.data));;
      }
    })
  }

  Permission(id: any[]) {
    const payload = {
      businessCategoryIds: id,
      status: 1,
      needAdminData: true
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.permissionget(datamodal).subscribe((res: any) => {
      this.permissiondata = JSON.parse(this.cryptoService.decrypt(res.data))
      this.permissionValue = (this.permissiondata || []).sort((a: any, b: any) => {
        const permA = (a.permission || '').toLowerCase();
        const permB = (b.permission || '').toLowerCase();
        return permA.localeCompare(permB);
      });
    });
  };

  sendPermissionId(id: any[]) {
    let submitModel: subpermission = {
      permissionIds: id,
      status: 1
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.subPermission(datamodal).subscribe((res: any) => {
      this.subpermissiondata = JSON.parse(this.cryptoService.decrypt(res.data))
      this.subpermissionValue = (this.subpermissiondata || []).sort((a: any, b: any) => {
        const subA = (a.subPermissions || '').toLowerCase();
        const subB = (b.subPermissions || '').toLowerCase();
        return subA.localeCompare(subB);
      });
    });
  };

  toggleAllSelection1() {
    if (this.allSelected1) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  };

  toggleAllSelection3() {
    if (this.allSelected3) {
      this.selectssss.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectssss.options.forEach((item: MatOption) => item.deselect());
    }
  };

  toggleAllSelection() {
    if (this.allSelected) {
      const allIds = this.permissionValue.map((p: { permissionId: any }) => p.permissionId);
      this.roleformGroup.controls['permission'].setValue(allIds);
      this.sendPermissionId(allIds);
    } else {
      this.roleformGroup.controls['permission'].setValue([]);
      this.subpermissionValue = [];
    }
  };

  submit() {
    let submitModel: role = {
      roleName: this.roleName.value.trim(),
      createdby: this.adminName,
      permissionIds: this.permission?.value,
      subPermissionIds: this.subPermission?.value,
      businessCategoryIds: this.businessCategoryId?.value
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.addRoles(datamodal).subscribe((res: any) => {
      this.roleValue = res.response;
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.messageDescription);
      }
    });
  }
}
