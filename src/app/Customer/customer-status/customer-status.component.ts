import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActiveCustomer } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-customer-status',
  templateUrl: './customer-status.component.html',
  styleUrl: './customer-status.component.css'
})
export class CustomerStatusComponent {
  status: any;
  isChecked: any;
  customer: any;
  ActiveButton: any

  entityname: any = localStorage.getItem('merchantname');
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private toastr: ToastrService) {


  }
  ngOnInit(): void {
    this.customer = this.data.value
    this.status = this.data.value1
    
  }
  activeStatus(value: any) {
    
    
    let submitmodel: ActiveCustomer = {
      activeStatus: value.target.value,
      modifiedBy:this.entityname
    }
    this.service.ActiveStatusCustomer(this.customer, submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.response);
      this.dialog.closeAll()

      }

      else {
        this.toastr.error(res.response);
       
      }


    });
  }
  inactiveStatus(value: any) {
    
    
    let submitmodel: ActiveCustomer = {
      activeStatus: value.target.value,
       modifiedBy:this.entityname
    }
    this.service.ActiveStatusCustomer(this.customer, submitmodel).subscribe((res: any) => {
      this.toastr.success(res.response);
      this.dialog.closeAll()
     
    });
  }



  close() {
    this.dialog.closeAll()
  }
}
