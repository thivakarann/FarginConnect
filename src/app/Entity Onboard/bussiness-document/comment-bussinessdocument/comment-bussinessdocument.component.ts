import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-comment-bussinessdocument',
  templateUrl: './comment-bussinessdocument.component.html',
  styleUrl: './comment-bussinessdocument.component.css'
})
export class CommentBussinessdocumentComponent {
  comments: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.comments = this.data.value
  }
}
