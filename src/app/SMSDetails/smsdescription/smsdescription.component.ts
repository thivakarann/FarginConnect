import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-smsdescription',
  templateUrl: './smsdescription.component.html',
  styleUrl: './smsdescription.component.css'
})
export class SMSDescriptionComponent {
  comments: any;
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.comments = this.data.value
  }
}
