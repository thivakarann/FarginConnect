import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-view-privacypolicy',
  templateUrl: './view-privacypolicy.component.html',
  styleUrl: './view-privacypolicy.component.css'
})
export class ViewPrivacypolicyComponent  implements OnInit {
  privacypolicyvalue: any;
  constructor(private dialog:MatDialog,private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any,) { }
  ngOnInit(): void {
    this.privacypolicyvalue = this.data.value.privacyPolicy
  }

  close() {
    this.dialog.closeAll();
  }

}
