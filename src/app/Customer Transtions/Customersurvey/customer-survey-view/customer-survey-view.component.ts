import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CustServiceService } from '../../../Customer-service/cust-service.service';
import { CustomersurveyIndividualviewComponent } from '../customersurvey-individualview/customersurvey-individualview.component';

@Component({
  selector: 'app-customer-survey-view',
  templateUrl: './customer-survey-view.component.html',
  styleUrl: './customer-survey-view.component.css'
})
export class CustomerSurveyViewComponent {


  dataSource!: MatTableDataSource<any>;
  currentYear: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  pag: number = 1;
  displayedColumns: string[] = [
    'sno',
    'customerName',
    'merchantLegalName',
    'Question',
    'answer',
    'createdat'

  ];
  FormSearch!: FormGroup;

  showDataValue: any;
  show: boolean = false;

  image: any;
  created: any;
  MobileNumber: any;
  survey: any;
  customername: any;
  strings = "@";
  isFullPolicyVisible: boolean = false;
  limit: number = 30;
  searchPerformed: boolean = false;

  constructor(private service: CustServiceService, private dialog: MatDialog, private ActivateRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {

    this.currentYear = new Date().getFullYear();


    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;

    });

    this.service.Customersurvey(this.MobileNumber).subscribe((res: any) => {
      if (res.flag == 1) {

        this.survey = res.response;
        this.dataSource = new MatTableDataSource(this.survey);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.show=false;
      }
      else if (res.flag == 2) {
        this.survey = res.response;
        this.dataSource = new MatTableDataSource(this.survey);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Back(id: any) {
    this.router.navigate([`customer-verify-view/${id}`], {
      queryParams: { Alldata: id },
    });

  }

  questions(id: any, id1: any) {
    this.dialog.open(CustomersurveyIndividualviewComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: id1 },

    });
  }

  reload() {
    window.location.reload()
  }

}
