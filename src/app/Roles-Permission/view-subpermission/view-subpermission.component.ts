import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-subpermission',
  templateUrl: './view-subpermission.component.html',
  styleUrl: './view-subpermission.component.css'
})
export class ViewSubpermissionComponent {
  streetValue: any;
  subpermissionValue: any;
  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.subpermissionValue = this.data.value
  }

  back() {
    this.dialog.closeAll()
  }
}
