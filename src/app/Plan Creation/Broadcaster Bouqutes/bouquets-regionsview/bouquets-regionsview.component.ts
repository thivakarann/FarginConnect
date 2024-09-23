import { Component, Inject, OnInit } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bouquets-regionsview',
  templateUrl: './bouquets-regionsview.component.html',
  styleUrl: './bouquets-regionsview.component.css'
})
export class BouquetsRegionsviewComponent implements OnInit {
  detailss: any;
  page: number = 1;
  term: any;
  currentPage: any = 1; // The current page number
  itemsPerPage = 2; //
  searchText: any;
  constructor(
    public MSORegions: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog

  ) { }
  ngOnInit(): void {
    this.detailss = this.data.value;
    console.log(this.detailss)
  }

  close(){
    this.dialog.closeAll();
    window.location.reload();
  }
}
