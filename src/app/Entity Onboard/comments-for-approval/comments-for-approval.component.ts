import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
;

@Component({
  selector: 'app-comments-for-approval',
  templateUrl: './comments-for-approval.component.html',
  styleUrl: './comments-for-approval.component.css'
})
export class CommentsForApprovalComponent implements OnInit{
  comments: any;
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.comments = this.data.value
  }
}
