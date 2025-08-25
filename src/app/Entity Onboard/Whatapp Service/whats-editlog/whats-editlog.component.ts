import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { Location } from '@angular/common';
import { WhatsappMessDescriptionComponent } from '../whatsapp-mess-description/whatsapp-mess-description.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-whats-editlog',
  templateUrl: './whats-editlog.component.html',
  styleUrl: './whats-editlog.component.css'
})
export class WhatsEditlogComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'merWhatsappSmsEditId',
    'actionType',
    'vendorName',
    'Lan',
    'smsEnableStatus',
    'templateType',
    'smsCharge',
    'smsCount',
    'templateTitle',
    'templateDescription',
    'createdBy',
    'createdDateTime',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roleId: any = sessionStorage.getItem('roleId');
  whatsappid: any;
  searchPerformed: boolean = false;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  details: any;

  constructor(
    private location: Location,
    private service: FarginServiceService,
    private activaterouter: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activaterouter.queryParams.subscribe((param: any) => {
      this.whatsappid = param.Alldata;
    });
    this.Getall();
  }

  Getall() {
    this.service.WhatsAppEditHistorys(this.whatsappid).subscribe((res: any) => {
      if (res.flag == 1) {
        this.details = res.response;
        this.dataSource = new MatTableDataSource(this.details);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.details);
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
    this.location.back();
  }

  Whatsappdescription(id: any) {
    this.dialog.open(WhatsappMessDescriptionComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { value: id },
    });
  };

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.details.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.merchantPlanModel?.planName);
      if (element?.merchantPlanModel?.frequency == 'Day') {
        this.response.push('Daily');
      } else if (element?.merchantPlanModel?.frequency == 'Week') {
        this.response.push('Weekly');
      } else if (element?.merchantPlanModel?.frequency == 'Month') {
        this.response.push('Monthly');
      } else if (element?.merchantPlanModel?.frequency == 'Quarterly') {
        this.response.push('Quarterly');
      } else if (element?.merchantPlanModel?.frequency == 'Half Yearly') {
        this.response.push('Half-Yearly');
      } else if (element?.merchantPlanModel?.frequency == 'Year') {
        this.response.push('Yearly');
      }
      this.response.push(element?.merchantPlanModel?.countLimit);
      this.response.push(element?.merchantPlanModel?.technicalAmount);
      this.response.push(element?.merchantPlanModel?.renewalAmount);
      this.response.push(element?.merchantPlanModel?.maintenanceAmount);
      this.response.push(element?.merchantPlanModel?.voiceBoxAdvRent);
      this.response.push(element?.merchantPlanModel?.voiceBoxSetupFee);

      this.response.push(element?.modifiedBy);
      if (element.modifiedDateTime) {
        this.response.push(
          moment(element?.modifiedDateTime)
            .format('DD/MM/yyyy hh:mm a')
            .toString()
        );
      } else {
        this.response.push('');
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'S No',
      'Plan Name',
      'Cloud Fee Frequency',
      'Customer Onboard Limit',
      'One Time Setup Cost',
      'Yearly Renewal Fee',
      'Cloud Fee',
      'Voice Box Rent',
      'Voice Box Setup Fee',
      'Updated By',
      'Updated At',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Plan Details');
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
      let qty6 = row.getCell(7);
      let qty7 = row.getCell(8);
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);
      let qty10 = row.getCell(11);

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
      qty6.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty7.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty8.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty9.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty10.border = {
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

      FileSaver.saveAs(blob, 'Entity Plan Details.xlsx');
    });
  }
}
