import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-ticket-image',
  templateUrl: './ticket-image.component.html',
  styleUrl: './ticket-image.component.css'
})
export class TicketImageComponent {
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
