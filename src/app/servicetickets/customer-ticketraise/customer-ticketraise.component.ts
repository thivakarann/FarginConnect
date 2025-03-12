import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { custticketraise } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-customer-ticketraise',
  templateUrl: './customer-ticketraise.component.html',
  styleUrl: './customer-ticketraise.component.css'
})
export class CustomerTicketraiseComponent {
  
  ticketFormGroup: any = FormGroup;
  description: any;
  adminname: any = localStorage.getItem('adminName')
  raiseTicketId: any;
  ticketValue: any;

  constructor(private service: FarginServiceService, private router: Router, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    

    this.raiseTicketId = this.data.value.raiseTicketId
    this.ticketFormGroup = new FormGroup({
      ticketStatus: new FormControl('', [Validators.required]),
      ticketComment: new FormControl('', [Validators.required])

    })
  }
  get ticketStatus() {
    return this.ticketFormGroup.get('ticketStatus')
  }
  get ticketComment() {
    return this.ticketFormGroup.get('ticketComment')
  }
  
  save() {
    let submitModel: custticketraise = {
      ticketStatusModifedBy:this.adminname,
      ticketStatus: this.ticketStatus?.value,
      ticketComment: this.ticketComment?.value
    }
    this.service.customerraiseticketupdate(this.raiseTicketId, submitModel).subscribe((res: any) => {
      this.ticketValue = res.response;
      

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
     
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
