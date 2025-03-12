import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';

@Component({
  selector: 'app-setupbox-historyview',
  templateUrl: './setupbox-historyview.component.html',
  styleUrl: './setupbox-historyview.component.css'
})
export class SetupboxHistoryviewComponent {
  merchantid: any = localStorage.getItem('merchantId');
  history: any;
  date2: any;
  date1: any;
  dataSource: any;
  displayedColumns: string[] = [
    'sno',
    'number',
     'Status',
    'modifiedBy',
    'modifiedAt',
  ];

  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  customerid: any;
  setupboxhistory: any;
  id: any;
  id1:any;
  id2:any;
  STBID: any;
  searchPerformed: boolean = false;

  constructor(
    private location: Location,
    private service: FarginServiceService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param: any) => {
      this.customerid = param.Alldata;
      this.STBID = param.Alldata1;

      // this.customerid = this.id[0].customerId.customerId;
      this.STBID = this.id[0].customerStbId
      console.log("details" + this.id)
      console.log("customerid" + this.customerid)
      console.log("STBID" + this.STBID)
  
    });

    this.service.SetupBoxHistory(this.merchantid,this.customerid,this.STBID).subscribe((res: any) => {
      if (res.flag == 1) {
        this.setupboxhistory = res.response;
        this.dataSource = new MatTableDataSource(this.setupboxhistory.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const transformedFilter = filter.trim().toLowerCase();
          const dataStr = Object.keys(data)
          .reduce((currentTerm: string, key: string) => {
            return (
              currentTerm +
              (typeof data[key] === 'object'
                ? JSON.stringify(data[key])
                : data[key])
            );
          }, '')
          .toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.setupboxhistory.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

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
  close() {
    this.location.back()
  }

  reload(){
    window.location.reload()
  }

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.setupboxhistory.forEach((element: any) => {
     
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.stbId?.setupBoxNumber);
      if(element?.status==0){
        this.response.push("Inactive");

      }
      else if(element?.status==1){
      this.response.push("Active");
       
      }
      else if(element?.status==2){
      this.response.push("Damaged");
       
      }

      this.response.push(element?.modifiedBy)
 
      if (element.modifiedAt) {
          this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy hh:mm a').toString());
        }
        else {
          this.response.push('');
        }
     

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'S.No',
      'Setupbox Number',
      'Status',
      'Modified By',
      'Modified At'
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Setupbox History');
    // Blank Row
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
    
      
    });
    worksheet.getColumn(1).protection = { locked: true, hidden: true };
    worksheet.getColumn(2).protection = { locked: true, hidden: true };
    worksheet.getColumn(3).protection = { locked: true, hidden: true };
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Setupbox History.xlsx');
    });
  }

}
