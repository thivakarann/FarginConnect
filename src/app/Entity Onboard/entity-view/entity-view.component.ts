import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BankPrimaryStatus } from '../../fargin-model/fargin-model.module';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ApprovalForBankComponent } from '../approval-for-bank/approval-for-bank.component';
import { CommentsForApprovalComponent } from '../comments-for-approval/comments-for-approval.component';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrl: './entity-view.component.css'
})
export class EntityViewComponent implements OnInit {
  id: any;
  details: any;
  detaislone: any;
  bankdetails: any;
  KYCDetails: any;
  isChecked: boolean = false;

  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
      this.bankdetails = res.response.merchantbank;
      this.KYCDetails = res.response.merchantdocument
      // console.log(this.details);
      console.log(this.detaislone);
      console.log(this.bankdetails);
      console.log(this.KYCDetails);

    })
  }

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;

    let submitModel: BankPrimaryStatus = {
      primaryAccountStatus: this.isChecked ? 0 : 1,
    };

    this.MerchantView.BankprimaryStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })


  }


  BankApproval(id: any) {
    this.dialog.open(ApprovalForBankComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { value: id }
    })
  }

  BankComments(id: any) {
    this.dialog.open(CommentsForApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { value: id }
    })
  }


}
