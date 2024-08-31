import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ticket } from '../../Fargin Model/fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrl: './addticket.component.css'
})
export class AddticketComponent {
  ticketFormGroup: any = FormGroup;
  description: any;
  adminname: any = localStorage.getItem('adminname')
  raiseTicketId: any;
  ticketValue: any;

  constructor(private service: FarginServiceService, private router: Router, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.data.value);

    this.raiseTicketId = this.data.value.raiseTicketId
    this.ticketFormGroup = new FormGroup({
      remarks: new FormControl('', [Validators.required]),
      approvalStatus: new FormControl('', [Validators.required])

    })
  }
  get remarks() {
    return this.ticketFormGroup.get('remarks')
  }
  get approvalStatus() {
    return this.ticketFormGroup.get('approvalStatus')
  }
  save() {
    let submitModel: ticket = {
      updatedBy: this.adminname,
      remarks: this.remarks?.value,
      approvalStatus: this.approvalStatus?.value
    }
    this.service.updatetickets(this.raiseTicketId, submitModel).subscribe((res: any) => {
      this.ticketValue = res.response;
      console.log();

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
  close() {
    this.dialog.closeAll()
  }




}
