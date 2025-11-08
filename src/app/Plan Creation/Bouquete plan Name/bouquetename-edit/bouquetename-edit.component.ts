import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BouquetenameUpdate } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-bouquetename-edit',
  templateUrl: './bouquetename-edit.component.html',
  styleUrl: './bouquetename-edit.component.css'
})
export class BouquetenameEditComponent implements OnInit {
 adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
 adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');

  myForm!: FormGroup;
  id: any;
  details: any;
  detailss: any;
  Broadcastername: any;
  PlanName: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public Editdetails: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {

    this.detailss = this.data.value;
    this.id = this.data.value.boqCreationId;
    this.Broadcastername = this.data.value.bundleChannel.bundleChannelId;
    this.PlanName = this.data.value.bouquetName;

    this.Editdetails.BoucatenamesActive().subscribe((res: any) => {
      this.details = res.response.reverse();
    });

    this.myForm = new FormGroup({
      bundleChannelId: new FormControl('', Validators.required),
      bouquetName: new FormControl('', [Validators.required,
      Validators.pattern('^[A-Za-z0-9&\\-\\(\\)#._/ ]+$'),
      Validators.maxLength(100)
      ]),
    });

  }

  get bouquetName() {
    return this.myForm.get('bouquetName')
  }

  get bundleChannelId() {
    return this.myForm.get('bundleChannelId')

  }

  submit() {
    let submitModel: BouquetenameUpdate = {
      bundleChannelId: this.bundleChannelId?.value,
      boqCreationId: this.id,
      bouquetName: this.bouquetName?.value.trim(),
      modifiedBy: this.adminName
    }
    this.Editdetails.Bouquetenameupdatae(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
