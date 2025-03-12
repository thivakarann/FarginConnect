import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-view-ticketcomment',
  templateUrl: './view-ticketcomment.component.html',
  styleUrl: './view-ticketcomment.component.css'
})
export class ViewTicketcommentComponent {
  remarks: any;
  constructor(private service: FarginServiceService, private toastr: ToastrService,
     private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    
    this.remarks=this.data.value.remarks
  }

  back(){
    this.dialog.closeAll()
  }
}
