import { Component, EventEmitter, Inject, OnInit, Output, ViewChild, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute } from '@angular/router';
import { editroles, Payload, subpermission } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css',
})
export class EditRoleComponent implements OnInit {
  editRole: any = FormGroup;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  categoryName: any;
  @ViewChild('select') select: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;
  @ViewChild('selectssss') selectssss: any = MatSelect;
  allSelected = false;
  allSelected1 = false;
  allSelected3 = false;
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
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  details: any;
  valuesbusiness: any[] = [];
  permissiondata: any;
  subpermissiondata: any;
  getbusValue: any;
  previousPermissionIds: number[] = [];
  initialSubPermissionIds: number[] = [];


  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    public activeRouter: ActivatedRoute,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.editRole = this.formbuilder.group({
      businessCategoryId: new FormControl('', [
        Validators.required,
      ]),
      roleName: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ],
      ],
      permission: ['', Validators.required],
      subPermission: ['', Validators.required],
    });

    this.getRoleId = this.data.role;
    this.getRoleName = this.data.roleName;
    this.getPerValue = this.data.per;
    this.getSubValue = this.data.sub;
    this.getbusValue = this.data.Busid;

    this.initialSubPermissionIds = [...this.getSubValue];

    this.editRole.patchValue({
      roleName: this.getRoleName,
      businessCategoryId: this.getbusValue
    });

    this.Businnescat();
  };

  get businessCategoryId() {
    return this.editRole.get('businessCategoryId');
  }

  get roleName() {
    return this.editRole.get('roleName');
  }

  get permission() {
    return this.editRole.get('permission');
  }

  get subPermission() {
    return this.editRole.get('subPermission');
  };

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

  toggleAllSelection3() {
    if (this.allSelected3) {
      this.selectssss.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectssss.options.forEach((item: MatOption) => item.deselect());
    }
  };


  Businnescat() {
    const payload = { status: 1 };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    };

    this.service.ActiveBus(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.details = JSON.parse(this.cryptoService.decrypt(res.data));
        this.valuesbusiness = [];
        this.details.forEach((element: any) => {
          this.valuesbusiness.push({
            value: element.businessCategoryId,
            viewValue: element.businessCategoryName,
          });
        });
      }
    });
  }

  Permission(id: any) {
    this.permissionValue = [];
    this.values = [];

    this.subpermissiondata = [];
    this.values2 = [];

    // ✅ Reset form controls to remove selected values
    this.editRole.get('permission')?.setValue([]);
    this.editRole.get('subPermission')?.setValue([]);

    const payload = {
      businessCategoryIds: id,
      status: 1,
      needAdminData: true
    };
    const datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    };
    this.service.permissionget(datamodal).subscribe((res: any) => {
      this.permissionValue = JSON.parse(this.cryptoService.decrypt(res.data));
      this.permissionValue.forEach((element: any) => {
        this.values.push({
          value: element.permissionId,
          viewValue: element.permissionName,
        });
      });
    });
  };


  sendPermissionId(selectedPermissionIds: number[]) {

    const currentSelected = this.editRole.get('subPermission')?.value || [];
    const submitModel: subpermission = { permissionIds: selectedPermissionIds, status: 1 };
    const datamodal: Payload = { data: this.cryptoService.encrypt(JSON.stringify(submitModel)) };

    this.service.subPermission(datamodal).subscribe((res: any) => {
      this.subpermissiondata = JSON.parse(this.cryptoService.decrypt(res.data));

      this.values2 = this.subpermissiondata.map((sp: any) => ({
        value: sp.subPermissionId,
        viewValue: sp.subPermissionName,
        viewValues: sp.permission?.permissionName,
      }));

      const validSubIds = this.subpermissiondata.map((sp: any) => sp.subPermissionId);

      // Permissions removed
      const removedPermissions = this.previousPermissionIds.filter(pid => !selectedPermissionIds.includes(pid));
      const removedSubIds = this.subpermissiondata
        .filter((sp: any) => removedPermissions.includes(sp.permission?.permissionId))
        .map((sp: any) => sp.subPermissionId);

      // Permissions newly added (including reselected)
      const newlyAddedPermissions = selectedPermissionIds.filter(pid => !this.previousPermissionIds.includes(pid));
      const newlyAddedSubIds = this.subpermissiondata
        .filter((sp: any) => newlyAddedPermissions.includes(sp.permission?.permissionId))
        .map((sp: any) => sp.subPermissionId);

      let finalSelection: number[];

      if (this.previousPermissionIds.length === 0) {
        // First load → preselect from DB
        finalSelection = this.initialSubPermissionIds.filter(subId => validSubIds.includes(subId));
      }
      else {
        // Subsequent changes
        finalSelection = currentSelected.filter((subId: any) => !removedSubIds.includes(subId)) // drop subs of removed permissions
          .filter((subId: any) => validSubIds.includes(subId));   // keep only valid subs

        // ✅ Do NOT auto-add subs of newly added/reselected permissions
        finalSelection = finalSelection.filter(subId => !newlyAddedSubIds.includes(subId));
      }

      this.editRole.get('subPermission')?.setValue(finalSelection);
      this.previousPermissionIds = [...selectedPermissionIds];
    });
  }




  submit() {
    let submitModel: editroles = {
      roleName: this.roleName.value.trim(),
      modifiedBy: this.adminName,
      permissionIds: this.permission?.value,
      subPermissionIds: this.subPermission?.value,
      businessCategoryIds: this.businessCategoryId?.value,
      roleId: this.getRoleId
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.editRole(datamodal).subscribe((res: any) => {
      this.updateValue = res.response;
      if (res.flag == 1) {
        this.toastr.success('Role has been Updated Successfully');
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.messageDescription);
      }
    });
  }

}
