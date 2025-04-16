import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import {
  branchkeys,
  mainkeysbranch,
} from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-branch-inactivenbranch',
  templateUrl: './branch-inactivenbranch.component.html',
  styleUrl: './branch-inactivenbranch.component.css',
})
export class BranchInactivenbranchComponent {
  status: any;
  isChecked: any;
  customer: any;
  ActiveButton: any;
  showDropdown = false;
  entityname: any = sessionStorage.getItem('merchantname');
  branchId: any;
  branchonlyactives: any;
  merchantId: any;
  selectedBranchId: any;
  selectedOption: number = 0;
  constructor(
    private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.branchId = this.data.value;
    console.log(this.branchId);
    this.merchantId = this.data.value1;
    console.log(this.merchantId);

    this.service
    .branchonlyactive(this.merchantId, this.branchId)
    .subscribe((res: any) => {
      this.branchonlyactives = res.response;
    });
  }

  toggleOption(option: number) {
    this.selectedOption = option;
  }
  mainkeys() {
    let submitmodel: mainkeysbranch = {
      accountStatus: '0',
      flag: '1',
    };
    this.service
    .inactivebranch(this.branchId, submitmodel)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
  branch() {
    let submitmodel: branchkeys = {
      accountStatus: '0',
      flag: '2',
      branchId: this.selectedBranchId,
    };
    this.service
    .inactivebranch(this.branchId, submitmodel)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
