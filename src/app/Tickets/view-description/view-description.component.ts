import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-description',
  templateUrl: './view-description.component.html',
  styleUrl: './view-description.component.css'
})
export class ViewDescriptionComponent {

  description: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.description = this.data.value.description
  }

}
