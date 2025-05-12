import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { entityterminaladd } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-entity-terminal-add',
  templateUrl: './entity-terminal-add.component.html',
  styleUrl: './entity-terminal-add.component.css',
})
export class EntityTerminalAddComponent implements OnInit {
  Terminaladd: any = FormGroup;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  branchId: any;
  merchantId: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.merchantId = this.data.value;

    this.Terminaladd = new FormGroup({
      terminalNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern('^[0-9 ,]+$'),
      ]),
    });
  }

  get terminalNumber() {
    return this.Terminaladd.get('terminalNumber');
  }

  submit() {
    let terminalArray = this.terminalNumber.value.split(',').map((item: any) => item.trim());

    let submitModel: entityterminaladd = {
      terminalNumber: terminalArray,
      merchantId: this.merchantId,
      createdBy: this.createdBy,
    };

    this.service.EntityTerminalCreate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
