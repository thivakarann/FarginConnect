import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-commentsfor-approvaltwo',
  templateUrl: './commentsfor-approvaltwo.component.html',
  styleUrl: './commentsfor-approvaltwo.component.css',
})
export class CommentsforApprovaltwoComponent {
  commentL2: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.commentL2 = this.data.value;
  }
}
