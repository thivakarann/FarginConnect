import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { entityterminaledit } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-entity-terminal-edit',
  templateUrl: './entity-terminal-edit.component.html',
  styleUrl: './entity-terminal-edit.component.css',
})
export class EntityTerminalEditComponent implements OnInit {
  Entityedit: any = FormGroup;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  entityTerminalId: any;
  TerminalNumber: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {

    this.entityTerminalId = this.data.value.entityTerminalId;
    this.TerminalNumber = this.data.value.terminalNumber;

    this.Entityedit = new FormGroup({
      terminalNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9 ]*$'),
        Validators.maxLength(10),
      ]),
    });
  }

  get terminalNo() {
    return this.Entityedit.get('terminalNo');
  }

  submit() {
    let submitModel: entityterminaledit = {
      terminalNo: this.terminalNo.value,
      modifiedBy: this.createdBy,
    };

    this.service.EntityTerminalUpdate(this.entityTerminalId, submitModel).subscribe((res: any) => {
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
