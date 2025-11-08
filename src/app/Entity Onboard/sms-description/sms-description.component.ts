import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sms-description',
  templateUrl: './sms-description.component.html',
  styleUrl: './sms-description.component.css',
})
export class SmsDescriptionComponent {
  id: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.id = this.data.value;
  }
}
