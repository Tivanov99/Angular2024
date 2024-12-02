import { Component } from '@angular/core';
import { SessionManagerService } from '../services/session-manager-service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(public _sessionManagerService : SessionManagerService) {
    
  }
}