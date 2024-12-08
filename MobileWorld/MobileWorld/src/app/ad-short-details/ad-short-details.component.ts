import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdModel } from '../models/ad-model';

@Component({
  selector: 'ad-short-details',
  imports: [RouterLink],
  templateUrl: './ad-short-details.component.html',
  styleUrl: './ad-short-details.component.css',
  standalone : true
})
export class AdShortDetailsComponent {

  @Input() adModel : AdModel = new AdModel();
  
  constructor() {
  }

}
