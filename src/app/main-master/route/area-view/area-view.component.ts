import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { areaStatus } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtraareaComponent } from '../extraarea/extraarea.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-area-view',
  templateUrl: './area-view.component.html',
  styleUrl: './area-view.component.css'
})
export class AreaViewComponent {
  areaValue: any;
  currentPage: any = 1;
  searchText: any;
  responseDataListnew: any[] = [];
  response: any[] = [];
  isChecked: any;

 
  routeid: any
  routePincodeId: any;
  areaviews: any;
  routeData: any;
  routeId: any;
  valueareaadd: any;
  valueareastatus: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  constructor(private dialog: MatDialog, private service: FarginServiceService, private activatedRoute: ActivatedRoute, private router: Router, private location: Location,private toastr:ToastrService) { }

  ngOnInit(): void {

    if (this.roleName == 'Merchant Super admin') {
      this.valueareaadd = 'Route Configuration-Area Add';
      this.valueareastatus = 'Route Configuration-Area Status'

    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Route Configuration-Area Add') {
              this.valueareaadd = 'Route Configuration-Area Add'
            }
            if (this.actions == 'Route Configuration-Area Status') {
              this.valueareastatus = 'Route Configuration-Area Status'
            }
          }

        }
      })
    }


    this.routeid = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.customerrouteids(this.routeid).subscribe((res: any) => {
      this.routeData = res.response;
      // this.routePincodeId=res.response.routePincodeId
      this.routeId = res.response.routeModel[0]?.routeId

    });
    this.service.viewroutearea(this.routeid).subscribe((res: any) => {
      this.areaviews = res.response;


    })

  }
  create(id: any, id1: any, id2: any) {
    console.log(this.areaviews?.entityPincodeModel?.pincodeName);

    this.dialog.open(ExtraareaComponent, {
      data: { value: id, value1: id1, value2: id2 },
      width: '80vw',
      maxWidth: '500px',
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.viewroutearea(this.routeid).subscribe((res: any) => {
        this.areaviews = res.response;
  
  
      })
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
  reload() {
    window.location.reload()
  }
  back() {
    this.dialog.closeAll()
  }
  streetViews(id: any) {
    this.router.navigate([`dashboard/streetviewroute/${id}`], {
      queryParams: { Alldata: id },
    });

  }
  areaStatuss(event: any, id: any) {
    this.isChecked = event.checked;
    let submitModel: areaStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.areasStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.service.viewroutearea(this.routeid).subscribe((res: any) => {
            this.areaviews = res.response;
  
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
