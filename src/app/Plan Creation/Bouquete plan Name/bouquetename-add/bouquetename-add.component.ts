import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { BouquetNameadd } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-bouquetename-add',
  templateUrl: './bouquetename-add.component.html',
  styleUrl: './bouquetename-add.component.css'
})
export class BouquetenameAddComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  details: any;

  constructor(
    public Bouquetenameadd: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {

    this.Bouquetenameadd.BoucatenamesActive().subscribe((res: any) => {
      this.details = res.response
    });

    this.myForm = new FormGroup({
      bouquetName: new FormControl('', Validators.required),
    });
  }

  get bouquetName() {
    return this.myForm.get('bouquetName')

  }


  submit() {
    let submitModel: BouquetNameadd = {
      bouquetName: this.bouquetName?.value,
      createdBy: this.getadminname
    }

    this.Bouquetenameadd.BouquetenameAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
