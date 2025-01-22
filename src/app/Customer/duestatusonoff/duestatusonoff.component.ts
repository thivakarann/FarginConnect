import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActiveCustomer, duestatusonoff } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-duestatusonoff',
  templateUrl: './duestatusonoff.component.html',
  styleUrl: './duestatusonoff.component.css'
})
export class DuestatusonoffComponent {
status: any;
  isChecked: any;
  customer: any;
  ActiveButton: any
  stdid: any;
  getadminname = localStorage.getItem('fullname');



  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private toastr: ToastrService) {


  }
  ngOnInit(): void {
    this.stdid = this.data.value
    this.status=this.data.value1
    console.log(this.status)
    
  }
  activeStatus(value: any) {
    let submitmodel: duestatusonoff = {
      dueStatus: 'ON',
      billingMode: value.target.value,
      createdBy: this.getadminname
    }
    this.service.duestatusonoffs(this.stdid, submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();

      }

      else {
        this.toastr.error(res.errorMessage);
      
      }


    });
  }
  inactiveStatus(value: any) {
     let submitmodel: duestatusonoff = {
       dueStatus: 'OFF',
       billingMode: value.target.value,
       createdBy: this.getadminname
     }
    this.service.duestatusonoffs(this.stdid, submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();

      }

      else {
        this.toastr.error(res.errorMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
  });
}



  close() {
    this.dialog.closeAll()
  }
}
