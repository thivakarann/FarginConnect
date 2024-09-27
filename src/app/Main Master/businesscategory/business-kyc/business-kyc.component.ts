import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { BusinessKycCreateComponent } from './business-kyc-create/business-kyc-create.component';
import { Businesskycstatus } from '../../../fargin-model/fargin-model.module';
import { BusinessKycEditComponent } from './business-kyc-edit/business-kyc-edit.component';

@Component({
  selector: 'app-business-kyc',
  templateUrl: './business-kyc.component.html',
  styleUrl: './business-kyc.component.css'
})
export class BusinessKycComponent implements OnInit{

  
  dataSource:any;
  displayedColumns: string[] = ["businessCategoryId","kycDocName","categoryName","status","Edit","createdBy","createdDateTime","modifiedBy","modifiedDateTime"]
  businesscategorykyc:any;
  showcategoryData:boolean =false;
  errorMsg: any;
  responseDataListnew: any=[];
  response: any=[];
   
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2:any;
  businesscategory: any;
  businessCategoryId: any;
   
   
  constructor(private dialog:MatDialog,private service:FarginServiceService,private toastr:ToastrService) {

  }
   
    ngOnInit() {
       
      this.service.BusinesscategoryKyc().subscribe((res: any) => {
        if(res.flag==1){
          this.businesscategorykyc = res.response;
          this.businesscategorykyc.reverse();
          this.dataSource = new MatTableDataSource(this.businesscategorykyc);
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



    onSubmit(event: MatSlideToggleChange, id: any) {
      this.isChecked = event.checked;
   
      let submitModel: Businesskycstatus = {
        // businessCategoryId: id,
        activeStatus: this.isChecked ? 1 : 0,
        // modifiedBy: this.getadminname
      };
   
      this.service.BusinesskycActive(id,submitModel).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    }


   
    create() {     
      this.dialog.open(BusinessKycCreateComponent, {      
        width:'80vw',// Use percentage to make it responsive
        maxWidth:'400px',
    // Ensure it doesn't get too wide on large screens
        enterAnimationDuration:'1000ms',      
        exitAnimationDuration:'1000ms', }); 
  }


  Edit(id:any) {     
    this.dialog.open(BusinessKycEditComponent, {      
      width:'80vw',// Use percentage to make it responsive
      maxWidth:'400px',
  // Ensure it doesn't get too wide on large screens
      enterAnimationDuration:'1000ms',      
      exitAnimationDuration:'1000ms', 
      data: { value: id}
    }); 
}

  admin(){
   
  }
 
 exportexcel() {
    console.log('check');
    let sno = 1;
    this.responseDataListnew = [];
    this.businesscategorykyc.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let moddate = element.modifiedDateAndTime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.kycDocName);
      this.response.push(element?.businessCategoryId?.categoryName);
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);

      this.response.push(this.date2);

    

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "Document Name",
      "Category Name",
      "createdBy",
      "createdDateTime",
      "modifiedBy",
      "modifiedDateTime",
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Business KYC');
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
      let qty6 = row.getCell(7);
 
 
 
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
 
    }
    );
 
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'Business KYC.xlsx');
 
    });
  }

 
  cancel(){
   
  }
   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
