import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../../service/fargin-service.service';
import { Validators } from '@angular/forms';
import { bookingststatus } from '../../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-stb-status',
  templateUrl: './stb-status.component.html',
  styleUrl: './stb-status.component.css'
})
export class StbStatusComponent {
  setupformGroup: any = FormGroup;
  viewData: any;
  entityname: any = localStorage.getItem('entityname')
  boxnumber: any;
  setupid: any;
  regionactive: any;
  regionValue: any;
  serviceIds: any;
  serviceValue: any;
  bookindstatus: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.setupid = this.data.value.stbId;

    this.bookindstatus = this.data.value.bookingStatus

    this.setupformGroup = new FormGroup({
      bookingStatus: new FormControl('', [Validators.required]),
    })
  }

  get bookingStatus() {
    return this.setupformGroup.get('bookingStatus')
  }

  submit() {
    let submitModel: bookingststatus = {
      bookingStatus: this.bookingStatus?.value,
      stbId: this.setupid
    }
    this.service.STBStatus(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
