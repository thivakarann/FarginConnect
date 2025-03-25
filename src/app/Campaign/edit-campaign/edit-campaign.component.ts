import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { updatecamapaign } from '../../Fargin Model/fargin-model/fargin-model.module';


@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrl: './edit-campaign.component.css'
})
export class EditCampaignComponent {
  setupformGroup: any = FormGroup;
  viewData: any;
  getadminname = sessionStorage.getItem('fullname');
  boxnumber: any;
  setupid: any;
  regionactive: any;
  regionValue: any;
  serviceIds: any;
  serviceValue: any;
  view: any;
  broadcasterId: any;
  minDate: any = Date;
  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.view=this.data.value

    this.broadcasterId = this.data.value.broadcasterId;


    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]

    this.setupformGroup = this.fb.group({
      subject: ['', Validators.required],
      emailContent: ['', Validators.required],
      EmailDate: ['', Validators.required],
    });
  }

  get subject() {
    return this.setupformGroup.get('subject');
  }

  get emailContent() {
    return this.setupformGroup.get('emailContent');
  }

  
  get EmailDate() {
    return this.setupformGroup.get('EmailDate');
  }





  submit() {
    let submitModel: updatecamapaign = {
      subject: this.subject.value.trim(),
      modifiedBy: this.getadminname,
      emailContent: this.emailContent.value,
      emailDate: this.EmailDate.value,
    };
    this.service.editcampaign(this.broadcasterId, submitModel).subscribe((res: any) => {
      this.boxnumber = res.response;

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
