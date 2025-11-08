import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FarginBankAddComponent } from '../fargin-bank-add/fargin-bank-add.component';
import { farginbankstatus, Getallstatus } from '../../../fargin-model/fargin-model.module';
import { FarginBankEditComponent } from '../fargin-bank-edit/fargin-bank-edit.component';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';


@Component({
  selector: 'app-fargin-bankview',
  templateUrl: './fargin-bankview.component.html',
  styleUrl: './fargin-bankview.component.css'
})
export class FarginBankviewComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountHolderName',
    'accountNumber',
    'type',
    'bankName',
    'ifscCode',
    'branchName',
    'ledgerId',
    'status',
    'Edit',
    'View',
    'createdBy',
    'createdDateTime',
    'modifiedBy',
    'modifiedDateTime'
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  valueEntityAdd: any;
  valueEntityExport: any;
  valueEntityStatus: any;
  valueEntityView: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || ''); activeRole: any;
  actions: any;
  errorMessage: any;
  unblockvalue: any;
  valueEntityUnblock: any;
  adminBankId: any;
  data: any;
  valuefarginadd: any;
  valuefarginexport: any;
  valuefarginstatus: any;
  valuefarginedit: any;
  totalPages: any;
  currentfilvalShow: boolean = false;
  currentpage: any;
  totalpage: any;
  currentfilval: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
  ) { }

  ngOnInit(): void {
    this.fetchfarginbankview();
  };

  fetchfarginbankview() {
    let submitModel: Getallstatus = {
      pageNumber: 0,
      pageSize: 5,
      searchContent: ''
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.Farginview(datamodal).subscribe((res: any) => {
      this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
      this.dataSource = new MatTableDataSource(this.viewall.content);
      this.totalPages = this.viewall.totalElements;
      console.log(this.totalPages)
      this.totalpage = this.viewall.size;
      this.currentpage = this.viewall.number;
      this.currentfilvalShow = false;
    });
  };

  Search(filterValue: string) {
    if (filterValue == '' || filterValue == null) {
      this.toastr.error('Please Enter the Text');
    }
    else {
      let submitModel: Getallstatus = {
        pageNumber: 0,
        pageSize: 5,
        searchContent: filterValue
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(submitModel))
      }
      this.service.Farginview(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = true;
        } else {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = true;
        }
      });
    }
  };

  getData(event: any) {
    if (this.currentfilvalShow) {
      let submitModel: Getallstatus = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        searchContent: ''
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(submitModel))
      }
      this.service.Farginview(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = false;
        } else {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = false;
        }
      });
    }
    else {
      let submitModel: Getallstatus = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        searchContent: this.currentfilval
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(submitModel))
      }
      this.service.Farginview(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
        } else {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
        }
      });
    }
  }

  AddBankDetails() {
    const dialogRef = this.dialog.open(FarginBankAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchfarginbankview();
    });
  };

  Edit(id: any) {
    const dialogRef = this.dialog.open(FarginBankEditComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true,
      data: { value: id },
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchfarginbankview();
    });
  }

  view(id: any) {
    this.router.navigate([`dashboard/fargin-bank-history/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  ActiveStatus(id: string) {
    let submitModel: farginbankstatus = {
      adminBankId: id,
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.Farginstatus(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = res.response;
        this.toastr.success(res.messageDescription);
        setTimeout(() => { this.fetchfarginbankview(); }, 200);
      }
      else {
        this.toastr.error(res.messageDescription);
      }
    });

  }
}
