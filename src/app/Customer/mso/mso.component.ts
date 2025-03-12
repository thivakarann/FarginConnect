import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-mso',
  templateUrl: './mso.component.html',
  styleUrl: './mso.component.css'
})
export class MsoComponent {
  mso: any;
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.mso = this.data.value
  }
  close(){
    this.dialog.closeAll()
  }
}
