import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-viewadditionalpayments',
  templateUrl: './viewadditionalpayments.component.html',
  styleUrl: './viewadditionalpayments.component.css'
})
export class ViewadditionalpaymentsComponent {
view: any;
  id: any;
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.id = this.data.value

    this.service.additionalpaymentsviewbyid(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.view = res.response;
      }
    })
  }


}
