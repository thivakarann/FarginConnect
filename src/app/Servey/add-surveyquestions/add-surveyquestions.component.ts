import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { postsetupbox, surveyQuestionsCreate } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-surveyquestions',
  templateUrl: './add-surveyquestions.component.html',
  styleUrl: './add-surveyquestions.component.css'
})
export class AddSurveyquestionsComponent implements OnInit {
  questionsForm: any = FormGroup;
  boxnumber: any;
  entityname: any = localStorage.getItem('entityname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')


  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder, private location: Location, private router: Router) { }
  ngOnInit(): void {
    this.questionsForm = this.fb.group({
      AddQuestionsDynamicArray: this.fb.array([this.questionsFormValidation()])
    })
  }

  get AddQuestionsDynamicArray(): FormArray {
    return this.questionsForm.get("AddQuestionsDynamicArray") as FormArray;
  }

  addUserField() {
    const AddQuestionsDynamicArray = this.questionsForm.get("AddQuestionsDynamicArray") as FormArray;
    AddQuestionsDynamicArray.push(this.questionsFormValidation());
  }

  removeUserField(i: any) {
    if (i === 0) {
      return;
    }

    const AddQuestionsDynamicArray = this.questionsForm.get("AddQuestionsDynamicArray") as FormArray;
    AddQuestionsDynamicArray.removeAt(i);
  }

  questionsFormValidation() {
    return this.fb.group({
      questions: ['', Validators.required],
    })
  }

  trackByFn(i: number, item: any): any {
    return item.id
  }




  submit() {

    const questionsArray = this.questionsForm.value.AddQuestionsDynamicArray.map((group: any) => group.questions.trim());

    let submitModel: surveyQuestionsCreate = {
      questions: questionsArray,
      merchantId: this.merchantId,
      createdBy: this.entityname
    };

    this.service.CreateSurveyQuestions(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.router.navigateByUrl('dashboard/view-surveyquestions')
     
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }


  close() {
    this.location.back()
  }
}
