import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-create-commentcampaigns',
  templateUrl: './create-commentcampaigns.component.html',
  styleUrl: './create-commentcampaigns.component.css',
})
export class CreateCommentcampaignsComponent {
  emailContent: any;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.emailContent = this.data.value.emailContent;
  }
}
