import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
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
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {

    this.Bouquetenameadd.BoucatenamesActive().subscribe((res: any) => {
      this.details = res.response.reverse();
    });

    this.myForm = new FormGroup({
      bundleChannelId: new FormControl('', Validators.required),
      bouquetName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(100)]),
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
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
