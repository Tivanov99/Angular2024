import { Component } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-home-page',
  imports: [ BasePageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone : true
})
export class HomePageComponent  extends BasePageComponent{

  constructor() {
    super();
    
  }

}
