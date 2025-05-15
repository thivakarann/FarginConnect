import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  details: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  constructor(
    public Bouquetenameadd: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {

    this.Bouquetenameadd.BoucatenamesActive().subscribe((res: any) => {
      this.details = res.response.reverse();
    });

    this.myForm = new FormGroup({
      bundleChannelId: new FormControl('', Validators.required),
      bouquetName: new FormControl('', [Validators.required ,Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),Validators.maxLength(50)]),
    });
  }

  get bouquetName() {
    return this.myForm.get('bouquetName')

  }

  get bundleChannelId() {
    return this.myForm.get('bundleChannelId')

  }

  submit() {
    let submitModel: BouquetNameadd = {
      bouquetName: this.bouquetName?.value.trim(),
      createdBy: this.getadminname,
      bundleChannelId: this.bundleChannelId?.value
    }

    this.Bouquetenameadd.BouquetenameAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll()
       
      }

      else if (res.flag == 2) {
        this.toastr.error(res.responseMessage);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
