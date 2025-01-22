import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-configuration',
  templateUrl: './plan-configuration.component.html',
  styleUrl: './plan-configuration.component.css'
})
export class PlanConfigurationComponent {
  plan: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  responseDataListnew: any[] = [];
  response: any[] = []
  displayedColumns: any[] =
    [
      "boqCreationId",
      "broadCasterName",
      "bouquetName",
      "amount",
      'View',
    ];
  valueplanExport: any;
  valueplanView: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.service.planconfiguration().subscribe((res: any) => {
      this.plan = res.response;

      this.dataSource = new MatTableDataSource(this.plan?.reverse())
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };

    })
    if (this.roleName == 'Merchant Super admin') {
      this.valueplanExport = 'Plan Configuration-Export';
      this.valueplanView = 'Plan Configuration-View'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Plan Configuration-Export') {
              this.valueplanExport = 'Plan Configuration-Export'
            }
            if (this.actions == 'Plan Configuration-View') {
              this.valueplanView = 'Plan Configuration-View'
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
  reload() {
    window.location.reload()
  }

  Viewdata(id: any) {
    this.router.navigate([`dashboard/plan-configuration-details/${id}`], {
      queryParams: { Alldata: id },
    });

  }

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.plan.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.bundleChannel?.broadCasterName);
      this.response.push(element?.bouquetCreation?.bouquetName);
      this.response.push(element?.amount);

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      "S.No",
      "Broadcaster Name",
      "Broadcaster Plan",
      "Amount"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Plan Configuration');
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

      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    }
    );
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Plan Configuration.xlsx');
    });
  }



}
