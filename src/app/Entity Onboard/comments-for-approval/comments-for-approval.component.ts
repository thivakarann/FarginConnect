import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-comments-for-approval',
  templateUrl: './comments-for-approval.component.html',
  styleUrl: './comments-for-approval.component.css',
})

export class CommentsForApprovalComponent implements OnInit {
  comments: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.comments = this.data.value;
  }
}
