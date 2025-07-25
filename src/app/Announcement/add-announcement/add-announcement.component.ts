import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { announceAdd, Businessadd } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.css'
})
export class AddAnnouncementComponent {

  announcementform: any = FormGroup;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  categoryvalue: any;
  minDate: any = Date;
  @ViewChild('select') select: any = MatSelect;
  allSelected = false;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {

    this.service.BusinesscategoryKycactive().subscribe((res: any) => {
      this.categoryvalue = res.response;
    })

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]

    // this.announcementform = new FormGroup({
    //   businessCategoryId: new FormControl('', [Validators.required]),
    //   announcementContentEnglish: new FormControl('', [Validators.required]),
    //   startDate: new FormControl('', [Validators.required]),
    //   endDate: new FormControl('', [Validators.required])
    // });

    this.announcementform = this._formBuilder.group(
      {
        businessCategoryId: ['', Validators.required],
        announcementContentEnglish: ['', Validators.required],
        startDate: ['', Validators.required],  // Empty start date
        endDate: ['', Validators.required]     // Empty end date
      },
    );
  }

  // Custom validator to ensure endDate > startDate
  // dateRangeValidator(formGroup: FormGroup) {
  //   const startDate = formGroup.get('startDate')?.value;
  //   const endDate = formGroup.get('endDate')?.value;

  //   Validate that the endDate is greater than startDate
  //   if (startDate && endDate) {
  //     if (new Date(endDate) <= new Date(startDate)) {
  //       return { dateRangeInvalid: true };  Error object when dates are invalid
  //     }
  //   }

  //   return null;  Return null if validation is successful
  // }

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
      announcementContentEnglish: this.announcementContentEnglish.value.trim(),
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      createdBy: this.createdBy
    };


    this.service.announcementAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.responseMessage);

      }

    });

  }
  checkDate() {
    this.endDate.reset();
  }

    toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

}
