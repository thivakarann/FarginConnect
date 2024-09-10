import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bouquetename-edit',
  templateUrl: './bouquetename-edit.component.html',
  styleUrl: './bouquetename-edit.component.css'
})
export class BouquetenameEditComponent implements OnInit {
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
    console.log(this.id);


    this.Editdetails.BoucatenamesActive().subscribe((res: any) => {
      this.details = res.response;
    });

    this.Editdetails.Bouquenamebyid(this.id).subscribe((res: any)=>{
      
    })
  }


}
