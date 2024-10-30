import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddExtraChannels } from '../../../fargin-model/fargin-model.module';
import { MatOption, MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-extra-channels',
  templateUrl: './add-extra-channels.component.html',
  styleUrl: './add-extra-channels.component.css'
})
export class AddExtraChannelsComponent implements OnInit {
  id: any;
  channelslist: any;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  @ViewChild('select') select: any = MatSelect;
  allSelected = false;
  constructor(
    public AddExtra: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService,

  ) { }


  ngOnInit(): void {
    this.id = this.data.value;
    

    this.AddExtra.ActiveAlcards().subscribe((res: any) => {
      this.channelslist = res.response;
    });

    this.myForm = new FormGroup({
      alcotId: new FormControl('', Validators.required),
    });
  }


  get alcotId() {
    return this.myForm.get('alcotId')
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  submit() {
    let submitModel: AddExtraChannels = {
      alcotId: this.alcotId?.value,
      bouquteId: this.id
    }
    this.AddExtra.AddExtraChannelsforBouquete(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        window.location.reload();
      }

      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
