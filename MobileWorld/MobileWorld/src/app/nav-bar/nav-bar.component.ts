import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  constructor(public userService : UserService) {
  }

  logOut(){
    this.userService.logOut();
  }
}