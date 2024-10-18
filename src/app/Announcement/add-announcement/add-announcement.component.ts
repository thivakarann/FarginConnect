import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { announceAdd, Businessadd } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.css'
})
export class AddAnnouncementComponent {

  announcementform: any = FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  categoryvalue: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {

    this.service.BusinesscategoryKycactive().subscribe((res: any) => {
      this.categoryvalue = res.response;
    })

    this.announcementform = new FormGroup({
      businessCategoryId: new FormControl('', [Validators.required]),
      announcementContentEnglish: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required])
    });

  }



  get businessCategoryId() {
    return this.announcementform.get('businessCategoryId');
  }

  get announcementContentEnglish() {
    return this.announcementform.get('announcementContentEnglish');
  }

  get startDate() {
    return this.announcementform.get('startDate');
  }

  get endDate() {
    return this.announcementform.get('endDate')
  }

  submit() {
    let submitModel: announceAdd = {
      businessCategoryId: this.businessCategoryId.value,
      announcementContentEnglish: this.announcementContentEnglish.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      createdBy: this.createdBy
    };


    this.service.announcementAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        window.location.reload();

      }
      else {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll()
      }

    });

  }
}
