import { Component, Inject } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sms-description',
  templateUrl: './sms-description.component.html',
  styleUrl: './sms-description.component.css'
})
export class SmsDescriptionComponent {
  id: any;
 
 
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private service: FarginServiceService) {
 
  }
  ngOnInit(): void {
 
 
    this.id = this.data.value
  
  }

 
 
}