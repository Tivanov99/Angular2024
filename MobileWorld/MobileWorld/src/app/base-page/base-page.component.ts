import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-base-page',
  imports: [ NavBarComponent ],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.css',
  standalone : true
})
export class BasePageComponent {

}
