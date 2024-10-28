import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dues-view',
  templateUrl: './dues-view.component.html',
  styleUrl: './dues-view.component.css'
})
export class DuesViewComponent {
  viewdata: any;
  viewdata1: any;
  transactiondata: any;
  transaction: any;
  constructor(private router: Router,
    private service: FarginServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
  ngOnInit(): void {
    this.transaction = this.data.value;
    

  }

  cancel() {
    this.dialog.closeAll()
  }
}
