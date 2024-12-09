import { Component, forwardRef, Input } from '@angular/core';
import { InputContextData } from '../context-data-objects/input-context-data';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'input-field',
  imports: [],
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css', 
  standalone : true
})
export class InputFieldComponent implements ControlValueAccessor, Validator {

  @Input() contextData: InputContextData = new InputContextData();
  private _isInitialLoad = true; // Флаг за първоначално извикване
  private _emptyField : boolean = false;   

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {

    if(this._isInitialLoad){
      this._isInitialLoad = false;
      return null;
    }

    this._emptyField = this.contextData.getInputData().trim().length == 0;

    return this._emptyField  ? { required: true } : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onBlur(event: Event) {
    let inputElement = event.target as HTMLInputElement;
    this.contextData.setInputFieldData(inputElement.value);
  }

  isEmptyField() : boolean{
    return this._emptyField
  }

}
