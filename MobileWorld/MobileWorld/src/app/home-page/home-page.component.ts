import { Component } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-home-page',
  imports: [ BasePageComponent, DropDownComponent, FilterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone : true
})
export class HomePageComponent  extends BasePageComponent{

  constructor() {
    super();

  }

}