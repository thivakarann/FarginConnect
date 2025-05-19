import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ticket } from '../../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrl: './addticket.component.css'
})
export class AddticketComponent {
  ticketFormGroup: any = FormGroup;
  description: any;
  adminname :any = JSON.parse(sessionStorage.getItem('adminname') || '');
  raiseTicketId: any;
  ticketValue: any;
  tickets:any;
  raise:any;
  stickerPerAmount: any;
  totalAmount: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(private service: FarginServiceService, private router: Router, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    
   
    this.raiseTicketId = this.data.value.raiseTicketId
 
    this.ticketFormGroup = new FormGroup({
      remarks: new FormControl('', [Validators.required,Validators.maxLength(250)]),
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
      approvalStatusUpdatedBy: this.adminname,
      remarks: this.remarks?.value,
      approvalStatus: this.approvalStatus?.value
    }
    this.service.updatetickets(this.raiseTicketId, submitModel).subscribe((res: any) => {
      this.ticketValue = res.response;
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
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
