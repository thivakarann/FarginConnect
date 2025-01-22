import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { log } from 'console';

@Component({
  selector: 'app-view-ticketimage',
  templateUrl: './view-ticketimage.component.html',
  styleUrl: './view-ticketimage.component.css'
})
export class ViewTicketimageComponent {
  raiseTicketId: any;
  imageUrl: any;
  DocView: boolean = false;
  showcard: boolean = true;
  constructor(private router: Router, private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }
  ngOnInit(): void {
    
    this.raiseTicketId = this.data.value.raiseTicketId

    this.service.viewticketImage(this.raiseTicketId).subscribe({
      next: (res: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
          
          this.DocView = true;
        }
      },

    });
  }

  close() {
    this.dialog.closeAll()
  }



}
