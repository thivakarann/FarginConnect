import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-branch-onlineview',
  templateUrl: './branch-onlineview.component.html',
  styleUrl: './branch-onlineview.component.css',
})
export class BranchOnlineviewComponent {
  transactionValue: any;
  id: any;

  constructor(
    private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.value;

    this.service.CustomerTransactionsView(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transactionValue = res.response;
      }
    });
  }
}
