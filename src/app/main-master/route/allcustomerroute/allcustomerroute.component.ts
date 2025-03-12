import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { areaStatus, customerStatus } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ExtracustomerComponent } from '../extracustomer/extracustomer.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-allcustomerroute',
  templateUrl: './allcustomerroute.component.html',
  styleUrl: './allcustomerroute.component.css'
})
export class AllcustomerrouteComponent {
  areaValue: any;
  currentPage: any = 1;
  searchText: any;
  responseDataListnew: any[] = [];
  response: any[] = [];
  isChecked: any;

  routeid:any
  routePincodeId: any;
  areaviews: any;
  customerviews: any;
valueallcusAdd: any;
valueallcusStatus: any;
getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  constructor(private dialog: MatDialog, private service: FarginServiceService,private activatedRoute: ActivatedRoute,private router:Router,private location: Location,private toastr:ToastrService) { }
 
  ngOnInit(): void {

    if (this.roleName == 'Merchant Super admin') {
      this.valueallcusAdd = 'Route Customer Details-Add';
      this.valueallcusStatus = 'Route Customer Details-Status'

    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Route Customer Details-Add') {
              this.valueallcusAdd = 'Route Customer Details-Add'
            }
            if (this.actions == 'Route Customer Details-Status') {
              this.valueallcusStatus = 'Route Customer Details-Status'
            }
          }

        }
      })
    }



    this.routeid = this.activatedRoute.snapshot.paramMap.get('id');

    this.service.viewcustomerbtstreet(this.routeid).subscribe((res:any)=>
      {
         this.customerviews=res.response;
      })
  }

  exportexcel() {
    
    let sno = 1;
    this.responseDataListnew = [];
    this.areaValue.forEach((element: any) => {
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
    let worksheet = workbook.addWorksheet('Area Reports');
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
      FileSaver.saveAs(blob, 'Area.xlsx');
    });
  }
  reload(){
    window.location.reload()
  }
  back() {
    this.dialog.closeAll()
  }
  customerViews(id: any) {
    this.router.navigate([`dashboard/customertransactionroute/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }

  create(id:any,id1:any,id2:any,id3:any,id4:any,id5:any,id6:any) {
    this.dialog.open(ExtracustomerComponent, {
      data: { value: id, value1:id1, value2:id2, value3:id3,value4:id4,value5:id5, value6:id6},
      width:'80vw',
      maxWidth:'500px',
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.viewcustomerbtstreet(this.routeid).subscribe((res:any)=>
        {
           this.customerviews=res.response;
        })
    })
   
  }
  customerStatuss(event: any, id: any) {
    this.isChecked = event.checked;
    let submitModel: customerStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.customersStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.service.viewcustomerbtstreet(this.routeid).subscribe((res:any)=>
            {
               this.customerviews=res.response;
            })
        }, 500);
        this.dialog.closeAll();

      }
      else if(res.flag==2) {
        this.toastr.error(res.responseMessage)
        setTimeout(() => {
          this.service.viewcustomerbtstreet(this.routeid).subscribe((res:any)=>
            {
               this.customerviews=res.response;
            })
        }, 500);
        this.dialog.closeAll();
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
