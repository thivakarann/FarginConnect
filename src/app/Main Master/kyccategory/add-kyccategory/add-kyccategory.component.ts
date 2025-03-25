import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Businessadd, kycadd } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-add-kyccategory',
  templateUrl: './add-kyccategory.component.html',
  styleUrl: './add-kyccategory.component.css'
})
export class AddKyccategoryComponent {
  addkyccategory: any = FormGroup;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {


    this.addkyccategory = new FormGroup({
      kycCategoryName: new FormControl('', [Validators.required]),
    });

  }



  get kycCategoryName() {
    return this.addkyccategory.get('kycCategoryName');
  }

  

  submit() {
    let submitModel: kycadd = {
      createdBy: this.createdBy,
      kycCategoryName: this.kycCategoryName.value.trim()
    };
    this.service.addkycCategory(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }
}
