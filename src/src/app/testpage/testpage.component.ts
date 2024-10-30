import { Component, Inject, ViewChild } from '@angular/core';
import { AddExtraChannels } from '../fargin-model/fargin-model.module';
import { MatOption } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatSelect } from '@angular/material/select';





@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrl: './testpage.component.css'
})
export class TestpageComponent {

  myForm!: FormGroup;
  channelslist: any[] = [];
  allSelected = false;
  filteredChannelsList: any[] = [];
  @ViewChild('select') select!: MatSelect;
  id: any;

  constructor(
    public AddExtra: FarginServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.AddExtra.ActiveAlcards().subscribe((res: any) => {
      this.channelslist = res.response;
    });

    this.myForm = new FormGroup({
      alcotId: new FormControl([], Validators.required),
      searchTerm: new FormControl('') // Initialize searchTerm control
    });
  }

  get alcotId() {
    return this.myForm.get('alcotId');
  }

  toggleAllSelection(checked: boolean) {
    this.allSelected = checked;
    this.select.options.forEach((item: MatOption) => {
      checked ? item.select() : item.deselect();
    });
  }

  filteredChannels() {
    const term = this.myForm.get('searchTerm')?.value.toLowerCase();
    return this.channelslist.filter(channel =>
      channel.channelName.toLowerCase().includes(term)
    );
  }

  submit() {
    let submitModel: AddExtraChannels = {
      alcotId: this.alcotId?.value,
      bouquteId: 4
    };
    this.AddExtra.AddExtraChannelsforBouquete(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        window.location.reload();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
