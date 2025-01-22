import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-viewlogo',
  templateUrl: './viewlogo.component.html',
  styleUrl: './viewlogo.component.css'
})
export class ViewlogoComponent {
  imageUrl: any;
  DocView: boolean = false;
  showcard: boolean = true;
  logo: any;
  constructor(private router: Router, private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }
  ngOnInit(): void {
    
    
    this.logo = this.data.value.alcotId.alcotId
    
    

    this.service.alcotlogos(this.logo).subscribe({
      next: (res: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
          
          this.DocView = true;
        }
      },

    });
  }

  close() {
    this.dialog.closeAll()
  }

}
