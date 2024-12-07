import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ad',
  imports: [RouterLink],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.css',
  standalone : true
})
export class AdComponent {

  constructor() {
  }

}
