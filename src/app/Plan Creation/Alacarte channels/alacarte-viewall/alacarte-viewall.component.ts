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
    'language',
    'generic',
    'alcotStatus',
    'View',
    'Edit',
    'createdBy',
    'createdAt',
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;

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






