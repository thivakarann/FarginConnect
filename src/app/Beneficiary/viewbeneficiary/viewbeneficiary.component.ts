import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { Statusbeneficiary } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-viewbeneficiary',
  templateUrl: './viewbeneficiary.component.html',
  styleUrl: './viewbeneficiary.component.css',
})
export class ViewbeneficiaryComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'sno',
    'name',
    'account',
    'branchname',
    'mobile',
    'bankname',
    'ifsccode',
    'accounttype',
    'email',
    'upidid',
    'status',
    'Edit',
    'createdBy',
    'createdDateTime',
    'modifiedBy',
    'modifiedDateTime',
  ];
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  viewbeneficiary: any;
  businesscategory: any;
  showcategoryData: any;
  errorMsg: any;
  isChecked: any;
  valuepayoutCreate: any;
  valuepayoutExport: any;
  valuepayoutStatus: any;
  valuepayoutEdit: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  ngOnInit(): void {


    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          
          if (this.roleId == 1) {
            this.valuepayoutCreate = 'Payout-Add';
            this.valuepayoutExport='Payout-Export';
            this.valuepayoutEdit='Payout-Edit';
            this.valuepayoutStatus='Payout-Status'
          }
          else {
            for (let datas of this.getdashboard) {

              this.actions = datas.subPermissions;
              

              if (this.actions == 'Payout-Add') {
                this.valuepayoutCreate = 'Payout-Add';
              }
              if(this.actions=='Payout-Export'){
                this.valuepayoutExport='Payout-Export'
              }
              if(this.actions=='Payout-Edit'){
                this.valuepayoutEdit='Payout-Edit'
              }
              if(this.actions=='Payout-Status'){
                this.valuepayoutStatus='Payout-Status'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });



    this.service.viewbeneficiarys().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewbeneficiary = res.response;
        this.viewbeneficiary.reverse();
        this.dataSource = new MatTableDataSource(this.viewbeneficiary);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.showcategoryData = false;
      } else {
        this.errorMsg = res.responseMessage;
        this.showcategoryData = true;
      }
    });
 

  }

  reload(){
    window.location.reload()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.viewbeneficiary.forEach((element: any) => {



      this.response = [];
      this.response.push(sno);
      this.response.push(element?.accountHolderName);
      this.response.push(element?.accountNumber);
      this.response.push(element?.branchName);
      this.response.push(element?.mobileNumber);
      this.response.push(element?.bankName);
      this.response.push(element?.ifscCode);
      this.response.push(element?.accountType);
      this.response.push(element?.emailAddress);
      this.response.push(element?.upiId);

      if (element?.activeStatus == '1') {
        this.response.push("Active");
      }
      else {
        this.response.push("Inactive");
      }
      this.response.push(element?.createdBy);
      this.response.push(element?.createdDatetime);
      this.response.push(element?.modifiedBy);
      this.response.push(element?.modifiedDatetime);
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const title = 'Payout';
    const header = [
      "S.No",
      "Beneficiary Name",
      "Account Number",
      "Branch Name",
      "Beneficiary Mobile Number",
      "Bank Name",
      "IFSC Code",
      "Account Type",
      "Beneficiary Email address",
      "UPI ID",

      "Status",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At"
    ]
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Facheck');
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Times New Roman', family: 4, size: 16, bold: true };


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
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);
      let qty10 = row.getCell(11);
      let qty11 = row.getCell(12);
      let qty12 = row.getCell(13);
      let qty13 = row.getCell(14);
      let qty14 = row.getCell(15);

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
      qty10.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty11.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty12.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty13.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty14.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    }
    );
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Payout.xlsx');
    });
  }
  add() {
    this.router.navigateByUrl('dashboard/add-beneficiary');
  }

  Edit(id: any) {
    this.router.navigate([`dashboard/edit-beneficiary/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }
  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;

    let submitModel: Statusbeneficiary = {
      activeStatus: this.isChecked ? 1 : 0,
    };

    this.service.statusbeneficiarys(id, submitModel).subscribe((res: any) => {
      
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
}
