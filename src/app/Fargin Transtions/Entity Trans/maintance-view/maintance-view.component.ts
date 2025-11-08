import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-maintance-view',
  templateUrl: './maintance-view.component.html',
  styleUrl: './maintance-view.component.css'
})
export class MaintanceViewComponent {
  view: any;
  id: any;
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.id = this.data.value
    this.service.MaintenanceTransactionsView(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.view = res.response;
      }
    })
  }
}
