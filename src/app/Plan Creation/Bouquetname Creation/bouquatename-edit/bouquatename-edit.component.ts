import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UpdateBouquetname } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-bouquatename-edit',
  templateUrl: './bouquatename-edit.component.html',
  styleUrl: './bouquatename-edit.component.css'
})
export class BouquatenameEditComponent implements OnInit {
  id: any;
  boutuquename: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  constructor(
    public Boutqueedit: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  myForm!: FormGroup;

  ngOnInit(): void {

    this.id = this.data.value;

    this.Boutqueedit.Bouquetnamebyid(this.id).subscribe((res: any) => {
      this.boutuquename = res.response.broadCasterName;
    })

    this.myForm = new FormGroup({
      broardCaste: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]{1,50}$/)]),
    });
  }

  get broardCaste() {
    return this.myForm.get('broardCaste')

  }

  submit() {
    let submitModel: UpdateBouquetname = {
      broardCaste: this.broardCaste?.value.trim(),
      modifiedBy: this.getadminname,
      bundleChannelId: this.id
    }

    this.Boutqueedit.BouquetnameUpdate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll()
      }
      else  {
        this.toastr.error(res.errorMessage);
      }
    })
  }





}
