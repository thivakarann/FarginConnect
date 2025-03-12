import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-discriptioncustomer',
  templateUrl: './view-discriptioncustomer.component.html',
  styleUrl: './view-discriptioncustomer.component.css'
})
export class ViewDiscriptioncustomerComponent {
  content: any;
  title: any;

  constructor(private toastr: ToastrService,
    private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.content = this.data.value
    

    this.title = this.data.Title
    

  }

  back() {
    this.dialog.closeAll()
  }

}

