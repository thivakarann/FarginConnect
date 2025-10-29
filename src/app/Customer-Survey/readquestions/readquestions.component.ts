import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-readquestions',
  templateUrl: './readquestions.component.html',
  styleUrl: './readquestions.component.css',
})
export class ReadquestionsComponent {
  privacypolicyvalue: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.privacypolicyvalue = this.data.value.questionId?.questions;
  }

}
