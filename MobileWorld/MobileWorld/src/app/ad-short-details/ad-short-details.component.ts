import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdShortDetailsModel } from '../models/ad-short-details-model';

@Component({
  selector: 'ad-short-details',
  imports: [RouterLink],
  templateUrl: './ad-short-details.component.html',
  styleUrl: './ad-short-details.component.css',
  standalone : true
})
export class AdShortDetailsComponent {

  @Input() adFullDetailsModel : AdShortDetailsModel = new AdShortDetailsModel();
  
  constructor() {
  }

}
