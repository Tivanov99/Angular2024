import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'home',
  imports: [RouterModule, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone : true
})
export class HomeComponent {

  constructor() {

  }

  filterSearchButton(){
    console.log('search emit from patent')
  }
}