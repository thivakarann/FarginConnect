import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { AddsignersComponent } from '../addsigners/addsigners.component';
import { MatDialog } from '@angular/material/dialog';
import { EditsignersComponent } from '../editsigners/editsigners.component';
import { ExtendsignersComponent } from '../extendsigners/extendsigners.component';

@Component({
  selector: 'app-viewsigners',
  templateUrl: './viewsigners.component.html',
  styleUrl: './viewsigners.component.css'
})
export class ViewsignersComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'documentId',
    'title',
    'description',
    'exipryon',
    'view',
    'status',
    'createdDatetime',];
  viewall: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog:MatDialog
  ) { }
  ngOnInit(): void {
    // this.EntityViewall.EntityViewall().subscribe((res: any) => {
    //   this.viewall = res.response;
    //   this.viewall.reverse();
    //   this.dataSource = new MatTableDataSource(this.viewall);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    //   console.log(this.viewall);
    // });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

create() {
  this.dialog.open(AddsignersComponent, {
    width: '80vw',
    maxWidth: '500px',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    disableClose:true
  });
}
createextend() {
  this.dialog.open(ExtendsignersComponent, {
    width: '80vw',
    maxWidth: '500px',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    disableClose:true
  });
}
Edit(id: any) {
  this.dialog.open(EditsignersComponent, {
    width: '80vw',
    maxWidth: '400px',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: { value: id },
    disableClose:true
  });
}





}
