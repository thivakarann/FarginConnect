import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../service/fargin-service.service';


@Component({
  selector: 'app-aggrement-signer-one',
  templateUrl: './aggrement-signer-one.component.html',
  styleUrl: './aggrement-signer-one.component.css'
})
export class AggrementSignerOneComponent implements OnInit {
  referenceCode: any;
  pdfurl1: any;


  constructor(
    private activatedroute: ActivatedRoute,
    public service: FarginServiceService,
    private router: Router
  ) { }
  ngOnInit(): void {

    this.activatedroute.queryParams.subscribe((params: any) => {
      this.referenceCode = params.referenceCode;
    });


    this.service.AggrementViewbyrefferencenumber(this.referenceCode).subscribe((data) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        this.pdfurl1 = reader.result as string;
      }
    });
  }
}
