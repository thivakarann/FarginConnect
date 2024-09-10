import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bouqets-edit',
  templateUrl: './bouqets-edit.component.html',
  styleUrl: './bouqets-edit.component.css'
})
export class BouqetsEditComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  id: any;
  details: any;

  constructor(
    public Editdetails: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  ngOnInit(): void {

    this.id = this.data.value;
    console.log(this.id)

    this.Editdetails.BroadcasterBoucatebyid(this.id).subscribe((res: any) => {
      this.details = res.response;
    });

    this.myForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      bouquetName: new FormControl('', Validators.required),
    });
  }

  get amount() {
    return this.myForm.get('amount')

  }

  get bouquetName() {
    return this.myForm.get('ambouquetNameount')

  }
}
