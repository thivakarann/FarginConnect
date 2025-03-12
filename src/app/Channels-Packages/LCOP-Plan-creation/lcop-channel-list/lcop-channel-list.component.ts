import { Component, Inject } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lcop-channel-list',
  templateUrl: './lcop-channel-list.component.html',
  styleUrl: './lcop-channel-list.component.css'
})
export class LcopChannelListComponent {
  detailss: any;
  pagechannel: number = 1;
  term: any;
  currentPage: any = 1; // The current page number
  itemsPerPage = 3; //
  bouquetId:any;

  constructor(
    public LCOPChannelList: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog

  ) { }


  ngOnInit(): void {
    this.bouquetId = this.data.value;
    this.LCOPChannelList.ChannelsList(this.bouquetId).subscribe((res:any)=>{
      this.detailss=res.response;
    })
    
  }

  close(){
    this.dialog.closeAll();
    setTimeout(() => {
      this.LCOPChannelList.ChannelsList(this.bouquetId).subscribe((res:any)=>{
        this.detailss=res.response;
      })
    }, 500);

  }
}
