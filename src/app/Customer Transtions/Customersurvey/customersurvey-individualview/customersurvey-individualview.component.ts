import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustServiceService } from '../../../Customer-service/cust-service.service';

@Component({
  selector: 'app-customersurvey-individualview',
  templateUrl: './customersurvey-individualview.component.html',
  styleUrl: './customersurvey-individualview.component.css'
})
export class CustomersurveyIndividualviewComponent {

  survey: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;
  policyId: any;
  disclaimer: any;
  MobileNumber: any;
  questions: any;
  datas: any;




  constructor(private dialog: MatDialog, private service: CustServiceService, private toastr: ToastrService, private router: Router,private ActivateRoute: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any) {
    
    
    this.questions=this.data.value1;
  }


  ngOnInit(): void {
      this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;
      
    });

    this.service.Customersurvey(this.MobileNumber).subscribe((res: any) => {
      if (res.flag == 1) {
        this.survey= res.response;
      
        
    // this.survey.forEach((survey: any) => {
    //   this.question = survey.questionId.questions;
    //   
    // });
      }

    });
  }

}