import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { announceEdit, Businessadd } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrl: './edit-announcement.component.css'
})
export class EditAnnouncementComponent {
  announcementform: any = FormGroup;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  categoryvalue: any;
  businessCategoryIds: any;
  announcementContentEnglishs: any;
  startDates: any;
  endDates: any;
  announcementid: any;
  minDate: any = Date;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,) { }


  ngOnInit(): void {

    this.announcementid = this.data.value.announcementId

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]

    this.announcementform = this._formBuilder.group(
      {
        businessCategoryId: ['', Validators.required],
        announcementContentEnglish: ['', Validators.required],
        startDate: ['', Validators.required],  // Empty start date
        endDate: ['', Validators.required]     // Empty end date
      },
      {
        validators: [this.dateRangeValidator] // Apply custom date range validator
      }
    );


    if (this.data && this.data.value) {
      this.announcementform.patchValue({
        businessCategoryId: this.data.value.businessCategory.businessCategoryId,
        announcementContentEnglish: this.data.value.announcementContentEnglish,
        startDate: this.data.value.startDate,
        endDate: this.data.value.endDate,
      });
    } else {
      console.error('Data is not defined');
    }



    this.service.BusinesscategoryKycactive().subscribe((res: any) => {
      this.categoryvalue = res.response;
    })

    // this.announcementform = new FormGroup({
    //   businessCategoryId: new FormControl('', [Validators.required]),
    //   announcementContentEnglish: new FormControl('', [Validators.required]),
    //   startDate: new FormControl('', [Validators.required]),
    //   endDate: new FormControl('', [Validators.required])
    // });

    // this.businessCategoryIds = this.data.value.businessCategory.categoryName
    // this.announcementContentEnglishs = this.data.value.announcementContentEnglish
    // this.startDates = this.data.value.startDate
    // this.endDates = this.data.value.endDate




  }

  // Custom validator to ensure endDate > startDate
  dateRangeValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;

    // Validate that the endDate is greater than startDate
    if (startDate && endDate) {
      if (new Date(endDate) <= new Date(startDate)) {
        return { dateRangeInvalid: true }; // Error object when dates are invalid
      }
    }

    return null; // Return null if validation is successful
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
    let submitModel: announceEdit = {
      announcementId: this.announcementid,
      businessCategoryId: this.businessCategoryId.value,
      announcementContentEnglish: this.announcementContentEnglish.value.trim(),
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      updatedBy: this.createdBy
    };


    this.service.announcementEdit(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      
      }
      else {
        this.toastr.error(res.responseMessage);
      
      }

    });

  }
}
