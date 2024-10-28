import { Component, Inject } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-channel-view',
  templateUrl: './channel-view.component.html',
  styleUrl: './channel-view.component.css'
})
export class ChannelViewComponent {

  detailss: any;
  page: number = 1;
  term: any;
  currentPage: any = 1; // The current page number
  itemsPerPage = 5; //
searchText: any;
 
  constructor(
    public LCOPChannelList: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
 
  ) { }
 
 
  ngOnInit(): void {
    this.detailss = this.data.value;
    
  }


  close(){
    this.dialog.closeAll();
    setTimeout(() => {
      window.location.reload()
    }, 500);

  }
 
}
