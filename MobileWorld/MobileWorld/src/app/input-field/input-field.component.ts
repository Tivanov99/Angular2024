import { Component, Input } from '@angular/core';
import { InputContextData } from '../context-data-objects/input-context-data';

@Component({
  selector: 'input-field',
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css', 
  standalone : true
})
export class InputFieldComponent {

  @Input() contextData: InputContextData = new InputContextData();

  constructor() {
    
  }

  onBlur(event: Event) {
    let inputElement = event.target as HTMLInputElement;
    this.contextData.setInputFieldData(inputElement.value);
  }

}
