import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-commentby',
  templateUrl: './commentby.component.html',
  styleUrl: './commentby.component.css'
})
export class CommentbyComponent {

  commentsBy: any;
  comments: any;
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.commentsBy = this.data.value.commentsBy

    this.comments = this.data.value.comments
  }

  Close() {
    this.dialog.closeAll()
  }
}
