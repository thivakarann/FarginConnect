import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-addwithdrawal',
  templateUrl: './addwithdrawal.component.html',
  styleUrl: './addwithdrawal.component.css',
})
export class AddwithdrawalComponent implements OnInit {
  withdrawalFormGroup: any = FormGroup;
  viewbank: any;
  LedgerId: any;
  note: any;
  amount: any;
  employee: any;
  merchantid: any = localStorage.getItem('merchantid')

  constructor(private dialog: MatDialog, private service: FarginServiceService,
    private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.service.activeEmployees(this.merchantid).subscribe((res: any) => {
      this.employee = res.response;
      
    })
  }

  submit() {
    throw new Error('Method not implemented.');
  }
  viewTypes(id: any) {
    

  }




}
