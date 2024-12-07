import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  imports: [RouterModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
  standalone : true
})
export class RegistrationFormComponent {

  constructor() {
    
  }
}
