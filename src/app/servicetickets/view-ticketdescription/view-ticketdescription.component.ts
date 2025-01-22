import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-view-ticketdescription',
  templateUrl: './view-ticketdescription.component.html',
  styleUrl: './view-ticketdescription.component.css'
})
export class ViewTicketdescriptionComponent {
  description: any;
  constructor(private service: FarginServiceService, private toastr: ToastrService,
     private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    
    this.description=this.data.value.description
    
    
  }

  back(){
    this.dialog.closeAll()
  }
}
