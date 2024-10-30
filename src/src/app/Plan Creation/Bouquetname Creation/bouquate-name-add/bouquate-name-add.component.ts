import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addBouquetname } from '../../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-bouquate-name-add',
  templateUrl: './bouquate-name-add.component.html',
  styleUrl: './bouquate-name-add.component.css'
})
export class BouquateNameAddComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;



  constructor(
    public Broadcasternameadd: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      broardCaste: new FormControl('', Validators.required),
    });
  }

  get broardCaste() {
    return this.myForm.get('broardCaste')

  }



  submit() {
    let submitModel: addBouquetname = {
      broardCaste: this.broardCaste?.value,
      createdBy: this.getadminname
    }

    this.Broadcasternameadd.BouquetAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
      else  {
        this.toastr.error(res.errorMessage);
      }
    })
  }






}
