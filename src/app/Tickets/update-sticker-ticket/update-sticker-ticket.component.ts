import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { updatestickerticket } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-update-sticker-ticket',
  templateUrl: './update-sticker-ticket.component.html',
  styleUrl: './update-sticker-ticket.component.css',
})
export class UpdateStickerTicketComponent implements OnInit {
  updatestickerticket: any = FormGroup;
  description: any;
  adminname: any = JSON.parse(sessionStorage.getItem('adminname') || '');
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  raiseTicketId: any;
  ticketValue: any;
  tickets: any;
  raise: any;
  stickerPerAmount: any;
  totalAmount: any;
  deliveryDays: any;
  stickerCountraise: any;
  viewall: any;
  stickerreq: any;
  merchantId: any;
  details: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private service: FarginServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.details = this.data.value.ticketStatus;
    this.raiseTicketId = this.data.value.raiseTicketId;
    this.merchantId = this.data.value.merchantId;
    this.stickerCountraise = this.data.value.stickerCount;
    this.stickerreq = this.data.value.subject;

    this.service.Sticker().subscribe((res: any) => {
      this.viewall = res.response;
      this.stickerPerAmount = res.response[0].stickerPerAmount;
      this.deliveryDays = res.response[0].deliveryDays;
      this.totalAmount = Number((Number(this.stickerCountraise) * Number(this.stickerPerAmount)).toFixed(2)
      );
    });

    this.updatestickerticket = new FormGroup({
      stickerCount: new FormControl('', [Validators.required,Validators.pattern('^[1-9][0-9]*$')]),
    });
  }

  get stickerCount() {
    return this.updatestickerticket.get('stickerCount');
  }

  calculateTotal() {
    const stickerCount = this.updatestickerticket.get('stickerCount').value;
    if (stickerCount) {
      this.totalAmount = Number((stickerCount * this.stickerPerAmount).toFixed(2));
    } else {
      this.totalAmount = Number((this.stickerCountraise * this.stickerPerAmount).toFixed(2));
    }
    this.updatestickerticket.patchValue({ totalAmount: this.totalAmount });
  }

  save() {
    let submitModel: updatestickerticket = {
      raiseTicketId: this.raiseTicketId,
      stickerCount: this.stickerCount.value,
      subject: this.stickerreq,
      merchantId: this.merchantId,
      ticketStatus: this.details,
      stickerUpdatedBy: this.getadminname,
      description:this.data?.value?.description
    };
    this.service.UpdateStickerTickets(submitModel).subscribe((res: any) => {
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
