import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { BouqutesAddComponent } from '../bouqutes-add/bouqutes-add.component';
import { BroadcasterBouquetStatus } from '../../../fargin-model/fargin-model.module';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BouqetsEditComponent } from '../bouqets-edit/bouqets-edit.component';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';

@Component({
  selector: 'app-bouquets-viewall',
  templateUrl: './bouquets-viewall.component.html',
  styleUrl: './bouquets-viewall.component.css'
})
export class BouquetsViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'bouquetId',
    "MSO",
    'broadCasterName',
    'bouquetName',
    'amount',
    'status',
    'Edit',
    'View',
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
  valueBroadcasterBouquetesAdd: any;
  valueBroadcasterBouquetesExport: any;
  valueBroadcasterBouquetesStatus: any;
  valueBroadcasterBouquetesEdit: any;
  valueBroadcasterBouquetesView: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  values: any[] = [];
  actions: any;
  errorMessage: any;
  subId: any[] = [];
  perValueArray: any[] = [];
  moduleName: any[] = [];
  service: any;
  getAction: any;
  roleName: any;
  permissionview: any;
  subpermission: any;

  perValueObject: any;

  valueid: any;
  bouquetCreation: any;
  bundleChannel: any;
  bouquetCreations: any;
  broadCasterRegions: any;
  bouquet: any;
  creation: any;
  services: any;
  broadCasterRegionsss: any[] = [];
  broadCasterAlcot: any;
  broadCasterAlcotsss: any[] = [];
  amount: any;
  valuebouquetesadd: any;
  valuebouquetesexport: any;
  valuebouquetesStatus: any;
  valuebouquetesView: any;
  valuebouquetesEdit: any;
  searchPerformed: boolean = false;

  constructor(
    public Bouquetviewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {

    this.Bouquetviewall.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuebouquetesadd = 'Broadcaster Bouqutes-Add';
            this.valuebouquetesEdit = 'Broadcaster Bouqutes-Edit';
            this.valuebouquetesexport = 'Broadcaster Bouqutes-Export';
            this.valuebouquetesStatus = 'Broadcaster Bouqutes-Status';
            this.valuebouquetesView = 'Broadcaster Bouqutes-View';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'Broadcaster Bouqutes-Add') {
                this.valuebouquetesadd = 'Broadcaster Bouqutes-Add';
              }
              if (this.actions == 'Broadcaster Bouqutes-Edit') {
                this.valuebouquetesEdit = 'Broadcaster Bouqutes-Edit'
              }
              if (this.actions == 'Broadcaster Bouqutes-Export') {
                this.valuebouquetesexport = 'Broadcaster Bouqutes-Export'
              }
              if (this.actions == 'Broadcaster Bouqutes-Status') {
                this.valuebouquetesStatus = 'Broadcaster Bouqutes-Status'
              }
              if (this.actions == 'Broadcaster Bouqutes-View') {
                this.valuebouquetesView = 'Broadcaster Bouqutes-View'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.Bouquetviewall.BroadcasterBoucateviewall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.dataSource = new MatTableDataSource(this.viewall.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    });



  }

  adds() {
    this.router.navigateByUrl('/dashboard/bouqutes-add')
  }


  reload() {
    this.Bouquetviewall.BroadcasterBoucateviewall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.dataSource = new MatTableDataSource(this.viewall.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    });
  }

  add() {
    const dialogRef = this.dialog.open(BouqutesAddComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {

      this.fetch();

    });
  }
  fetch() {
    this.Bouquetviewall.BroadcasterBoucateviewall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.dataSource = new MatTableDataSource(this.viewall.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    });
  }

  Edit(id: any) {

    this.valueid = id
    this.values = [];
    this.broadCasterRegionsss = []
    this.subId = [];
    this.perValueArray = [];
    this.moduleName = [];

    this.Bouquetviewall.BroadcasterBoucatebyid(this.valueid).subscribe({
      next: (res: any) => {

        if (res.flag == 1) {
          this.getAction = res.response;

          this.bouquet = res.response.bundleChannel.bundleChannelId
          this.creation = res.response.bouquetCreation.boqCreationId
          this.services = res.response.serviceProvider.serviceId
          this.amount = res.response.amount

          this.broadCasterRegions = this.getAction.broadCasterRegion

          // for (let data of this.broadCasterRegions) {
          //   this.broadCasterRegionsss.push(data.broadCasterRegion.regionId)

          // }

          // this.broadCasterAlcot = this.getAction.broadCasterAlcot
          // for (let data of this.broadCasterAlcot) {
          //   this.broadCasterAlcotsss.push(data.broadCasterAlcot.alcotId)

          // }

          //Duplicate Removal start
          this.perValueObject = new Set(this.values)
          for (let value of this.perValueObject) {
            this.perValueArray.push(value)
          }

          const dialogRef = this.dialog.open(BouqetsEditComponent, {
            data: { per: this.perValueArray, bouquet: this.bouquet, creation: this.creation, services: this.services, broadCasterRegionsss: this.broadCasterRegionsss, broadCasterAlcotsss: this.broadCasterAlcotsss, amount: this.amount, valueid: this.valueid },
            disableClose: true,
            enterAnimationDuration: '1000ms',
            exitAnimationDuration: '1000ms',
          });
          dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {

            this.fetch();

          });
        } else if (res.flag == 2) {

          this.errorMessage = res.responseMessage;
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

  }

  Viewdata(id: any) {
    this.router.navigate([`dashboard/bouqutes-view/${id}`], {
      queryParams: { Alldata: id },
    });


  }

  Viewdatas(id: any) {
    this.router.navigate([`dashboard/bouqutes-region/${id}`], {
      queryParams: { Alldata: id },
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




  ActiveStatus(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: BroadcasterBouquetStatus = {
      status: this.isChecked ? 1 : 0,
      bouquteId: id
    };
    this.Bouquetviewall.BroadcasterBoucateStatus(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.Bouquetviewall.BroadcasterBoucateviewall().subscribe((res: any) => {
            if (res.flag == 1) {
              this.viewall = res.response;
              this.viewall.reverse();
              this.dataSource = new MatTableDataSource(this.viewall);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
            }
            else if (res.flag == 2) {
              this.viewall = [];
              this.dataSource = new MatTableDataSource(this.viewall.reverse());
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }

          });
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
        setTimeout(() => {
          this.Bouquetviewall.BroadcasterBoucateviewall().subscribe((res: any) => {
            if (res.flag == 1) {
              this.viewall = res.response;
              this.viewall.reverse();
              this.dataSource = new MatTableDataSource(this.viewall);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
            }
            else if (res.flag == 2) {
              this.viewall = [];
              this.dataSource = new MatTableDataSource(this.viewall.reverse());
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }

          });
        }, 500);
      }

    });

  }
  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.viewall.forEach((element: any) => {
      // let createdate = element.createdDateTime;
      // this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      // let moddate = element.modifiedDateAndTime;
      // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.serviceProvider.serviceProviderName);
      this.response.push(element?.bundleChannel.broadCasterName);
      this.response.push(element?.bouquetCreation.bouquetName);
      this.response.push(element?.amount);
      if (element?.status == 1) {
        this.response.push('Active')
      }
      else {
        this.response.push('Inactive')
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
      "MSO",
      "Broadcaster Name",
      "Broadcaster Plan Name",
      "Plan Amount",
      "Bouquetes Status",


    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Broadcaster Bouquetes Creation');
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



      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    }
    );

    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }


    workbook.xlsx.writeBuffer().then((data: any) => {

      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


      FileSaver.saveAs(blob, 'Broadcaster Bouquetes Creation.xlsx');

    });
  }
}
