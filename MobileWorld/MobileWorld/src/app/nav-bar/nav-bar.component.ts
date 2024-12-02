import { Component } from '@angular/core';
import { SessionManagerService } from '../services/session-manager-service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  constructor(public _sessionManagerService : SessionManagerService) {
    
  }

  onRegistrationClick() : void{

  }

  onLoginClick() : void{

  }

  onLogoutClick() : void{
    
  }

  onHomeClick(): void {

  }

  onAllAddsClick(): void {
    console.log('onAllAddsClick');
  }

  onFavouritesClick() : void{

  }

  onAddVIPAddClick() : void{

  }

  onForumClick() : void{

  }

}