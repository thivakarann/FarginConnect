import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-customer-bulkresponse',
  templateUrl: './customer-bulkresponse.component.html',
  styleUrl: './customer-bulkresponse.component.css'
})
export class CustomerBulkresponseComponent implements OnInit {
  dataSource: any;
  displayedColumns: any[] = ["uploadid", "totalRecord", "successCount", "failedCount", "UploadedBy", "UploadedAt", "Response"];
  merchantId: any = localStorage.getItem('merchantId');
  bulkresponse: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseData: any;
  responseExcelData: any = [];
  dataPush: any = [];
  valueresponse: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
searchPerformed: boolean=false;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.customerbulkResponse(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.bulkresponse = res.response;

        this.dataSource = new MatTableDataSource(this.bulkresponse.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.bulkresponse.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    
    })
    if (this.roleName == 'Merchant Super admin') {
      this.valueresponse = 'Customer Status-Response';
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Customer Status-Response') {
              this.valueresponse = 'Customer Status-Response'
            }
          }

        }
      })
    }



  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload() {
    window.location.reload()
  }

  responseDownload(uploadId: any) {
    this.service.customerbulkbyId(uploadId).subscribe((res: any) => {
      this.responseData = res.response.jsonNode.data
      if (res.flag == 1) {
        let sno = 1;
        this.responseExcelData = [];
        this.responseData?.forEach((element: any) => {
          this.dataPush = [];
          this.dataPush.push(sno);
          this.dataPush.push(element?.customerReferenceId)
          // this.dataPush.push(element?.customerMsoId)
          // this.dataPush.push(element?.customerName)
          this.dataPush.push(element?.mobileNumber)
          // this.dataPush.push(element?.alterMobileNumber)
          // this.dataPush.push(element?.age)

          // this.dataPush.push(element?.area)
          // this.dataPush.push(element?.streetName)
          // this.dataPush.push(element?.doorNumber)
          // this.dataPush.push(element?.blockNumber)
          // this.dataPush.push(element?.flatNumber)
          // this.dataPush.push(element?.apartmentName)
          // this.dataPush.push(element?.countryName)
          // this.dataPush.push(element?.stateName)
                   
          // this.dataPush.push(element?.cityName)
          // this.dataPush.push(element?.pincodeName)
          // this.dataPush.push(element.landmark)
          // this.dataPush.push(element?.freeLine)
          // if (element?.advanceStatus == 0) {
          //   this.dataPush.push('Free')
          // }
          // else {
          //   this.dataPush.push('Paid')
          // }
          // this.dataPush.push(element?.advanceAmount)

        
          // this.dataPush.push(element?.branchStatus)
          // this.dataPush.push(element?.branchName)
         
          // this.dataPush.push(element?.planName)
          
          // this.dataPush.push(element?.bouquetName)

          
        

        
          // this.dataPush.push(element?.channelName)
          
         
         
          // this.dataPush.push(element?.setupBoxNumber)
       
          this.dataPush.push(element?.response);
          sno++;
          this.responseExcelData.push(this.dataPush);

        });
        this.responseExcel();
      } else {
        this.toastr.error(res.responseMessage)
      }
    })
  }

  responseExcel() {

    const header = ["S.No",
      'Customer ReferenceId',
      // 'Customer MsoId',
      // 'CustomerName',
      'MobileNumber',
      // 'AlterMobileNumber',
      // 'Age',
      // 'Area',
      // 'Street Name',
      // 'Door Number',
      // 'Block Number',
      // 'FlatNumber',
      // 'ApartmentName',
      
      // 'Country',
      // 'State',
      // 'City',
      // 'Pincode',
      // 'Landmark',
      // 'FreeLine',
      // 'Advance Status',
      // 'AdvanceAmount',
      // 'Branch Status',
      // 'Branch Name',
      //  'Plan Name',
      //  'bouquetName',
      //   'Channel Name',
      //   'SetupBoxNumber',
      
      "Remarks"]

    const data = this.responseExcelData;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Upload Response');

    worksheet.addRow([]);


    let headerRow = worksheet.addRow(header);

    headerRow.font = { bold: true };

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
      // let qty3 = row.getCell(4);
      // let qty4 = row.getCell(5);
      // let qty5 = row.getCell(6);
      // let qty6 = row.getCell(7);
      // let qty7 = row.getCell(8);
      // let qty8 = row.getCell(9);
      // let qty9 = row.getCell(10);
      // let qty10 = row.getCell(11);
      // let qty11 = row.getCell(12);
      // let qty12 = row.getCell(13);
      // let qty13 = row.getCell(14);
      // let qty14 = row.getCell(15);
      // let qty15 = row.getCell(16);
      // let qty16 = row.getCell(17);
      // let qty17 = row.getCell(18);
      // let qty18 = row.getCell(19);
      // let qty19 = row.getCell(20);
      // let qty20 = row.getCell(21);
      // let qty21 = row.getCell(22);
      // let qty22 = row.getCell(23);
      // let qty23 = row.getCell(24);
      // let qty24 = row.getCell(25);

      // let qty25 = row.getCell(26);

      // let qty26 = row.getCell(27);

      // let qty27 = row.getCell(28);
      // let qty28 = row.getCell(29);

      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty10.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty11.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty12.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty13.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty14.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty15.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty16.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty17.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty18.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty19.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty20.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty21.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty22.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty23.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty24.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty25.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty26.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty27.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty28.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    }
    );

    workbook.xlsx.writeBuffer().then((data) => {

      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


      FileSaver.saveAs(blob, 'UploadResponse.csv');

    });
  }
}
