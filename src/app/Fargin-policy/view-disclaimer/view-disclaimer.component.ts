import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-disclaimer',
  templateUrl: './view-disclaimer.component.html',
  styleUrl: './view-disclaimer.component.css',
})
export class ViewDisclaimerComponent implements OnInit {
  disclaimerValue: any;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
    this.disclaimerValue = this.data.value.disclaimer;
  }

  close() {
    this.dialog.closeAll();
  }
}
