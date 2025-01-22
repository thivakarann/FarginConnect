import { Component } from '@angular/core';
import { LoaderService } from '../Loader service/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) { }
}
