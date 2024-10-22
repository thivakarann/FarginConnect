import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Alcartstatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-alacarte-viewall',
  templateUrl: './alacarte-viewall.component.html',
  styleUrl: './alacarte-viewall.component.css'
})
export class AlacarteViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'alcotId',
    'channelName',
    'type',
    'price',
    // 'language',
    // 'generic',
    'alcotStatus',
    'View',
    'Edit',
    'createdBy',
    'createdAt',
    'modifiedBy',
    'modifiedAt'

  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  valuealcartAdd: any;
  valuealcartExport: any;
  valuealcartStatus: any;
  valuealcartView: any;
  valuealcartEdit: any;

  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;

  constructor(
    public AllcartViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.AllcartViewall.Alcartviewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.viewall);
    });
    this.AllcartViewall.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuealcartAdd = 'Channel Configuration-Add';
            this.valuealcartEdit = 'Channel Configuration-Edit';
            this.valuealcartExport = 'Channel Configuration-Export'
            this.valuealcartStatus = 'Channel Configuration-Status'
            this.valuealcartView = 'Channel Configuration-View'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'Channel Configuration-Add') {
                this.valuealcartAdd = 'Channel Configuration-Add';
              }
              if (this.actions == 'Channel Configuration-Edit') {
                this.valuealcartEdit = 'Channel Configuration-Edit';
              }
              if (this.actions == 'Channel Configuration-Export') {
                this.valuealcartExport = 'Channel Configuration-Export';
              }
              if (this.actions == 'Channel Configuration-View') {
                this.valuealcartView = 'Channel Configuration-View'
              }
              if (this.actions == 'Channel Configuration-Status') {
                this.valuealcartStatus = 'Channel Configuration-Status';
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })

  }


  reload() {
    window.location.reload()
  }



  add() {
    this.router.navigateByUrl('dashboard/alcart-add');
  }



  Viewdata(id: any) {
    this.router.navigate([`dashboard/alcart-view/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }

  Edit(id: any) {
    this.router.navigate([`dashboard/alcart-edit/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {
    console.log(id)
    this.isChecked = event.checked;

    let submitModel: Alcartstatus = {
      alcotId: id,
      alcotStatus: this.isChecked ? 1 : 0,
    };
    this.AllcartViewall.AlcardStatus(submitModel).subscribe((res: any) => {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  exportexcel() {

  }
}






