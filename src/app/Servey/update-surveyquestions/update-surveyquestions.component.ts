import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { surveyQuestionUpdate } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-update-surveyquestions',
  templateUrl: './update-surveyquestions.component.html',
  styleUrl: './update-surveyquestions.component.css'
})
export class UpdateSurveyquestionsComponent implements OnInit{
  entityname: any = localStorage.getItem('fullname')
  id: any;
  myForm!: FormGroup;
  payId: any;
 
  allSelected = false;
 
  merchantsmsId: any;
  options: any;
  Smsdetails: any;
  questionsvalue: any;
  questionId: any;
 
  constructor( private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
 
 
    this.id = this.data.value
    
    this.questionsvalue=this.data.value.questions;
    this.questionId=this.data.value.questionId;
    this.myForm = new FormGroup({
      questions: new FormControl('', [Validators.required,]),
    });

  }
 
  get questions() {
    return this.myForm.get('questions')
 
  }
 
 
  submit() {
  let submitModel:surveyQuestionUpdate={
    question: this.questions?.value.trim(),
    modifiedBy: this.entityname
  }
    this.service.SurveyQuestionsUpdate(this.questionId,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
   
           }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
 
}
