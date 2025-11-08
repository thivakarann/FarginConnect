import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-smscontent',
  templateUrl: './smscontent.component.html',
  styleUrl: './smscontent.component.css'
})
export class SMSContentComponent {
  comments: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.comments = this.data.value
  }
}
