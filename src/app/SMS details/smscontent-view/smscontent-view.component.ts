import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-smscontent-view',
  templateUrl: './smscontent-view.component.html',
  styleUrl: './smscontent-view.component.css'
})
export class SmscontentViewComponent {
 comments: any;
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.comments = this.data.value
  }
}
