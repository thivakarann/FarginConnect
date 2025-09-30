import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-view-refundpolicy',
  templateUrl: './view-refundpolicy.component.html',
  styleUrl: './view-refundpolicy.component.css',
})
export class ViewRefundpolicyComponent implements OnInit {
  refundPolicyValue: any;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.refundPolicyValue = this.data.value.refundPolicy;
  }

  close() {
    this.dialog.closeAll();
  }
}
