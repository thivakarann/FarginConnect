import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { surveyQuestionsActive } from '../../fargin-model/fargin-model.module';
import { UpdateSurveyquestionsComponent } from '../../Servey/update-surveyquestions/update-surveyquestions.component';
import { ViewQuestionsComponent } from '../../Servey/view-questions/view-questions.component';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-viewagreements',
  templateUrl: './viewagreements.component.html',
  styleUrl: './viewagreements.component.css'
})
export class ViewagreementsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  displayedColumns: string[] = ["Sno", "planname", "servicefee", "merchantName","merchantDesignation", "agreementLink", "expiryLink", "farginsignerstatus", "adminVerifiedDate", "entitysignerstatus", "merchantVerifiedDate", "agreement", "signedcopy", "createdat"]
  tickets: any;
  // response: any = [];
  businesscategory: any;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  valueTicketExport: any;
  valueTicketImage: any;
  valueTicketEdit: any;
  valueDescriptionView: any;
  valueagreement: any;
  valueagreementsigned: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  actions: any;
  errorMessage: any;
  merchantId: any = localStorage.getItem('merchantId');
  viewplan: any;
  copiedIndex: number = -1;
  valueagreementlink: any;
  searchPerformed: boolean=false;


  constructor(private router: Router, private service: FarginServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {

    if (this.roleName == 'Merchant Super admin') {
      this.valueagreement = 'Agreement-Agreement';
      this.valueagreementsigned = 'Agreement-Agreement Signed Copy'
      this.valueagreementlink = 'Agreement-Agreement Link'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Agreement-Agreement') {
              this.valueagreement = 'Agreement-Agreement'
            }
            if (this.actions == 'Agreement-Agreement Signed Copy') {
              this.valueagreementsigned = 'Agreement-Agreement Signed Copy'
            }
            if (this.actions == 'Agreement-Agreement Link') {
              this.valueagreementlink = 'Agreement-Agreement Link'
            }
          }
        }
      })
    }




    this.service.viewbyidplans(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewplan = res.response;
 
        this.dataSource = new MatTableDataSource(this.viewplan.reverse());
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
        this.dataSource = new MatTableDataSource(this.viewplan.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  reload() {
    this.service.viewbyidplans(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewplan = res.response;
 
        this.dataSource = new MatTableDataSource(this.viewplan.reverse());
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
        this.dataSource = new MatTableDataSource(this.viewplan.reverse());
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
  viewagreementdoc(id: any) {
    this.service.viewagreementdoucments(id, 1).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }
  viewsignedagreementdoc(id: any) {
    this.service.viewagreementdoucments(id, 2).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }

  copyText1(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedIndex = index;
    setTimeout(() => this.copiedIndex = -1, 2000);
  }

  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.tickets.forEach((element: any) => {


      // let moddate = element.modifiedDateTime;
      // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.categoryName);
      this.response.push(element?.merchantName);
      this.response.push(element?.ticketId);
      this.response.push(element?.subject);
      this.response.push(element?.ticketStatus)
      this.response.push(element?.description);
      this.response.push(element?.approvalStatus);
      this.response.push(element?.remarks)
      // this.response.push(this.date2);

      if (element?.createdDateTime) {
        this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy-hh:mm a').toString());
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
    // const title='Business Category';
    const header = [
      "S.No",
      "Categoryname",
      "Merchant Name",
      "Ticket Id",
      "Subject",
      "Criticallity",
      "Description",
      "Approval Status",
      "remarks",
      "Created At"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Tickets');
    // Blank Row
    // let titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Times New Roman', family: 4, size: 16, bold: true };


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

      }

      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
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




      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Entity Service Requests.xlsx');
    });
  }


}
