import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { branchstatus, Entitystatus } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { BranchTerminalAddComponent } from '../../BranchTerminal/branch-terminal-add/branch-terminal-add.component';
import { BranchTerminalEditComponent } from '../../BranchTerminal/branch-terminal-edit/branch-terminal-edit.component';
import { Location } from '@angular/common';
import { EntityTerminalAddComponent } from '../entity-terminal-add/entity-terminal-add.component';
import { EntityTerminalEditComponent } from '../entity-terminal-edit/entity-terminal-edit.component';

@Component({
  selector: 'app-entity-terminal-view',
  templateUrl: './entity-terminal-view.component.html',
  styleUrl: './entity-terminal-view.component.css'
})
export class EntityTerminalViewComponent implements OnInit{
  terminal:any;
  isChecked:any;
  dataSource: any;
  displayedColumns: string[] = ["sno", "accountId", "terminalNumber", "status","View", "edit", "createdBy","createdAt","modifiedBy","modifiedAt"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roleId: any = sessionStorage.getItem('roleId')
  errorMessage:any;
  actions: any;
  searchPerformed: boolean=false;
  id: any;
  merchantId: any;
  getdashboard: any[] = [];
  valueTerminalAdd:any;
  valueTerminalStatus:any;
  valueTerminalEdit:any;
  valueTerminalview:any;
  
   constructor(
      public service: FarginServiceService,
      private router: Router,
      private toastr: ToastrService,
      private dialog: MatDialog,
      private ActivateRoute: ActivatedRoute,
      private location:Location
    ) {}
  

  ngOnInit() {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueTerminalAdd = 'Entity Terminal View-Add';
            this.valueTerminalStatus = 'Entity Terminal View-Status';
            this.valueTerminalEdit = 'Entity Terminal View-Edit';
            this.valueTerminalview = 'Entity Terminal View Transactions-View';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;

              if (this.actions == 'Entity Terminal View-Add') {
                this.valueTerminalAdd = 'Entity Terminal View-Add';
              }
              if (this.actions == 'Entity Terminal View-Status') {
                this.valueTerminalStatus = 'Entity Terminal View-Status';
              }
              if (this.actions == 'Entity Terminal View-Edit') {
                this.valueTerminalEdit = 'Entity Terminal View-Edit';
              }
              if (this.actions == 'Entity Terminal View Transaction-View') {
                this.valueTerminalview = 'Entity Terminal View Transaction-View';
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })  

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.merchantId=param.Alldata;
    });

    this.service.EntityTerminalviewMerchant(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.terminal = res.response;
        this.dataSource = new MatTableDataSource(this.terminal.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.terminal.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
   });
    
  }

    onSubmit(event: MatSlideToggleChange, id: any) {
      this.isChecked = event.checked;
      let submitModel: Entitystatus = {
        activeStatus: this.isChecked ? 1 : 0,
      };
      this.service.EntityTerminalStatus(id, submitModel).subscribe((res: any) => {
  
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.service.EntityTerminalviewMerchant(this.merchantId).subscribe((res: any) => {
            if(res.flag==1)
            {
              this.terminal = res.response;
              this.dataSource = new MatTableDataSource(this.terminal.reverse());
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }
            else if(res.flag==2){
              this.dataSource = new MatTableDataSource([]);
              this.dataSource = new MatTableDataSource(this.terminal.reverse());
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }
         });
        }, 1000);
      });
    }
    
    reload() {
      window.location.reload()
    }

    CreateEntityTerminal(id:any){
      this.dialog.open(EntityTerminalAddComponent,{
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
        disableClose: true,
        data: {value:id}
      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.service.EntityTerminalviewMerchant(this.merchantId).subscribe((res: any) => {
          if(res.flag==1)
          {
            this.terminal = res.response;
            this.dataSource = new MatTableDataSource(this.terminal.reverse());
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
          else if(res.flag==2){
            this.dataSource = new MatTableDataSource([]);
            this.dataSource = new MatTableDataSource(this.terminal.reverse());
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
       });
      })
    }

    EditTerminal(id:any){
      this.dialog.open(EntityTerminalEditComponent,{
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
        disableClose: true,   
        data: {value: id}
      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.service.EntityTerminalviewMerchant(this.merchantId).subscribe((res: any) => {
          if(res.flag==1)
          {
            this.terminal = res.response;
            this.dataSource = new MatTableDataSource(this.terminal.reverse());
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
          else if(res.flag==2){
            this.dataSource = new MatTableDataSource([]);
            this.dataSource = new MatTableDataSource(this.terminal.reverse());
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
       });
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    
  close(){
    this.location.back()
  }
  transactions(id:any,id1:any){
    this.router.navigate([`dashboard/terminal-transactions/${id}`], {
      queryParams: { Alldata: id ,
        Alldata1:id1

      },
    });
  }
}
