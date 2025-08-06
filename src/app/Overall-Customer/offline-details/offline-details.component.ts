import { Component, Inject } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offline-details',
  templateUrl: './offline-details.component.html',
  styleUrl: './offline-details.component.css',
})
export class OfflineDetailsComponent {

  details: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.details = this.data.value;
  }
}
