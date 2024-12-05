import { Component, Input } from '@angular/core';
import { DropDownModel } from '../../app/models/drop-down-model';
import { DropDownContextData } from '../context-data-objects/drop-down-context-data';

@Component({
  selector: 'app-drop-down',
  imports: [ ],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css',
  standalone: true
})
export class DropDownComponent {

  @Input() contextData: DropDownContextData = new DropDownContextData();

  constructor() {
    
  }

  onSelectedItem(event: Event) : void{

    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    const contextInputData = this.contextData.getInputData();

    const selectedItem : DropDownModel = contextInputData.find(i => i.itemID === selectedOption.id)!;
    
    this.contextData.setSelectedData(selectedItem)
  }

  onCheckClicked(event: Event) : void{

    let inputElement = event.target as HTMLInputElement;

    const contextInputData = this.contextData.getInputData();

    const checkedElement : DropDownModel = contextInputData.find(i=>i.itemID === inputElement.value)!;
    
    if(inputElement.checked){
      this.contextData.addSelectedDataItem(checkedElement);
    }
    else{
      this.contextData.deleteSelectedDataItem(checkedElement.itemID!);
    }
  }
}
