import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-channel-configuration',
  templateUrl: './channel-configuration.component.html',
  styleUrl: './channel-configuration.component.css'
})
export class ChannelConfigurationComponent implements OnInit {
  channel: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  responseDataListnew: any[] = [];
  response: any[] = [];
  displayedColumns: any[] =
    [
      "alcotId",
      "channelName",
      "ChannelNumber",
      "ChannelType",
      'Broadcaster',
      'msos',
      'region',
      "price",
      "language",
      "generic",
      "view"
    ];
  valuechannelAdd: any;
  getdashboard: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valuechannelexport: any;
  valuechannelView: any;
  roleName = localStorage.getItem('roleName')
  channelexport: any;
currentfilval: any;
pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
 
  filter:boolean=false;
  Viewall: unknown[] | undefined;
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
    this.service.channelconfiguration(this.pageSize,this.pageIndex).subscribe((res: any) => {
      this.channel = res.response.content;
      this.totalPages=res.pagination.totalElements;
      this.totalpage=res.pagination.totalPages;
      this.currentpage=res.pagination.currentPage+1;
     
      this.dataSource = new MatTableDataSource(this.channel)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filter=false;
    })
    if (this.roleName == 'Merchant Super admin') {
      this.valuechannelexport = 'Channel Configuration-Export';
      this.valuechannelView = 'Channel Configuration-View'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;


          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Channel Configuration-Export') {
              this.valuechannelexport = 'Channel Configuration-Export'
            }
            if (this.actions == 'Channel Configuration-View') {
              this.valuechannelView = 'Channel Configuration-View'
            }
          }


        }
      })
    }


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


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
  view(id: any) {

    this.router.navigate([`dashboard/channelconfiguration-singleview/${id}`], {
      queryParams: { Alldata: id },
    });


  }



  exportexcel() {
    this.service.channelconfigurationExport().subscribe((res: any) => {
      this.channelexport = res.response;
      console.log( this.channelexport)
    if (res?.flag == 1) {
    let sno = 1;
    this.responseDataListnew = [];
    this.channelexport?.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.channelName);
      this.response.push(element?.channelNo);
      if (element.type == 1) {
        this.response.push('Paid')
      }
      else {
        this.response.push('Free')
      }
      this.response.push(element?.bundleChannelId?.broadCasterName);
      this.response.push(element?.region?.service?.serviceProviderName);
      this.response.push(element?.region?.stateName);
          
      this.response.push(element?.price)
      this.response.push(element?.generic);
      this.response.push(element?.language);

 
      sno++;
      this.responseDataListnew.push(this.response);
    });
 
    this.excelexportCustomer();
  }
})
  }

  excelexportCustomer() {
    const header = [
      "S.No",
      "Channel Name",
      "Channel Number",
      "Channel Type",
      "Broadcaster",
      "Service Provider Name",
      "Region",
      "Price",
      "Generic",
      "Language",
      
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Alacarte Channels');
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
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Alacarte Channels.xlsx');
    });
  }

  channelsearch(filterValue: string) {
   
    if (filterValue) {
 
    this.service.ChannelConfigurationSearch(filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.Viewall = res.response;  
          // this.Viewall.reverse();
          this.dataSource = new MatTableDataSource(this.Viewall);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
         
        }
        else if (res.flag === 2) {
          this.Viewall = [];  
          this.dataSource = new MatTableDataSource(this.Viewall);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
      }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
  else if (!filterValue) {
    this.toastr.error('Please enter a value to search');
    return;
}
  }
 
 
  reload(){
    window.location.reload()
  }
  renderPage1(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex1 = event.pageIndex;  // Update current page index
    this.pageSize1 = event.pageSize;           // Update page size (if changed)
 
    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex1);
    console.log('New Page Size:', this.pageSize1);
 
    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.channelsearch(this.currentfilval);
  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }

  onPageChange(event: PageEvent) {
    // Update the page index and size
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
   
    // Reload the data with the new page index and page size
    this.loadData();
  }
   
  loadData() {
    this.service.channelconfiguration(this.pageSize, this.pageIndex).subscribe((res: any) => {
        if (res.flag === 1) {
            this.channel = res.response.content;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.totalPages;
            this.currentpage = res.pagination.currentPage + 1;
            this.dataSource = new MatTableDataSource(this.channel);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.filter = false;
        } else {
            this.channel = [];
            this.dataSource = new MatTableDataSource(this.channel);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.filter = false;
        }
    });
  }
}
