import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrl: './testpage.component.css'
})
export class TestpageComponent {
  dataSource: any;
  displayedColumns: string[] = ["ticketRaiseId", "subject", "content", "memberProfiles", "comments", "status", "action", "createdBy", "createdDateTime"]
  addbusiness: any = FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  onSubmit() {

  }

  admin() {

  }

  exportexcel() {

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

}
