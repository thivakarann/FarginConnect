import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { AdminCreateComponent } from '../admin-create/admin-create.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminTermsConditionComponent } from '../admin-terms-condition/admin-terms-condition.component';
import { AdminDisclaimerComponent } from '../admin-disclaimer/admin-disclaimer.component';
import { AdminPrivacypolicyComponent } from '../admin-privacypolicy/admin-privacypolicy.component';
import { AdminRefundpolicyComponent } from '../admin-refundpolicy/admin-refundpolicy.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent implements OnInit{

  dataSource:any;
  displayedColumns: string[] = ["adminId","termAndCondition","disclaimer","privacyPolicy","refundPolicy","Edit","createdBy"]
  businesscategory:any;
  showcategoryData:boolean =false;
  errorMsg: any;
  responseDataListnew: any=[];
  response: any=[];
   
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2:any;
  isFullPolicyVisible: boolean = false;
  limit: number =30;  
   
   
  constructor(private dialog:MatDialog,private service:FarginServiceService,private toastr:ToastrService, private router: Router) {}


  ngOnInit(): void {
    
    this.service.adminPolicyget().subscribe((res: any) => {
      if(res.flag==1){
        this.businesscategory = res.response;
        this.businesscategory.reverse();
        this.dataSource = new MatTableDataSource(this.businesscategory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.showcategoryData = false;
        // console.log(this.businesscategory) 
      }
      else{
        this.errorMsg=res.responseMessage;       
        this.showcategoryData = true;
   }    
  });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create(){
    this.router.navigateByUrl('dashboard/Termspolicy-create');
  }
  togglePrivacyPolicy() {
    this.isFullPolicyVisible = !this.isFullPolicyVisible;
  }

 exportexcel() {
  console.log('check');
  let sno = 1;
  this.responseDataListnew = [];
  this.businesscategory.forEach((element: any) => {
   
    this.response = [];
    this.response.push(sno);
    this.response.push(element?.termAndCondition);
    this.response.push(element?.disclaimer);
    this.response.push(element?.privacyPolicy);
   
    this.response.push(element?.refundPolicy);

    this.response.push(element?.createdBy);

  

    sno++;
    this.responseDataListnew.push(this.response);
  });
  this.excelexportCustomer();
}

excelexportCustomer() {
  // const title='Business Category';
  const header = [
    "S.No",
    "Terms and Condition",
    "Disclaimer",
    "Privacy Policy",
    "Refund Policy",
    "Created By"
  ]


  const data = this.responseDataListnew;
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet('Terms and Policy');
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
    // console.log("row loop");

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


    FileSaver.saveAs(blob, 'Terms and Policy.xlsx');

  });
}


Terms() {
  this.dialog.open(AdminTermsConditionComponent, {      
    width:'80vw',// Use percentage to make it responsive
    maxWidth:'700px',
  // Ensure it doesn't get too wide on large screens
    enterAnimationDuration:'1000ms',      
    exitAnimationDuration:'1000ms',
    // data: { value: id}
   }); 

}

Disclaimer(){
  this.dialog.open(AdminDisclaimerComponent, {      
    width:'80vw',// Use percentage to make it responsive
    maxWidth:'700px',
  // Ensure it doesn't get too wide on large screens
    enterAnimationDuration:'1000ms',      
    exitAnimationDuration:'1000ms',
    // data: { value: id}
   }); 
}
privacypolicy(){
  this.dialog.open(AdminPrivacypolicyComponent, {      
    width:'80vw',// Use percentage to make it responsive
    maxWidth:'700px',
  // Ensure it doesn't get too wide on large screens
    enterAnimationDuration:'1000ms',      
    exitAnimationDuration:'1000ms',
    // data: { value: id}
   }); 
}
refundpolicy(){
  this.dialog.open(AdminRefundpolicyComponent, {      
    width:'80vw',// Use percentage to make it responsive
    maxWidth:'700px',
  // Ensure it doesn't get too wide on large screens
    enterAnimationDuration:'1000ms',      
    exitAnimationDuration:'1000ms',
    // data: { value: id}
   }); 
}


Edit(id:any) {     
  this.router.navigate([`dashboard/adminpolicy-Edit/${id}`], {
    queryParams: { Alldata: id },
  });
  console.log(id);
}



}
