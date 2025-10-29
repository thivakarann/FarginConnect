import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-announcementview',
  templateUrl: './announcementview.component.html',
  styleUrl: './announcementview.component.css'
})
export class AnnouncementviewComponent {
  announcement: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.announcement = this.data.value.announcementContentEnglish
  }

}
