import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { streetStatus } from '../../../fargin-model/fargin-model.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtrastreetComponent } from '../extrastreet/extrastreet.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.component.html',
  styleUrl: './street-view.component.css'
})
export class StreetViewComponent implements OnInit {
  streetValue: any;
  currentPage: any = 1;
  searchText: any;
  responseDataListnew: any[] = [];
  response: any[] = [];
  isChecked: any;

  streetviews: any;
  routeid: any;
valuestreetadd: any;
valuestreetstatus: any;
getdashboard: any[] = [];
actions: any;
roleId: any = localStorage.getItem('roleId')
roleName = localStorage.getItem('roleName')
  constructor(private dialog: MatDialog, private service: FarginServiceService,private activatedRoute: ActivatedRoute,private router:Router,private location: Location,private toastr:ToastrService) { }
 
  ngOnInit(): void {

    if (this.roleName == 'Merchant Super admin')
      {
    this.valuestreetadd = 'Route Configuration-Street Add';
    this.valuestreetstatus='Route Configuration-Street Status'
   
  
  }
  else{
    this.service.viewRole(this.roleId).subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.getdashboard = res.response?.merchantSubPermission;

   

        for (let datas of this.getdashboard) {
          this.actions = datas.subPermissions
          
          if(this.actions=='Route Configuration-Street Add'){
            this.valuestreetadd='Route Configuration-Street Add'
          }
        if(this.actions=='Route Configuration-Street Status'){
          this.valuestreetstatus='Route Configuration-Street Status'
        }
              }
      
    }
    })
  }


    this.routeid = this.activatedRoute.snapshot.paramMap.get('id');

    this.service.viewroutestrreet(this.routeid).subscribe((res:any)=>
      {
         this.streetviews=res.response;
      })
  }
  create(id:any,id1:any,id2:any,id3:any,id4:any) {
 
    
    this.dialog.open(ExtrastreetComponent, {
      data: { value: id, value1:id1, value2:id2, value3:id3,value4:id4},
      width:'80vw',
      maxWidth:'500px',
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.viewroutestrreet(this.routeid).subscribe((res:any)=>
        {
           this.streetviews=res.response;
        })
    })
  }
  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.streetValue.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element);


      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      "S.No",
      "Area",
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Street Reports');
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

      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    }
    );
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Street.xlsx');
    });
  }

  back() {
    this.dialog.closeAll()
  }
  customerViews(id: any) {
    this.router.navigate([`dashboard/allcustomerviewroute/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }
  streetStatuss(event: any, id: any) {
    this.isChecked = event.checked;
    let submitModel: streetStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.streetsStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.service.viewroutestrreet(this.routeid).subscribe((res:any)=>
            {
               this.streetviews=res.response;
            })
        }, 500);

      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
  close() {
    this.location.back()     
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
}
