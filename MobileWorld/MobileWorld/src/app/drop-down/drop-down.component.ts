import { Component, Input } from '@angular/core';
import { DropDownModel } from '../../app/models/drop-down-model';

@Component({
  selector: 'app-drop-down',
  imports: [ ],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css',
  standalone: true
})
export class DropDownComponent {

  @Input() useCheckBoxes: boolean = false;
  @Input() dropDownTitle: string = "";
  @Input() dropDownItems : DropDownModel[] = [];

  private _selectedItemID : string = "";
  private _checkedItemsIDs : string [] = [];
  constructor() {
    
  }

  onSelectedItem(event: Event) : void{

    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    this._selectedItemID = selectedOption.id;
  }

  onCheckClicked(event: Event) : void{

    const inputElement = event.target as HTMLInputElement;

    if(inputElement.checked){
      this._checkedItemsIDs.push(inputElement.value!);
    }
    else{
      const index = this._checkedItemsIDs.indexOf(inputElement.value!);
      this._checkedItemsIDs.splice(index,1);
    }
    
  }

}
