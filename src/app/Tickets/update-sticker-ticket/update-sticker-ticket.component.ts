import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { updatestickerticket } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-update-sticker-ticket',
  templateUrl: './update-sticker-ticket.component.html',
  styleUrl: './update-sticker-ticket.component.css'
})
export class UpdateStickerTicketComponent implements OnInit {
  updatestickerticket: any = FormGroup;
  description: any;
  adminname: any = JSON.parse(localStorage.getItem('adminname') || '');
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
  constructor(private service: FarginServiceService, private router: Router, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.service.Sticker().subscribe((res: any) => {
      this.viewall = res.response;
      this.stickerPerAmount = res.response[0].stickerPerAmount;
      this.deliveryDays = res.response[0].deliveryDays;
      console.log(this.deliveryDays)
      console.log(this.stickerPerAmount)
      console.log(this.viewall)
      this.totalAmount = Number(this.stickerCountraise) * Number(this.stickerPerAmount);

    });
    

    this.details = this.data.value.ticketStatus;

    console.log("this.details" + this.details)

    this.raiseTicketId = this.data.value.raiseTicketId
    this.merchantId = this.data.value.merchantId

    this.stickerCountraise = this.data.value.stickerCount
    console.log(this.stickerCountraise) //already given value

    this.stickerreq = this.data.value.subject
    console.log(this.stickerreq)

    this.updatestickerticket = new FormGroup({
      stickerCount: new FormControl('', [Validators.required])
    })

  }

  get stickerCount() {
    return this.updatestickerticket.get('stickerCount')
  }

  calculateTotal() {
    const stickerCount = this.updatestickerticket.get('stickerCount').value;
    if (stickerCount) {
      this.totalAmount = stickerCount * this.stickerPerAmount;
      this.updatestickerticket.patchValue({ totalAmount: this.totalAmount });
    }
    else {
      this.totalAmount = this.stickerCountraise * this.stickerPerAmount;
      this.updatestickerticket.patchValue({ totalAmount: this.totalAmount });
    }
  }

  save() {
    let submitModel: updatestickerticket = {
      raiseTicketId: this.raiseTicketId,
      stickerCount: this.stickerCount.value,
      subject: this.stickerreq,
      merchantId: this.merchantId,
      ticketStatus: this.details
    }
    this.service.UpdateStickerTickets(submitModel).subscribe((res: any) => {
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
