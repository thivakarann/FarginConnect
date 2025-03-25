import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DPOChanneloverallstatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-dpo-view',
  templateUrl: './dpo-view.component.html',
  styleUrl: './dpo-view.component.css'
})
export class DpoViewComponent implements OnInit {
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  id: any;
  details: any;
  channelslist: any;
  page: number = 1;
  term: any;
  currentPage: any = 1; // The current page number
  itemsPerPage = 5; //
  isChecked: boolean = false;

  constructor(
    public viewDPOdetails: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.viewDPOdetails.DPObyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.channelslist = res.response.alcotChannels;
      
    });
  }


  addChaneels(id: any) {

  }


  ActiveStatus(event: MatSlideToggleChange, id: any) {
    
    this.isChecked = event.checked;

    let submitModel: DPOChanneloverallstatus = {
      dpoAlcotid: id,
      channelStatus: this.isChecked ? 1 : 0,
    };
    this.viewDPOdetails.DpoSingleChannelStatus(submitModel).subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        window.location.reload();
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }

  close() {
    this.router.navigateByUrl('dashboard/dpoviewall');
  }
}
