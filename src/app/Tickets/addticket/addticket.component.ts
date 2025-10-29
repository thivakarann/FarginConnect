import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ticket } from '../../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrl: './addticket.component.css',
})
export class AddticketComponent {
  ticketFormGroup: any = FormGroup;
  description: any;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  raiseTicketId: any;
  ticketValue: any;
  tickets: any;
  raise: any;
  stickerPerAmount: any;
  totalAmount: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  approvalStatusValue: any;

  constructor(
    private service: FarginServiceService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.raiseTicketId = this.data.value.raiseTicketId;
    this.approvalStatusValue = this.data.value.approvalStatus;

    this.ticketFormGroup = new FormGroup({
      remarks: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      approvalStatus: new FormControl('', [Validators.required]),
    });
  }

  get remarks() {
    return this.ticketFormGroup.get('remarks');
  }
  get approvalStatus() {
    return this.ticketFormGroup.get('approvalStatus');
  }

  save() {
    let submitModel: ticket = {
      approvalStatusUpdatedBy: this.adminName,
      remarks: this.remarks?.value,
      approvalStatus: this.approvalStatus?.value,
    };
    this.service.updatetickets(this.raiseTicketId, submitModel).subscribe((res: any) => {
      this.ticketValue = res.response;
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
