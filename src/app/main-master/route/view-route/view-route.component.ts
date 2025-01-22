import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { routests, setupStatus } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { AddSetupboxComponent } from '../../setupbox/add-setupbox/add-setupbox.component';
import { EditSetupboxComponent } from '../../setupbox/edit-setupbox/edit-setupbox.component';
import { AddRouteComponent } from '../add-route/add-route.component';
import { EditRouteComponent } from '../edit-route/edit-route.component';
import moment from 'moment';
import { StreetViewComponent } from '../street-view/street-view.component';
import { AreaViewComponent } from '../area-view/area-view.component';
import { Router } from '@angular/router';
import { PascustomerdetailsComponent } from '../pascustomerdetails/pascustomerdetails.component';
import { CreateroutebulkComponent } from '../createroutebulk/createroutebulk.component';
interface CustomerDetail {
  routeCustomerId: number;
  customerId: number;
  customerName: string;
  emailAddress: string;
  mobileNumber: string;
  area: string;
  streetName: string;
  cityName: string;
  pincodeName: string;
  landmark: string;
  age: string;
  flatNumber: string;
  blockNumber: string;
  activeStatus: number;
  stateName: string;
  countryName: string;
  houseName: string;
  doorNumber: string;
  alterMobileNumber: string;
  apartmentName: string;
  advanceAmount: number;
  advanceStatus: number;
  freeLine: number;
}
interface Street {
  routeStreetId: number;
  streetName: string;
  activeStatus: number;
  customerList: any;
  customerDetailList: CustomerDetail[];
}

interface Area {
  routeAreaId: number;
  areaName: string;
  activeStatus: number;
  streetList: Street[];
}

interface Pincode {
  routePincodeId: number;
  pincodeName: string;
  activeStatus: number;
  areaList: Area[];
}
@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.component.html',
  styleUrl: './view-route.component.css'
})
export class ViewRouteComponent {

  dataSource: any;
  merchantId: any = localStorage.getItem('merchantId');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: any[] = ["stbId", "adminName", "beatRole", "status", "action", "View", "viewpincode", "CreatedBy", "createdAt"];
  isChecked: any;
  responseDataListnew: any[] = [];
  response: any[] = []
  routevalue: any;
  areaValue: any;
  streetValue: any;
  showdata: boolean = false
  date1: any;
  valuerouteadd: any;
  valuerouteExport: any;
  valuerouteview: any;
  valueroutests: any;
  valuerouteedit: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  searchText: any;
  currentPage: any = 1;
  routeData: any;
  merchantAdminId = localStorage.getItem('merchantAdminId')
  adminroute: any;
  flattenedRouteData: any[] = [];
  date2: any;
  valueroutevcustomerdetail: any;
  searchPerformed: boolean = false;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.service.routemerchantId(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.routevalue = res.response;

        this.dataSource = new MatTableDataSource(this.routevalue?.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.routevalue.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    })
    this.service.routemerchantadminId(this.merchantAdminId).subscribe((res: any) => {
      this.adminroute = res.response[0]?.pincodeList;
      this.flattenedRouteData = [];
      this.adminroute.forEach((pincode: Pincode) => {  // Specify type here
        pincode.areaList.forEach((area: Area) => {    // Specify type here
          area.streetList.forEach((street: Street) => {  // Specify type here
            this.flattenedRouteData.push({
              pincodeName: pincode.pincodeName,
              routePincodeId: pincode.routePincodeId,
              areaName: area.areaName,
              streetName: street.streetName,
            });
          });
        });
      });

      console.log(this.flattenedRouteData);  // Check the flattened structure

    });


    if (this.roleName == 'Merchant Super admin') {
      this.valuerouteadd = 'Route Configuration-Add';
      this.valuerouteExport = 'Route Configuration-Export';
      this.valuerouteedit = 'Route Configuration-Edit';
      this.valueroutests = 'Route Configuration-Status';
      this.valuerouteview = 'Route Configuration-View';
      this.valueroutevcustomerdetail = 'Route Configuration-Customer Details'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;



          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Route Configuration-Add') {
              this.valuerouteadd = 'Route Configuration-Add'
            }
            if (this.actions == 'Route Configuration-Export') {
              this.valuerouteExport = 'Route Configuration-Export'
            }
            if (this.actions == 'Route Configuration-Edit') {
              this.valuerouteedit = 'Route Configuration-Edit'
            }
            if (this.actions == 'Route Configuration-Status') {
              this.valueroutests = 'Route Configuration-Status'
            }
            if (this.actions == 'Route Configuration-View') {
              this.valuerouteview = 'Route Configuration-View'
            }
            if (this.actions == 'Route Configuration-Customer Details') {
              this.valueroutevcustomerdetail = 'Route Configuration-Customer Details'
            }
          }

        }
      })
    }


  }
  check() {
    this.showdata = true
  }

  // pasc(id: any) {
  //   this.dialog.open(PascustomerdetailsComponent, {
  //     data: { value: id },
  //     disableClose: true,
  //     enterAnimationDuration: '1000ms',
  //     exitAnimationDuration: '1000ms',
  //   });

  // }
  pasc(id: any) {
    this.router.navigate([`dashboard/customersdetails/${id}`], {
      queryParams: { Alldata: id },
    });

  }

  areaView(id: any) {
    this.dialog.open(AreaViewComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

  }
  streetView(id: any) {
    this.dialog.open(StreetViewComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
  reload() {
    window.location.reload()
  }


  onSubmit(event: MatSlideToggleChange, id: any) {


    this.isChecked = event.checked;

    let submitModel: routests = {
      activeStatus: this.isChecked ? 1 : 0,

    };

    this.service.routestatus(id, submitModel).subscribe((res: any) => {

      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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

  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter(item =>
      item.subpermissionValue.toLowerCase().includes(searchText.toLowerCase())
    );
  }
 
  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }

  edit(id: any) {
    this.dialog.open(EditRouteComponent, {
      data: { value: id },
      disableClose: true,

      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.routemerchantId(this.merchantId).subscribe((res: any) => {
          if(res.flag==1)
          {
            this.routevalue = res.response;    
            this.dataSource = new MatTableDataSource(this.routevalue?.reverse())
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
          }
          else if(res.flag==2){
            this.dataSource = new MatTableDataSource([]);
            this.dataSource = new MatTableDataSource(this.routevalue.reverse());
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
    
        })
    })
  }

  create() {
    this.dialog.open(AddRouteComponent, {
      width: '80vw',
      maxWidth: '750px',
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
  Viewdata(id: any) {
    this.router.navigate([`dashboard/customerviewroute/${id}`], {
      queryParams: { Alldata: id },
    });

  }



  // Viewdata() {

  //   this.router.navigate([`dashboard/customerviewroute`], {
  //     // queryParams: { Alldata: id },
  //   })
  // }
  customerViews(id: any) {
    this.router.navigate([`dashboard/admincustomerdetailsroute/${id}`], {
      queryParams: { Alldata: id },
    });

  }

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.routevalue.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.merchantAdminId?.adminName);
      const beatRole = element?.beatRole ? element?.beatRole.join(', ') : '';
      this.response.push(beatRole);
      if (element.activeStatus == 1) {
        this.response.push('Active');
      } else {
        this.response.push('Inactive');
      }
      this.response.push(element?.createdBy);

      if (element.createdAt) {
        this.response.push(moment(element?.createdAt).format('DD/MM/yyyy hh:mm a').toString());
      }
      else {
        this.response.push('');
      }
      // this.response.push(element?.modifiedBy);
      // if (element.modifiedAt) {
      //   this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy hh:mm a').toString());
      // }
      // else {
      //   this.response.push('');
      // }

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'S.No',
      'Employee Name',
      'Beat Role',
      'Status',
      'Created By',
      'Created At',
      // 'Modified By',
      // 'Modified Date',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Route Configuration');
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
      let qty5 = row.getCell(6);
      // let qty6 = row.getCell(7);
      // let qty7 = row.getCell(8);
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
      // qty6.border = {
      //   top: { style: 'thin' },
      //   left: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   right: { style: 'thin' },
      // };
      // qty7.border = {
      //   top: { style: 'thin' },
      //   left: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   right: { style: 'thin' },
      // };
    });
    worksheet.getColumn(1).protection = { locked: true, hidden: true };
    worksheet.getColumn(2).protection = { locked: true, hidden: true };
    worksheet.getColumn(3).protection = { locked: true, hidden: true };
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Route Configuration.xlsx');
    });
  }
  openexcel() {
    const header = ['mobileNumber', 'beatRole', 'customerMobileNo'];
    const data = this.responseDataListnew;
    const csvContent = [];
 
    csvContent.push(header.map(item => `"${item}"`).join(','));
 
    data.forEach((d: any) => {
        const rowData = [
            `"${d.mobileNumber}"` || '',
            JSON.stringify(Array.isArray(d.beatRole) ? d.beatRole : [d.beatRole]),
            JSON.stringify(Array.isArray(d.customerMobileNo) ? d.customerMobileNo : [d.customerMobileNo]),
        ].map(item => `"${item.replace(/"/g, '""')}"`); // Escape double quotes
 
        csvContent.push(rowData.join(','));
    });
 
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'Routes.csv');
}



  createroute() {
    this.dialog.open(CreateroutebulkComponent,
      {
        disableClose: true,
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        position: { right: '0px' },

        width: '30%'
      }
    )
  }
}
