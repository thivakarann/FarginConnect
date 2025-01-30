import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { FarginServiceService } from '../service/fargin-service.service';

@Component({
  selector: 'app-agreement-viewall',
  templateUrl: './agreement-viewall.component.html',
  styleUrl: './agreement-viewall.component.css'
})
export class AgreementViewallComponent {
  strings = "@";
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  MobileNumber: any;
  Description = "Description";
  comments = "Comments"
  pag: number = 1;
  copiedIndex: number = -1;
  displayedColumns: string[] = [
    'sno',
    'entityname',
    'planname',
    'agreementLink',
    'servicefee',
    'planoverview',
    'agreement',
    'farginsignerstatus',
    'entitysignerstatus',
    'signedcopy',
    'createdat',
    'createdby'
  ];
  FormSearch!: FormGroup;
  responseDataListnew: any = [];
  response: any = [];
  valuecustomerticketexport: any;
  valuecustomerticketedit: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  valuedescription: any;
  valuedescriptionImage: any;
  ticketexport: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  agreementdata: any;
  date1: any;
  valueagreeExport: any;
  valueagreeView: any;
  valueagreeAgreement: any;
  valueagreeSignedCopy: any;
  valueagreementlink: any;

  constructor(private service: FarginServiceService, private dialog: MatDialog, private ActivateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {


    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == '1') {
            this.valueagreeExport = 'Entity Agreement-Export'
            this.valueagreeView = 'Entity Agreement-Plan Overview'
            this.valueagreeAgreement = 'Entity Agreement-Agreement'
            this.valueagreeSignedCopy = 'Entity Agreement-Agreement Signed Copy'
            this.valueagreementlink = 'Entity Agreement-Agreement Link'

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity Agreement-Export') {
                this.valueagreeExport = 'Entity Agreement-Export'
              }
              if (this.actions == 'Entity Agreement-Plan Overview') {
                this.valueagreeView = 'Entity Agreement-Plan Overview'
              }
              if (this.actions == 'Entity Agreement-Agreement') {
                this.valueagreeAgreement = 'Entity Agreement-Agreement'
              }
              if (this.actions == 'Entity Agreement-Agreement Signed Copy') {
                this.valueagreeSignedCopy = 'Entity Agreement-Agreement Signed Copy'
              }
              if (this.actions == 'Entity Agreement-Agreement Link') {
                this.valueagreementlink = 'Entity Agreement-Agreement Link'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });




    this.service.AgreementgetAll().subscribe((res: any) => {
      if (res.flag == 1) {
        this.agreementdata = res.response;
        this.agreementdata.reverse();
        // this.totalPages = res.pagination.totalElements;
        // this.totalpage = res.pagination.totalPages;
        // this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.agreementdata);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };

      }
    });



  }

  reload() {
    this.service.AgreementgetAll().subscribe((res: any) => {
      if (res.flag == 1) {
        this.agreementdata = res.response;
        this.agreementdata.reverse();
        // this.totalPages = res.pagination.totalElements;
        // this.totalpage = res.pagination.totalPages;
        // this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.agreementdata);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };

      }
    });
  }


  copyText1(text: string, index: number) { const el = document.createElement('textarea'); el.value = text; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); this.copiedIndex = index; setTimeout(() => this.copiedIndex = -1, 2000); }


  renderPage(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex = event.pageIndex;  // Update current page index
    this.pageSize = event.pageSize;           // Update page size (if changed)

    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex);
    console.log('New Page Size:', this.pageSize);

    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.ngOnInit()
  }
  changePageIndex(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    this.renderPage({
      pageIndex: newPageIndex,
      pageSize: this.pageSize,
      // length: this.totalItems
    } as PageEvent);
  }

  Back(id: any) {
    this.router.navigate([`customer-verify-view/${id}`], {
      queryParams: { Alldata: id },
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





  view(id: any) {
    this.router.navigate([`/allagreementplan/${id}`], {
      queryParams: { Alldata: id },
    });
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

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.agreementdata.forEach((element: any) => {
 
      // let createdate = element.createdDateTime;
      // this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();
 
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.merchantId.entityName);
      this.response.push(element?.commercialId?.planName);
      this.response.push(element?.commercialId?.serviceFee);
 
      if (element?.adminOtpStatus == 0) {
        this.response.push('Not Signed')
      }
      else {
        this.response.push('Signed')
 
      }
      if (element?.merchanOtptStatus == 0) {
        this.response.push('Not Signed')
 
      }
      else {
        this.response.push('Signed')
 
      }
      if(element.createdDateTime){
        this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
      }
      else{
        this.response.push('');
      }
      this.response.push(element?.createdBy);
   
 
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      'Entity Name',
      'Plan Name',
      'Service Fee',
      'Fargin Signer Status',
      'Entity Signer Status',
      'Created At',
      'Created By'
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Agreement');
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
 
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Entity Agreement.xlsx');
    });
  }

  description(id: any, id2: any) {

  }


  Ticketcomment(id: any, id2: any) {

  }

}
