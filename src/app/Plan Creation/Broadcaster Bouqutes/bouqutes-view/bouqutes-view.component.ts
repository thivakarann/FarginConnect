import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Broadcastersinglechanelstatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-bouqutes-view',
  templateUrl: './bouqutes-view.component.html',
  styleUrl: './bouqutes-view.component.css'
})
export class BouqutesViewComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  id: any;
  details: any;
  channelslist: any;
  page: number = 1;
  term: any;
  currentPage: any = 1; // The current page number
  itemsPerPage = 5; //
  isChecked: boolean = false;

  constructor(
    public viewdetails: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.viewdetails.BroadcasterBoucatebyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.channelslist = res.response.alcotChannels;
      console.log(this.channelslist)
    });
  }

  addChaneels(id: any) {

  }

  close() {
    this.router.navigateByUrl('dashboard/bouquets-viewall');
  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {
    console.log(id)
    this.isChecked = event.checked;

    let submitModel: Broadcastersinglechanelstatus = {
      broadCasterAlcotId: id,
      channelStatus: this.isChecked ? 1 : 0,
    };
    this.viewdetails.BroadcasterSingleStatus(submitModel).subscribe((res: any) => {
      console.log(res);
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        window.location.reload();
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }





}
