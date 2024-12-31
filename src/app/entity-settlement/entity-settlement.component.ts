import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { settlement } from '../fargin-model/fargin-model.module';
import { Location } from '@angular/common';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-entity-settlement',
  templateUrl: './entity-settlement.component.html',
  styleUrl: './entity-settlement.component.css'
})
export class EntitySettlementComponent {
  valuesettlement: any;
  valuesettlementview: any;
  valuesettlementexport: any;
  errorMessage: any;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'settlementId',
    'payoutId',
    'amount',
    'reference',
    'txnItem',
    'createdAt',
    'View',

  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  id: any;
  showcategoryData: boolean = false;
  viewdata: any;
  details: any;
  detaislone: any;
  bankdetails: any;
  accountid: any;
  Viewall: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  responseDataListnew: any = [];
  response: any = [];
  searchPerformed: boolean = false;
  FromDateRange!: string;
  currentPage: any;
  ToDateRange!: string;
  Daterange!: string;
  content: any;
  filteredData: any;

  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private Location: Location
  ) { }
  ngOnInit(): void {

    this.MerchantView.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuesettlementexport = 'Entity View Settlement-Export';
            this.valuesettlementview = 'Entity View Settlement-View'

          }
          else {
            for (let datas of this.getdashboard) {

              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Settlement-Export') {
                this.valuesettlementexport = 'Entity View Settlement-Export'
              }
              if (this.actions == 'Entity View Settlement-View') {
                this.valuesettlementview = 'Entity View Settlement-View'
              }

            }
          }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
      this.accountid = res.response.merchantpersonal.accountId;

      this.postrenewal();
      // 

    })


  }

  reload() {
    window.location.reload()
  }



  postrenewal() {
    let submitModel: settlement = {
      accountId: this.accountid,
      pageNo: "",
      size: "",
      query: "",
      dateRange: "",
      status: "",
    }
    this.MerchantView.Entitysettlement(submitModel).subscribe((res: any) => {
      this.Viewall = JSON.parse(res?.response);
      this.viewdata = this.Viewall?.data?.content;
      this.dataSource = new MatTableDataSource(this.viewdata?.reverse())
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      if (this.content.length === 0) {
        this.dataSource = new MatTableDataSource();
       }    
    })
  }

    filterdate() {
      const datepipe: DatePipe = new DatePipe("en-US");
      let formattedstartDate = datepipe.transform(this.FromDateRange, "dd/MM/YYYY hh:mm");
      let formattedendDate = datepipe.transform(this.ToDateRange, "dd/MM/YYYY hh:mm");
      this.Daterange = formattedstartDate + " " + "-" + " " + formattedendDate;
      this.currentPage = 1;
  
      let submitModel: settlement = {
        accountId: this.accountid,
        pageNo: this.currentPage,
        size: '20',
        query: '',
        dateRange: this.Daterange,
        status: "",
      }
      this.MerchantView.Entitysettlement(submitModel).subscribe((res: any) => {        if (res.flag == 1) {
  
          this.Viewall = JSON.parse(res.response);
          this.content = this.Viewall?.content || [];
          this.filteredData = this.content;
  
  
          this.dataSource = new MatTableDataSource(this.filteredData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          if (this.content.length === 0) {
            this.dataSource = new MatTableDataSource();
           }     
         }
      })
    }
  viewpayout(id: any) {
    this.router.navigate([`/dashboard/settlement-view/${id}`], {
      queryParams: { value: id },
    });

  }

  close() {
    this.Location.back()
  }
  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.viewdata.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.payoutId);
      this.response.push(element?.amount);
      this.response.push(element?.reference);
      this.response.push(element?.txnItem);
      this.response.push(element?.createdAt);
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {

    const header = [
      'S.No',
      'Payout ID',
      'Amount',
      'Reference',
      'Txn Item',
      'Txn Time',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Settlement');

    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
        bgColor: { argb: 'FF0000FF' },
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    data.forEach((d: any) => {
      //

      let row = worksheet.addRow(d);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);
      let qty3 = row.getCell(4);
      let qty4 = row.getCell(5);
      let qty5 = row.getCell(6);


      qty.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty1.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty2.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty3.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty4.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty5.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

    });



    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'Entity Settlement.xlsx');
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.searchPerformed = filterValue.length > 0;


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  reset(){
    window.location.reload()

  }

}
