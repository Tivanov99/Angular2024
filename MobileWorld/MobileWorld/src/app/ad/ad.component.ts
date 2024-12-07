import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdModel } from '../models/ad-model';

@Component({
  selector: 'ad',
  imports: [RouterLink],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.css',
  standalone : true
})
export class AdComponent {

  @Input() adModel : AdModel = new AdModel();
  
  constructor() {
  }

}
