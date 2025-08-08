import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-whatsapp-mess-description',
  templateUrl: './whatsapp-mess-description.component.html',
  styleUrl: './whatsapp-mess-description.component.css'
})
export class WhatsappMessDescriptionComponent {
  id: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.id = this.data.value;
  }
}
