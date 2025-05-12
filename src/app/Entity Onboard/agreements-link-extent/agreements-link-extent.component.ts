import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Agreementextentdate } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import moment from 'moment';

@Component({
  selector: 'app-agreements-link-extent',
  templateUrl: './agreements-link-extent.component.html',
  styleUrl: './agreements-link-extent.component.css',
})
export class AgreementsLinkExtentComponent {
  Id: any;
  myForm!: FormGroup;
  dates: any;
  todayDate: string = '';
  Expirydate: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private service: FarginServiceService
  ) { }
  ngOnInit(): void {

    this.Id = this.data.value;
    this.dates = this.data.value2;
    const today = new Date();
    this.todayDate = today.toISOString().slice(0, 16);

    this.myForm = new FormGroup({
      expiryLink: new FormControl('', [Validators.required]),
    });
  }

  get expiryLink() {
    return this.myForm.get('expiryLink');
  }

  submit() {
    this.Expirydate = this.expiryLink?.value;
    let startdate = moment(this.Expirydate).format('yyyy-MM-DD HH:mm:ss').toString();
    let submitModel: Agreementextentdate = {
      expiryLink: startdate,
    };
    this.service.agreementextendlink(this.Id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
