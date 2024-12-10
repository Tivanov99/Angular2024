import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { DropDownModel } from '../../app/models/drop-down-model';
import { DropDownContextData } from '../context-data-objects/drop-down-context-data';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-drop-down',
  imports: [ ],
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropDownComponent),
      multi: true,
    },
  ],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css',
  standalone: true
})
export class DropDownComponent implements ControlValueAccessor, Validator {

  @Input() contextData: DropDownContextData = new DropDownContextData();
  @Output() onSelectItem = new EventEmitter<string>();
  private _isInitialLoad = true; // Флаг за първоначално извикване
  private _emptySelection : boolean = false;   
  constructor() {
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {

    if(this._isInitialLoad){
      this._isInitialLoad = false;
      return null;
    }
    
    if(this.contextData.getUseCheckBoxesFlag()){
      this._emptySelection = this.contextData.getSelectedDataItems().length == 0;
    }else{
      this._emptySelection = this.contextData.getSelectedData().itemID === undefined
    }

    return this._emptySelection  ? { required: true } : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    
  }

  hasEmptySelection() : boolean{
    return this._emptySelection
  }

  onSelectedItem(event: Event) : void{

    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    const contextInputData = this.contextData.getInputData();

    const selectedItem : DropDownModel = contextInputData.find(i => i.itemID === selectedOption.id)!;
    
    this.contextData.setSelectedData(selectedItem)

    this.onSelectItem.emit(selectedItem.itemID);
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
