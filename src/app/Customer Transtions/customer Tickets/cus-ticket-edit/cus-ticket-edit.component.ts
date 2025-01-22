import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { CustServiceService } from '../../../Customer-service/cust-service.service';
import { ticketsedit } from '../../../fargin-model/fargin-model.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cus-ticket-edit',
  templateUrl: './cus-ticket-edit.component.html',
  styleUrl: './cus-ticket-edit.component.css'
})
export class CusTicketEditComponent {
  ticketedit: any = FormGroup;
  MerchantName: any;
  
  MobileNumber: any;
  ticket: any;
  sort: any;
  custicket: any;
  raiseticket:any;

  constructor(private dialog: MatDialog, private service: CustServiceService, private toastr: ToastrService, private fb: FormBuilder, private router: Router,private ActivateRoute: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any,) { }


  ngOnInit(): void {

    this.custicket = this.data.value;
    
    this.raiseticket = this.data.value.raiseTicketId;

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;
      
    });
    

    this.ticketedit = new FormGroup({
      raiseTicketId: new FormControl(''),
      categoryName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      mobileNumber: new FormControl(''),
   
    });
   
  }

  // get raiseTicketId() {
  //   return this.ticketedit.get('raiseTicketId');
  // }

  get categoryName() {
    return this.ticketedit.get('categoryName');
  }
  get description() {
    return this.ticketedit.get('description');
  }

  get mobileNumber() {
    return this.ticketedit.get('mobileNumber');
  }

  
  TicketEdit() {
    let submitModel: ticketsedit = {
      raiseTicketId: this.raiseticket,
      categoryName: this.categoryName.value,
      description: this.description.value,
      mobileNumber: this.MobileNumber
    }
    this.service.editcustomerticket(submitModel).subscribe((res: any) => {
      this.ticketedit = res.response;
      
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
      }
      else {
        this.toastr.error(res.response)
      }
    })
  }





}

