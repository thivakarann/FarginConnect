import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-commentsfor-approvalone',
  templateUrl: './commentsfor-approvalone.component.html',
  styleUrl: './commentsfor-approvalone.component.css',
})
export class CommentsforApprovaloneComponent {
  comment: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.comment = this.data.value;
  }
}
