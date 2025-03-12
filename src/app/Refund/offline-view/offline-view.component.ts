import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-offline-view',
  templateUrl: './offline-view.component.html',
  styleUrl: './offline-view.component.css'
})
export class OfflineViewComponent implements OnInit {
  details: any;

  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.details = this.data.value
  }

}
