import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-entity-offlineview',
  templateUrl: './entity-offlineview.component.html',
  styleUrl: './entity-offlineview.component.css'
})
export class EntityOfflineviewComponent {
  details: any;

  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.details = this.data.value
  }
}
