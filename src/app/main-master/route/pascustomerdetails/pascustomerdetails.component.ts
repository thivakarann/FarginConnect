import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
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
  selector: 'app-pascustomerdetails',
  templateUrl: './pascustomerdetails.component.html',
  styleUrl: './pascustomerdetails.component.css'
})
export class PascustomerdetailsComponent {

  merchantAdminId: any
  adminroute: any;
  flattenedRouteData: any;
  searchText: any;
  currentPage: any = 1;
  responseDataListnew: any[] = [];
  response: any[] = [];
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  valuecustomerdetialexport: any;
  valuecustomerdetialview: any;
  valuecustomerdetialstatus: any;
  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router, private location: Location) {



  }

  ngOnInit(): void {


    if (this.roleName == 'Merchant Super admin') {
      this.valuecustomerdetialexport = 'Route Configuration-Customer Details Export';
      this.valuecustomerdetialview = 'Route Configuration-Customer Details View'
      // this.valuecustomerdetialstatus = 'Route Configuration-Customer Details Status'

    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;



          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Route Configuration-Customer Details Export') {
              this.valuecustomerdetialexport = 'Route Configuration-Customer Details Export'
            }
            if (this.actions == 'Route Configuration-Customer Details View') {
              this.valuecustomerdetialview = 'Route Configuration-Customer Details View'
            }
            // if (this.actions == 'Route Configuration-Customer Details Status') {
            //   this.valuecustomerdetialstatus = 'Route Configuration-Customer Details Status'
            // }
          }

        }
      })
    }

    this.merchantAdminId = this.activatedRoute.snapshot.paramMap.get('id');


    this.service.routemerchantadminId(this.merchantAdminId).subscribe((res: any) => {
      this.adminroute = res.response[0]?.pincodeList;
      this.flattenedRouteData = [];
      this.adminroute.forEach((pincode: Pincode) => {
        pincode.areaList.forEach((area: Area) => {
          area.streetList.forEach((street: Street) => {
            street.customerDetailList.forEach((customer: any) => {
              this.flattenedRouteData.push({
                pincodeName: pincode.pincodeName,
                areaName: area.areaName,
                streetName: street.streetName,
                customerId: customer.customerId,
                customerName: customer.customerName,
                mobileNumber: customer.mobileNumber,
              });
            });
          });
        });
      });

    });




  }
  customerViews(id: any) {
    this.router.navigate([`dashboard/customertransactionroute/${id}`], {
      queryParams: { Alldata: id },
    });

  }
  close() {
    this.location.back()
  }
  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.flattenedRouteData.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.pincodeName);
      this.response.push(element?.areaName);
      this.response.push(element?.streetName);
      this.response.push(element?.customerName);
      this.response.push(element?.mobileNumber);
      // const beatRole = element?.beatRole ? element?.beatRole.join(', ') : '';
      // this.response.push(beatRole);
      // if (element.activeStatus == 1) {
      //   this.response.push('Active');
      // } else {
      //   this.response.push('Inactive');
      // }
      // this.response.push(element?.createdBy);
      // let createdate = element?.createdAt;
      // this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      // this.response.push(this.date1);
      // this.response.push(element?.modifiedBy);

      // let modifiedAts = element?.modifiedAt;

      // this.date2 = moment(modifiedAts).format('DD/MM/yyyy-hh:mm a').toString();
      // this.response.push(this.date2);

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'S.No',
      'Pincode Name',
      'Area Name',
      'Street Name',
      'Customer Name',
      'Customer MobileNumber'
      // 'Created At',
      // 'Modified By',
      // 'Modified Date',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customer Route Assigned Details');
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
      // // qty6.border = {
      // //   top: { style: 'thin' },
      // //   left: { style: 'thin' },
      // //   bottom: { style: 'thin' },
      // //   right: { style: 'thin' },
      // // };
      // // qty7.border = {
      // //   top: { style: 'thin' },
      // //   left: { style: 'thin' },
      // //   bottom: { style: 'thin' },
      // //   right: { style: 'thin' },
      // // };
    });
    worksheet.getColumn(1).protection = { locked: true, hidden: true };
    worksheet.getColumn(2).protection = { locked: true, hidden: true };
    worksheet.getColumn(3).protection = { locked: true, hidden: true };
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Customer Route Assigned Details.xlsx');
    });
  }
  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter(item =>
      item.admin.toLowerCase().includes(searchText.toLowerCase())
    );
  }
 
  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }

}
