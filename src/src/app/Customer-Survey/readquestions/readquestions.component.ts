import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-readquestions',
  templateUrl: './readquestions.component.html',
  styleUrl: './readquestions.component.css'
})
export class ReadquestionsComponent {
  privacypolicyvalue: any;
  constructor(private dialog:MatDialog,private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any,) { }
  ngOnInit(): void {
    this.privacypolicyvalue = this.data.value.questionId?.questions 
  }

  close() {
    this.dialog.closeAll();
  }
}
