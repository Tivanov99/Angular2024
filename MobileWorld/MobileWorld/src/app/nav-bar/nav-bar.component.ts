import { Component } from '@angular/core';
import { SessionManagerService } from '../services/session-manager-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [SessionManagerService, Router],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  constructor(public _sessionManagerService : SessionManagerService, private router: Router) {
    
  }
  
}