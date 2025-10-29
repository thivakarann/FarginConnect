import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { branchterminaladd } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-branch-terminal-add',
  templateUrl: './branch-terminal-add.component.html',
  styleUrl: './branch-terminal-add.component.css',
})
export class BranchTerminalAddComponent implements OnInit {
  AddTerminal: any = FormGroup;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  branchId: any;
  merchantId: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.branchId = this.data.value;
    this.merchantId = this.data.value2;

    this.AddTerminal = new FormGroup({
      terminalNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern('^[0-9 ,]+$'),
      ]),
    });
  }

  get terminalNumber() {
    return this.AddTerminal.get('terminalNumber');
  }

  submit() {
    let terminalArray = this.terminalNumber.value.split(',').map((item: any) => item.trim());
    let submitModel: branchterminaladd = {
      terminalNumber: terminalArray,
      merchantId: this.merchantId,
      branchId: this.branchId,
      createdBy: this.adminName,
    };
    this.service.BranchTerminalCreate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
