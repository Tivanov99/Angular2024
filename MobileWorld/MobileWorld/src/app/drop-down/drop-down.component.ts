import { Component, Input } from '@angular/core';
import { DropDownModel } from '../../app/models/drop-down-model';

@Component({
  selector: 'app-drop-down',
  imports: [],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css',
  standalone: true
})
export class DropDownComponent {

  @Input() dropDownTitle: string = "";
  @Input() dropDownItems : DropDownModel[] = [];
  private _selectedItemID : string = "";

  constructor() {
    
  }

  onSelectedItem(event: Event) : void{

    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedId = selectedOption.id;

    this._selectedItemID = selectedId;
    
    console.log(selectedId);
  }

}
