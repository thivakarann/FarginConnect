import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';
import {CustomerResponse } from '../../fargin-model/fargin-model.module';
import { MatSelect } from '@angular/material/select';
import { Location } from '@angular/common';
import { StepperOrientation } from '@angular/cdk/stepper';
import { get } from 'http';
import { Observable, map } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-customerresponse-create',
  templateUrl: './customerresponse-create.component.html',
  styleUrl: './customerresponse-create.component.css'
})
export class CustomerresponseCreateComponent implements OnInit{
  merchantId: any = localStorage.getItem('merchantId');
 
  myForm!: FormGroup;
  details: any;
  customerStbId: any;
  Channels: any;
  ActivePlans: any;
  ActiveLCOP: any;
  bouquet: any;
  allSelected2: any;
  allSelected1: any;
  questionAnswerFormGroup!: FormGroup;
  andssss: any;
  lcp: any;
  allSelected3: any;
  activequestion: any;
  @ViewChild('select3') select3: any = MatSelect;
  @ViewChild('select2') select2: any = MatSelect;

  options = [
    { value: '1', viewValue: 'Yes' },
    { value: '0', viewValue: 'No' },
  ];
  activecust: any;
  customerId: any;
  question: any;
   ans: any;
  questionId: any;
  isLinear = false;
  isChecked: any;
  Checked: any;
questionid: any;
  checkListFilter: any[] | undefined;
  arayofValue: any[] | undefined;
  selectedIds: any[] = [];
  selectedIds1: any[] = [];

   // Array to hold the selected values (1 and 0)
   selectedValues: number[] = [];
   selectedValues1:number[] = [];

   // Variable to hold the current selection (1 or 0)
   selectedValue: number | null = null;
value: any;
  selctedyes: any[] = []
  selectedIdata: any;
  selectedIdsees: any;

  answersview: number[] = []; 
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private location:Location,
    private _formBuilder: FormBuilder
  ) { 
    
  }
 
 
ngOnInit(): void {
 this.service.ViewCustomerbyMerchantId(this.merchantId).subscribe((res:any)=>{
  if(res.flag==1){
    this.activecust=res.response;
  }
 })
    this.service.ActiveQuestions(this.merchantId).subscribe((res: any) => {
      if(res.flag==1){
        this.activequestion = res.response;
        
      }
     
    });
  
 
    this.myForm = new FormGroup({
      customer :new FormControl('', Validators.required),
      answers: new FormControl('', Validators.required),
      questions:new FormControl('',Validators.required),
      remarks: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),
    });
    
  }
 
 
 
  get customer() {
    return this.myForm.get('customer')
 
  }
  get answers() {
    return this.myForm.get('answers')
 
  }
  get questions() {
    return this.myForm.get('questions')
 
  }
  get remarks() {
    return this.myForm.get('remarks')
 
  }

  changequestions(id:any){
    const index = this.selectedIds.indexOf(id);
    if (index > -1) {
      // If the ID is already selected, remove it
      this.selectedIds.splice(index, 1);
    } else {
      // Otherwise, add it
      this.selectedIds.push(id);
    }
    

  } 
  changeAnswer(questionId: number, answer: number) {
    const index = this.answersview.findIndex(item => item === questionId);
    if (index > -1) {
      // Update existing answer
      this.answersview[index] = answer;
    } else {
      // Add new answer
      this.answersview.push(answer);
    }
    
  }
  submit() {
    // Prepare the model for submission
    let submitModel: CustomerResponse = {
        remark: this.remarks?.value,
        quesId: this.selectedIds, // Use selectedIds for question IDs
        answer: this.answersview, // Use answersview for the answers
        customerId: this.customer?.value
    };

    // Call the service to submit the response
    this.service.AddCustomerResponse(submitModel).subscribe((res: any) => {
        if (res.flag === 1) {
            this.toastr.success(res.responseMessage);
            this.router.navigateByUrl('dashboard/view-surveyquestions');
        } else {
            this.toastr.error(res.responseMessage);
        }
    });
}

 
  toggleAllSelection2() {
    if (this.allSelected2) {
      this.select2.options.forEach((item: MatOption) => item.select());
    } else {
      this.select2.options.forEach((item: MatOption) => item.deselect());
    }
  }
 
  toggleAllSelection3() {
    if (this.allSelected3) {
      this.select3.options.forEach((item: MatOption) => item.select());
    } else {
      this.select3.options.forEach((item: MatOption) => item.deselect());
    }
  }
  close(){
    this.location.back()
  }
}
