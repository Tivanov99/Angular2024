import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DropDownModel } from '../models/drop-down-model';
import { DropDownContextData } from '../context-data-objects/drop-down-context-data';

@Component({
  selector: 'app-filter',
  imports: [ DropDownComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  standalone : true
})
export class FilterComponent{

  public carBrandItems : DropDownModel[] = [];
  public carBrandModelsItems : DropDownModel[] = [];
  public carFuelType : DropDownModel[] = [];
  public carGearType : DropDownModel[] = [];
  public extras : DropDownModel[] = [];
  public pageModel = new PageModel();

  @Output() searchEvent = new EventEmitter<void>();

  constructor() {
    
  }

  loadFuelTypes(){
    
  }

  loadTransmissionTypes(){
    
  }

  onClearButtonClick(){
    console.log('чистим');
    
  }

  onSearchButtonClick(){

    this.searchEvent.emit();

    console.log(this.pageModel.carBrandContextData.getSelectedData());
    console.log(this.pageModel.carModelsContextData.getSelectedDataItems());

    console.log('търсене');
  }

}

class PageModel {

  public carModelsContextData: DropDownContextData = new DropDownContextData();
  public carBrandContextData: DropDownContextData = new DropDownContextData();

  constructor() {
    this.loadData();
  }

  loadData(): void {

    this.carBrandContextData.setDropDownTitle('Марка')
    this.carBrandContextData.setInputData (this.loadCarBrand());

    this.carModelsContextData.setDropDownTitle('Модел')
    this.carModelsContextData.setInputData (this.loadCarModels());
    this.carModelsContextData.setUseCheckBoxesFlag(true);

  }

  loadCarBrand() : DropDownModel []{
    return [
      {
        name : "BMW",
        itemID : "1"
      },
      {
        name : "Аudi",
        itemID : "2"
      }
    ]
  }

  loadCarModels() : DropDownModel [] {
    return [
      {
        name : "A7",
        itemID : "3"
      },
      {
        name : "RS7",
        itemID : "4"
      }
    ];
  }

}