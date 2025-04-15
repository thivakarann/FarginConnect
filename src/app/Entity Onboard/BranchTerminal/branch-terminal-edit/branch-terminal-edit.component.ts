import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { branchterminaladd, branchterminaledit } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-branch-terminal-edit',
  templateUrl: './branch-terminal-edit.component.html',
  styleUrl: './branch-terminal-edit.component.css'
})
export class BranchTerminalEditComponent implements OnInit {

  EditTerminal: any = FormGroup;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  branchTerminalId:any;
  TerminalNumber:any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public data: any) { }
 
 
  ngOnInit(): void {
    this.branchTerminalId = this.data.value.branchTerminalId
    this.TerminalNumber = this.data.value.terminalNumber

    this.EditTerminal = new FormGroup({
      terminalNo: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9 ]*$')]),
    });
 
  }
 
  get terminalNo() {
    return this.EditTerminal.get('terminalNo');
  }

  submit() {

    let submitModel: branchterminaledit = {
      terminalNo: this.terminalNo.value,
      modifiedBy: this.createdBy
    };
 
    this.service.BranchTerminalEdit(this.branchTerminalId,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
       
      }
      else {
        this.toastr.error(res.responseMessage);
      }
 
    });
 
  }


}
