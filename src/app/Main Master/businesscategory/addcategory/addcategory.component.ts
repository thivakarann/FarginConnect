import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Businessadd } from '../../../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent implements OnInit {
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // Generates days 1 to 31

  addcategory: any = FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {




    this.addcategory = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
      mccCode: new FormControl('', [Validators.required]),
      autoDebitDate: new FormControl('', [Validators.required]),

    });

  }



  get categoryName() {
    return this.addcategory.get('categoryName');
  }

  get mccCode() {
    return this.addcategory.get('mccCode');
  }

  get autoDebitDate() {
    return this.addcategory.get('autoDebitDate');
  }

  submit() {
    let submitModel: Businessadd = {
      categoryName: this.categoryName.value,
      mccCode: this.mccCode.value,
      createdBy: this.createdBy,
      autoDebitDate: this.autoDebitDate?.value
    };


    this.service.BusinessCreate(submitModel).subscribe((res: any) => {
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
