import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-setupboxnumberreadmore',
  templateUrl: './setupboxnumberreadmore.component.html',
  styleUrl: './setupboxnumberreadmore.component.css'
})
export class SetupboxnumberreadmoreComponent {
  number: any;
  Title: any;
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.number = this.data.value;
    this.Title = this.data.value2
  }
  close(){
    this.dialog.closeAll()
  }
}
