import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { RegionAddComponent } from './region-add/region-add.component';
import { RegionEditComponent } from './region-edit/region-edit.component';
import { RegionStatus } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})
export class RegionComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] =
    [
      "regionId",
      "stateName",
      "serviceProviderName",
      "status",
      "Edit",
      "createdBy",
      "createdAt",
      "modifiedBy",
      "modifiedAt"

    ]
  region: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  regionId: any;
  regionids: any;
  regionAdd: any;
  regionexport: any;
  regionStatus: any;
  regionEdit: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;


  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }

  ngOnInit() {


    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.regionAdd = 'Region-Add';
            this.regionexport = 'Region-Export';
            this.regionEdit = 'Region-Edit';
            this.regionStatus = 'Region-Status';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Region-Add') {
                this.regionAdd = 'Region-Add';
              }

              if (this.actions == 'Region-Export') {
                this.regionexport = 'Region-Export';
              }

              if (this.actions == 'Region-Edit') {
                this.regionEdit = 'Region-Edit';
              }

              if (this.actions == 'Region-Status') {
                this.regionStatus = 'Region-Status';
              }
            }
          }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });



    this.service.RegionGet().subscribe((res: any) => {
      this.region = res.response;
      this.region.reverse();
      this.dataSource = new MatTableDataSource(this.region);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    });
 

  }

  onSubmit(event: MatSlideToggleChange, id: string) {
    this.isChecked = event.checked;
    let submitModel: RegionStatus = {
      regionId: id,
      status: this.isChecked ? 1 : 0,
    };
    this.service.RegionStatus(submitModel).subscribe((res: any) => {
      
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        this.service.RegionGet().subscribe((res: any) => {
          this.region = res.response;
          this.region.reverse();
          this.dataSource = new MatTableDataSource(this.region);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          
        });
     
      }, 500);
    });
  }


  create() {
    this.dialog.open(RegionAddComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.RegionGet().subscribe((res: any) => {
        this.region = res.response;
        this.region.reverse();
        this.dataSource = new MatTableDataSource(this.region);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      });
   
    })
  }


  Edit(id: string) {
    this.dialog.open(RegionEditComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { value: id },
      disableClose: true,
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.RegionGet().subscribe((res: any) => {
        this.region = res.response;
        this.region.reverse();
        this.dataSource = new MatTableDataSource(this.region);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      });
   
    })

  }


 
  exportexcel() {
    
    let sno = 1;
    this.responseDataListnew = [];
    this.region.forEach((element: any) => {
   
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.stateName);
      this.response.push(element?.service.serviceProviderName);
     
      if(element?.status ==1){
        this.response.push("Active")
      }
      else{
        this.response.push("Inactive")
      }
      this.response.push(element?.createdBy);
      this.response.push(element?.createdAt);
      this.response.push(element?.modifiedBy);
     
      if(element?.modifedAt){
        this.response.push(moment(element?.modifedAt).format('DD/MM/yyyy-hh:mm a').toString());
      }
      else{
        this.response.push('');
      }
     
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
        this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    const header = [
      "S.No",
      "Region",
      "Service Provider Name",
      "Status",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At"
    ]
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Region');
 
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
    }
    );
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'Region.xlsx');
 
    });
  }

 

 

  cancel() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  reload() {
    this.service.RegionGet().subscribe((res: any) => {
      this.region = res.response;
      this.region.reverse();
      this.dataSource = new MatTableDataSource(this.region);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    });
  }

  Region(filterValue: string) {
    if (!filterValue) {
        this.toastr.error('Please enter a value to search');
        return;
    }
 
 
    this.service.Regionsearch(filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.region = res.response;  
          this.region.reverse();
          this.dataSource = new MatTableDataSource(this.region);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
         
        }
        else if (res.flag === 2) {
          this.region = [];  
          this.dataSource = new MatTableDataSource(this.region);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
}

}


