import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-smscontent-view',
  templateUrl: './smscontent-view.component.html',
  styleUrl: './smscontent-view.component.css',
})
export class SmscontentViewComponent {
  comments: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  
  ngOnInit(): void {
    this.comments = this.data.value;
  }
}
