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
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  @ViewChild('select') select: any = MatSelect;
  allSelected = false;
  broadCasterRegionId:any;

  constructor(
    public AddExtra: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService,

  ) { }


  ngOnInit(): void {
    this.id = this.data.value;
    this.broadCasterRegionId = this.data.value1;
    console.log(this.broadCasterRegionId)
    

    this.AddExtra.ActiveAlcards().subscribe((res: any) => {
      this.channelslist = res.response;
         });

    this.myForm = new FormGroup({
      alcotChannel: new FormControl('', Validators.required),
    });
  }


  get alcotChannel() {
    return this.myForm.get('alcotChannel')
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
      alcotChannel: this.alcotChannel?.value,
      boqId: this.id,
      broadCasterRegionId: this.broadCasterRegionId
    }
    
    this.AddExtra.AddExtraChannelsforBouquete(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      
      }

      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
